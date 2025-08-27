import { storage } from "./storage";
import { DEFAULT_CHANNEL_ID } from "./config";

type Listener = (id: string) => void;

const listeners = new Set<Listener>();
let cachedChannelId: string | null = null;

export async function getActiveChannelId(): Promise<string> {
  if (cachedChannelId) return cachedChannelId;
  const v = await storage.getActiveChannelId();
  cachedChannelId = v || DEFAULT_CHANNEL_ID;
  return cachedChannelId;
}

export async function setActiveChannelId(id: string) {
  cachedChannelId = id;
  await storage.setActiveChannelId(id);
  for (const fn of listeners) fn(id);
}

export function subscribeActiveChannel(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

import { useEffect, useState } from "react";
export function useActiveChannel() {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const cur = await getActiveChannelId();
      if (mounted) setId(cur);
    })();
    const unsub = subscribeActiveChannel((nid) => setId(nid));
    return () => { mounted = false; unsub(); };
  }, []);

  return { channelId: id, setChannelId: setActiveChannelId };
}