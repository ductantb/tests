import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import NotificationButton from "./components/NotificationButton"
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ChangePassWordPage from "./pages/ChangePassWordPage";
import LogoutButton from "./draft/LogoutButton";

function App() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/update"
          element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/update/changepassword"
          element={user ? <ChangePassWordPage /> : <Navigate to="/auth" />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:post_id" element={<PostPage />} />
      </Routes>

      {user && <NotificationButton />}
      {user && <LogoutButton />}
      {user && <CreatePost />}

    </Container>
  );
}

export default App;
