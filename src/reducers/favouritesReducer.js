export default function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const alreadyFavourite = state.some(
        (photo) => photo.id === action.payload.id
      );

      if (alreadyFavourite) {
        return state.filter((photo) => photo.id !== action.payload.id);
      }

      return [...state, action.payload];
    }

    default:
      return state;
  }
}
