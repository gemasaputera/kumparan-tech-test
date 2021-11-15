import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";
import NavigationArrow from "../../components/NavigationArrow";
import CommentInput from "../../components/CommentInput";
import CommentItem from "../../components/CommentItem";
import Modal from "../../components/Modal";
import FormPost from "../../components/FormPost";
import ModalDelete from "../../components/ModalDelete";

const mapStateToProps = (state) => ({ ...state.post });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Post({ data, dataComment, loading, actions }) {
  let params = useParams();
  let navigate = useNavigate();

  const [detailPost, setDetailPost] = useState(data);
  const [comments, setComments] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    actions.fetchComments(params);
  }, []);

  useEffect(() => {
    if (data) {
      setDetailPost(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataComment) {
      setComments(dataComment);
    }
  }, [dataComment]);

  const CommentSection = () => {
    if (comments.length === 0) {
      return "No comments here";
    }

    if (loading) {
      return "Loading comments...";
    }

    return (
      <section className="my-4">
        {comments.map((comment) => {
          return <CommentItem data={comment} key={comment.id} />;
        })}
      </section>
    );
  };

  const handleClick = (item) => {
    actions.saveProfile(item);
    navigate(`/profile/${item.id}`);
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    actions.deletePost(detailPost);
    setTimeout(() => {
      navigate(`/`);
    }, 1500);
  };

  return (
    <section
      className="bg-white relative px-5"
      style={{ marginTop: 55, paddingBottom: 60 }}
    >
      {openEdit && (
        <Modal open={openEdit} onClose={() => setOpenEdit(false)} auto>
          <FormPost mode="edit" data={detailPost} />
        </Modal>
      )}
      {openDelete && (
        <ModalDelete
          title="Are you sure to delete this post?"
          handleClose={() => setOpenDelete(false)}
          handleSubmit={confirmDelete}
          data={detailPost}
        />
      )}
      <NavigationArrow title="Post" />
      <div className="py-4">
        <div className="flex mb-4">
          <div className="flex flex-1 flex-col">
            <span
              className="font-bold text-xl cursor-pointer hover:underline"
              onClick={() => handleClick(detailPost)}
            >
              {detailPost.name}
            </span>{" "}
            <span className="text-gray-400 text-sm">
              @{detailPost.username}
            </span>
          </div>
          <div className="flex flex-col flex-1 justify-end">
            <div className="flex justify-end">
              <button
                className="font-bold text-blue-700"
                onClick={() => handleEdit(detailPost)}
              >
                Edit
              </button>
            </div>
            <div className="flex justify-end">
              <button
                className="font-bold text-red-700"
                onClick={() => handleDelete(detailPost)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold">{detailPost.title}</p>
          <p className="text-gray-400">{detailPost.body}</p>
        </div>
        <div className="bg-gray-500 h-px my-4" />
        <CommentInput
          dataComment={comments}
          type="text"
          placeholder="Add your comment..."
        />
        <CommentSection />
      </div>
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
