import { SnackBarActions } from '@/store/Slices/SnackBarSlice';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useAppDispatch } from './reduxHooks';

// Define generic types
type MutationFnType<TData, TOutput> = (data: TData) => Promise<TOutput>;

interface UseAuthProps<TData, TOutput> {
  mutationFn: MutationFnType<TData, TOutput>;
  onSuccess?: (data: TOutput) => void;
  onError?: (error: any) => void;
}

interface UseAuthReturn<TData, TOutput> {
    isPending: boolean;
    mutate: UseMutationResult<TOutput, any, TData, unknown>['mutate'];
}

const useAuth = <TData, TOutput>({ mutationFn, onSuccess, onError }: UseAuthProps<TData, TOutput>): UseAuthReturn<TData, TOutput> => {
  
  const dispatch = useAppDispatch();
  const { addMessage } = SnackBarActions;


  const { isPending, mutate } = useMutation<TOutput, any, TData>({
    mutationFn,
    onSuccess(data) {
      dispatch(addMessage({ message: (data as any).message, type: "success" }));
      if (onSuccess) onSuccess(data);
    },
    onError(error) {
      dispatch(addMessage({ message: error.message, type: "error" }));
      if (onError) onError(error);
    },
  });

  return {
    isPending,
    mutate,
  };
};

export default useAuth;
