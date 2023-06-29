import React from 'react';
import { useAppSelector } from '../hooks/redux';

export const FavoritesPage = () => {
  const { favorites } = useAppSelector(state => state.github);

  if (favorites.length === 0) {
    return <p className="text-center uppercase text-[#3c3c3c]">No items yet</p>;
  }

  return (
    <div className="relative flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favorites.map(fav => (
          <li key={fav}>
            <a href={fav} target="_blank">
              {fav}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
