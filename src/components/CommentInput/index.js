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

function CommentInput({ actions, type, dataComment, placeholder }) {
  const [form, setForm] = useState({
    title: "test comment",
    body: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const values = Object.values(form);
    values.map((item) =>
      item !== "" && item ? setDisabled(false) : setDisabled(true)
    );
  }, [form]);

  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.id;
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.sendComment({ ...form, userId: 1 }, dataComment);
    setForm({ title: "", body: "" });
  };

  return (
    <>
      <form className="flex items-center">
        <input
          id="body"
          type={type}
          className="flex-1 tracking-wide py-2 px-4 leading-relaxed appearance-none block bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
          style={{ minHeight: 32 }}
          placeholder={placeholder}
          onChange={handleChange}
          value={form.body}
        />
        <button
          type="submit"
          className="flex justify-center items-center h-8 w-12"
          disabled={disabled}
          onClick={handleSubmit}
        >
          <img
            className={disabled ? `opacity-50 cursor-not-allowed` : ""}
            src="/icons/ic_send-right.svg"
            alt="send"
          />
        </button>
      </form>

      <div className="bg-gray-500 h-px my-4" />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
