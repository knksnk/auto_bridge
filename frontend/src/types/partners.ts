export type PartnerKind = "seller" | "carrier";

export interface PartnerLead {
  kind: PartnerKind;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  comment: string;
}

export interface PartnerPageContent {
  kind: PartnerKind;
  label: string;
  title: string;
  description: string;
  stats: string[];
  formTitle: string;
  benefits: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}
