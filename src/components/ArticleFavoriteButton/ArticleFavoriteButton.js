import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { favoriteArticle, unfavoriteArticle } from "../../apis/articles";

function ArticleFavoriteButton({ article, isPreview, isMeta }) {
  const [favorited, setFavorited] = useState(article?.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article?.favoritesCount);

  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  function handleFavoriteArticle() {
    if (isAuthenticated) {
      const configs = {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      };
      if (favorited) {
        unfavoriteArticle(article.slug, configs).then((data) => {
          setFavorited(data.favorited);
          setFavoritesCount(data.favoritesCount);
        });
      } else {
        favoriteArticle(article.slug, configs).then((data) => {
          setFavorited(data.favorited);
          setFavoritesCount(data.favoritesCount);
        });
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <button
      class={
        (favorited
          ? "btn btn-primary btn-sm"
          : "btn btn-outline-primary btn-sm") +
        " " +
        (isPreview ? "pull-xs-right" : "")
      }
      onClick={handleFavoriteArticle}
    >
      <i class="ion-heart"></i>
      {isMeta ? (favorited ? " Unfavorite Post " : " Favorite Post ") : " "}
      <span class="counter">{`${favoritesCount}`}</span>
    </button>
  );
}

export default ArticleFavoriteButton;
