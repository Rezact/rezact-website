export function BundleSize() {
  return (
    <>
      <div>
        <div>
          <h1 class="text-4xl">Svelte Hello World Bundle</h1>
          <div> </div>
          <div>
            <span style="color: rgb(17, 168, 205);">vite v5.1.1 </span>
            <span style="color: rgb(13, 188, 121);">
              building for production...
            </span>{" "}
          </div>
          <div>
            <span style="color: rgb(13, 188, 121);">✓</span> 26 modules
            transformed.{" "}
          </div>
          <div>
            <span style="opacity: 0.5;">dist/</span>
            <span style="color: rgb(13, 188, 121);">
              index.html{"               "}
            </span>
            <span style="font-weight: bold; opacity: 0.5;">0.33 kB</span>
            <span style="opacity: 0.5;"> │ gzip: 0.24 kB</span>{" "}
          </div>
          <div>
            <span style="opacity: 0.5;">dist/assets/</span>
            <span style="color: rgb(17, 168, 205);">index-BYI6n3Ad.js </span>
            <span style="font-weight: bold; opacity: 0.5;">3.97 kB</span>
            <span class="whitespace-pre text-xl font-black text-red-600">
              {" "}
              │ gzip: 1.89 kB
            </span>{" "}
          </div>
          <div>
            <span style="color: rgb(13, 188, 121);">✓ built in 174ms</span>{" "}
          </div>
        </div>
      </div>

      <div class="mt-12">
        <div>
          <h1 class="text-4xl">Rezact Hello World Bundle</h1>
          <div> </div>
          <div>
            <span style="color: rgb(17, 168, 205);">vite v5.1.1 </span>
            <span style="color: rgb(13, 188, 121);">
              building for production...
            </span>{" "}
          </div>
          <div>
            <span style="color: rgb(13, 188, 121);">✓</span> 4 modules
            transformed.{" "}
          </div>
          <div>
            <span style="opacity: 0.5;">dist/</span>
            <span style="color: rgb(13, 188, 121);">
              index.html{"               "}
            </span>
            <span style="font-weight: bold; opacity: 0.5;">0.33 kB</span>
            <span style="opacity: 0.5;"> │ gzip: 0.24 kB</span>{" "}
          </div>
          <div>
            <span style="opacity: 0.5;">dist/assets/</span>
            <span style="color: rgb(17, 168, 205);">index-xLpY-gYZ.js </span>
            <span style="font-weight: bold; opacity: 0.5;">2.60 kB</span>
            <span class="whitespace-pre text-xl font-black text-green-600">
              {" "}
              │ gzip: 1.25 kB
            </span>{" "}
          </div>
          <div>
            <span style="color: rgb(13, 188, 121);">✓ built in 212ms</span>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
