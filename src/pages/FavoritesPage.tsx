import { useAppSelector } from '../hooks/redux';
import { useActions } from '../hooks/actions';
import { ScrollUpBtn } from '../components/ScrollUpBtn';
import { useScrollUp } from '../hooks/scroll';

export const FavoritesPage = () => {
  const { removeFavorites } = useActions();
  const { favorites } = useAppSelector(state => state.github);
  const { showScrollButton, scrollUp } = useScrollUp();

  if (favorites.length === 0) {
    return (
      <p className="pt-[110px] text-center font-bold uppercase tracking-widest text-[#3c3c3c]">
        No repositories have been added to favorites yet
      </p>
    );
  }

  const removeFromFavorite = (fav: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavorites(fav);
  };

  return (
    <>
      <div className="container mx-auto flex justify-center">
        <ul className="grid grid-cols-2 gap-4 pb-[50px] pt-[110px]">
          {favorites.map(fav => (
            <li
              key={fav}
              onClick={() => window.open(fav, '_blank')}
              className="relative mb-2 h-[58px] w-[500px] cursor-pointer rounded-l-md rounded-r-md hover:bg-gray-300 hover:shadow-md"
            >
              <div className="border-l-md flex h-full rounded-l-md rounded-r-md border border-r-0 hover:border-gray-300">
                <a
                  className="flex items-center justify-between pl-3 pr-[58px] text-left text-gray-800"
                  href={fav}
                  target="_blank"
                  onClick={e => e.stopPropagation()}
                >
                  <span>{fav}</span>
                </a>
                <button
                  className="absolute bottom-0 right-0 top-0 h-[58px] rounded-r-md bg-lime-300 px-3 text-lg uppercase text-gray-700"
                  onClick={e => {
                    e.stopPropagation();
                    removeFromFavorite(fav, e);
                  }}
                >
                  &#10006;
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showScrollButton && <ScrollUpBtn onClick={scrollUp} />}
    </>
  );
};
