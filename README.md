# Satyam Surya Manhattan Landing Page

## Deployment Instructions

### Vercel (Preview)
1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. It will automatically detect it as a static site. No build command is required.
4. Security headers are automatically applied via `vercel.json`.

### Hostinger / Apache (Live)
1. Upload the contents of this directory to your Hostinger `public_html` directory via File Manager or FTP.
2. For security headers on Hostinger, create a `.htaccess` file in the root with the following:
```apache
<IfModule mod_headers.c>
    Header set Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:;"
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## Configuration (Before Going Live)
Before deploying to production, open `js/main.js` and update the constants at the top:
- `FORM_ENDPOINT`: Your Google Apps Script Web App URL.
- `WHATSAPP_NUMBER`: The WhatsApp number for click-to-chat.
- `CONTACT_PHONE`: The phone number for click-to-call links.

Also, ensure you have placed all source images into their respective folders inside `assets/`.
