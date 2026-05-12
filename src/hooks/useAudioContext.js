import { useRef } from "react";

/**
 * Returns a getter that lazily creates and resumes a shared Web AudioContext.
 * Handles both modern and webkit-prefixed APIs.
 */
export function useAudioContext() {
  const audioCtxRef = useRef(null);

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  return getCtx;
}
