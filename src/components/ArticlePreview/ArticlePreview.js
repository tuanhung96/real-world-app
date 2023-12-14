import { Link } from "react-router-dom";
import ArticleAuthor from "../ArticleAuthor/ArticleAuthor";
import ArticleFavoriteButton from "../ArticleFavoriteButton/ArticleFavoriteButton";

function ArticlePreview({ article }) {
  return (
    <div class="article-preview">
      <div class="article-meta">
        <ArticleAuthor article={article} />
        <ArticleFavoriteButton
          article={article}
          isPreview={true}
        ></ArticleFavoriteButton>
      </div>
      <Link to={`/article/${article.slug}`} class="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          {article.tagList.map((tag, index) => (
            <li class="tag-default tag-pill tag-outline" key={index}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}

export default ArticlePreview;
