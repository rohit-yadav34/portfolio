"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Check, Loader2, SendHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const THUMB = 40; // px — draggable thumb size
const PAD = 4; // px — inner padding on each side
const THRESHOLD = 0.9;

type Status = "idle" | "loading" | "success" | "error";

/**
 * Slide-to-confirm button (reuno-ui style) with a liquid-glass track.
 * The track measures its own width, so it stays usable on any screen size.
 * Drag the thumb across the threshold to fire `onComplete`.
 */
export default function SlideButton({
  label = "Slide to send",
  onComplete,
  className,
}: {
  label?: string;
  onComplete: () => Promise<void>;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [completed, setCompleted] = useState(false);
  const [dragging, setDragging] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const maxRef = useRef(0);
  const [maxX, setMaxX] = useState(0);

  // Measure available travel distance and keep it in sync with the layout.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const m = Math.max(0, el.clientWidth - THUMB - PAD * 2);
      maxRef.current = m;
      setMaxX(m);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 400, damping: 40, mass: 0.8 });
  const fillWidth = useTransform(springX, (x) => x + THUMB + PAD);
  const labelOpacity = useTransform(springX, (x) => {
    const m = maxRef.current || 1;
    return Math.max(0, 1 - x / (m * 0.55));
  });

  const finish = useCallback(async () => {
    setCompleted(true);
    setStatus("loading");
    try {
      await onComplete();
      setStatus("success");
    } catch {
      setStatus("error");
      setTimeout(() => {
        setCompleted(false);
        setStatus("idle");
        dragX.set(0);
      }, 1600);
    }
  }, [onComplete, dragX]);

  const handleDrag = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (completed) return;
    dragX.set(Math.max(0, Math.min(info.offset.x, maxRef.current)));
  };

  const handleDragEnd = () => {
    if (completed) return;
    setDragging(false);
    const m = maxRef.current;
    if (m > 0 && springX.get() / m >= THRESHOLD) {
      void finish();
    } else {
      dragX.set(0);
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "liquid-glass relative flex h-12 w-full max-w-[300px] items-center rounded-full",
        className
      )}
    >
      {/* progress fill */}
      {!completed && (
        <motion.div
          style={{ width: fillWidth }}
          className="absolute inset-y-1 left-1 z-0 rounded-full bg-accent opacity-90"
        />
      )}

      {/* label */}
      {!completed && (
        <motion.span
          style={{ opacity: labelOpacity }}
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center whitespace-nowrap pl-10 pr-4 text-sm font-medium text-ink-100"
        >
          {label}
        </motion.span>
      )}

      {/* draggable thumb */}
      <AnimatePresence>
        {!completed && (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: maxX }}
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{ x: springX }}
            className="absolute left-1 z-10 cursor-grab active:cursor-grabbing"
          >
            <span
              className={cn(
                "grid place-items-center rounded-full bg-accent text-black shadow-glow-violet transition-transform",
                dragging && "scale-105"
              )}
              style={{ width: THUMB, height: THUMB }}
            >
              <SendHorizontal className="size-4" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* completed state */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-full bg-accent text-sm font-medium text-black"
          >
            {status === "loading" && <Loader2 className="size-4 animate-spin" />}
            {status === "success" && (
              <>
                <Check className="size-4" /> Sent
              </>
            )}
            {status === "error" && (
              <>
                <X className="size-4" /> Try again
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
