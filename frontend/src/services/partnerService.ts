import type { PartnerLead } from "../types/partners";

const wait = <T,>(data: T) => new Promise<T>((resolve) => window.setTimeout(() => resolve(data), 380));

export const partnerService = {
  submitLead: async (lead: PartnerLead): Promise<PartnerLead> => wait(lead),
};
