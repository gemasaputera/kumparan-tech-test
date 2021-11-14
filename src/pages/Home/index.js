import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";
import PostItem from "../../components/PostItem";
import AddPost from "../../components/AddPost";
import Modal from "../../components/Modal";
import FormPost from "../../components/FormPost";

const mapStateToProps = (state) => ({ ...state.home });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Home(props) {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let Mounted = true;
    if (Mounted) {
      props.actions.fetchPosts();
      props.actions.fetchUsers();
    }
    return () => {
      Mounted = false;
    };
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
            <PostItem data={post} key={post.postId} handleClick={handleClick} />
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

  const handleAdd = () => {
    setOpen(true);
  };

  return (
    <div className="relative" style={{ paddingBottom: 65 }}>
      <section>
        <ListPost />
      </section>
      <AddPost handleClick={handleAdd} />
      {open && (
        <Modal open={open} onClose={() => setOpen(false)} auto>
          <FormPost dataPost={props.dataPost} />
        </Modal>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
