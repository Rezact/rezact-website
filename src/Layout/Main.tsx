import "./index.css";

export function MainLayout({ Component, pageProps }: any) {
  return (
    <>
      <h1>Rezact</h1>
      <Component {...pageProps} />
    </>
  );
}
