import { Suspense } from "react";
import {
  queryRecommendedProducts,
  RecommendedProducts,
  RecommendedProductsSkeleton,
} from "~/components/recommended-products";
import { queryReviews, Reviews, ReviewsSkeleton } from "~/components/reviews";
import { querySingleProduct, SingleProduct } from "~/components/single-product";
import { Ping } from "~/components/ping";
import {
  unstable_defineAction,
  unstable_defineLoader,
} from "@remix-run/cloudflare";
import { Await, useLoaderData } from "@remix-run/react";
import { cartCountCookie } from "~/cookies.server";

export const loader = unstable_defineLoader(async ({ request, response }) => {
  const recommendedProducts = queryRecommendedProducts!();
  const reviews = queryReviews!();

  const { product, pricing } = await querySingleProduct!(
    request.headers,
    response.headers
  );

  return { product, pricing, recommendedProducts, reviews };
});

export const action = unstable_defineAction(async ({ request, response }) => {
  const formData = await request.formData();
  const cartCount = Number(formData.get("cartCount"));
  response.headers.append(
    "set-cookie",
    await cartCountCookie.serialize(cartCount, {
      maxAge: 60 * 60 * 24 * 30,
    })
  );
  return null;
});

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="space-y-8 lg:space-y-14">
      <SingleProduct
        product={loaderData.product}
        pricing={loaderData.pricing}
      />

      <Ping />

      <Suspense fallback={<RecommendedProductsSkeleton />}>
        <Await resolve={loaderData.recommendedProducts}>
          {(recommendedProducts) => (
            <RecommendedProducts products={recommendedProducts} />
          )}
        </Await>
      </Suspense>

      <Ping />

      <Suspense fallback={<ReviewsSkeleton />}>
        <Await resolve={loaderData.reviews}>
          {(reviews) => <Reviews reviews={reviews} />}
        </Await>
      </Suspense>
    </div>
  );
}
