let createElement,
  createElementNS,
  createTextNode,
  createComment,
  createDocumentFragment;
if (typeof window === "object") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  createElement = document.createElement.bind(document);
  createElementNS = document.createElementNS.bind(document);
  createTextNode = document.createTextNode.bind(document);
  createComment = document.createComment.bind(document);
  createDocumentFragment = document.createDocumentFragment.bind(document);
}
const xlmns = "http://www.w3.org/2000/svg";
const isArray = Array.isArray;
let createComponent = (tagName, attributes = null) => tagName(attributes);
const setCreateCompFunc = (func) => (createComponent = func);
const preCreateComponentHooks = [];
const addPreCreateComponentHook = (item) => preCreateComponentHooks.push(item);
const postCreateComponentHooks = [];
const addPostCreateComponentHook = (item) =>
  postCreateComponentHooks.push(item);
function xCreateElement(tagName, attributes, ...children) {
  if (tagName === xFragment) {
    children.rezactFragment = true;
    return children;
  }
  if (typeof tagName === "function") {
    attributes = attributes || {};
    attributes.children = attributes.children || children;
    const hookContext = {};
    preCreateComponentHooks.forEach((func) =>
      func(tagName, attributes, hookContext),
    );
    const newComp = createComponent(tagName, attributes);
    postCreateComponentHooks.forEach((func) =>
      func(newComp, tagName, attributes, hookContext),
    );
    return newComp;
  }
  let elm = null;
  if (["svg", "path", "g", "circle", "rect"].includes(tagName)) {
    elm = createElementNS(xlmns, tagName);
  } else {
    elm = createElement(tagName);
  }
  if (attributes) handleAttributes(elm, attributes);
  const childLen = children.length;
  for (let i = 0; i < childLen; i++) {
    appendChild(elm, children[i]);
  }
  return elm;
}
let attributeHandlers = [];
const addAttributeHandler = (item) => attributeHandlers.unshift(item);
const attributeInputValueHandler = {
  matches: (_attrs, key, attrVal) =>
    key === "ref" && attrVal && typeof attrVal === "object",
  handler: (elm, _key, attrVal) => handleRef(elm, attrVal),
};
addAttributeHandler(attributeInputValueHandler);
function handleRef(elm, attrVal) {
  attrVal.elm = elm;
}
const skipEvents = /* @__PURE__ */ new Set(["onMount", "onUnmount"]);
function handleAttributes(elm, attrs) {
  const keys = Object.keys(attrs);
  const keyLen = keys.length;
  outer: for (let i = 0; i < keyLen; i++) {
    const key = keys[i];
    const attrVal = attrs[key];
    if (
      key.startsWith("on") &&
      typeof attrVal === "function" &&
      !skipEvents.has(key)
    ) {
      elm.addEventListener(key.slice(2).toLowerCase(), attrVal);
      continue;
    }
    if (typeof attrVal === "boolean" && attrVal) {
      elm.setAttribute(key, "");
      continue;
    }
    if (attrVal === null || attrVal === void 0) continue;
    const attrHandlerLen = attributeHandlers.length;
    for (let x = 0; x < attrHandlerLen; x++) {
      const hook = attributeHandlers[x];
      if (hook.matches(attrs, key, attrVal)) {
        hook.handler(elm, key, attrVal, attrs);
        continue outer;
      }
    }
    elm.setAttribute(key, attrVal);
  }
}
const childArrayHandler = {
  matches: (child) => isArray(child),
  handler: (parent, child, insertAfter, removeElm) => {
    const len = child.length;
    if (insertAfter && isArray(child)) {
      for (let i = len - 1; i > -1; i--) {
        appendChild(parent, child[i], insertAfter, removeElm);
      }
    } else {
      for (let i = 0; i < len; i++) {
        appendChild(parent, child[i], insertAfter, removeElm);
      }
    }
  },
};
function insertNodeAfter(currentNode, childNode) {
  if (currentNode.nextSibling) {
    currentNode.parentNode.insertBefore(childNode, currentNode.nextSibling);
  } else if (currentNode.parentNode) {
    currentNode.parentNode.appendChild(childNode);
  }
}
function appendChildNode(
  parentNode,
  childNode,
  insertAfter = false,
  removeElm = false,
) {
  if (removeElm) return childNode.remove();
  if (parentNode instanceof Comment) insertAfter = true;
  if (parentNode.state) return;
  if (parentNode.nodeName === "#text" && !insertAfter) {
    throw "Cannot append to text node";
  }
  insertAfter
    ? insertNodeAfter(parentNode, childNode)
    : parentNode.appendChild(childNode);
}
const childNodeHandler = {
  matches: (child) => child instanceof Node,
  handler: (parent, child, insertAfter, removeElm) =>
    appendChildNode(parent, child, insertAfter, removeElm),
};
let appendChildHooks = [childArrayHandler, childNodeHandler];
const addAppendChildHook = (item) => appendChildHooks.unshift(item);
let appendChild = (parent, child, ...args) => {
  const appendChildHookLen = appendChildHooks.length;
  if (
    typeof child === "undefined" ||
    child === null ||
    typeof child === "boolean"
  )
    return;
  for (let i = 0; i < appendChildHookLen; i++) {
    const hook = appendChildHooks[i];
    if (hook.matches(child)) return hook.handler(parent, child, ...args);
  }
  parent.appendChild(createTextNode(String(child)));
};
const afterRenderHooks = [];
const addAfterRenderHook = (item) => afterRenderHooks.push(item);
let inRender = false;
function render(root, tagName, attributes = {}) {
  inRender = true;
  const elm = createComponent(tagName, attributes);
  if (root.state) {
    const frag = document.createDocumentFragment();
    appendChild(frag, elm);
    root.set([...frag.childNodes]);
  } else {
    root.innerHTML = "";
    appendChild(root, elm);
  }
  afterRenderHooks.forEach((func) => func());
  inRender = false;
  const event = new CustomEvent("rezact-rendered");
  document.dispatchEvent(event);
  if (location.hash) {
    const elm2 = document.querySelector(location.hash);
    setTimeout(() => {
      if (elm2 && elm2.scrollIntoView) {
        elm2.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      }
    }, 100);
  }
}
const xFragment = [];
let contextUsed = false;
function useContext() {
  if (contextUsed) return;
  contextUsed = true;
  preCreateComponentHooks.push((_tagName, attributes, hookContext) => {
    attributes.setContext = (key, context) => {
      if (!hookContext.componentContext) hookContext.componentContext = {};
      hookContext.componentContext[key] = context;
    };
    attributes.getContext = (key) => {
      let currentElement = hookContext.contextRoot;
      while (currentElement.parentNode) {
        currentElement = currentElement.parentNode;
        if (
          currentElement.firstChild &&
          currentElement.firstChild.rezactContext &&
          currentElement.firstChild.rezactContext[key]
        ) {
          return currentElement.firstChild.rezactContext[key];
        }
        if (currentElement.rezactContext && currentElement.rezactContext[key]) {
          return currentElement.rezactContext[key];
        }
      }
      return void 0;
    };
  });
  postCreateComponentHooks.push(
    (newComp, _tagName, _attributes, hookContext) => {
      hookContext.contextRoot = newComp[0] || newComp;
      hookContext.contextRoot.rezactContext = hookContext.componentContext;
    },
  );
}
let handleInputValue = null;
function useInputs() {
  if (handleInputValue) return;
  handleInputValue = true;
  function getInputVal(elm) {
    const radioVal = elm.value || elm.id;
    if (elm.type === "radio" && elm.checked) return radioVal;
    if (elm.type === "radio" && !elm.checked) return "";
    if (elm.type === "checkbox") return elm.checked;
    if (elm.type === "number") return +elm.value;
    if (elm.value) return elm.value;
    return "";
  }
  function setInputVal(elm, val) {
    const radioVal = elm.value || elm.id;
    if (elm.type === "radio" && val === radioVal) return (elm.checked = true);
    if (elm.type === "radio" && val !== radioVal) return (elm.checked = false);
    if (elm.type === "checkbox") return (elm.checked = !!val);
    elm.value = val.nodeValue || val;
  }
  const handleInputAttr = (element, attributeValue, attributes) => {
    setInputVal(element, attributeValue.get());
    attributeValue.subscribe(
      (newVal) => {
        if (element.value === newVal) return;
        setInputVal(element, newVal);
      },
      { elm: element },
    );
    if (
      !Object.keys(attributes).includes("onChange") &&
      !Object.keys(attributes).includes("onInput")
    ) {
      const inpEvType = element.type === "text" || element.type === "number";
      const evType = inpEvType ? "input" : "change";
      element.addEventListener(evType, () => {
        attributeValue.set(getInputVal(element));
      });
    }
  };
  const attributeInputValueHandler2 = {
    matches: (_attrs, key, attrVal) =>
      (key === "value" && attrVal.state) ||
      (key === "checked" && attrVal.state),
    handler: (elm, _key, attrVal, attrs) =>
      handleInputAttr(elm, attrVal, attrs),
  };
  addAttributeHandler(attributeInputValueHandler2);
}
let usingLifeCycleAttrs = false;
function useLifeCycleAttributes() {
  if (usingLifeCycleAttrs) return;
  usingLifeCycleAttrs = true;
  const onMountHandler = (elm, _key, attrVal, _attrs) => {
    const checkMounted = () => {
      if (elm.isConnected) return (elm.rzHasMounted = true) && attrVal(elm);
      setTimeout(checkMounted, 10);
    };
    checkMounted();
  };
  const onMountAttrHandler = {
    matches: (_attrs, key) => key === "onMount",
    handler: onMountHandler,
  };
  const onUnMountAttrHandler = {
    matches: (_attrs, key) => key === "onUnmount",
    handler: (elm, _key, attrVal, attrs) => {
      if (!attrs.onMount) onMountHandler(elm, _key, () => {});
      const checkMounted = () => {
        if (elm.rzHasMounted && !elm.isConnected) return attrVal(elm);
        setTimeout(checkMounted, 100);
      };
      checkMounted();
    },
  };
  addAttributeHandler(onMountAttrHandler);
  addAttributeHandler(onUnMountAttrHandler);
}

export {
  addAfterRenderHook,
  addAppendChildHook,
  addAttributeHandler,
  addPostCreateComponentHook,
  addPreCreateComponentHook,
  afterRenderHooks,
  appendChild,
  attributeHandlers,
  childArrayHandler,
  childNodeHandler,
  createComment,
  createComponent,
  createDocumentFragment,
  createElement,
  createTextNode,
  handleInputValue,
  inRender,
  isArray,
  render,
  setCreateCompFunc,
  useContext,
  useInputs,
  useLifeCycleAttributes,
  xCreateElement,
  xFragment,
};
