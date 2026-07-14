# Wan Ariff — Creative Projects

A static, scroll-animated portfolio designed for GitHub Pages. No build tools are required.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload everything inside this folder, keeping `assets` as a folder.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main`, choose `/ (root)`, then save.

## Edit your details

- Change the email address in `index.html`.
- Add your Instagram links in `projects.js` by replacing `#`.
- Edit the introductory text in `index.html`.
- Add or edit projects only in `projects.js`. Copy an existing project object and update its fields.
- Put any new images in `assets`, then use their filenames in `projects.js`.

## Image recommendations

Use WebP images around 1600 × 1067 pixels and ideally below 500 KB. The layout automatically crops them across desktop and mobile.

## Files

- `index.html` — page structure and personal introduction
- `style.css` — complete design and responsive styles
- `script.js` — animation, navigation and project rendering
- `projects.js` — the easy-to-edit project list
- `assets/` — generated project images
