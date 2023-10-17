import { api } from "../api";

export const requestLoan = (taxId, businessName, amount) => {
  const path = "/loan";
  const payload = {
    tax_id: taxId,
    business_name: businessName,
    amount: parseInt(amount),
  };
  return api.post(path, payload);
};
