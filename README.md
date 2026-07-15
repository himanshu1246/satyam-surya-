# Satyam Surya Manhattan - Landing Page

A real-estate landing page built with HTML, CSS, and JS. 

## Deployment Instructions

### Vercel
1. Push this repository to GitHub.
2. Connect your GitHub repository to Vercel.
3. Vercel will automatically detect the static site and deploy it using the `vercel.json` headers for security.

### Hostinger
1. Upload all files (excluding `.git` and `.env.example`) to your `public_html` directory via cPanel File Manager or FTP.
2. Ensure you have the `.htaccess` rules equivalent to the `vercel.json` headers to maintain security headers.
Example `.htaccess`:
```apache
<IfModule mod_headers.c>
    Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data: https:; connect-src 'self' https://script.google.com; frame-src 'self' https://www.google.com;"
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## Configuration
Edit `js/main.js` and update `FORM_ENDPOINT` with your Google Apps Script URL.
Update `WHATSAPP_NUMBER` wherever necessary if changed from default.

