import { useEffect, useRef, useState } from "react";
import { getCommentsOfArticle, addCommentToArticle } from "../../apis/articles";
import { useUser } from "../../contexts/UserContext";
import { Link, useParams } from "react-router-dom";
import ArticleComment from "./ArticleComment/ArticleComment";

function ArticleComments() {
  const [comments, setComments] = useState([]);
  const { isAuthenticated, user } = useUser();
  const params = useParams();
  const inputRef = useRef(null);

  useEffect(
    function () {
      let configs = {};
      if (isAuthenticated) {
        configs = {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        };
      }
      getCommentsOfArticle(params.slug, configs).then((data) =>
        setComments(data)
      );
    },
    [params.slug, isAuthenticated, user?.token]
  );

  function handleAddComment(e) {
    e.preventDefault();
    if (!inputRef.current.value.trim()) return;
    const comment = { body: inputRef.current.value };
    const configs = {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    };
    inputRef.current.value = "";
    addCommentToArticle(params.slug, comment, configs).then((data) => {
      setComments([...comments, data]);
    });
  }

  return isAuthenticated ? (
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <form class="card comment-form" onSubmit={handleAddComment}>
          <div class="card-block">
            <textarea
              class="form-control"
              placeholder="Write a comment..."
              rows="3"
              ref={inputRef}
            ></textarea>
          </div>
          <div class="card-footer">
            <img
              src={user.image}
              alt={user.username}
              class="comment-author-img"
            />
            <button class="btn btn-sm btn-primary">Post Comment</button>
          </div>
        </form>

        {comments.map((comment, index) => (
          <ArticleComment comment={comment} key={index} />
        ))}
      </div>
    </div>
  ) : (
    <div class="col-xs-12 col-md-8 offset-md-2">
      <p>
        <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link>{" "}
        to add comments on this article.
      </p>
    </div>
  );
}

export default ArticleComments;
