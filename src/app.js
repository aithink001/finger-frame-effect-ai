import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import './styles.css';

const sourceInput = document.querySelector('#source-input');
const worldInput = document.querySelector('#world-input');
const sourceName = document.querySelector('#source-name');
const worldName = document.querySelector('#world-name');
const sourceVideo = document.querySelector('#source-video');
const worldVideo = document.querySelector('#world-video');
const canvas = document.querySelector('#output-canvas');
const context = canvas.getContext('2d');
const startButton = document.querySelector('#start-button');
const recordButton = document.querySelector('#record-button');
const status = document.querySelector('#status');
const trackingPill = document.querySelector('#tracking-pill');

let handLandmarker;
let sourceUrl;
let worldUrl;
let running = false;
let animationFrame;
let smoothedQuad = null;
let missedFrames = 0;
let recorder;
let recordedChunks = [];

const portalImage = new Image();
portalImage.src = `${import.meta.env.BASE_URL}assets/neon-portal-world.jpg`;

function setStatus(message) {
  status.textContent = message;
}

function loadVideo(input, video, label, onReady, onError) {
  const file = input.files?.[0];
  if (!file) return;
  const nextUrl = URL.createObjectURL(file);
  video.src = nextUrl;
  video.load();
  label.textContent = file.name;
  video.addEventListener('loadeddata', () => onReady(nextUrl), { once: true });
  video.addEventListener(
    'error',
    () => onError?.(video.error?.message || 'The browser could not decode this video.'),
    { once: true }
  );
}

sourceInput.addEventListener('change', () => {
  loadVideo(sourceInput, sourceVideo, sourceName, (nextUrl) => {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    sourceUrl = nextUrl;
    running = false;
    cancelAnimationFrame(animationFrame);
    stopRecording();
    canvas.width = sourceVideo.videoWidth || 1280;
    canvas.height = sourceVideo.videoHeight || 720;
    sourceVideo.pause();
    startButton.textContent = 'Start effect';
    recordButton.disabled = true;

    const drawPreview = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(sourceVideo, 0, 0, canvas.width, canvas.height);
      startButton.disabled = !handLandmarker;
      setStatus('Preview ready. Click Start effect to track the four fingertips.');
      trackingPill.textContent = 'Preview ready';
    };
    const previewTime = Number.isFinite(sourceVideo.duration)
      ? Math.min(0.25, sourceVideo.duration / 4)
      : 0;
    if (previewTime > 0.01 && Math.abs(sourceVideo.currentTime - previewTime) > 0.01) {
      sourceVideo.addEventListener('seeked', drawPreview, { once: true });
      sourceVideo.currentTime = previewTime;
    } else {
      drawPreview();
    }
  }, (message) => {
    setStatus(message);
    trackingPill.textContent = 'Video error';
    startButton.disabled = true;
  });
});

worldInput.addEventListener('change', () => {
  loadVideo(worldInput, worldVideo, worldName, (nextUrl) => {
    if (worldUrl) URL.revokeObjectURL(worldUrl);
    worldUrl = nextUrl;
    worldVideo.loop = true;
    worldVideo.muted = true;
    void worldVideo.play().catch(() => {
      setStatus('Portal video loaded. It will start when you click Start effect.');
    });
  }, (message) => {
    setStatus(message);
    worldName.textContent = 'Portal video could not be loaded';
  });
});

function polygonArea(points) {
  return Math.abs(
    points.reduce((sum, point, index) => {
      const next = points[(index + 1) % points.length];
      return sum + point.x * next.y - next.x * point.y;
    }, 0) / 2
  );
}

