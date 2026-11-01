export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() => onToggleFavourite(photo)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={isFavourite}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-2xl shadow-md transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <span className={isFavourite ? "text-rose-500" : "text-slate-400"}>
            {isFavourite ? "♥" : "♡"}
          </span>
        </button>
      </div>

      <div className="px-4 py-3">
        <p className="truncate text-sm font-semibold text-slate-800">
          {photo.author}
        </p>
      </div>
    </article>
  );
}
