import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ✅ MUST be defined in the same file (above useEffect usage) */
const vertexShader = `
uniform float time;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.03 * offset.rg);
}
`;

export default function GridDistortion({
  imageSrc,
  grid = 22,
  mouse = 0.12,
  strength = 0.14,
  relaxation = 0.9,
  className = "",
  opacity = 0.7,
}) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const roRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene + Renderer
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;

    // Uniforms
    const uniforms = {
      time: { value: 0 },
      uTexture: { value: null },
      uDataTexture: { value: null },
    };

    // ✅ Declare handleResize BEFORE loader.load()
    let plane = null;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h || !plane) return;

      renderer.setSize(w, h);

      const aspect = w / h;
      plane.scale.set(aspect, 1, 1);

      const frustumHeight = 1;
      const frustumWidth = frustumHeight * aspect;

      camera.left = -frustumWidth / 2;
      camera.right = frustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();
    };

    // DataTexture field
    const size = grid;
    const data = new Float32Array(4 * size * size);

    // ✅ make calm by default (no random slant)
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = 0;
      data[i * 4 + 1] = 0;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 1;
    }

    const dataTexture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Load image texture
    const loader = new THREE.TextureLoader();
    loader.load(
      imageSrc,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        uniforms.uTexture.value = texture;

        handleResize(); // ✅ now safe
      },
      undefined,
      (err) => console.error("Texture load error:", err)
    );

    // Resize observer
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);
      roRef.current = ro;
    } else {
      window.addEventListener("resize", handleResize);
    }

    // Mouse state
    const mouseState = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;

      mouseState.vX = x - mouseState.prevX;
      mouseState.vY = y - mouseState.prevY;

      mouseState.x = x;
      mouseState.y = y;
      mouseState.prevX = x;
      mouseState.prevY = y;
    };

    const onLeave = () => {
      mouseState.x = 0;
      mouseState.y = 0;
      mouseState.prevX = 0;
      mouseState.prevY = 0;
      mouseState.vX = 0;
      mouseState.vY = 0;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    handleResize();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;

      const d = dataTexture.image.data;

      // relax to calm
      for (let i = 0; i < size * size; i++) {
        d[i * 4] *= relaxation;
        d[i * 4 + 1] *= relaxation;
      }

      // apply mouse force
      const gridMouseX = size * mouseState.x;
      const gridMouseY = size * mouseState.y;
      const maxDist = size * mouse;

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distSq = (gridMouseX - i) ** 2 + (gridMouseY - j) ** 2;
          if (distSq < maxDist * maxDist) {
            const idx = 4 * (i + size * j);
            const power = Math.min(maxDist / Math.sqrt(distSq + 0.00001), 10);

            d[idx] += strength * 100 * mouseState.vX * power;
            d[idx + 1] -= strength * 100 * mouseState.vY * power;
          }
        }
      }

      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      if (roRef.current) roRef.current.disconnect();
      else window.removeEventListener("resize", handleResize);

      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);

      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);

      geometry.dispose();
      material.dispose();
      dataTexture.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();
    };
  }, [imageSrc, grid, mouse, strength, relaxation]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: "100%", height: "100%", opacity }}
    />
  );
}
