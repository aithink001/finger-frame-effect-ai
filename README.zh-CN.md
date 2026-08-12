# Finger Frame Effect AI 手指取景特效

[English](README.md) · [简体中文](README.zh-CN.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [Español](README.es.md)

这是一个开源的浏览器端手指取景特效 Demo。上传一段双手入镜的视频后，程序使用 MediaPipe 识别两只手的拇指与食指，共取得四个指尖坐标，再通过 Canvas 把另一个动态世界裁进手框中。

![Finger Frame Effect AI 手指取景特效](assets/finger-frame-ai-hero.jpg)

## 在线体验与 AI 生成

- [打开中文在线 Demo](https://aithink001.github.io/finger-frame-effect-ai/zh/)
- [在 C Dance AI 生成完整视频](https://cdance.ai/zh/finger-frame-effect-ai?utm_source=github&utm_medium=readme-zh&utm_campaign=finger_frame_ai)

GitHub Demo 在当前浏览器标签页处理视频，适合查看手部追踪、四角稳定和本地合成效果。C Dance AI 使用 Gemini Omni 编辑源视频，能够生成指间世界的光线与运动，并带入保护人物、手部、动作和机位的提示词。

## 热门视频参考

点击封面可播放已获授权的趋势参考视频。它们用于说明效果演变，不是本项目生成结果或训练数据。

| Sophia Yang | @panpan_kiwi / @koreanoli |
| --- | --- |
| [![Sophia Yang 手指取景 AI 视频](public/examples/sophia-yang-finger-frame-demo-01.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/sophia-yang-finger-frame-demo-01.mp4) | [![韩国热门手指取景转场](public/examples/viral-korean-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/viral-korean-finger-frame-demo.mp4) |
| @QingQ77 | @venturetwins |
| [![早期手指取景转场](public/examples/qingq77-original-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/qingq77-original-finger-frame-demo.mp4) | [![实时 AI 手指取景效果](public/examples/venturetwins-live-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/venturetwins-live-finger-frame-demo.mp4) |

## 本地运行

```bash
npm install
npm run dev
```

建议使用四到八秒、机位固定、光线均匀的视频。双手要完整入镜，四个指尖不要互相遮挡，手框最好保持至少两秒。代码采用 [MIT License](LICENSE)；第三方视频遵循 [ATTRIBUTIONS.md](ATTRIBUTIONS.md) 中的单独授权条款。
