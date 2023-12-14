import { useState, useEffect, useReducer, useCallback } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { getArticles, getFeedArticles } from "../../apis/articles";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import Tags from "../../components/Tags/Tags";
import Pagination from "../../components/Pagination/Pagination";
import {
  initialArticleState,
  articleReducer,
} from "../../reducers/articleReducer";

import {
  initialPaginationState,
  paginationReducer,
} from "../../reducers/paginationReducer";

function Home() {
  const { isAuthenticated, user } = useUser();
  const [{ isLoadingArticles, articles, pageArr }, dispatch] = useReducer(
    articleReducer,
    initialArticleState
  );
  const [{ currentPage, offset }, dispatchPagination] = useReducer(
    paginationReducer,
    initialPaginationState
  );
  const [currentTag, setCurrentTag] = useState(null);
  const [currentTab, setCurrentTab] = useState("globalFeed");

  const limit = 10;

  useEffect(
    function () {
      const params = {
        offset: offset,
        limit: limit,
        tag: currentTag,
      };
      if (currentTab === "globalFeed" || currentTab === "tag") {
        let configs = {};
        if (isAuthenticated) {
          configs = {
            params,
            headers: {
              Authorization: `Token ${user.token}`,
            },
          };
        } else {
          configs = {
            params,
          };
        }

        getArticles(configs).then((data) => {
          updateState(data);
        });
      }

      if (currentTab === "myFeed") {
        const configs = {
          params,
          headers: {
            Authorization: `Token ${user.token}`,
          },
        };
        getFeedArticles(configs).then((data) => {
          updateState(data);
        });
      }
    },
    [offset, currentTag, currentTab, user?.token, isAuthenticated]
  );

  function updateState(data) {
    const pageArray = [];
    for (let i = 1; i <= Math.ceil(data.articlesCount / limit); i++) {
      pageArray.push(i);
    }
    dispatch({
      type: "update",
      payload: {
        isLoadingArticles: false,
        articles: data.articles,
        pageArr: pageArray,
      },
    });
  }

  function handleChangePage(page) {
    dispatch({
      type: "changPage",
      payload: {
        isLoadingArticles: true,
      },
    });
    dispatchPagination({
      type: "changePage",
      payload: { currentPage: page, offset: (page - 1) * limit },
    });
  }

  function handleChangeTab(tab) {
    dispatch({
      type: "update",
      payload: {
        isLoadingArticles: true,
        articles: null,
        pageArr: [],
      },
    });
    setCurrentTab(tab);
    setCurrentTag(null);
    dispatchPagination({
      type: "reset",
    });
  }

  const handleChangeTag = useCallback(function handleChangeTag(tag) {
    dispatch({
      type: "update",
      payload: {
        isLoadingArticles: true,
        articles: null,
        pageArr: [],
      },
    });
    setCurrentTab("tag");
    setCurrentTag(tag);
    dispatchPagination({
      type: "reset",
    });
  }, []);

  return (
    <>
      <div class="home-page">
        {!isAuthenticated ? (
          <div class="banner">
            <div class="container">
              <h1 class="logo-font">conduit</h1>
              <p>A place to share your knowledge.</p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                  {isAuthenticated ? (
                    <li class="nav-item">
                      <Link
                        class={
                          currentTab === "myFeed"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => handleChangeTab("myFeed")}
                      >
                        Your Feed
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li class="nav-item">
                    <Link
                      class={
                        currentTab === "globalFeed"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={() => handleChangeTab("globalFeed")}
                    >
                      Global Feed
                    </Link>
                  </li>
                  {currentTag ? (
                    <li class="nav-item">
                      <Link
                        class={
                          currentTab === "tag" ? "nav-link active" : "nav-link"
                        }
                      >
                        #{currentTag}
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>

              {articles?.length === 0 ? (
                <div style={{ marginTop: 16 }}>
                  No articles are here... yet.
                </div>
              ) : (
                <></>
              )}

              {articles?.map((article, index) => (
                <ArticlePreview article={article} key={index} />
              ))}

              {isLoadingArticles ? (
                <div style={{ marginTop: 16 }}>Loading articles...</div>
              ) : (
                <></>
              )}

              <Pagination
                pageArr={pageArr}
                currentPage={currentPage}
                handleChangePage={handleChangePage}
              />
            </div>

            <Tags handleChangeTag={handleChangeTag}></Tags>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
