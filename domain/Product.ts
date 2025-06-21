type SeverityLevel = "green" | "yellow" | "orange" | "red";

interface Product {
  id: number;
  name: string;
  image: string;
  code: number;
  codeType: string;
  category: string;
  brand: string;
  GPC: string;
  description?: string;
  servingSize?: { unit: string; value: number };
  nutritionFacts?: Array<{
    type: string;
    value: number;
    unit: string;
    dailyValue: string | number | null;
  }>;
  allergenInfo?: string;
  ingredients?: Array<{
    name: string;
    associatedWith?: Array<{
      id: number;
      type: "pattern" | "restriction";
      severity: SeverityLevel;
    }>;
  }>;
}
