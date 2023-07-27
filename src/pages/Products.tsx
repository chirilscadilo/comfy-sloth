import productsItems from "../data/items.json";

export function Products() {
  return (
    <>
      {productsItems.map((product) => (
        <div>{JSON.stringify(product)}</div>
      ))}
    </>
  );
}
