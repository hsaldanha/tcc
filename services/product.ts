import { productsDb } from "@/db/products";

export function getProductByBarcode(barcode: number): Product {
  return productsDb.find((p) => p.code === barcode) as Product;
}
