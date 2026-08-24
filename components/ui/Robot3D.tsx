"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SparkleProps {
  className?: string;
  onLoad?: () => void;
}

/**
 * Interactive Sparkling Cosmic Particle Field
 * Clean, soothing, ultra-fast stardust & constellation particles
 * with real-time cursor parallax and 3-theme color harmony.
 */
export default function Robot3D({ className, onLoad }: SparkleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

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

    // 2. Dynamic Colors based on theme (Warm Champagne, Soft Gold, Honey, Rose Amber)
    const getSparkleColors = (theme: string) => {
      if (theme === "light") {
        return {
          primary: new THREE.Color("#966f50"),
          secondary: new THREE.Color("#b88a5d"),
          tertiary: new THREE.Color("#d4a87c"),
          glowOpacity: 0.35,
          pointSize: 0.07,
        };
      }
      if (theme === "dim") {
        return {
          primary: new THREE.Color("#ffe0c2"),
          secondary: new THREE.Color("#ffd4a8"),
          tertiary: new THREE.Color("#c8a07a"),
          glowOpacity: 0.75,
          pointSize: 0.08,
        };
      }
      // Dark (Default)
      return {
        primary: new THREE.Color("#ffe0c2"),
        secondary: new THREE.Color("#ffdfb5"),
        tertiary: new THREE.Color("#e8b88a"),
        glowOpacity: 0.9,
        pointSize: 0.085,
      };
    };

    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    let colors = getSparkleColors(currentTheme);

    // 3. Sparkling Particles Geometry & Attributes
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const twinkles = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution with depth
      const radius = 0.8 + Math.pow(Math.random(), 0.6) * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.9;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = (radius * Math.sin(theta) * Math.cos(phi)) * 0.7;

      scales[i] = 0.4 + Math.random() * 1.6;
      twinkles[i] = Math.random() * Math.PI * 2;
      speeds[i] = 1.2 + Math.random() * 2.4;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom Canvas Texture for Sparkling Glow Stars
    const createSparkleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(255, 235, 210, 0.85)");
      grad.addColorStop(0.5, "rgba(230, 180, 140, 0.4)");
      grad.addColorStop(1, "rgba(230, 180, 140, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      // Star cross sparkle flare
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(32, 10);
      ctx.lineTo(32, 54);
      ctx.moveTo(10, 32);
      ctx.lineTo(54, 32);
      ctx.stroke();

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
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

    // 4. Ethereal Celestial Rings
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.012, 12, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: colors.secondary,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.42;
    ring1.rotation.y = Math.PI * 0.15;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.8, 0.008, 12, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: colors.tertiary,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.38;
    ring2.rotation.y = -Math.PI * 0.2;
    mainGroup.add(ring2);

    // 5. Theme Observer
    const updateTheme = () => {
      const activeTheme =
        document.documentElement.getAttribute("data-theme") || "dark";
      colors = getSparkleColors(activeTheme);

      particleMat.color.copy(colors.primary);
      particleMat.opacity = colors.glowOpacity;
      particleMat.size = colors.pointSize;
      ring1Mat.color.copy(colors.secondary);
      ring2Mat.color.copy(colors.tertiary);
    };

    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "data-theme") updateTheme();
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    // 6. Interactive Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 7. Intersection Observer for Performance
    let isVisible = true;
    const intersectionObs = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObs.observe(container);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. Animation Loop with Shimmering Twinkle
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Group parallax & slow gentle rotation
      mainGroup.rotation.y = elapsedTime * 0.05 + mouse.x * 0.35;
      mainGroup.rotation.x = mouse.y * 0.25;

      ring1.rotation.z = elapsedTime * 0.12;
      ring2.rotation.z = -elapsedTime * 0.09;

      // Sparkling pulse
      const twinkleOpacity =
        colors.glowOpacity * (0.8 + Math.sin(elapsedTime * 2.2) * 0.2);
      particleMat.opacity = Math.max(0.1, twinkleOpacity);

      renderer.render(scene, camera);
    };

    animate();

    if (onLoad) onLoad();
    if (typeof window !== "undefined") {
      (window as { __hero3dLoaded?: boolean }).__hero3dLoaded = true;
      window.dispatchEvent(new Event("hero-3d-loaded"));
    }

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();
      intersectionObs.disconnect();
      cancelAnimationFrame(animationFrameId);

      particleGeo.dispose();
      particleMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      sparkleTexture?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [onLoad]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full ${className || ""}`}
      style={{ minHeight: "440px" }}
    >
      {/* Soothing ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--neon-cyan))]/12 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--neon-violet))]/10 blur-[100px]" />
    </div>
  );
}
