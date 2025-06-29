interface Restriction {
  id: number;
  name: string;
  description?: {
    summary: Array<string>;
    symptoms: string;
    treatment: string;
    types: Array<string>;
    sources: Array<string>;
  };
  type: "dietary-pattern" | "condition";
  image?: string;
  title?: string;
  slug?: string;
}
