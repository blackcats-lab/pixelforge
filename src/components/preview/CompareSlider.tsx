"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface CompareSliderProps {
  originalSrc: string;
  resizedSrc: string;
}

export default function CompareSlider({
  originalSrc,
  resizedSrc,
}: CompareSliderProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage src={originalSrc} alt="Original" />
        }
        itemTwo={
          <ReactCompareSliderImage src={resizedSrc} alt="Resized" />
        }
        className="max-h-[50vh]"
      />
    </div>
  );
}
