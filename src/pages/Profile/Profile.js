import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useState, useEffect, useReducer } from "react";
import { getProfileByUsername } from "../../apis/profiles";
import { Link } from "react-router-dom";
import { getArticles } from "../../apis/articles";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import ProfileFollowButton from "../../components/ProfileFollowButton/ProfileFollowButton";
import Pagination from "../../components/Pagination/Pagination";
import {
  initialArticleState,
  articleReducer,
} from "../../reducers/articleReducer";

import {
  initialPaginationState,
  paginationReducer,
} from "../../reducers/paginationReducer";

function Profile() {
  const [{ isLoadingArticles, articles, pageArr }, dispatch] = useReducer(
    articleReducer,
    initialArticleState
  );
  const [{ currentPage, offset }, dispatchPagination] = useReducer(
    paginationReducer,
    initialPaginationState
  );
  const [userData, setUserData] = useState(null);
  const [currentTab, setCurrentTab] = useState("myArticles");

  const { isAuthenticated, user } = useUser();
  const params = useParams();
  const navigate = useNavigate();

  const limit = 5;

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
      getProfileByUsername(params.username, configs).then((data) => {
        setUserData(data);
      });
    },
    [params.username, isAuthenticated, user?.token]
  );

  useEffect(
    function () {
      let query = {};

      if (currentTab === "myArticles") {
        query = {
          offset: offset,
          limit: limit,
          author: params.username,
        };
      }

      if (currentTab === "favoritedArticles") {
        query = {
          offset: offset,
          limit: limit,
          favorited: params.username,
        };
      }

      let configs = {};
      if (isAuthenticated) {
        configs = {
          params: query,
          headers: {
            Authorization: `Token ${user.token}`,
          },
        };
      } else {
        configs = {
          params: query,
        };
      }

      getArticles(configs).then((data) => {
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
      });
    },
    [params.username, offset, currentTab, isAuthenticated, user?.token]
  );

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
    dispatchPagination({
      type: "reset",
    });
  }

  return (
    <>
      {userData && (
        <div class="profile-page">
          <div class="user-info">
            <div class="container">
              <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                  <img
                    src={userData.image}
                    alt={userData.username}
                    class="user-img"
                  />
                  <h4>{userData.username}</h4>
                  <p>{userData.bio}</p>

                  {isAuthenticated && userData.username === user.username ? (
                    <button
                      class="btn btn-sm btn-outline-secondary action-btn"
                      onClick={() => navigate("/setting")}
                    >
                      <i class="ion-gear-a"></i>
                      &nbsp; Edit Profile Settings
                    </button>
                  ) : userData ? (
                    <ProfileFollowButton profile={userData} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                  <ul class="nav nav-pills outline-active">
                    <li class="nav-item">
                      <Link
                        class={
                          currentTab === "myArticles"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => handleChangeTab("myArticles")}
                      >
                        My Articles
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        class={
                          currentTab === "favoritedArticles"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => handleChangeTab("favoritedArticles")}
                      >
                        Favorited Articles
                      </Link>
                    </li>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
