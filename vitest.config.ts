import { defineVitestConfig } from "@nuxt/test-utils/config";
import { fileURLToPath } from "node:url";

export default defineVitestConfig({
    test: {
        environmentOptions: {
            nuxt: {
                rootDir: fileURLToPath(new URL("./", import.meta.url)),
                overrides: {
                    // Disable hub module during tests to avoid database initialization issues
                    // @ts-expect-error: hub driver is provided by NuxtHub
                    hub: {
                        database: false,
                        kv: false,
                    },
                },
            },
        },
    },
});
