import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import {
  createArticle,
  updateArticle,
  getArticleBySlug,
} from "../../apis/articles";

function Editor() {
  const [article, setArticle] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuthenticated, user } = useUser();
  const params = useParams();
  const navigate = useNavigate();
  const articleRef = useRef({});

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  useEffect(
    function () {
      let configs = {};
      if (isAuthenticated && params.slug) {
        configs = {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        };
        getArticleBySlug(params.slug, configs).then((data) => {
          articleRef.current = { ...data };
          setArticle(data);
        });
      }
    },
    [params.slug, user?.token, isAuthenticated]
  );

  function handleSubmit() {
    if (!articleRef.current.title || !articleRef.current.title?.trim()) {
      setErrorMessage("Title is required");
      return;
    }
    if (
      !articleRef.current.description ||
      !articleRef.current.description?.trim()
    ) {
      setErrorMessage("Description is required");
      return;
    }
    if (!articleRef.current.body || !articleRef.current.body.trim()) {
      setErrorMessage("Body is required");
      return;
    }
    const newArticle = { ...articleRef.current };
    const configs = {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    };
    if (params.slug) {
      updateArticle(newArticle, configs).then((data) => {
        navigate(`/article/${data.slug}`);
      });
    } else {
      createArticle(newArticle, configs).then((data) => {
        navigate(`/article/${data.slug}`);
      });
    }
  }

  return isAuthenticated ? (
    <>
      <div class="editor-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
              {errorMessage ? (
                <ul class="error-messages">
                  <li>{errorMessage}</li>
                </ul>
              ) : (
                <></>
              )}

              <form>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Article Title"
                      defaultValue={article.title}
                      onChange={(e) => {
                        articleRef.current = {
                          ...articleRef.current,
                          title: e.target.value,
                        };
                      }}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="What's this article about?"
                      defaultValue={article.description}
                      onChange={(e) => {
                        articleRef.current = {
                          ...articleRef.current,
                          description: e.target.value,
                        };
                      }}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea
                      class="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      defaultValue={article.body}
                      onChange={(e) => {
                        articleRef.current = {
                          ...articleRef.current,
                          body: e.target.value,
                        };
                      }}
                    ></textarea>
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter tags"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          if (document.activeElement.value.trim() === "")
                            return;
                          let tagList;
                          if (articleRef.current.tagList) {
                            tagList = [
                              ...articleRef.current.tagList,
                              document.activeElement.value,
                            ];
                          } else {
                            tagList = [document.activeElement.value];
                          }
                          articleRef.current = {
                            ...articleRef.current,
                            tagList: tagList,
                          };
                          document.activeElement.value = "";
                          setArticle({ ...article, tagList });
                        }
                      }}
                    />

                    <div class="tag-list">
                      {article.tagList?.map((tag, index) => (
                        <span class="tag-default tag-pill" key={index}>
                          <i
                            class="ion-close-round"
                            onClick={() => {
                              const newTagList = article.tagList.filter(
                                (ele) => ele !== tag
                              );
                              articleRef.current = {
                                ...articleRef.current,
                                tagList: newTagList,
                              };
                              setArticle({ ...article, tagList: newTagList });
                            }}
                          ></i>{" "}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </fieldset>
                  <button
                    class="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Editor;
