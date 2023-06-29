import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { useActions } from '../hooks/actions';

export const FavoritesPage = () => {
  const { removeFavorites } = useActions();
  const { favorites } = useAppSelector(state => state.github);

  if (favorites.length === 0) {
    return (
      <p className="pt-10 text-center font-bold uppercase tracking-widest text-[#3c3c3c]">
        No repositories have been added to favorites yet
      </p>
    );
  }

  const removeFromFavorite = (fav: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavorites(fav);
  };

  return (
    <div className="mx-auto flex h-screen w-screen justify-center pt-10">
      <ul className="list-none">
        {favorites.map(fav => (
          <li className="flex flex-row justify-center align-middle">
            <div className="mb-2 flex h-[60px] w-[500px] flex-col justify-center overflow-scroll rounded border px-3 py-3 text-center transition-all hover:bg-gray-100 hover:shadow-md">
              <a key={fav} href={fav} target="_blank">
                {fav}
              </a>
            </div>
            <button
              onClick={e => removeFromFavorite(fav, e)}
              className="ml-2 h-[60px] w-fit rounded-md bg-lime-300 px-2 py-1 text-xs uppercase transition-all hover:bg-lime-400"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
