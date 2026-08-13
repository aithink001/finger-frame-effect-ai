# Finger Frame Effect AI 手指取景特效

[English](README.md) · [简体中文](README.zh-CN.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [Español](README.es.md)

这是一个开源的浏览器端手指取景特效 Demo。上传一段双手入镜的视频后，程序使用 MediaPipe 识别两只手的拇指与食指，共取得四个指尖坐标，再通过 Canvas 把另一个动态世界裁进手框中。

![Finger Frame Effect AI 手指取景特效](assets/finger-frame-ai-hero.jpg)

## 在线体验与 AI 生成

- [打开中文在线 Demo](https://aithink001.github.io/finger-frame-effect-ai/zh/)
- [在 C Dance AI 生成逐帧对齐的风格层](https://cdance.ai/zh/finger-frame-effect-ai?utm_source=github&utm_medium=readme-zh&utm_campaign=finger_frame_ai)

稳定复现需要两步：先在 C Dance AI 用 Gemini Omni 把完整源视频转换成逐帧对齐的 3D、动漫、赛博朋克或水彩风格层；下载后回到 GitHub Demo，把原视频放入 **Source video**，把生成结果放入 **Portal video**，再由浏览器追踪四个指尖并完成局部合成。

打开 C Dance AI 工作台不会自动扣费或开始生成。请先检查提示词和积分消耗，再上传你自己的 4–10 秒 MP4/MOV；超过 10 秒的视频会在上传前被拦截，避免只处理前段却消耗完整积分。

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
