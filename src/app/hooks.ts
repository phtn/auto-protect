import { createCheckout } from "@/lib/paymongo/checkout";
import type {
  CheckoutParams,
  CheckoutResource,
} from "@re-up/paymongo-fn/src/schema/zod.checkout";
import { useState } from "react";

export const usePaymongo = () => {
  const [result, setResult] = useState<CheckoutResource>();
  const [loading, setLoading] = useState(false);
  const handleCheckout = async (params: CheckoutParams) => {
    setLoading(true);
    const result = (await createCheckout(params)) as CheckoutResource;
    setResult(result);
    setLoading(false);
  };
  return {
    handleCheckout,
    result,
    loading,
  };
};
