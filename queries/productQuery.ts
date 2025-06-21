import { getProductByBarcode } from "@/services/product";
import { queryOptions } from "@tanstack/react-query";

export function productQueryOptions(barcode: string | null) {
  return queryOptions<Product>({
    queryKey: ["products", barcode],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(getProductByBarcode(parseInt(barcode!)));
        }, 1000);
      }),
    staleTime: 5 * 1000,
    enabled: barcode !== null,
  });
}
