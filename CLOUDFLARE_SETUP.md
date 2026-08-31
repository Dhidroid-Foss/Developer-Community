# Cloudflare Pages Environment Variables - Quick Reference

## ⚡ Quick Setup (5 minutes)

### Step 1: Get Your Sanity Credentials
- Go to https://manage.sanity.io/
- Select your project
- Note down:
  - **Project ID** (Settings → Project)
  - **Dataset** (usually `production`)
  - **API Token** (Settings → API tokens → Create new with "Viewer" role)

### Step 2: Set Cloudflare Environment Variables
1. Open Cloudflare Pages → Your Project → Settings → Environment variables
2. Click "Add variables" and fill in:

```
projectId = [your-project-id]
dataset = production
apiVersion = 2024-01-01
useCdn = false
token = [your-api-token]
```

3. Mark `token` as **Encrypted**
4. Apply to both **Production** and **Preview** environments
5. Save and trigger a new deployment

### Step 3: Verify
- Check the build logs - should see "✓ Compiled successfully"
- Site should load with all content from Sanity

## 🔐 Security Checklist

- [ ] `token` is marked as **Encrypted** in Cloudflare
- [ ] `.env` file is in `.gitignore` (never commit it)
- [ ] Token has minimal permissions ("Viewer" role only)
- [ ] Different tokens used for production vs. preview (optional but recommended)

## ❌ Common Issues

| Problem | Solution |
|---------|----------|
| "Sanity not configured" error | Check that ALL environment variables are set (not just `token`) |
| Build says "empty array from generateStaticParams" | `token` is likely missing or invalid |
| Pages show no content | Verify `projectId` and `dataset` are correct |
| Build works locally but fails on Cloudflare | Environment variables not properly saved in Cloudflare |

## 📝 Environment Variable Reference

| Name | Required | Where to Find | Example |
|------|----------|---------------|---------|
| `projectId` | ✅ Yes | Sanity Settings → Project | `abc123xyz` |
| `dataset` | ✅ Yes | Sanity Project Settings | `production` |
| `apiVersion` | ✅ Yes | Use `.env.example` | `2024-01-01` |
| `token` | ✅ Yes | Sanity Settings → API tokens | `sk_live_...` |
| `useCdn` | ❌ No | Set to `false` | `false` |

---

Need help? Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
