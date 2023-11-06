import "./index.css";

export function MainLayout({ router }: any) {
  return (
    <>
      {/* <!-- Sidebar and main wrapper --> */}
      <div class="flex h-screen overflow-hidden">
        {/* <!-- Sidebar --> */}
        <div class="hidden md:flex md:flex-shrink-0">
          <div class="flex flex-col w-64">
            {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
            <div class="flex flex-col h-0 flex-1">
              <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div class="flex items-center flex-shrink-0 px-4">
                  <img
                    class="h-8 w-auto"
                    src="/rezact-logo.svg"
                    alt="Rezact Logo"
                  />
                </div>
                <nav class="mt-5 flex-1 px-2 space-y-1 bg-white shadow">
                  {/* <!-- Navigation Links --> */}
                  <a
                    href="/"
                    class="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  >
                    Test1
                  </a>
                  <a
                    href="/asdf"
                    class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  >
                    Test2
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Main content --> */}
        <div class="flex-1 flex flex-col overflow-hidden">
          <header class="flex justify-between items-center p-4 shadow-lg">
            <button
              class="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
              onclick="toggleSidebar()"
            >
              <span class="sr-only">Open sidebar</span>
              {/* <!-- Heroicon name: outline/menu --> */}
              <img
                class="h-8 w-auto"
                src="/rezact-logo.svg"
                alt="Rezact Logo"
              />
            </button>
            {/* <!-- Content of header --> */}
          </header>
          <main class="flex-1 overflow-y-auto">
            {/* <!-- Main content here --> */}
            {router.outlet}
          </main>
        </div>
      </div>
    </>
  );
}
