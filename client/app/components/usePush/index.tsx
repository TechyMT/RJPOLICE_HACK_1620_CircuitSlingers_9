import { useRouter } from "next/navigation";
import type { NextRouter } from "next/router";
import { useRef, useState } from "react";

interface UsePushHook {
  push: (path: string) => Promise<void>;
}

export default function usePush(): UsePushHook["push"] {
  const router = useRouter();
  const routerRef = useRef(router);

  routerRef.current = router;

  const [{ push }] = useState<UsePushHook>({
    push: async (path) => await routerRef.current.push(path),
  });

  return push;
}
