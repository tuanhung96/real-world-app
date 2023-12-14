import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const { login, isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;
    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Please enter your email and password");
      return;
    }
    try {
      await login(email, password);
      navigate(`/profile/${user.username}`);
    } catch {
      setErrorMessage("Email or password is incorrect");
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return (
    <>
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign in</h1>
              <p class="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>

              {errorMessage ? (
                <ul class="error-messages">
                  <li>{errorMessage}</li>
                </ul>
              ) : (
                <></>
              )}

              <form onSubmit={handleLogin}>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    ref={inputEmailRef}
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    ref={inputPasswordRef}
                  />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
