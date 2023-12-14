import { createContext, useContext, useEffect, useReducer } from "react";
import { authenticate, registerUser, getCurrentUser } from "../apis/users";

// 1. Create a context
const UserContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "setUser":
      return { ...state, user: action.payload };
    default:
      throw new Error("Invalid Action");
  }
}

function UserProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    const token = localStorage.getItem("jwtToken");
    if (token && !isAuthenticated) {
      const configs = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      getCurrentUser(configs)
        .then((data) => {
          dispatch({ type: "login", payload: data });
        })
        .catch(() => localStorage.removeItem("jwtToken"));
    }
  }, []);

  async function login(email, password) {
    const requestBody = {
      user: {
        email: email,
        password: password,
      },
    };
    const user = await authenticate(requestBody);
    dispatch({ type: "login", payload: user });
    localStorage.setItem("jwtToken", user.token);
  }

  async function register(email, password, username) {
    const requestBody = {
      user: {
        email: email,
        password: password,
        username: username,
      },
    };
    const user = await registerUser(requestBody);
    dispatch({ type: "login", payload: user });
    localStorage.setItem("jwtToken", user.token);
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("jwtToken");
  }

  function setUser(user) {
    dispatch({ type: "setUser", payload: user });
  }

  return (
    // 2. Provide value to child components
    <UserContext.Provider
      value={{ user, isAuthenticated, login, logout, setUser, register }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("userContext was used outside userProvider");

  return context;
}

export { UserProvider, useUser };
