import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { updateUser } from "../../apis/users";
import { useEffect, useRef, useState } from "react";

function Setting() {
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuthenticated, user, setUser, logout } = useUser();
  const navigate = useNavigate();
  const userRef = useRef({ ...user });

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  function handleUpdateUser(e) {
    e.preventDefault();
    if (!userRef.current.email || !userRef.current.email?.trim()) {
      setErrorMessage("Email is required");
      return;
    }
    if (!userRef.current.username || !userRef.current.username?.trim()) {
      setErrorMessage("Username is required");
      return;
    }
    if (!userRef.current.password || !userRef.current.password.trim()) {
      setErrorMessage("Password is required");
      return;
    }
    const newUser = { ...userRef.current };
    const configs = {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    };
    updateUser(newUser, configs)
      .then((data) => {
        setUser(data);
        navigate(`/profile/${data.username}`);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  }

  return isAuthenticated ? (
    <>
      <div class="settings-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Your Settings</h1>

              {errorMessage ? (
                <ul class="error-messages">
                  <li>{errorMessage}</li>
                </ul>
              ) : (
                <></>
              )}

              <form onSubmit={handleUpdateUser}>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      defaultValue={user?.image}
                      onChange={(e) => {
                        userRef.current = {
                          ...userRef.current,
                          image: e.target.value,
                        };
                      }}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      defaultValue={user?.username}
                      onChange={(e) => {
                        userRef.current = {
                          ...userRef.current,
                          username: e.target.value,
                        };
                      }}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea
                      class="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      defaultValue={user?.bio}
                      onChange={(e) => {
                        userRef.current = {
                          ...userRef.current,
                          bio: e.target.value,
                        };
                      }}
                    ></textarea>
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      defaultValue={user?.email}
                      onChange={(e) => {
                        userRef.current = {
                          ...userRef.current,
                          email: e.target.value,
                        };
                      }}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      placeholder="New Password"
                      defaultValue={user?.password}
                      onChange={(e) => {
                        userRef.current = {
                          ...userRef.current,
                          password: e.target.value,
                        };
                      }}
                    />
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button
                class="btn btn-outline-danger"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Setting;
