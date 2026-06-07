"use client";

import { useCallback, useState } from "react";
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

const TRACK = 280; // px — track width
const THUMB = 40; // px — draggable thumb size
const PAD = 4; // px — inner padding on each side
const MAX = TRACK - THUMB - PAD * 2;
const THRESHOLD = 0.9;

type Status = "idle" | "loading" | "success" | "error";

/**
 * Slide-to-confirm button (reuno-ui style) with a liquid-glass track.
 * Drag the thumb across the threshold to fire `onComplete`. The button then
 * shows loading → success / error based on the promise it returns.
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

  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 400, damping: 40, mass: 0.8 });
  const progress = useTransform(springX, [0, MAX], [0, 1]);
  const fillWidth = useTransform(springX, (x) => x + THUMB + PAD);
  const labelOpacity = useTransform(springX, [0, MAX * 0.6], [1, 0]);

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
    dragX.set(Math.max(0, Math.min(info.offset.x, MAX)));
  };

  const handleDragEnd = () => {
    if (completed) return;
    setDragging(false);
    if (progress.get() >= THRESHOLD) {
      void finish();
    } else {
      dragX.set(0);
    }
  };

  return (
    <div
      className={cn(
        "liquid-glass relative flex h-12 items-center rounded-full",
        className
      )}
      style={{ width: TRACK, maxWidth: "100%" }}
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
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center text-sm font-medium text-ink-100"
        >
          {label}
        </motion.span>
      )}

      {/* draggable thumb */}
      <AnimatePresence>
        {!completed && (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: MAX }}
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
