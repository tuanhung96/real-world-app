import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputUsernameRef = useRef(null);
  const { register } = useUser();
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;
    const username = inputUsernameRef.current.value;
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      username.trim() === ""
    ) {
      setErrorMessage("All fields must be filled out");
      return;
    }

    try {
      await register(email, password, username);
      navigate("/");
    } catch (error) {
      setErrorMessage(
        Object.keys(error.response.data.errors)[0] +
          " " +
          Object.values(error.response.data.errors)[0]
      );
    }
  }
  return (
    <>
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign up</h1>
              <p class="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              {errorMessage ? (
                <ul class="error-messages">
                  <li>{errorMessage}</li>
                </ul>
              ) : (
                <></>
              )}

              <form onSubmit={handleRegister}>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    ref={inputUsernameRef}
                  />
                </fieldset>
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
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
