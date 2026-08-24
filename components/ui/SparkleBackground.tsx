"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-Website Interactive Sparkling Cosmic Starfield
 * Pure twinkling stardust & interactive mouse parallax with zero 3D models.
 */
export default function SparkleBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Three.js Scene & Perspective Camera
    const scene = new THREE.Scene();
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 2. Palette based on theme
    const getSparkleColors = (theme: string) => {
      if (theme === "light") {
        return {
          primary: new THREE.Color("#966f50"),
          glowOpacity: 0.4,
          pointSize: 0.11,
        };
      }
      if (theme === "dim") {
        return {
          primary: new THREE.Color("#ffe0c2"),
          glowOpacity: 0.75,
          pointSize: 0.12,
        };
      }
      // Dark Mode (Default)
      return {
        primary: new THREE.Color("#ffe0c2"),
        glowOpacity: 0.85,
        pointSize: 0.13,
      };
    };

    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    let colors = getSparkleColors(currentTheme);

    // 3. Stardust Particles Spread Across Full Screen
    const particleCount = 420;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const twinkles = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Full screen coverage with depth
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      twinkles[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.8 + Math.random() * 2.0;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Star Sparkle Canvas Texture
    const createSparkleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(255, 235, 210, 0.95)");
      grad.addColorStop(0.5, "rgba(230, 180, 140, 0.45)");
      grad.addColorStop(1, "rgba(230, 180, 140, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      // Delicate star cross flare
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(32, 8);
      ctx.lineTo(32, 56);
      ctx.moveTo(8, 32);
      ctx.lineTo(56, 32);
      ctx.stroke();

      return new THREE.CanvasTexture(canvas);
    };

    const sparkleTexture = createSparkleTexture();

    const particleMat = new THREE.PointsMaterial({
      color: colors.primary,
      size: colors.pointSize,
      map: sparkleTexture || undefined,
      transparent: true,
      opacity: colors.glowOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // 4. Theme Observer
    const updateTheme = () => {
      const activeTheme =
        document.documentElement.getAttribute("data-theme") || "dark";
      colors = getSparkleColors(activeTheme);

      particleMat.color.copy(colors.primary);
      particleMat.opacity = colors.glowOpacity;
      particleMat.size = colors.pointSize;
    };

    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "data-theme") updateTheme();
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    // 5. Global Mouse Parallax Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 6. Window Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 7. Visibility Handler
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 8. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      // Slow celestial drifting + mouse tilt
      mainGroup.rotation.y = elapsedTime * 0.02 + mouse.x * 0.18;
      mainGroup.rotation.x = mouse.y * 0.12;

      // Gentle stardust sparkle shimmer
      const shimmer =
        colors.glowOpacity * (0.85 + Math.sin(elapsedTime * 1.8) * 0.15);
      particleMat.opacity = Math.max(0.1, shimmer);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      themeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      particleGeo.dispose();
      particleMat.dispose();
      sparkleTexture?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen overflow-hidden"
    />
  );
}
