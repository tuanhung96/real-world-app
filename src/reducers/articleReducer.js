export const initialArticleState = {
  isLoadingArticles: true,
  articles: null,
  pageArr: [],
};

export function articleReducer(state, action) {
  switch (action.type) {
    case "update":
      return {
        ...state,
        isLoadingArticles: action.payload.isLoadingArticles,
        articles: action.payload.articles,
        pageArr: action.payload.pageArr,
      };
    case "changPage":
      return {
        ...state,
        isLoadingArticles: action.payload.isLoadingArticles,
      };
    default:
      throw new Error("Invalid Action");
  }
}
