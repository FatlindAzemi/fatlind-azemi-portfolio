"use client";

import { useEffect } from "react";

export default function ClientLogger() {
  useEffect(() => {
    const logError = async (message: string, source: string, lineno: number, colno: number, error: any) => {
      try {
        await fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "error",
            message,
            source,
            lineno,
            colno,
            error: error ? {
              message: error.message,
              stack: error.stack
            } : null,
            userAgent: navigator.userAgent
          })
        });
      } catch (e) {
        console.error("Logger fail:", e);
      }
    };

    const handleWindowError = (message: any, source: any, lineno: any, colno: any, error: any) => {
      logError(String(message), String(source), Number(lineno), Number(colno), error);
      return false;
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logError(
        `Unhandled Rejection: ${event.reason?.message || String(event.reason)}`,
        "",
        0,
        0,
        event.reason
      );
    };

    window.onerror = handleWindowError;
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    // Initial connection ping
    fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "info",
        message: "ClientLogger initialized",
        userAgent: navigator.userAgent
      })
    }).catch(console.error);

    return () => {
      window.onerror = null;
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}
