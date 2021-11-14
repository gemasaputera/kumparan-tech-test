import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";
import NavigationArrow from "../../components/NavigationArrow";
import CommentInput from "../../components/CommentInput";
import CommentItem from "../../components/CommentItem";

const mapStateToProps = (state) => ({ ...state.post });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Post({ data, dataComment, loading, actions }) {
  let params = useParams();
  let navigate = useNavigate();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    actions.fetchComments(params);
  }, []);

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

  return (
    <section
      className="bg-white relative px-5"
      style={{ marginTop: 55, paddingBottom: 60 }}
    >
      <NavigationArrow title="Post" />
      <div className="py-4">
        <div className="flex flex-col mb-4">
          <span
            className="font-bold text-xl cursor-pointer hover:underline"
            onClick={() => handleClick(data)}
          >
            {data.name}
          </span>{" "}
          <span className="text-gray-400 text-sm">@{data.username}</span>
        </div>
        <div>
          <p>{data.body}</p>
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
