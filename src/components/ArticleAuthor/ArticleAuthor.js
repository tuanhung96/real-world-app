import { Link } from "react-router-dom";

function ArticleAuthor({ article }) {
  return (
    <>
      <Link to={`/profile/${article.author.username}`}>
        <img src={article.author.image} alt={article.author} />
      </Link>
      <div class="info">
        <Link to={`/profile/${article.author.username}`} class="author">
          {article.author.username}
        </Link>
        <span class="date">{article.createdAt}</span>
      </div>
    </>
  );
}

export default ArticleAuthor;
