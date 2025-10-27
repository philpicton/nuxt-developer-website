export default defineEventHandler((event) => {
    const isDevelopment = process.env.NODE_ENV === "development";

    const headers = {
        // Prevent clickjacking attacks
        "X-Frame-Options": "SAMEORIGIN",

        // Prevent MIME type sniffing
        "X-Content-Type-Options": "nosniff",

        // Enable XSS protection in older browsers
        "X-XSS-Protection": "1; mode=block",

        // Control referrer information
        "Referrer-Policy": "strict-origin-when-cross-origin",

        // Permissions policy (formerly Feature Policy)
        "Permissions-Policy":
            "camera=(), display-capture=(), fullscreen=(), microphone=(), geolocation=()",

        // Content Security Policy
        "Content-Security-Policy": [
            "default-src 'self'",
            // Nuxt requires unsafe-inline and unsafe-eval
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            // Allow inline styles and Google Fonts
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // Allow fonts from Google Fonts and data URIs
            "font-src 'self' https://fonts.gstatic.com data:",
            // Allow images from self, data URIs, HTTPS sources, and blob for image optimization
            "img-src 'self' data: https: blob:",
            // Allow connections for API, Iconify CDN (for @nuxt/icon), and DevTools in dev
            isDevelopment
                ? "connect-src 'self' ws://localhost:* wss://localhost:* https://api.resend.com https://api.iconify.design https://api.simplesvg.com"
                : "connect-src 'self' https://api.resend.com https://api.iconify.design https://api.simplesvg.com",
            // Allow iframe embeds from Giphy
            "frame-src 'self' https://giphy.com",
            "base-uri 'self'",
            "form-action 'self'",
        ].join("; "),
    };

    // Set all security headers
    for (const [header, value] of Object.entries(headers)) {
        setHeader(event, header, value);
    }
});
