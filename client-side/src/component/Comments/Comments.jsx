import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { AuthContext } from '../../helpers/AuthContext';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  let { Id } = useParams();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${Id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        'http://localhost:3001/comments',
        {
          commentBody: newComment,
          PostId: Id,
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment('');
        }
      });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <>
      <div className="addCommentContainer">
        <input
          type="text"
          placeholder="Comment..."
          autoComplete="off"
          value={newComment}
          required
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        />

        <button onClick={addComment}> Add Comment</button>
      </div>

      <div className="listOfComments">
        {comments.map((comment) => {
          return (
            <>
              <div key={comment.id} className="comment">
                {comment.commentBody}
                <div key={comment.id}> User Name : {comment.username}</div>
                {authState.username === comment.username && (
                  <button
                    className="btn btn-danger w-25"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
