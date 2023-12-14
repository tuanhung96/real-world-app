import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ArticleAuthor from "../ArticleAuthor/ArticleAuthor";
import ArticleFavoriteButton from "../ArticleFavoriteButton/ArticleFavoriteButton";
import ProfileFollowButton from "../ProfileFollowButton/ProfileFollowButton";
import { deleteArticle } from "../../apis/articles";

function ArticleMeta({ article }) {
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();
  return (
    <div class="article-meta">
      <ArticleAuthor article={article} />

      {isAuthenticated && user.username === article.author.username ? (
        <>
          <button
            class="btn btn-sm btn-outline-secondary"
            onClick={() => navigate(`/editor/${article.slug}`)}
          >
            <i class="ion-edit"></i> Edit Article
          </button>
          <button
            class="btn btn-sm btn-outline-danger"
            onClick={() => {
              const configs = {
                headers: {
                  Authorization: `Token ${user.token}`,
                },
              };
              deleteArticle(article.slug, configs);
              navigate("/");
            }}
          >
            <i class="ion-trash-a"></i> Delete Article
          </button>
        </>
      ) : (
        <>
          <ProfileFollowButton profile={article.author}></ProfileFollowButton>
          <ArticleFavoriteButton
            article={article}
            isMeta={true}
          ></ArticleFavoriteButton>
        </>
      )}
    </div>
  );
}

export default ArticleMeta;
