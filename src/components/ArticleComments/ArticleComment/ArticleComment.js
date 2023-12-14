import { Link, useParams } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { deleteCommentOfArticle } from "../../../apis/articles";
import { useState } from "react";

function ArticleComment({ comment }) {
  const [commentData, setCommentData] = useState(comment);
  const { user } = useUser();
  const params = useParams();

  function handleDeleteComment() {
    const configs = {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    };
    deleteCommentOfArticle(params.slug, comment.id, configs);
    setCommentData(null);
  }

  return commentData ? (
    <div class="card">
      <div class="card-block">
        <p class="card-text">{commentData.body}</p>
      </div>
      <div class="card-footer">
        <Link
          to={`/profile/${commentData.author.username}`}
          class="comment-author"
        >
          <img
            src={commentData.author.image}
            alt={commentData.author.username}
            class="comment-author-img"
          />
        </Link>
        &nbsp;
        <Link
          to={`/profile/${commentData.author.username}`}
          class="comment-author"
        >
          {commentData.author.username}
        </Link>
        <span class="date-posted">{commentData.createdAt}</span>
        {user && user.username === commentData.author.username ? (
          <span class="mod-options">
            <i class="ion-trash-a" onClick={handleDeleteComment}></i>
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ArticleComment;
