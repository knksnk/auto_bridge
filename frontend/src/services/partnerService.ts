import type { PartnerLead } from "../types/partners";
import { apiClient } from "./apiClient";

const wait = <T,>(data: T) => new Promise<T>((resolve) => window.setTimeout(() => resolve(data), 380));

export const partnerService = {
  submitLead: async (lead: PartnerLead): Promise<PartnerLead> => {
    try {
      await apiClient.post("/partners/applications", {
        ...lead,
        type: lead.kind === "seller" ? "SELLER" : "CARRIER",
      });
      return lead;
    } catch {
      return wait(lead);
    }
  },
};
