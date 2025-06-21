interface Restriction {
  id: number;
  name: string;
  description: string;
  type: "dietary-pattern" | "condition";
  image?: string;
  title?: string;
}
