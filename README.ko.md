# Finger Frame Effect AI 손가락 프레임 효과

[English](README.md) · [简体中文](README.zh-CN.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [Español](README.es.md)

두 손으로 만든 창을 따라 움직이는 오픈소스 브라우저 데모입니다. MediaPipe가 양손의 엄지와 검지 끝 네 점을 찾고, Canvas가 다른 영상을 그 다각형 안에 합성합니다.

![Finger Frame Effect AI 손가락 프레임 효과](assets/finger-frame-ai-hero.jpg)

## 데모와 AI 영상 생성

- [한국어 온라인 데모 열기](https://aithink001.github.io/finger-frame-effect-ai/ko/)
- [C Dance AI에서 완성 영상 만들기](https://cdance.ai/ko/finger-frame-effect-ai?utm_source=github&utm_medium=readme-ko&utm_campaign=finger_frame_ai)

GitHub 데모는 업로드한 영상을 현재 브라우저 탭에서 처리하므로 손 추적과 로컬 합성 방식을 직접 확인하기 좋습니다. C Dance AI 워크플로는 Gemini Omni로 원본 영상을 편집하며, 인물, 손, 동작과 카메라를 보존하도록 작성된 프롬프트를 함께 전달합니다.

## 트렌드 영상

아래 썸네일을 누르면 사용 허가를 받은 참고 영상을 재생합니다. 이 영상들은 트렌드를 설명하기 위한 자료이며 프로젝트의 생성 결과나 학습 데이터가 아닙니다.

| Sophia Yang | @panpan_kiwi / @koreanoli |
| --- | --- |
| [![Sophia Yang의 손가락 프레임 AI 데모](public/examples/sophia-yang-finger-frame-demo-01.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/sophia-yang-finger-frame-demo-01.mp4) | [![한국 바이럴 손가락 프레임 전환](public/examples/viral-korean-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/viral-korean-finger-frame-demo.mp4) |
| @QingQ77 | @venturetwins |
| [![초기 손가락 프레임 전환](public/examples/qingq77-original-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/qingq77-original-finger-frame-demo.mp4) | [![실시간 AI 손가락 프레임](public/examples/venturetwins-live-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/venturetwins-live-finger-frame-demo.mp4) |

## 로컬 실행

```bash
npm install
npm run dev
```

4~8초 길이의 밝고 안정적인 영상을 권장합니다. 두 손을 화면 안에 두고 네 손끝이 겹치지 않게 하며, 프레임 모양을 2초 이상 유지하세요. 코드는 [MIT License](LICENSE), 제3자 영상은 [ATTRIBUTIONS.md](ATTRIBUTIONS.md)의 별도 허가 조건을 따릅니다.
