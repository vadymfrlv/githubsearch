import React, { useState } from 'react';
import { useSearchUsersQuery } from '../store/github/github.api';

export const HomePage = () => {
  const [search, setSearch] = useState('');

  const { isLoading, isError, data } = useSearchUsersQuery(search);

  return (
    <div className="relative flex justify-center pt-10 mx-auto h-screen w-screen ">
      {isError && (
        <p className="absolute top-[110px] text-center uppercase text-red-500">
          Something went wrong
        </p>
      )}

      <div className="relative flex justify-center w-[560px]">
        <input
          type="text"
          placeholder="GitHub username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="block w-[230px] h-[30px] rounded-md border-0 py-1.5 pl-3 pr-3 text-[#3c3c3c] ring-2 ring-inset ring-[#c3f51d] sm:text-sm sm:leading-6 shadow-sm"
        />

        <div className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-[red]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, aliquam.
        </div>
      </div>
    </div>
  );
};
