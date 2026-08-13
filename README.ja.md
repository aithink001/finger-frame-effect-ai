# Finger Frame Effect AI 指フレームエフェクト

[English](README.md) · [简体中文](README.zh-CN.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [Español](README.es.md)

両手で作った窓を追跡する、ブラウザ向けのオープンソースデモです。MediaPipeで左右の親指と人差し指、合計4点を検出し、Canvasで別の動画をその多角形の内側に合成します。

![Finger Frame Effect AI 指フレームエフェクト](assets/finger-frame-ai-hero.jpg)

## デモとAI動画生成

- [日本語のオンラインデモ](https://aithink001.github.io/finger-frame-effect-ai/ja/)
- [C Dance AIで位置の合ったスタイル層を生成](https://cdance.ai/ja/finger-frame-effect-ai?utm_source=github&utm_medium=readme-ja&utm_campaign=finger_frame_ai)

安定した再現は2段階です。まずC Dance AIのGemini Omniで元動画全体を、位置の合った3D、アニメ、サイバーパンク、水彩のスタイル層へ変換します。保存後、GitHub版で元動画を **Source video**、生成動画を **Portal video** として読み込むと、ブラウザが4本の指先を追跡してローカル合成します。

C Dance AIのワークスペースを開いても、有料生成は自動で始まりません。プロンプトとクレジットを確認してから、自分の4〜10秒のMP4/MOVをアップロードしてください。10秒を超える動画は、短く切られた結果にクレジットを使わないようアップロード前に拒否されます。

## トレンド動画

サムネイルをクリックすると、使用許可を得た参考動画を再生できます。トレンドの表現を説明する資料であり、このリポジトリの生成結果や学習データではありません。

| Sophia Yang | @panpan_kiwi / @koreanoli |
| --- | --- |
| [![Sophia Yangの指フレームAIデモ](public/examples/sophia-yang-finger-frame-demo-01.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/sophia-yang-finger-frame-demo-01.mp4) | [![韓国で話題の指フレーム転換](public/examples/viral-korean-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/viral-korean-finger-frame-demo.mp4) |
| @QingQ77 | @venturetwins |
| [![初期の指フレーム転換](public/examples/qingq77-original-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/qingq77-original-finger-frame-demo.mp4) | [![リアルタイムAI指フレーム](public/examples/venturetwins-live-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/venturetwins-live-finger-frame-demo.mp4) |

## ローカル実行

```bash
npm install
npm run dev
```

4〜8秒の短い動画を使い、カメラを固定して正面から均等に照らしてください。両手を画面内に保ち、4本の指先を重ねず、窓の形を2秒以上維持すると安定します。コードは[MIT License](LICENSE)、第三者動画は[ATTRIBUTIONS.md](ATTRIBUTIONS.md)の個別条件に従います。
