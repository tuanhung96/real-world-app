export const initialPaginationState = {
  currentPage: 1,
  offset: 0,
};

export function paginationReducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        ...state,
        currentPage: 1,
        offset: 0,
      };
    case "changePage":
      return {
        ...state,
        currentPage: action.payload.currentPage,
        offset: action.payload.offset,
      };
    default:
      throw new Error("Invalid Action");
  }
}
