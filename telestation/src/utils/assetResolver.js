/**
 * Resolves asset URLs at render time.
 * If the path is absolute (starts with http/https), it returns it as is.
 * Otherwise, it prepends the window location origin.
 */
export const resolveAsset = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
        return path;
    }
    // Ensure the path starts with a /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${window.location.origin}${normalizedPath}`;
};
