import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import AuthSvs from '@/services/Auth';

// Define generic types
type MutationFnType<TData, TOutput> = (data: TData) => Promise<TOutput>;

interface UseAuthProps<TData, TOutput> {
  mutationFn: MutationFnType<TData, TOutput>;
  onSuccess?: (data: TOutput) => void;
  onError?: (error: any) => void;
}

interface UseAuthReturn<TData, TOutput> {
    errorMessage: string;
    successMessage: string;
    isPending: boolean;
    mutate: UseMutationResult<TOutput, any, TData, unknown>['mutate'];
    clearMessages: () => void;
    setErrorMessage: Dispatch<SetStateAction<string>>
}

const useAuth = <TData, TOutput>({ mutationFn, onSuccess, onError }: UseAuthProps<TData, TOutput>): UseAuthReturn<TData, TOutput> => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { isPending, mutate } = useMutation<TOutput, any, TData>({
    mutationFn,
    onSuccess(data) {
      setErrorMessage('');
      setSuccessMessage((data as any).message);  // Assuming data has a message property
      if (onSuccess) onSuccess(data);
    },
    onError(error) {
      setSuccessMessage('');
      setErrorMessage(error.message);
      if (onError) onError(error);
    },
  });

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  return {
    errorMessage,
    successMessage,
    isPending,
    mutate,
    clearMessages,
    setErrorMessage
  };
};

export default useAuth;
