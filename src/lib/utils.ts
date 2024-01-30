export function disableForm(formElm: HTMLFormElement) {
  formElm.querySelectorAll("input, button").forEach((elm: any) => {
    elm.disabled = true;
  });
}

export function enableForm(formElm: HTMLFormElement) {
  formElm.querySelectorAll("input, button").forEach((elm: any) => {
    elm.disabled = false;
  });
}

export class elmRef {
  elm: any;
  constructor(elm: any = null) {
    this.elm = elm;
  }
  transition(from, to, delay = 0) {
    setTimeout(() => {
      const fromSplit = from.split(" ");
      const toSplit = to.split(" ");
      for (let i = 0; i < fromSplit.length; i++) {
        this.elm.classList.replace(fromSplit[i], toSplit[i]);
      }
    }, delay);
  }
  show(delay = 0, replace: string | null = null) {
    setTimeout(() => {
      if (replace) {
        this.elm.classList.replace("hidden", replace);
      } else {
        this.elm.classList.remove("hidden");
      }
    }, delay);
  }
  hide(delay = 0, replace: string | null = null) {
    setTimeout(() => {
      if (replace) {
        this.elm.classList.replace(replace, "hidden");
      } else {
        this.elm.classList.add("hidden");
      }
    }, delay);
  }
  addClick(fn) {
    setTimeout(() => {
      this.elm.addEventListener("click", fn);
    }, 50);
  }
  removeClick(fn) {
    this.elm.removeEventListener("click", fn);
  }
}

const localScrollHash = localStorage.getItem("scrollHash");
const scrollHash = localScrollHash ? JSON.parse(localScrollHash) : {};
let saveScrollTimeout: any = null;

function saveScroll() {
  localStorage.setItem("scrollHash", JSON.stringify(scrollHash));
}

export function scrollWatcher() {
  clearTimeout(saveScrollTimeout);
  saveScrollTimeout = setTimeout(saveScroll, 1000);
  const route = location.href;
  scrollHash[route] = window.scrollY;
}

export function restoreScroll() {
  const route = location.href;
  if (scrollHash[route] !== undefined || scrollHash[route] !== null) {
    window.scrollTo({ left: 0, top: scrollHash[route], behavior: "instant" });
  }
}
