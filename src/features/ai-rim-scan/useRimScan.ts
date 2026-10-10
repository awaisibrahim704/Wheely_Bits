import { useCallback, useEffect, useRef, useState } from "react";

import type { RimScanMatch } from "./types";

const API_BASE = (
  import.meta.env.VITE_RIM_SCAN_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");
const SCAN_TIMEOUT_MS = 120_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseMatches(payload: unknown): RimScanMatch[] {
  if (!isRecord(payload) || !Array.isArray(payload.matches)) {
    throw new Error("The AI server returned an invalid response.");
  }

  return payload.matches.map((item, index) => {
    if (
      !isRecord(item) ||
      typeof item.rank !== "number" ||
      typeof item.label !== "string" ||
      typeof item.score !== "number" ||
      (item.image_url !== undefined && typeof item.image_url !== "string") ||
      (item.cosine_similarity !== undefined &&
        typeof item.cosine_similarity !== "number")
    ) {
      throw new Error(`The AI server returned an invalid match at position ${index + 1}.`);
    }

    return {
      rank: item.rank,
      label: item.label,
      score: item.score,
      cosine_similarity:
        typeof item.cosine_similarity === "number"
          ? item.cosine_similarity
          : undefined,
      image_url: typeof item.image_url === "string" ? item.image_url : "",
    };
  });
}

export function useRimScan() {
  const [scanning, setScanning] = useState(false);
  const [matches, setMatches] = useState<RimScanMatch[]>([]);
  const [error, setError] = useState<string | null>(null);
  const activeController = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      activeController.current?.abort();
    },
    [],
  );

  const scan = useCallback(async (file: File) => {
    activeController.current?.abort();
    const controller = new AbortController();
    activeController.current = controller;
    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, SCAN_TIMEOUT_MS);

    setScanning(true);
    setMatches([]);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE}/scan`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      const payload: unknown = await response.json();

      if (!response.ok) {
        const detail =
          isRecord(payload) && typeof payload.detail === "string"
            ? payload.detail
            : `The AI server returned HTTP ${response.status}.`;
        throw new Error(detail);
      }

      const nextMatches = parseMatches(payload);
      if (nextMatches.length === 0) {
        throw new Error("No matching rims were found in the indexed catalog.");
      }

      setMatches(nextMatches);
    } catch (scanError) {
      if (controller.signal.aborted && !timedOut) return;

      if (timedOut) {
        setError("The scan took too long. Please try again with a smaller or clearer image.");
      } else if (scanError instanceof TypeError) {
        setError(
          `Cannot reach the AI model service at ${API_BASE}.\nStart it from the backend folder with: .\\venv\\Scripts\\python.exe .\\server.py`,
        );
      } else {
        setError(
          scanError instanceof Error ? scanError.message : "Unable to scan this image.",
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
      if (activeController.current === controller) {
        activeController.current = null;
        setScanning(false);
      }
    }
  }, []);

  const reset = useCallback(() => {
    activeController.current?.abort();
    activeController.current = null;
    setScanning(false);
    setMatches([]);
    setError(null);
  }, []);

  return { scanning, matches, error, scan, reset };
}
