import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";

const mapStateToProps = (state) => ({ ...state.home });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Home(props) {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    props.actions.fetchPosts();
    props.actions.fetchUsers();
  }, []);

  useEffect(() => {
    if (props.dataPost && props.dataUser) {
      let filtered = [];
      filtered = props.dataPost.map((post) => {
        let equalUserId = (user) => user.id === post.userId;
        let userWithId = props.dataUser.find(equalUserId);
        return Object.assign({}, post, userWithId, { postId: post.id });
      });
      setPosts(filtered);
    }
  }, [props.dataPost, props.dataUser]);

  const handleClick = (item) => {
    props.actions.saveDetailPost(item);
    navigate(`/post/${item.postId}`);
  };

  const ListPost = () => {
    if (posts.length === 0) {
      return `No data posts`;
    }

    return (
      <div>
        {posts.map((post) => {
          return (
            <div
              key={post.postId}
              className="cursor-pointer"
              onClick={() => handleClick(post)}
            >
              <div className="bg-white hover:bg-gray-100 border p-5 mb-1">
                <div>
                  <span className="font-bold mr-2 text-sm hover:underline">
                    {post.name}
                  </span>
                  <span className="text-sm">@{post.username}</span>
                </div>
                {post.title}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (props.loading) {
    return (
      <div>
        <p className="text-3xl font-bold">loading...</p>
      </div>
    );
  }

  return (
    <div>
      <section>
        <ListPost />
      </section>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
