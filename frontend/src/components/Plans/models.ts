export interface Plan {
  id: string;
  name: string;
  headline: string;
  price: string;
  buyable: Buyable;
  features: string[];
}

export enum Buyable {
  No,
  ComingSoon,
  ContactSales,
  Yes
}
