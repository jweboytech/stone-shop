import gqlClient from '@/lib/graphqlClient';
import { mutate as globalMutate } from 'swr';

interface UseGQLMutationOptions<TData = any, TVariables = any> {
  mutation: string;
  onSuccess?: (data: TData) => void;
  onError?: (err: any) => void;
  revalidateKeys?: (string | any[])[];
}

export function useGQLMutation<TData = any, TVariables = any>({
  mutation,
  onSuccess,
  onError,
  revalidateKeys = [],
}: UseGQLMutationOptions<TData, TVariables>) {
  const trigger = async (variables: TVariables) => {
    try {
      const data = await gqlClient.request<TData>(mutation, variables);
      onSuccess?.(data);
      revalidateKeys.forEach((key) => globalMutate(key));
      return { data };
    } catch (err) {
      onError?.(err);
      return { error: err };
    }
  };

  return { trigger };
}
