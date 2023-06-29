import { useState } from 'react';

import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import { RepoCard } from '../components/RepoCard';
import { ScrollUpBtn } from '../components/ScrollUpBtn';
import { useScrollUp } from '../hooks/scroll';

export const HomePage = () => {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search);
  const { showScrollButton, scrollUp } = useScrollUp();

  const { isError, data: users } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  });

  const [fetchRepos, { isLoading: isReposLoading, isFetching: isReposFetching, data: userRepos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setSearch('');
  };

  const dropdown = debounced.length >= 3 && users?.length! > 0;

  return (
    <div className="relative mx-auto flex h-screen w-screen justify-center pt-[110px]">
      {isError && (
        <p className="absolute top-[150px] text-center font-semibold uppercase text-red-500">
          Something went wrong
        </p>
      )}
      <div className="relative flex w-[560px] flex-col align-middle">
        <input
          type="text"
          placeholder="GitHub username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mx-auto block h-[30px] w-[300px] rounded-md border-0 py-1.5 pl-3 pr-3 text-[#3c3c3c] shadow-sm ring-2 ring-inset ring-[#c3f51d] sm:text-sm sm:leading-6"
        />

        {dropdown && (
          <ul className="absolute left-[130px] top-[31px] max-h-[200px] w-[300px] list-none overflow-y-scroll rounded-md bg-white shadow-md">
            {users?.map(user => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="cursor-pointer px-4 py-2 transition-colors hover:bg-gray-300 hover:text-[#3c3c3c]"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container pb-[50px] text-center">
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

        {showScrollButton && <ScrollUpBtn onClick={scrollUp} />}
      </div>
    </div>
  );
};
