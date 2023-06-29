import React, { useState } from 'react';

import { Repo } from '../models/models';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';

export const RepoCard = ({ repo }: { repo: Repo }) => {
  const { addFavorite, removeFavorites } = useActions();
  const { favorites } = useAppSelector(state => state.github);

  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url));

  const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavorite(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavorites(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className="mb-2 mt-2 flex min-h-[115px] flex-col justify-center overflow-y-scroll rounded border px-3 py-3 text-center transition-all hover:bg-gray-100 hover:shadow-md">
      <a href={repo.html_url} target="_blank">
        {' '}
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="mr-2 font-bold">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="mb-0 text-sm font-thin">{repo?.description}</p>
        {!isFav && (
          <button
            onClick={addToFavorite}
            className="rounded-md bg-lime-300 px-2 py-1 text-xs uppercase transition-all hover:bg-lime-400"
          >
            Add to favorites
          </button>
        )}
        {isFav && (
          <button
            onClick={removeFromFavorite}
            className="rounded-md bg-lime-300 px-2 py-1 text-xs uppercase transition-all hover:bg-lime-400"
          >
            Remove from favorites
          </button>
        )}
      </a>
    </div>
  );
};
