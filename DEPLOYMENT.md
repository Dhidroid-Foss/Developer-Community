# Cloudflare Pages Deployment Guide

## Overview

This project is deployed on Cloudflare Pages with a Next.js static export. The build requires Sanity CMS credentials to fetch content during the build process.

## Build Process

The build uses a custom script (`scripts/load-env-and-build.mjs`) that:

1. Loads environment variables from `.env` if available (local development)
2. Uses system environment variables during Cloudflare Pages build
3. Provides helpful error messages if Sanity is misconfigured

## Setting Up Cloudflare Pages

To deploy successfully, you need to configure environment variables in your Cloudflare Pages project with your actual Sanity credentials.

### Finding Your Sanity Credentials

1. **Go to Sanity Console**: <https://manage.sanity.io/>
2. **Select your project** - Look for "Developer Community" or similar
3. **Get Project ID**: Go to **Settings** → **Project** → Copy the "Project ID"
4. **Get Dataset**: Check your project settings - usually "production"
5. **Get API Token**:
   - Go to **Settings** → **API tokens**
   - Create a new token with "Viewer" role (minimal permissions needed for read-only)
   - Copy the token

### Configure Cloudflare Pages Environment Variables

1. Open your **Cloudflare Pages project** dashboard
2. Go to **Settings** → **Environment variables**
3. Click **Add variables** and set these for **Production** (and **Preview** for preview builds):

| Variable Name | Value | Example |
| --- | --- | --- |
| `projectId` | Your Sanity project ID | `abc123def456` |
| `dataset` | Your dataset name | `production` |
| `apiVersion` | API version date | `2024-01-01` |
| `token` | Your Sanity API token | (keep secret) |
| `useCdn` | Should be `false` for latest content | `false` |

1. Make sure to mark `token` as **Encrypted** to keep it secure
2. Click **Save** and trigger a new deployment

### Important Security Notes

⚠️ **Never commit credentials to git** - `.env` is already in `.gitignore`

- The `token` should only be added to **Production** environment variables
- Use Cloudflare's encrypted variable feature for sensitive data
- Preview environment can use a separate read-only token if needed

## Local Development

For local development:

1. Copy `.env.example` to `.env`
2. Fill in your Sanity credentials (projectId and token)
3. Run `npm run build` - the build script will automatically load the `.env` file

## Troubleshooting

### Build fails with "Sanity not configured"

**Cause**: Environment variables are not set in Cloudflare Pages

**Solution**: Follow the "Configure Cloudflare Pages Environment Variables" section above

### Pages return empty results

**Cause**: `token` might be missing or invalid

**Solution**:

- Verify the token exists in your Cloudflare Pages environment variables
- Create a new token in Sanity with "Viewer" role
- Make sure the token is marked as **Encrypted** in Cloudflare

### Preview builds work but production doesn't

**Cause**: Variables might only be set for one environment

**Solution**: Set the same environment variables for both **Production** and **Preview** environments

## Deployment Commands

The deployment uses the following command:

```bash
npm install && npm run build
```

The `npm run build` command runs the custom build script which:

1. Loads `.env` if available
2. Runs `next build` with proper environment variables
3. Outputs static files to `.next/out`

## Architecture

- **Framework**: Next.js with static export (`output: 'export'`)
- **CMS**: Sanity for content management
- **Hosting**: Cloudflare Pages
- **Build Time**: ~30-40 seconds
- **Dependencies**: ~387 packages (via bun/npm)
