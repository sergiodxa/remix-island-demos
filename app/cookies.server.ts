import { createCookie } from "@remix-run/cloudflare";

export const cartCountCookie = createCookie("_cart_count", { path: "/" });
