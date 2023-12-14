import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { getArticleBySlug } from "../../apis/articles";
import ArticleMeta from "../../components/ArticleMeta/ArticleMeta";
import ArticleComments from "../../components/ArticleComments/ArticleComments";

function Article() {
  const [article, setArticle] = useState(null);
  const { isAuthenticated, user } = useUser();
  const params = useParams();

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
      getArticleBySlug(params.slug, configs).then((data) => setArticle(data));
    },
    [params.slug, isAuthenticated, user?.token]
  );

  return article ? (
    <>
      <div class="article-page">
        <div class="banner">
          <div class="container">
            <h1>{article.title}</h1>
            <ArticleMeta article={article} />
          </div>
        </div>

        <div class="container page">
          <div class="row article-content">
            <div class="col-md-12">
              <p>{article.body}</p>
              <ul class="tag-list">
                {article.tagList.map((tag, index) => (
                  <li class="tag-default tag-pill tag-outline" key={index}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div class="article-actions">
            <ArticleMeta article={article} />
          </div>

          <ArticleComments></ArticleComments>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Article;
