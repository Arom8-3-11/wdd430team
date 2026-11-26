"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AssignmentsLoadError,
  loadAssignments,
  type LoadedAssignments,
} from "@/lib/assignments-source";

export type AssignmentsSuccessState = { status: "success" } & LoadedAssignments;

export type AssignmentsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | AssignmentsSuccessState;

const GENERIC_ERROR =
  "We couldn't load your assignments. Check your connection and try again.";

/**
 * Loads assignments on the client and exposes loading / error / success.
 * "Now" is captured when the data loads (never during render), so the page
 * stays compatible with Cache Components prerendering.
 */
export function useAssignments() {
  const [state, setState] = useState<AssignmentsState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    loadAssignments(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setState({ status: "success", ...result });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          message:
            error instanceof AssignmentsLoadError
              ? error.message
              : GENERIC_ERROR,
        });
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  }, []);

  return { state, retry };
}
