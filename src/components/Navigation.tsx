import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-[#cccccc] text-[#c3f51d]">
      <h2 className="text-xl font-semibold">GitHub Search</h2>

      <span>
        <Link to={'/'} className="mr-2 font-semibold text-lg">
          Home
        </Link>
        <Link to={'/favorites'} className="font-semibold text-lg">
          Favorites
        </Link>
      </span>
    </nav>
  );
};
