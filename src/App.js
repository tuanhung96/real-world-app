import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Article from "./pages/Article/Article";
import Profile from "./pages/Profile/Profile";
import Setting from "./pages/Setting/Setting";
import Editor from "./pages/Editor/Editor";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile/:username" element={<Profile />}></Route>
          <Route path="/article/:slug" element={<Article />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/editor/:slug" element={<Editor />}></Route>
          <Route path="/editor" element={<Editor />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
