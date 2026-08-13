# Finger Frame Effect AI

[English](README.md) · [简体中文](README.zh-CN.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [Español](README.es.md)

Turn a two-hand gesture into a tracked video portal. This open-source browser demo detects the frame made by your thumbs and index fingers, follows it through a source clip, and reveals another moving world inside the shape.

![Finger Frame Effect AI demo](assets/finger-frame-ai-hero.jpg)

## Watch the effect

Click a preview to play the authorized reference clip. These videos document the trend; they are not outputs from this repository.

| Sophia Yang | @panpan_kiwi / @koreanoli |
| --- | --- |
| [![Finger-frame AI demo by Sophia Yang](public/examples/sophia-yang-finger-frame-demo-01.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/sophia-yang-finger-frame-demo-01.mp4) | [![Viral Korean finger-frame transition](public/examples/viral-korean-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/viral-korean-finger-frame-demo.mp4) |
| @QingQ77 | @venturetwins |
| [![Early finger-frame transition by QingQ77](public/examples/qingq77-original-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/qingq77-original-finger-frame-demo.mp4) | [![Real-time AI finger-frame demo by venturetwins](public/examples/venturetwins-live-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/venturetwins-live-finger-frame-demo.mp4) |

[Open the interactive demo](https://aithink001.github.io/finger-frame-effect-ai/) · [View the original X sources](research/x-sources.md)

## Build the AI version without guessing the mask

The reproducible workflow has two stages. First, use the hosted [Finger Frame Effect AI Video Generator](https://cdance.ai/finger-frame-effect-ai?utm_source=github&utm_medium=readme&utm_campaign=finger_frame_ai) to turn the entire source clip into a pixel-aligned 3D, anime, cyberpunk, or watercolor layer. Then return here, load the original as **Source video** and the generated layer as **Portal video**, and let the browser tracker clip it inside the moving four-fingertip frame.

Opening the workspace does not start a paid generation. Review the prompt and credit cost first, then upload your own 4–10 second MP4/MOV. Longer clips are rejected before upload so they cannot silently spend credits on a truncated result.

[Generate the aligned AI layer on C Dance AI](https://cdance.ai/finger-frame-effect-ai?utm_source=github&utm_medium=readme&utm_campaign=finger_frame_ai)

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

For the cleanest first test, use a four-to-eight-second clip with a locked camera, even light, both hands visible, and a rectangular opening held for at least two seconds. The hosted Gemini Omni workflow accepts no more than ten seconds.

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

The hosted workflow asks the video model to change visual style only. Its prompt locks duration, timing, camera, field of view, composition, body position, facial landmarks, expression, clothing, hands, and occlusions frame by frame. It deliberately does not ask the model to invent the moving mask: this project handles that deterministic tracking and compositing step afterward. The [C Dance AI landing page](https://cdance.ai/finger-frame-effect-ai?utm_source=github&utm_medium=readme&utm_campaign=finger_frame_ai) includes four style presets and opens the workspace with Gemini Omni selected.

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

## Independence notice

This is an original implementation inspired by the broader finger-frame video trend. It is not an official version of any other repository, social-media creator, model provider, or platform. C Dance AI is an independent AI creation platform.

## License

Code in this repository is released under the [MIT License](LICENSE). Media may have separate terms listed in [ATTRIBUTIONS.md](ATTRIBUTIONS.md).
