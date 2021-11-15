import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../pages/Home/action";

const mapStateToProps = (state) => ({ ...state.home });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function FormPost({ actions, data, dataPost, loadingPost, mode }) {
  const [form, setForm] = useState({
    title: mode !== "edit" ? "" : data.title,
    body: mode !== "edit" ? "" : data.body,
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const values = Object.values(form);
    values.map((item) =>
      item !== "" && item ? setDisabled(false) : setDisabled(true)
    );
  }, [form]);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode !== "edit") {
      actions.sendPost({ ...form, userId: 1 }, dataPost);
      setTimeout(() => {
        setForm({ title: "", body: "" });
      }, 2000);
    } else {
      actions.editPostDetail({ ...form }, data);
    }
  };

  return (
    <div className="p-8">
      <form id="form-post" className="flex flex-col">
        <input
          className="flex-1 tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
          id="title"
          type="text"
          placeholder="Title post..."
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          id="body"
          className="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="What's happening?"
          onChange={handleChange}
          value={form.body}
        />
        <div className="flex justify-end">
          <button
            className={`px-8 py-2 rounded bg-blue-500 text-white ${
              disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            type="submit"
            disabled={disabled}
            onClick={handleSubmit}
          >
            {loadingPost
              ? "Loading ..."
              : mode !== "edit"
              ? "Post"
              : "Edit Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPost);
