import { RequestDocument } from 'graphql-request';
import React from 'react';

import gqlClient from '@/lib/graphqlClient';

export const useRequest = <T>() => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<T>();

  const request = (document: RequestDocument, payload?: AnyObject) => {
    setIsLoading(true);

    return gqlClient
      .request<T>(document, payload)
      .then((data) => {
        setData(data);

        return data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    request,
    isLoading,
    data,
  };
};
