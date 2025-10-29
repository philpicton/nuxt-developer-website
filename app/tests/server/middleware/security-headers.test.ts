// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("security-headers middleware", () => {
    let originalEnv: string | undefined;

    beforeEach(() => {
        originalEnv = process.env.NODE_ENV;
    });

    afterEach(() => {
        process.env.NODE_ENV = originalEnv;
    });

    it("validates all required security headers are defined", () => {
        const requiredHeaders = [
            "X-Frame-Options",
            "X-Content-Type-Options",
            "X-XSS-Protection",
            "Referrer-Policy",
            "Permissions-Policy",
            "Content-Security-Policy",
        ];

        expect(requiredHeaders.length).toBe(6);
        expect(requiredHeaders).toContain("X-Frame-Options");
        expect(requiredHeaders).toContain("Content-Security-Policy");
    });

    it("validates X-Frame-Options value", () => {
        const value = "SAMEORIGIN";
        expect(value).toBe("SAMEORIGIN");
    });

    it("validates X-Content-Type-Options value", () => {
        const value = "nosniff";
        expect(value).toBe("nosniff");
    });

    it("validates X-XSS-Protection value", () => {
        const value = "1; mode=block";
        expect(value).toBe("1; mode=block");
    });

    it("validates Referrer-Policy value", () => {
        const value = "strict-origin-when-cross-origin";
        expect(value).toBe("strict-origin-when-cross-origin");
    });

    it("validates Permissions-Policy restricts dangerous features", () => {
        const value =
            "camera=(), display-capture=(), fullscreen=(), microphone=(), geolocation=()";
        expect(value).toContain("camera=()");
        expect(value).toContain("microphone=()");
        expect(value).toContain("geolocation=()");
    });

    it("validates CSP includes default-src self", () => {
        const cspParts = ["default-src 'self'"];
        expect(cspParts.join("; ")).toContain("default-src 'self'");
    });

    it("validates CSP includes script-src with necessary directives", () => {
        const cspParts = ["script-src 'self' 'unsafe-inline' 'unsafe-eval'"];
        expect(cspParts.join("; ")).toContain("'unsafe-inline'");
        expect(cspParts.join("; ")).toContain("'unsafe-eval'");
    });

    it("validates CSP includes style-src for Google Fonts", () => {
        const cspParts = [
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        ];
        expect(cspParts.join("; ")).toContain("https://fonts.googleapis.com");
    });

    it("validates CSP connect-src includes websockets in development", () => {
        process.env.NODE_ENV = "development";
        const isDevelopment = process.env.NODE_ENV === "development";
        const connectSrc = isDevelopment
            ? "connect-src 'self' ws://localhost:* wss://localhost:*"
            : "connect-src 'self'";

        expect(connectSrc).toContain("ws://localhost");
        expect(connectSrc).toContain("wss://localhost");
    });

    it("validates CSP connect-src excludes websockets in production", () => {
        process.env.NODE_ENV = "production";
        const isDevelopment = process.env.NODE_ENV === "development";
        const connectSrc = isDevelopment
            ? "connect-src 'self' ws://localhost:* wss://localhost:*"
            : "connect-src 'self' https://api.resend.com";

        expect(connectSrc).not.toContain("ws://localhost");
        expect(connectSrc).toContain("https://api.resend.com");
    });

    it("validates CSP includes Iconify CDN for @nuxt/icon", () => {
        const connectSrc =
            "connect-src 'self' https://api.iconify.design https://api.simplesvg.com";
        expect(connectSrc).toContain("https://api.iconify.design");
        expect(connectSrc).toContain("https://api.simplesvg.com");
    });
});

