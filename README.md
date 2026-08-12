# Finger Frame Effect AI

Turn a two-hand gesture into a tracked video portal. This open-source browser demo detects the frame made by your thumbs and index fingers, follows it through a source clip, and reveals another moving world inside the shape.

![Finger Frame Effect AI demo](assets/finger-frame-ai-hero.jpg)

## Try the AI video version

The local demo below uses hand landmarks and browser compositing. If you want a generative video edit that can redraw the world behind your fingers, use the hosted [Finger Frame Effect AI Video Generator](https://cdance.ai/finger-frame-effect-ai?utm_source=github&utm_medium=readme&utm_campaign=finger_frame_ai) on C Dance AI.

[Create a finger-frame video on C Dance AI](https://cdance.ai/finger-frame-effect-ai?utm_source=github&utm_medium=readme&utm_campaign=finger_frame_ai)

## Trend reference

The GitHub Pages demo includes four authorized clips that trace the trend from an early hand transition through local tracking, offline AI video editing, and real-time AI styling. They document the interaction that inspired this project; they are not training data, sample inputs, or output from this repository's code. See the dated [X source log](research/x-sources.md) and [media attribution record](ATTRIBUTIONS.md).

## What the demo does

The browser reads a short source video and runs MediaPipe Hand Landmarker on each frame. It takes the thumb and index fingertips from two detected hands, orders the four points around their center, rejects unstable shapes, smooths the corners, and clips a second video or animated fallback world into the tracked polygon.

The result is intentionally local-first:

- Your uploaded videos stay in the browser.
- No API key is required for the tracking demo.
- The app can record the canvas result as WebM.
- You can inspect every tracking and compositing step.

## Localized pages

The GitHub Pages site has fully localized landing pages for [English](https://aithink001.github.io/finger-frame-effect-ai/), [简体中文](https://aithink001.github.io/finger-frame-effect-ai/zh/), [한국어](https://aithink001.github.io/finger-frame-effect-ai/ko/), [日本語](https://aithink001.github.io/finger-frame-effect-ai/ja/), and [Español](https://aithink001.github.io/finger-frame-effect-ai/es/). Each page has its own title, description, canonical URL, reciprocal hreflang links, tutorial copy, FAQ, and localized route into C Dance AI.

## Run it locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, upload a short hand-frame clip, and press **Start effect**. You can also add a second video to use as the world inside the frame.

For the cleanest first test, use a four-to-eight-second clip with a locked camera, even light, both hands visible, and a rectangular opening held for at least two seconds.

## How the tracking works

1. MediaPipe detects two hands in video mode.
2. The app collects landmark 4 (thumb tip) and landmark 8 (index tip) from each hand.
3. The four points are ordered around their centroid to form a polygon.
4. Area and edge-length gates reject collapsed or implausible frames.
5. Exponential smoothing reduces jitter while allowing deliberate motion.
6. A short dropout hold prevents the portal from blinking off after one missed frame.
7. Canvas clipping reveals the portal media and draws the tracked outline.

This is a practical demo rather than a production hand-tracking benchmark. Crossed fingers, motion blur, severe occlusion, and hands leaving the frame can still break the geometry.

## AI prompt recipe

The hosted workflow uses a different method. It sends the source clip to a video-editing model with instructions to preserve the face, hands, camera, and timing while generating motion inside the opening. The [C Dance AI landing page](https://cdance.ai/finger-frame-effect-ai?utm_source=github&utm_medium=readme&utm_campaign=finger_frame_ai) includes four tested prompt structures and opens the workspace with Gemini Omni selected.

## Project structure

```text
.
├── assets/                         Original project artwork
├── public/examples/                Authorized trend-reference clips
├── research/                       Trend notes and permission records
├── zh, ko, ja, es/                 Localized SEO landing pages
├── src/app.js                      Detection, tracking, compositing, export
├── src/locale-page.js              Shared localized-page entry
├── src/styles.css                  Responsive interface styles
├── index.html                      Demo and on-page metadata
└── ATTRIBUTIONS.md                 Third-party asset policy
```

## Media policy

Files committed to this repository must be original, public-domain, or covered by a license or written permission that allows redistribution. Trend research and downloaded reference clips remain outside Git tracking until the creator grants permission. See [ATTRIBUTIONS.md](ATTRIBUTIONS.md).

## Prior art

[Sophia Yang's finger-frame project](https://github.com/sophiamyang/finger-frame-effect-ai) helped bring this interaction into wider view. This repository is a from-scratch implementation with a different browser pipeline, interface, and distribution goal; it does not copy source code or bundled media from that project.

## Independence notice

This is an original implementation inspired by the broader finger-frame video trend. It is not an official version of any other repository, social-media creator, model provider, or platform. C Dance AI is an independent AI creation platform.

## License

Code in this repository is released under the [MIT License](LICENSE). Media may have separate terms listed in [ATTRIBUTIONS.md](ATTRIBUTIONS.md).
