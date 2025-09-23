export default async function allBrands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const data = await res.json();

  return data;
}
