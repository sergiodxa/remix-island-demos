import { Form, useNavigation } from "@remix-run/react";

export function AddToCart({ initialCartCount }: { initialCartCount: number }) {
  const navigation = useNavigation();
  const isPending = navigation.state !== "idle";

  return (
    <Form method="POST">
      <input type="hidden" name="cartCount" value={initialCartCount + 1} />
      <button
        className="relative w-full items-center space-x-2 rounded-lg bg-vercel-blue px-3 py-1  text-sm font-medium text-white hover:bg-vercel-blue/90 disabled:text-white/70"
        disabled={isPending}
      >
        Add to Cart
        {isPending ? (
          <div className="absolute right-2 top-1.5" role="status">
            <div
              className="
          h-4 w-4 animate-spin rounded-full border-[3px] border-white border-r-transparent"
            />
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
      </button>
    </Form>
  );
}
