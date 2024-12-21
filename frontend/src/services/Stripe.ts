import apiInstance from "@/ApiInstance";
import { getStripeCusId } from "@/server-actions/getStripeCusId";
import { PaymentMethods } from "@/types/Types";
import { authorizedFetchApiCall } from "@/utils/apiUtils/authorizedApiCall";
import { handleApiCall } from "@/utils/apiUtils/handleApiCall";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";

class StripeServices {
  private static BASE_URL_SS = process.env.BACKEND_API_URL;

  static async fetchStripeCusAccId() {
    const { data, error } = await authorizedFetchApiCall<{
      stripe_customer_id: string;
    }>(async (config) => {
      const response = await fetch(
        this.BASE_URL_SS + BACKEND_API_ENDPOINTS.getStripeCustomerAccountId,
        {
          ...config,
          cache: "force-cache",
        }
      );
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
      return { data: result.data };
    });

    if (error || !data) return undefined;
    return data.stripe_customer_id;
  }

  static async getPaymentMethods() {
    const { data, error } = await handleApiCall<{
      cards: PaymentMethods[];
    }>(async () => {
      const stripe_cus_id = await getStripeCusId();
      const data = await apiInstance.get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + BACKEND_API_ENDPOINTS.getAllPaymentMethods + stripe_cus_id
      ,{
        isPrivateReq: true
      })
      return data.data;
  });

    if (error || !data) return [];
    return data.cards;
  }
  
  static async payCart(pmData: { pm_id: string, is_pm_save?: boolean }) {
    const { pm_id, is_pm_save } = pmData;
    const stripe_cus_id = await getStripeCusId();
    const { data, error } = await handleApiCall<{
      status: 'Success' | 'Error'
    }>( async () =>
      await apiInstance.post(
        BACKEND_API_ENDPOINTS.payCart,
        { stripe_cus_id, pm_id, is_pm_save: is_pm_save ?? false },
        {
          isPrivateReq: true
        }
      ));
    if (error || data.status == "Error") throw error;
    return data.status;
  }
}

export default StripeServices;