# Finger Frame Effect AI: efecto de marco con los dedos

[English](README.md) · [简体中文](README.zh-CN.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [Español](README.es.md)

Esta demo de código abierto sigue la ventana formada con las dos manos. MediaPipe detecta las puntas de ambos pulgares e índices y Canvas compone otro vídeo dentro del polígono de cuatro puntos.

![Finger Frame Effect AI: marco con los dedos](assets/finger-frame-ai-hero.jpg)

## Demo y generación con IA

- [Abrir la demo en español](https://aithink001.github.io/finger-frame-effect-ai/es/)
- [Generar la capa de estilo alineada en C Dance AI](https://cdance.ai/es/finger-frame-effect-ai?utm_source=github&utm_medium=readme-es&utm_campaign=finger_frame_ai)

El flujo fiable tiene dos etapas. Primero, C Dance AI usa Gemini Omni para convertir todo el original en una capa 3D, anime, ciberpunk o acuarela alineada fotograma a fotograma. Después, carga el original como **Source video** y el resultado como **Portal video** en la demo de GitHub; el navegador sigue los cuatro dedos y completa la composición local.

Abrir el espacio de C Dance AI no inicia una generación de pago. Revisa primero la instrucción y el coste, y después sube tu propio MP4/MOV de 4–10 segundos. Los vídeos de más de 10 segundos se bloquean antes de subirlos para evitar gastar créditos en un resultado recortado.

## Vídeos de la tendencia

Pulsa una miniatura para reproducir el vídeo autorizado. Estas referencias documentan la tendencia; no son resultados del repositorio ni datos de entrenamiento.

| Sophia Yang | @panpan_kiwi / @koreanoli |
| --- | --- |
| [![Demo de marco con los dedos de Sophia Yang](public/examples/sophia-yang-finger-frame-demo-01.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/sophia-yang-finger-frame-demo-01.mp4) | [![Transición coreana viral con marco de dedos](public/examples/viral-korean-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/viral-korean-finger-frame-demo.mp4) |
| @QingQ77 | @venturetwins |
| [![Referencia temprana del efecto](public/examples/qingq77-original-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/qingq77-original-finger-frame-demo.mp4) | [![Demo de IA en tiempo real](public/examples/venturetwins-live-finger-frame-demo.jpg)](https://aithink001.github.io/finger-frame-effect-ai/examples/venturetwins-live-finger-frame-demo.mp4) |

## Ejecución local

```bash
npm install
npm run dev
```

Empieza con un clip de cuatro a ocho segundos, cámara fija y luz frontal uniforme. Mantén ambas manos en plano, separa bien las cuatro puntas y conserva la abertura durante al menos dos segundos. El código usa la [licencia MIT](LICENSE); los vídeos de terceros siguen las condiciones de [ATTRIBUTIONS.md](ATTRIBUTIONS.md).
