import StripeSvs from '@/services/Stripe';
import { useQuery } from '@tanstack/react-query';

const useFetchPaymentMethods = () => {
  return useQuery({ queryKey: ["paymentMethods"], queryFn: StripeSvs.getPaymentMethods });
}

export default useFetchPaymentMethods
