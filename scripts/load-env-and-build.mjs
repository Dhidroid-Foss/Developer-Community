#!/usr/bin/env node

/**
 * Build script that loads environment variables from .env if available
 * This ensures Sanity configuration is available during static build
 */

import { spawn } from "child_process";
import { existsSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");

/**
 * Parse .env file and return environment variables
 */
function loadEnvFile(envPath) {
    if (!existsSync(envPath)) {
        return {};
    }

    const envContent = readFileSync(envPath, "utf-8");
    const env = {};

    envContent.split("\n").forEach((line) => {
        const trimmedLine = line.trim();
        // Skip empty lines and comments
        if (!trimmedLine || trimmedLine.startsWith("#")) {
            return;
        }

        const [key, ...valueParts] = trimmedLine.split("=");
        const value = valueParts.join("=").trim();

        if (key) {
            env[key.trim()] = value;
        }
    });

    return env;
}

// Load .env if it exists
const envPath = resolve(rootDir, ".env");
const envVars = loadEnvFile(envPath);

if (Object.keys(envVars).length > 0) {
    console.log("📦 Loading environment variables from .env...");
    Object.entries(envVars).forEach(([key, value]) => {
        if (!process.env[key]) {
            process.env[key] = value;
        }
    });
} else {
    console.log("ℹ️  .env file not found or empty. Using system environment variables.");
    console.warn("   Set environment variables for: projectId, dataset, apiVersion, token");
}

// Run the build command
const buildArgs = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ["next", "build"];

console.log(`🔨 Running: ${buildArgs.join(" ")}`);

const child = spawn(buildArgs[0], buildArgs.slice(1), {
    stdio: "inherit",
    env: process.env,
});

child.on("exit", (code) => {
    process.exit(code || 0);
});

child.on("error", (error) => {
    console.error("❌ Build failed:", error);
    process.exit(1);
});
