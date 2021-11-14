import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Member from "./pages/Member";
import Profile from "./pages/Profile";
import Album from "./pages/Album";
import Collection from "./pages/Collection";
import store from "./stores";
import Layouts from "./parts/Layouts";
import { Provider } from "react-redux";

function Main() {
  return (
    <div className="App">
      <Router>
        <Layouts>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="post/:postId" element={<Post />} />
            <Route path="member" element={<Member />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="album/:albumId" element={<Album />} />
            <Route path="collection" element={<Collection />} />
          </Routes>
        </Layouts>
      </Router>
    </div>
  );
}

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
