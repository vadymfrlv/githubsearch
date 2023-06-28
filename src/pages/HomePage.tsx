import React from 'react';
import { useSearchUsersQuery } from '../store/github/github.api';

export const HomePage = () => {
  const { isLoading, data } = useSearchUsersQuery('vadymfrlv');
  return <div>HomePage</div>;
};
