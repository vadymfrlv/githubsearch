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
              className="mb-2  flex h-[60px] w-[500px] cursor-pointer items-center justify-between overflow-hidden rounded-r-md border border-r-0 pl-3 marker:rounded-l-md hover:border-gray-300 hover:bg-gray-300 hover:shadow-md"
            >
              <a
                className="max-w-[500px] flex-1 text-left text-gray-800"
                href={fav}
                target="_blank"
                onClick={e => e.stopPropagation()}
              >
                {fav}
              </a>
              <button
                className="h-[60px] rounded-r-md bg-lime-300 px-3 text-lg uppercase text-gray-700"
                onClick={e => {
                  e.stopPropagation();
                  removeFromFavorite(fav, e);
                }}
              >
                &#10006;
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showScrollButton && <ScrollUpBtn onClick={scrollUp} />}
    </>
  );
};
