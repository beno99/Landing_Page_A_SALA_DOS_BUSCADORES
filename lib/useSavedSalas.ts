"use client";
import { useSyncExternalStore } from "react";

const KEY = "buscadores:salas-salvas";
const EVENT = "buscadores:estante-alterada";

function snapshot() {
  try { return window.localStorage.getItem(KEY) ?? "[]"; }
  catch { return "[]"; }
}
function serverSnapshot() { return "[]"; }
function subscribe(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener(EVENT, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(EVENT, notify);
  };
}
function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
  } catch { return []; }
}

/** Local bookmarks only; this does not imply a Portal account or server-side sync. */
export function useSavedSalas() {
  const saved = new Set(parse(useSyncExternalStore(subscribe, snapshot, serverSnapshot)));
  function toggle(id: string) {
    const next = new Set(parse(snapshot()));
    if (next.has(id)) next.delete(id);
    else next.add(id);
    try {
      window.localStorage.setItem(KEY, JSON.stringify([...next]));
      window.dispatchEvent(new Event(EVENT));
      return true;
    } catch { return false; }
  }
  return { saved, toggle };
}
