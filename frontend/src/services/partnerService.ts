import type { PartnerLead } from "../types/partners";

export const partnerService = {
  submitLead: async (lead: PartnerLead): Promise<PartnerLead> => lead,
};
