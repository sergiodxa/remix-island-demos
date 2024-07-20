# Remix Island Demo

This demo Remix app copies the UI from [Next.js PPR](https://www.partialprerendering.com/) website and re-implements it using Remix with Single Fetch enabled.

It the single critical data is fetched server-side on every request and the rest is returned as promises that are awaited client-side and then rendered, similar to how Next.js PPR or Astro Islands behave.
