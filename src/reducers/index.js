import { combineReducers } from "redux";

import home from "../pages/Home/reducer";
import post from "../pages/Post/reducer";
import member from "../pages/Member/reducer";
import profile from "../pages/Profile/reducer";
import album from "../pages/Album/reducer";
import collection from "../pages/Collection/reducer";

export default combineReducers({
  home,
  post,
  member,
  profile,
  album,
  collection,
});
