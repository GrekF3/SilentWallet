"use client";

import { useEffect, useRef, useState } from "react";
import {
  getShaderColorFromString,
  heatmapFragmentShader,
  ShaderFitOptions,
  ShaderMount,
  toProcessedHeatmap,
} from "@paper-design/shaders";

const colors = ["#202020", "#6f6f6f", "#bdbdbd", "#f2f2f2", "#ffffff"];
const shaderRevealMs = 1500;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

type ShaderHeroProps = {
  onReady?: () => void;
};

export function ShaderHero({ onReady }: ShaderHeroProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let shader: ShaderMount | null = null;
    let processedUrl: string | null = null;
    let readyTimer: number | null = null;
    let cancelled = false;

    async function mountShader() {
      try {
        const processed = await toProcessedHeatmap("/logo.png");
        processedUrl = URL.createObjectURL(processed.blob);

        const image = await loadImage(processedUrl);

        if (!mountRef.current || cancelled) return;

        shader = new ShaderMount(
          mountRef.current,
          heatmapFragmentShader,
          {
            u_image: image,
            u_contour: 0.28,
            u_angle: 0,
            u_noise: 0.02,
            u_innerGlow: 0.22,
            u_outerGlow: 0.34,
            u_colorBack: getShaderColorFromString("#000000"),
            u_colors: colors.map(getShaderColorFromString),
            u_colorsCount: colors.length,
            u_fit: ShaderFitOptions.contain,
            u_offsetX: 0,
            u_offsetY: 0,
            u_originX: 0.5,
            u_originY: 0.5,
            u_rotation: 0,
            u_scale: 1.18,
            u_worldHeight: 0,
            u_worldWidth: 0,
          },
          undefined,
          0.62,
          0,
          undefined,
          undefined,
          ["u_image"],
        );

        requestAnimationFrame(() => {
          if (!cancelled) {
            setIsVisible(true);
            readyTimer = window.setTimeout(() => {
              if (!cancelled) {
                onReady?.();
              }
            }, shaderRevealMs);
          }
        });
      } catch (error) {
        console.error("Shader failed to load:", error);

        if (!cancelled) {
          setIsVisible(true);
          onReady?.();
        }
      }
    }

    mountShader();

    return () => {
      cancelled = true;
      shader?.dispose();

      if (processedUrl) {
        URL.revokeObjectURL(processedUrl);
      }

      if (readyTimer) {
        window.clearTimeout(readyTimer);
      }
    };
  }, [onReady]);

  return (
    <div
      ref={mountRef}
      className={isVisible ? "shaderLogoMask shaderLogoMaskVisible" : "shaderLogoMask"}
      aria-hidden
    />
  );
}
