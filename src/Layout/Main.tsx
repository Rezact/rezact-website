import "./index.css";

export function MainLayout({ Component, pageProps }: any) {
  return (
    <div class=" container max-w-lg border-2 rounded-3xl mt-16 p-8">
      <h1 class="text-3xl font-bold">Rezact</h1>
      <Component {...pageProps} />
    </div>
  );
}
