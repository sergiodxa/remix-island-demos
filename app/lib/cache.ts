import { AppLoadContext } from "@remix-run/cloudflare";

export type Cache = ReturnType<typeof createCache>;

export function createCache(context: AppLoadContext) {
  return {
    async fetch<T>(key: string, cb: () => Promise<T>) {
      let data = await context.cloudflare.env.KV.get<T>(key, "json");
      if (data) return data;
      data = await cb();
      context.cloudflare.ctx.waitUntil(
        context.cloudflare.env.KV.put(key, JSON.stringify(data), {
          expirationTtl: 60 * 60,
        })
      );
      return data;
    },
  };
}
