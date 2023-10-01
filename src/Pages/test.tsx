export default function Test() {
  let $count = 0;
  let $doubled = $count * 2;

  const inc = () => {
    $count++;
    console.log({ count: $count, doubled: $doubled });
  };

  return <button onClick={inc}>{$count}</button>;
}
