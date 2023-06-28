import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-green-600 text-yellow-300">
      <h2 className="text-xl font-semibold tracking-widest">RC + TS + TW</h2>

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
