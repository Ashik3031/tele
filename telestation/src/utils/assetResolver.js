/**
 * Resolves asset URLs at render time.
 * - Absolute URLs (http/https/data) are returned as-is
 * - API paths (/api/*) are routed to the backend API server
 * - Other paths use the current window origin (static assets)
 */
export const resolveAsset = (path) => {
    if (!path) return '';

    // Already absolute URL
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
        return path;
    }

    // Normalize path
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // If it's an API path (uploaded images), use the API server
    if (normalizedPath.startsWith('/api/')) {
        const apiBase = getApiBaseUrl();
        return `${apiBase}${normalizedPath}`;
    }

    // For other assets (static images), use the current origin
    return `${window.location.origin}${normalizedPath}`;
};

/**
 * Helper to get the full API base URL based on the current environment
 * @returns {string} The base URL of the API server (without /api suffix)
 */
const getApiBaseUrl = () => {
    const hostname = window.location.hostname;

    // Production domain - use same origin (nginx proxies /api/* to backend)
    if (hostname === 'www.tspl-corp.com' || hostname === 'tspl-corp.com') {
        return window.location.origin; // https://www.tspl-corp.com
    }

    // Production IP
    if (hostname === '72.61.238.90') {
        return 'http://72.61.238.90:5000';
    }

    // Local development
    return 'http://localhost:5000';
};
