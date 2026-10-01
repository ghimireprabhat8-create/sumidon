# Publish on Render

Upload this project to a GitHub repository, then sign in at https://dashboard.render.com/.

Choose **New → Static Site** and connect that repository.

- Name: `for-sumina-always` (or another available name)
- Build command: `node build.cjs`
- Publish directory: `dist`

Choose **Deploy Static Site**. Render will provide the actual `onrender.com` link after deployment succeeds. Use that link to open the website on Sumina’s phone.

Alternatively, use the included `render.yaml` through Render’s Blueprint flow.

For later edits, update config.js and push to GitHub. Render will redeploy the website.
