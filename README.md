# cassandra-engstrom.github.io

A three-page academic research site (Home, Research, CV) built with
plain HTML/CSS/JS — no build step, so it works directly with GitHub Pages.
Your email lives directly on the homepage, so there's no separate contact page.

## 1. Deploying

Since your repo is already named `cassandra-engstrom.github.io`, GitHub Pages
just needs these files at the **root** of the repo's default branch (usually
`main`):

```
git clone https://github.com/cassandra-engstrom/cassandra-engstrom.github.io.git
cd cassandra-engstrom.github.io
# copy all files from this folder in here
git add .
git commit -m "Initial site"
git push
```

Then in the repo on GitHub: **Settings → Pages → Build and deployment →
Source: "Deploy from a branch"**, branch `main`, folder `/ (root)`. Your site
will be live at `https://cassandra-engstrom.github.io/` within a minute or two.

No `index.html`-in-a-subfolder tricks needed — it's already at the root.

## 2. Structure

```
index.html          Home (photo, intro text, email)
research.html        Research / projects
publications.html    Publications (peer-reviewed + in preparation)
cv.html               CV, links out to your PDF
css/style.css         All styling
js/main.js             Mobile nav toggle
assets/images/         Photos, thumbnails, poster frames
assets/pdfs/            Papers, CV, write-ups
assets/videos/          .mp4 animations
```

Edit the HTML files directly — each page repeats the same nav and footer, so
search-and-replace works fine for site-wide changes (e.g. your name, email).

## 3. Adding a PDF

1. Drop the file in `assets/pdfs/`, e.g. `assets/pdfs/my-paper.pdf`.
2. Link to it with a normal relative link:

```html
<a href="assets/pdfs/my-paper.pdf">Read the paper (PDF)</a>
```

Clicking it opens the PDF in the browser's built-in viewer (or downloads it,
depending on the visitor's browser settings) — no extra setup needed.

## 4. Adding an image

Put it in `assets/images/` and reference it:

```html
<img src="assets/images/my-figure.jpg" alt="Describe the image for accessibility">
```

The four `*-placeholder.jpg` files in `assets/images/` are stand-ins for the
research-page thumbnails — replace them with real figures (keep the same
filenames, or update the `src` attributes in `research.html`).

## 5. Adding an .mp4 animation

Put the file in `assets/videos/` and embed it with a `<video>` tag:

```html
<video controls preload="metadata" poster="assets/images/my-poster-frame.jpg">
  <source src="assets/videos/my-animation.mp4" type="video/mp4">
  Your browser does not support embedded video.
  <a href="assets/videos/my-animation.mp4">Download the video</a> instead.
</video>
```

- `controls` gives play/pause/volume/fullscreen.
- `poster` is a still image shown before playback — useful since your
  animations are likely to start on a blank/white frame otherwise.
- Add `autoplay muted loop playsinline` instead of `controls` if you want it
  to play automatically like a GIF (browsers require `muted` for autoplay).

**A note on file size:** GitHub blocks any single file over 100 MB, and
repos are meant to stay well under ~1–5 GB total. `gganimate`/`av` renders
can get large. Before committing:

- Compress with `ffmpeg` if a video is large, e.g.:
  `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow output.mp4`
- If you have many/large videos, consider [Git LFS](https://git-lfs.com/)
  (`git lfs track "*.mp4"`) — GitHub Pages serves LFS-tracked files fine, but
  LFS bandwidth has its own quota on free accounts, so check current limits
  if you have a lot of video.
- Alternative: host large videos elsewhere (e.g. a Google Drive share, or
  YouTube unlisted) and either link out or swap the `<source>` for an
  `<iframe>` embed.

## 6. Fonts

The pages load Newsreader (headings), Inter (body), and IBM Plex Mono
(labels/captions) from Google Fonts via `<link>` tags in each `<head>`. If
you'd rather not depend on Google Fonts, download the font files and
self-host them from a new `assets/fonts/` folder, then update the `@font-face`
rules in `css/style.css` accordingly.

## 7. Customizing colors

All colors are CSS variables at the top of `css/style.css` under `:root`
(`--paper`, `--ink`, `--line`, `--route`, etc.) — change them there and they
apply site-wide.
