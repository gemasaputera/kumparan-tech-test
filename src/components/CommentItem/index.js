import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../pages/Post/action";
import ModalDelete from "../ModalDelete";

const mapStateToProps = (state) => ({
  dataPost: state.post.data,
  dataComment: state.post.dataComment,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function CommentItem({ data, dataComment, actions }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [mode, setMode] = useState(null);
  const [comment, setComment] = useState(data.body);

  const handleEdit = () => {
    setMode("edit");
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    actions.deleteComment(data, dataComment);
    setTimeout(() => {
      setOpenDelete(false);
    }, 1500);
  };

  const confirmEdit = () => {
    actions.editComment(comment, data.id, dataComment);
    setTimeout(() => {
      setMode("add");
    }, 1500);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  return (
    <>
      {openDelete && (
        <ModalDelete
          title="Are you sure to delete this comment?"
          handleClose={() => setOpenDelete(false)}
          handleSubmit={confirmDelete}
          data={data}
        />
      )}
      <div className="mb-2">
        <div className="flex justify-between">
          <span className="font-bold text-sm">{data.name}</span>
          <div className="flex justify-end ml-auto">
            <button className="font-bold text-blue-700" onClick={handleEdit}>
              Edit
            </button>
          </div>
          <div className="flex justify-end ml-4">
            <button className="font-bold text-red-700" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        {mode !== "edit" && <p className="text-lg">{data.body}</p>}
        {mode === "edit" && (
          <div className="flex flex-col">
            <input
              className="flex-1 tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              type="text"
              placeholder="Title post..."
              value={comment}
              onChange={handleChange}
            />
            <div>
              <button
                onClick={confirmEdit}
                className="py-2 px-4 rounded bg-blue-500 font-bold text-white"
              >
                Edit
              </button>
              <button
                onClick={() => setMode("add")}
                className="py-2 px-4 ml-4 rounded bg-red-500 font-bold text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="h-px w-full bg-gray-500" />
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
