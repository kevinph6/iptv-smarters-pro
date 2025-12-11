# 🌐 Subdomain Setup Guide for Geo-Restriction Page

This guide explains how to set up `restricted.abonnement-iptv-smarterspro.fr` as a subdomain for your geo-restriction page.

## 📋 Overview

When users from blocked countries try to access your site, they will be redirected to:
- **Main site**: `https://abonnement-iptv-smarterspro.fr`
- **Blocked users**: `https://restricted.abonnement-iptv-smarterspro.fr`

## 🔧 Setup Steps

### Step 1: DNS Configuration (Domain Provider)

Go to your domain provider (e.g., Hostinger, Cloudflare, GoDaddy) and add a CNAME record:

**CNAME Record:**
```
Type: CNAME
Name: restricted
Value: cname.vercel-dns.com
TTL: Auto or 3600
```

**Alternative (A Records):**
If your provider doesn't support CNAME for subdomains, use the same A records as your main domain:
```
Type: A
Name: restricted
Value: 76.76.21.21 (or your Vercel IP)
```

### Step 2: Vercel Configuration

1. **Deploy your changes** (click "Publish" in Orchids)
2. **Go to Vercel Dashboard** → Your Project → Settings → Domains
3. **Add Domain**: Enter `restricted.abonnement-iptv-smarterspro.fr`
4. **Verify Domain**: Vercel will check DNS records
5. **Wait 5-10 minutes** for DNS propagation

### Step 3: Test the Subdomain

After DNS propagates, test the redirect:

**Test from France (should work):**
```
https://abonnement-iptv-smarterspro.fr
```

**Test from blocked country (should redirect):**
```
https://abonnement-iptv-smarterspro.fr?test_country=US
→ Redirects to → https://restricted.abonnement-iptv-smarterspro.fr?blocked_country=US
```

## 🎨 How It Works

### Middleware Logic

1. **Main Domain** (`abonnement-iptv-smarterspro.fr`):
   - Checks visitor's country
   - If blocked → Redirect to `restricted.` subdomain
   - If allowed → Show normal site

2. **Restricted Subdomain** (`restricted.abonnement-iptv-smarterspro.fr`):
   - Always shows restriction page
   - No country checks (already blocked)
   - Same Next.js app, different content

### Current Implementation

The middleware (`middleware.ts`) now:
- ✅ Detects if user is on restricted subdomain
- ✅ Redirects blocked users to subdomain
- ✅ Extracts base domain correctly
- ✅ Allows Google bots for SEO
- ✅ Bypasses localhost for development

## 🌍 Benefits of Subdomain Approach

### ✅ Advantages:
- **Better SEO**: Main domain stays clean for Google
- **Professional**: Clear separation of blocked traffic
- **Analytics**: Track restricted users separately
- **Security**: Isolated environment for blocked users
- **No /geo-restricted path**: Cleaner URL structure

### ⚠️ Considerations:
- Requires DNS configuration
- Both domains must be added to Vercel
- DNS propagation takes 5-60 minutes
- Uses same Next.js deployment

## 🔍 Troubleshooting

### Issue: "DNS not found" error
**Solution**: Wait 10-30 minutes for DNS propagation. Use `nslookup restricted.abonnement-iptv-smarterspro.fr` to check.

### Issue: Redirect loop
**Solution**: Check that subdomain is properly added to Vercel and middleware correctly detects `restricted.` prefix.

### Issue: Main site redirects to restricted
**Solution**: Middleware is blocking allowed countries. Check `ALLOWED_COUNTRIES` array in middleware.ts.

### Issue: Restricted subdomain shows main site
**Solution**: Ensure middleware detects subdomain correctly. Check `hostname.startsWith('restricted.')` logic.

## 📊 Testing Checklist

- [ ] DNS CNAME record added for `restricted` subdomain
- [ ] Subdomain added to Vercel project
- [ ] DNS propagation complete (10-30 min)
- [ ] Test main site from France (should work)
- [ ] Test with `?test_country=US` (should redirect to subdomain)
- [ ] Test subdomain directly (should show restriction page)
- [ ] Check Google Search Console (main domain only)
- [ ] Verify sitemap accessible at main domain

## 🚀 Deployment Steps

1. ✅ **Code Updated**: Middleware configured (already done)
2. ⏳ **Add DNS Record**: Add CNAME in your domain provider
3. ⏳ **Add to Vercel**: Add subdomain in Vercel dashboard
4. ⏳ **Wait for DNS**: 10-30 minutes propagation
5. ⏳ **Test**: Use `?test_country=US` parameter
6. ✅ **Monitor**: Check analytics for blocked traffic

## 📝 Notes

- **Main domain**: Keep all SEO, sitemap, robots.txt
- **Restricted subdomain**: Only shows blocked page, no SEO needed
- **Same deployment**: Both domains use same Next.js app
- **Development**: localhost bypasses all restrictions (except with `?test_country=` param)

## 🔗 Related Files

- `middleware.ts` - Geo-restriction and subdomain routing
- `src/app/geo-restricted/page.tsx` - Restriction page (shown on subdomain)
- `GEO-RESTRICTION-AND-SITEMAP-STATUS.md` - Overall geo-restriction status

---

**Need Help?** Contact your DNS provider or Vercel support for domain configuration assistance.
