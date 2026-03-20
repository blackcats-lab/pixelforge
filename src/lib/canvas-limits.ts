let cachedMaxSize: number | null = null;

export function getCanvasMaxSize(): number {
  if (cachedMaxSize !== null) return cachedMaxSize;

  const sizes = [16384, 11180, 8192, 4096];
  for (const size of sizes) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillRect(0, 0, 1, 1);
        const data = ctx.getImageData(0, 0, 1, 1);
        if (data.data[3] !== 0) {
          cachedMaxSize = size;
          return size;
        }
      }
    } catch {
      continue;
    }
  }

  cachedMaxSize = 4096;
  return 4096;
}

export function checkCanvasLimits(
  width: number,
  height: number
): { valid: boolean; message?: string } {
  const maxSize = getCanvasMaxSize();
  if (width > maxSize || height > maxSize) {
    return {
      valid: false,
      message: `このブラウザのCanvas最大サイズ (${maxSize}×${maxSize}) を超えています。`,
    };
  }
  return { valid: true };
}
