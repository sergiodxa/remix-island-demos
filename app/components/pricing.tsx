import type { Product } from "~/types/product";
import { Ping } from "~/components/ping";
import { ProductEstimatedArrival } from "~/components/product-estimated-arrival";
import { ProductLowStockWarning } from "~/components/product-low-stock-warning";
import { ProductPrice } from "~/components/product-price";
import { ProductSplitPayments } from "~/components/product-split-payments";
import { ProductUsedPrice } from "~/components/product-used-price";
import { dinero, type DineroSnapshot } from "dinero.js";
import { Suspense } from "react";
import { AddToCart } from "~/components/add-to-cart";
import { delayShippingEstimate, withDelay } from "~/lib/delay";
import { serverOnly$ } from "vite-env-only/macros";
import { cartCountCookie } from "~/cookies.server";
import { Await } from "@remix-run/react";

export const queryPricing = serverOnly$(
  async (headers: Headers, productId: string) => {
    // Get the cart count from the users cookies to pass it to the client
    // AddToCart component
    const value = await cartCountCookie.parse(headers.get("cookie"));
    const initialCartCount = Number(value || "0");

    const data = await withDelay(
      fetch(
        `https://app-router-api.vercel.app/api/products?id=${productId}&filter=price,usedPrice,leadTime,stock`
      ),
      delayShippingEstimate
    );

    const product: Product = await data.json();

    return { initialCartCount, product };
  }
);

function LoadingDots() {
  return (
    <div className="text-sm">
      <span className="space-x-0.5">
        <span className="inline-flex animate-[loading_1.4s_ease-in-out_infinite] rounded-full">
          &bull;
        </span>
        <span className="inline-flex animate-[loading_1.4s_ease-in-out_0.2s_infinite] rounded-full">
          &bull;
        </span>
        <span className="inline-flex animate-[loading_1.4s_ease-in-out_0.4s_infinite] rounded-full">
          &bull;
        </span>
      </span>
    </div>
  );
}

export const queryUserSpecificDetails = serverOnly$(
  async (productId: string) => {
    const data = await withDelay(
      fetch(
        `https://app-router-api.vercel.app/api/products?id=${productId}&filter=price,usedPrice,leadTime,stock`
      ),
      delayShippingEstimate
    );

    return (await data.json()) as Product;
  }
);

function UserSpecificDetails({ product }: { product: Product }) {
  const price = dinero(product.price as DineroSnapshot<number>);

  return (
    <>
      <ProductSplitPayments price={price} />
      {product.usedPrice ? (
        <ProductUsedPrice usedPrice={product.usedPrice} />
      ) : null}
      <ProductEstimatedArrival leadTime={product.leadTime} hasDeliveryTime />
      {product.stock <= 1 ? (
        <ProductLowStockWarning stock={product.stock} />
      ) : null}
    </>
  );
}

type Props = {
  product: Product;
  pricing: ReturnType<NonNullable<typeof queryPricing>>;
};

export function Pricing({ product, pricing }: Props) {
  const price = dinero(product.price as DineroSnapshot<number>);

  return (
    <div className="space-y-4 rounded-lg bg-gray-900 p-3">
      <ProductPrice price={price} discount={product.discount} />

      <Ping />

      <Suspense fallback={<LoadingDots />}>
        <Await resolve={pricing}>
          {({ product }) => <UserSpecificDetails product={product} />}
        </Await>
      </Suspense>

      <Suspense fallback={<AddToCart initialCartCount={0} />}>
        <Await resolve={pricing}>
          {({ initialCartCount }) => (
            <AddToCart initialCartCount={initialCartCount} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
