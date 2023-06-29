import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="fixed z-10 flex h-[50px] w-full items-center justify-between bg-[#cccccc] px-5 text-[#c3f51d] shadow-md">
      <h2 className="text-xl font-semibold">GitHub Search</h2>

      <span>
        <Link to={'/'} className="mr-2 text-lg font-semibold">
          Home
        </Link>
        <Link to={'/favorites'} className="text-lg font-semibold">
          Favorites
        </Link>
      </span>
    </nav>
  );
};
