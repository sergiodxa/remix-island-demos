import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { Sidebar } from "./components/sidebar";
import { CartCountProvider } from "./components/cart-count-context";
import { Header, queryInitialCardCount } from "./components/header";
import { unstable_defineLoader } from "@remix-run/cloudflare";

export const loader = unstable_defineLoader(async ({ request }) => {
  const initialCartCount = await queryInitialCardCount!(request.headers);
  return { initialCartCount };
});

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang="en" className="[color-scheme:dark]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-y-scroll bg-gray-1100 bg-[url('/grid.svg')] pb-36">
        <Sidebar />
        <div className="lg:pl-72">
          <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black p-3.5 lg:p-6">
                <CartCountProvider>
                  <div className="space-y-10">
                    <Header
                      initialCartCount={loaderData?.initialCartCount ?? 0}
                    />

                    {children}
                  </div>
                </CartCountProvider>
              </div>
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBounadry() {
  return (
    <div className="space-y-4 text-vercel-pink">
      <h2 className="text-lg font-bold">Not Found</h2>
      <p className="text-sm">Could not find requested resource</p>
    </div>
  );
}
