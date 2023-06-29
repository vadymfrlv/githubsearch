import React from 'react';

import { Repo } from '../models/models';
import { useActions } from '../hooks/actions';

export const RepoCard = ({ repo }: { repo: Repo }) => {
  const { addFavorite } = useActions();

  const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavorite(repo.html_url);
  };

  const removeFromFavorite = () => {};

  return (
    <div className="border flex flex-col justify-center text-center min-h-[115px] overflow-y-scroll py-3 px-3 rounded mt-2 mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        {' '}
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin mb-0">{repo?.description}</p>
        <button
          onClick={addToFavorite}
          className="py-1 px-1 bg-lime-300 text-xs rounded-md hover:bg-lime-400 transition-all"
        >
          Fav
        </button>
        <button
          onClick={removeFromFavorite}
          className="py-1 px-1 bg-lime-300 text-xs rounded-md hover:bg-lime-400 transition-all"
        >
          Unfav
        </button>
      </a>
    </div>
  );
};
