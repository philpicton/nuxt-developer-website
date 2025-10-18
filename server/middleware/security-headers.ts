export default defineEventHandler((event) => {
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
            "camera=(), microphone=(), geolocation=(), interest-cohort=()",

        // Content Security Policy
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Nuxt requires unsafe-inline and unsafe-eval
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: https: blob:",
            "connect-src 'self' https://api.resend.com",
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
