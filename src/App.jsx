import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import favouritesReducer from "./reducers/favouritesReducer";
import PhotoCard from "./components/PhotoCard";
import LoadingSpinner from "./components/LoadingSpinner";

function getSavedFavourites() {
  try {
    const saved = localStorage.getItem("celebrare-favourites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");

  // useReducer
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getSavedFavourites
  );

  //useEffect
  useEffect(() => {
    localStorage.setItem("celebrare-favourites", JSON.stringify(favourites));
  }, [favourites]);

  // useCallback
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleToggleFavourite = useCallback((photo) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: photo });
  }, []);

  // useMemo
  const filteredPhotos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return photos;
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedSearch)
    );
  }, [photos, searchTerm]);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Photo Gallery
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Discover photos and save the ones you love.
            </p>
          </div>

          <div className="w-full md:max-w-sm">
            <label htmlFor="photo-search" className="mb-2 block text-sm font-medium text-slate-700">
              Search by author
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>
              <input
                id="photo-search"
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Type an author's name..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">All photos</h2>
            {!loading && !error && (
              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredPhotos.length} of {photos.length} photos
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <p className="font-semibold text-red-700">Something went wrong</p>
            <p className="mt-2 text-sm text-red-600">{error}</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <p className="font-semibold text-slate-700">No photos found</p>
            <p className="mt-1 text-sm text-slate-500">Try searching with a different author name.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.some((item) => item.id === photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
