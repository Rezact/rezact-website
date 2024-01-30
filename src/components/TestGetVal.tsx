// import { getVal } from "@rezact/rezact/signals";

export function TestGetVal() {
  const $num = 5;

  function addOne($num: number) {
    return $num + 1;
  }

  // this will work
  const test1 = addOne($num);

  // this will not work
  //   const test2 = addOne(getVal($num));

  return <p>{test1}</p>;
}
