import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function Header() {
  const { isAuthenticated, user } = useUser();
  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <Link to="/" class="navbar-brand">
          conduit
        </Link>

        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <Link to="/" class="nav-link active">
              Home
            </Link>
          </li>

          {!isAuthenticated ? (
            <>
              <li class="nav-item">
                <Link to="/login" class="nav-link">
                  Sign in
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/register" class="nav-link">
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li class="nav-item">
                <Link class="nav-link" to="/editor">
                  <i class="ion-compose"></i>&nbsp;New Article{" "}
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/setting">
                  <i class="ion-gear-a"></i>&nbsp;Settings{" "}
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={`/profile/${user.username}`}>
                  <img src={user.image} alt={user.username} class="user-pic" />
                  {user.username}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
