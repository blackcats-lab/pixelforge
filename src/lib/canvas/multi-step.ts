import type { ImageFormat } from "@/types";

const STEP_FACTOR = 2;
const MULTI_STEP_THRESHOLD = 4;

/**
 * 4x以上の拡大時に段階的にCanvas描画を繰り返し品質を向上
 */
export function multiStepResize(options: {
  imageSrc: string;
  originalWidth: number;
  originalHeight: number;
  targetWidth: number;
  targetHeight: number;
  format: ImageFormat;
  quality: number;
  smoothing?: boolean;
  onProgress?: (step: number, totalSteps: number) => void;
}): Promise<string> {
  const {
    imageSrc,
    originalWidth,
    originalHeight,
    targetWidth,
    targetHeight,
    format,
    quality,
    smoothing = true,
    onProgress,
  } = options;

  const scale = Math.max(
    targetWidth / originalWidth,
    targetHeight / originalHeight
  );

  if (scale <= MULTI_STEP_THRESHOLD) {
    return singleStepResize(
      imageSrc,
      targetWidth,
      targetHeight,
      format,
      quality,
      smoothing
    );
  }

  const totalSteps = Math.ceil(Math.log(scale) / Math.log(STEP_FACTOR));

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let currentCanvas = imageToCanvas(img);
      let currentWidth = originalWidth;
      let currentHeight = originalHeight;

      for (let step = 0; step < totalSteps; step++) {
        const isLastStep = step === totalSteps - 1;
        const nextWidth = isLastStep
          ? targetWidth
          : Math.min(currentWidth * STEP_FACTOR, targetWidth);
        const nextHeight = isLastStep
          ? targetHeight
          : Math.min(currentHeight * STEP_FACTOR, targetHeight);

        const nextCanvas = document.createElement("canvas");
        nextCanvas.width = nextWidth;
        nextCanvas.height = nextHeight;
        const ctx = nextCanvas.getContext("2d")!;

        ctx.imageSmoothingEnabled = smoothing;
        if (smoothing) ctx.imageSmoothingQuality = "high";

        ctx.drawImage(currentCanvas, 0, 0, nextWidth, nextHeight);

        currentCanvas = nextCanvas;
        currentWidth = nextWidth;
        currentHeight = nextHeight;

        onProgress?.(step + 1, totalSteps);
      }

      resolve(currentCanvas.toDataURL(format, quality));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}

function imageToCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  return canvas;
}

function singleStepResize(
  imageSrc: string,
  w: number,
  h: number,
  format: ImageFormat,
  quality: number,
  smoothing: boolean
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = smoothing;
      if (smoothing) ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL(format, quality));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}
