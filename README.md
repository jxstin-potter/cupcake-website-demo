# CakeCup Storefront Replica

Next.js storefront prototype for local delivery and nationwide cupcake shipping.  
Includes a hero parallax, catalog browsing, account/cart pages, and deterministic mock APIs for checkout flows.

## Run Locally

```bash
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

`npm start` requires a completed `.next` production build from `npm run build`.

## Demo video

A short overview MP4 is saved in the repo at [`docs/demo/cakecup-demo.mp4`](docs/demo/cakecup-demo.mp4) (slideshow of the UI screenshots, 1280×720 H.264).

Regenerate it after changing images in `docs/screenshots/`:

```bash
npm run demo:video
```

If `docs/screenshots/` is empty, the script tries to copy captures from the local Cursor assets folder; otherwise it writes an 8s placeholder clip.

## UI Screenshots

Images live in the repo under `docs/screenshots/` so they render in GitHub, VS Code, and any Markdown preview that resolves paths relative to this file.

### Home hero
![Home hero](docs/screenshots/home-hero.png)

### Account page
![Account page](docs/screenshots/account.png)

### Product detail
![Product detail](docs/screenshots/product-detail.png)

### Catalog and custom dozen builder
![Catalog and custom dozen builder](docs/screenshots/catalog-builder.png)

### Builder + curated pathways section
![Builder and pathways](docs/screenshots/pathways.png)
