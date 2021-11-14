import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";

const mapStateToProps = (state) => ({ ...state.post });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Post({ data, dataComment, loading, actions }) {
  let params = useParams();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    actions.fetchComments(params);
  }, []);

  useEffect(() => {
    if (dataComment) {
      setComments(dataComment);
    }
  }, [dataComment]);

  const CommentItem = ({ data }) => {
    return (
      <div>
        <div>
          <span className="font-bold">{data.name}</span>
        </div>
        <p>{data.body}</p>
      </div>
    );
  };

  const CommentSection = () => {
    if (comments.length === 0) {
      return "No comments here";
    }

    if (loading) {
      return "Loading comments...";
    }

    return (
      <section className="px-8">
        {comments.map((comment) => {
          return <CommentItem data={comment} key={comment.id} />;
        })}
      </section>
    );
  };

  return (
    <section>
      <div>
        <div>
          <span className="font-bold">{data.name}</span>{" "}
          <span>@{data.username}</span>
        </div>
        <div>
          <p>{data.body}</p>
        </div>
        <div className="bg-gray-200 h-2 rounded-full my-4" />
        <CommentSection />
      </div>
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