function edgeLength(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function orderPoints(points) {
  const center = points.reduce(
    (result, point) => ({ x: result.x + point.x / points.length, y: result.y + point.y / points.length }),
    { x: 0, y: 0 }
  );
  return [...points].sort(
    (a, b) => Math.atan2(a.y - center.y, a.x - center.x) - Math.atan2(b.y - center.y, b.x - center.x)
  );
}

function validQuad(points) {
  const area = polygonArea(points);
  const edges = points.map((point, index) => edgeLength(point, points[(index + 1) % points.length]));
  return area > canvas.width * canvas.height * 0.012 && Math.min(...edges) > Math.min(canvas.width, canvas.height) * 0.035;
}

function smoothQuad(nextQuad) {
  if (!smoothedQuad) return nextQuad;
  const averageDistance = nextQuad.reduce((sum, point, index) => sum + edgeLength(point, smoothedQuad[index]), 0) / 4;
  const alpha = Math.min(0.68, Math.max(0.24, averageDistance / 90));
  return nextQuad.map((point, index) => ({
    x: smoothedQuad[index].x + (point.x - smoothedQuad[index].x) * alpha,
    y: smoothedQuad[index].y + (point.y - smoothedQuad[index].y) * alpha,
  }));
}

function detectQuad() {
  const result = handLandmarker.detectForVideo(sourceVideo, performance.now());
  if (result.landmarks.length !== 2) return null;
  const points = result.landmarks.flatMap((hand) => [hand[4], hand[8]]).map((point) => ({
    x: point.x * canvas.width,
    y: point.y * canvas.height,
  }));
  const ordered = orderPoints(points);
  return validQuad(ordered) ? ordered : null;
}

function drawPortal(quad, timestamp) {
  const xs = quad.map((point) => point.x);
  const ys = quad.map((point) => point.y);
  const left = Math.min(...xs);
  const top = Math.min(...ys);
  const width = Math.max(...xs) - left;
  const height = Math.max(...ys) - top;

  context.save();
  context.beginPath();
  context.moveTo(quad[0].x, quad[0].y);
  quad.slice(1).forEach((point) => context.lineTo(point.x, point.y));
  context.closePath();
  context.clip();

  if (worldUrl && worldVideo.readyState >= 2) {
    context.drawImage(worldVideo, left, top, width, height);
  } else if (portalImage.complete) {
    const drift = Math.sin(timestamp / 1200) * width * 0.035;
    context.drawImage(portalImage, left - drift, top, width * 1.08, height);
  } else {
    const gradient = context.createLinearGradient(left, top, left + width, top + height);
    gradient.addColorStop(0, '#22d3ee');
    gradient.addColorStop(0.52, '#6366f1');
    gradient.addColorStop(1, '#d946ef');
    context.fillStyle = gradient;
    context.fillRect(left, top, width, height);
  }
  context.restore();

  context.save();
  context.beginPath();
  context.moveTo(quad[0].x, quad[0].y);
  quad.slice(1).forEach((point) => context.lineTo(point.x, point.y));
  context.closePath();
  context.setLineDash([12, 8]);
  context.lineDashOffset = -timestamp / 45;
  context.lineWidth = Math.max(2, canvas.width / 420);
  context.strokeStyle = '#a5f3fc';
  context.shadowColor = '#22d3ee';
  context.shadowBlur = 18;
  context.stroke();
  context.restore();
}

function render(timestamp) {
  if (!running) return;
  if (sourceVideo.ended) sourceVideo.currentTime = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(sourceVideo, 0, 0, canvas.width, canvas.height);

  const detected = sourceVideo.readyState >= 2 ? detectQuad() : null;
  if (detected) {
    smoothedQuad = smoothQuad(detected);
    missedFrames = 0;
    trackingPill.textContent = 'Frame locked';
  } else {
    missedFrames += 1;
    if (missedFrames > 8) smoothedQuad = null;
    trackingPill.textContent = smoothedQuad ? 'Holding last frame' : 'Show two hands';
  }

  if (smoothedQuad) drawPortal(smoothedQuad, timestamp);
  animationFrame = requestAnimationFrame(render);
}

async function startEffect() {
  if (!sourceUrl || !handLandmarker) return;
  running = !running;
  if (running) {
    try {
      smoothedQuad = null;
      missedFrames = 0;
      await sourceVideo.play();
      if (worldUrl) await worldVideo.play();
      startButton.textContent = 'Pause effect';
      recordButton.disabled = false;
      setStatus('Tracking two hands. Keep the finger window open and well lit.');
      animationFrame = requestAnimationFrame(render);
    } catch (error) {
      console.error(error);
      running = false;
      recordButton.disabled = true;
      setStatus('Playback could not start. Try an MP4, MOV, or WebM encoded for the web.');
      trackingPill.textContent = 'Playback error';
    }
  } else {
    sourceVideo.pause();
    worldVideo.pause();
    cancelAnimationFrame(animationFrame);
    startButton.textContent = 'Resume effect';
    setStatus('Effect paused.');
  }
}

function stopRecording() {
  if (recorder?.state === 'recording') recorder.stop();
}

function startRecording() {
  if (!running || recorder?.state === 'recording') {
    stopRecording();
    return;
  }
  recordedChunks = [];
  const stream = canvas.captureStream(30);
  const preferredMimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : 'video/webm';
  recorder = new MediaRecorder(stream, { mimeType: preferredMimeType });
  recorder.addEventListener('dataavailable', (event) => {
    if (event.data.size) recordedChunks.push(event.data);
  });
  recorder.addEventListener('stop', () => {
    const blob = new Blob(recordedChunks, { type: recorder.mimeType || 'video/webm' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'finger-frame-effect-ai.webm';
    link.click();
    URL.revokeObjectURL(url);
    recordButton.textContent = 'Record result';
    setStatus('Recording saved as WebM.');
  });
  recorder.start();
  recordButton.textContent = 'Stop and save';
  setStatus('Recording the canvas result…');
}

startButton.addEventListener('click', () => void startEffect());
recordButton.addEventListener('click', startRecording);

async function initialize() {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm'
    );
    const options = {
      runningMode: 'VIDEO',
      numHands: 2,
      minHandDetectionConfidence: 0.62,
      minHandPresenceConfidence: 0.58,
      minTrackingConfidence: 0.58,
    };
    const modelAssetPath =
      'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
    try {
      handLandmarker = await HandLandmarker.createFromOptions(vision, {
        ...options,
        baseOptions: { modelAssetPath, delegate: 'GPU' },
      });
    } catch (gpuError) {
      console.warn('GPU hand tracking unavailable; using CPU.', gpuError);
      handLandmarker = await HandLandmarker.createFromOptions(vision, {
        ...options,
        baseOptions: { modelAssetPath, delegate: 'CPU' },
      });
    }
    startButton.disabled = !sourceUrl;
    setStatus('Hand tracker ready. Upload a source video to begin.');
  } catch (error) {
    console.error(error);
    setStatus('The hand tracker could not load. Check the browser console and network connection.');
  }
}

void initialize();
