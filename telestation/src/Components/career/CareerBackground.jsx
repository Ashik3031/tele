const BRAND = {
  accent: "#6EF1F7",
  primary: "#1353CD",
  secondary: "#007399",
};

const CareersBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
        style={{ backgroundColor: `${BRAND.accent}1A` }} // ~10%
      />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-700"
        style={{ backgroundColor: `${BRAND.primary}1A` }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-1000"
        style={{ backgroundColor: `${BRAND.secondary}14` }} // ~8%
      />
    </div>
  );
};

export default CareersBackground;
