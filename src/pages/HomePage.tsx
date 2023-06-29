import React, { useState, useEffect } from 'react';

import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import { RepoCard } from '../components/RepoCard';

export const HomePage = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);

  const {
    isLoading: isUsersLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  });

  const [fetchRepos, { isLoading: isReposLoading, isFetching: isReposFetching, data: userRepos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length >= 3 && users?.length! > 0);
  }, [debounced, users]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setSearch('');
    setDropdown(false);
  };

  return (
    <div className="relative flex justify-center pt-10 mx-auto h-screen w-screen ">
      {isError && (
        <p className="absolute top-[110px] text-center uppercase text-red-500">
          Something went wrong
        </p>
      )}

      <div className="relative flex flex-col w-[560px] align-middle">
        <input
          type="text"
          placeholder="GitHub username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="block w-[300px] h-[30px] mx-auto rounded-md border-0 py-1.5 pl-3 pr-3 text-[#3c3c3c] ring-2 ring-inset ring-[#c3f51d] sm:text-sm sm:leading-6 shadow-sm"
        />

        {dropdown && (
          <ul className="absolute list-none rounded-md top-[31px] left-[130px] w-[300px] max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isUsersLoading && <p className="text-center uppercase">Users are loading...</p>}
            {users?.map(user => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-300 hover:text-[#3c3c3c] transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container text-center">
          {isReposLoading && <p className="mt-2 text-gray-400">Repos are loading...</p>}
          {!isReposLoading && isReposFetching && (
            <p className="mt-2 text-gray-400">Repos are fetching...</p>
          )}
          {userRepos?.length! === 0 && (
            <p className="mt-2 text-gray-400">This user does not have repositories</p>
          )}

          {userRepos?.map(repo => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
