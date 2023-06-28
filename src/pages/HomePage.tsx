import React, { useState, useEffect } from 'react';
import { useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';

export const HomePage = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);

  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  });

  useEffect(() => {
    setDropdown(debounced.length >= 3 && users?.length! > 0);
  }, [debounced, users]);

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
          className="block w-[300px] h-[30px] rounded-md border-0 py-1.5 pl-3 pr-3 text-[#3c3c3c] ring-2 ring-inset ring-[#c3f51d] sm:text-sm sm:leading-6 shadow-sm"
        />

        {dropdown && (
          <div className="absolute list-none rounded-md top-[31px] left-[1/2] w-[300px] max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center uppercase">Data loading...</p>}
            {users?.map(user => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-300 hover:text-[#3c3c3c] transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
