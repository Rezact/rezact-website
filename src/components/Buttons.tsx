interface BaseBtnProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  type?: "button" | "submit" | "reset";
  class?: string;
  children?: any;
  id?: string;
}

interface BtnPropsWithHref extends BaseBtnProps {
  href?: string;
  onClick?: never;
}

interface BtnPropsWithOnClick extends BaseBtnProps {
  onClick?: any;
  href?: never;
}

export function Btn(props: BtnPropsWithHref | BtnPropsWithOnClick) {
  let { size, color, onClick, type, id } = props;
  props.onClick = props.onClick || (() => {});
  props.class = props.class || "";
  color = color || "primary";
  size = size || "md";
  type = type || "button";

  const sizes = {
    xs: "rounded px-2 py-1 text-xs",
    sm: "rounded px-2 py-1 text-sm",
    md: "rounded-md px-2.5 py-1.5 text-sm",
    lg: "rounded-md px-3 py-2 text-sm",
    xl: "rounded-md px-3.5 py-2.5 text-sm",
  };
  const colors = {
    primary:
      " bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600",
    secondary:
      " bg-gray-600 text-white shadow-sm hover:bg-gray-500 focus-visible:outline-gray-600",
    success:
      " bg-green-600 text-white shadow-sm hover:bg-green-500 focus-visible:outline-green-600",
    danger:
      " bg-red-600 text-white shadow-sm hover:bg-red-500 focus-visible:outline-red-600",
    warning:
      " bg-yellow-600 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline-yellow-600",
    info: " bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600",
    light:
      " bg-gray-300 text-gray-800 shadow-sm hover:bg-gray-200 focus-visible:outline-gray-300",
    dark: " bg-gray-800 text-white shadow-sm hover:bg-gray-700 focus-visible:outline-gray-800",
  };

  const classes =
    sizes[size] +
    colors[color] +
    " focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rz-btn " +
    props.class;

  if (props.href)
    return (
      <a id={id} href={props.href} class={classes}>
        {props.children}
      </a>
    );

  return (
    <button id={id} type={type} onClick={onClick} class={classes}>
      {props.children}
    </button>
  );
}
