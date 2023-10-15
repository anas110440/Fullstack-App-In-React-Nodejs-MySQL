import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { AuthContext } from '../../helpers/AuthContext';

const Home = () => {
  const [listOfPosts, setLitOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    } else {
      Axios.get('http://localhost:3001/posts', {
        headers: { accessToken: localStorage.getItem('accessToken') },
      }).then((res) => {
        setLitOfPosts(res.data.listOfPosts);
        setLikedPosts(
          res.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
    }
  }, []);
  const likesApost = (id) => {
    Axios.post(
      'http://localhost:3001/like',
      { PostId: id },
      { headers: { accessToken: localStorage.getItem('accessToken') } }
    ).then((res) => {
      setLitOfPosts(
        listOfPosts.map((post) => {
          if (post.id === id) {
            if (res.data.liked) {
              return { ...post, Likes: [...post.Likes, 0] };
            } else {
              const likesArray = post.Likes;
              likesArray.pop();

              return { ...post, Likes: likesArray };
            }
          } else {
            return post;
          }
        })
      );
      if (likedPosts.includes(id)) {
        setLikedPosts(
          likedPosts.filter((postId) => {
            return postId !== id;
          })
        );
      } else {
        setLikedPosts([...likedPosts, id]);
      }
    });
  };

  return (
    <>
      {listOfPosts.map((post, key) => {
        return (
          <div key={key} className="post">
            <div className="title" onClick={() => navigate(`/post/${post.id}`)}>
              {' '}
              {post.title}{' '}
            </div>

            <div className="body" onClick={() => navigate(`/post/${post.id}`)}>
              <p>{post.postText}</p>
            </div>

            <div className="footer">
              <p className="d-inline">
                <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
              </p>
              {authState.status ? (
                //                 <i className='far fa-thumbs-down'></i>
                //
                <>
                  <i
                    className={
                      likedPosts.includes(post.id)
                        ? 'far fa-thumbs-down fa-2x  ms-5 me-2'
                        : 'fas fa-thumbs-up fa-2x me-2  ms-5'
                    }
                    onClick={() => likesApost(post.id)}
                  ></i>
                  <label htmlFor=""> {post.Likes.length}</label>
                </>
              ) : (
                <i className="far fa-thumbs-up fa-2x float-end me-5"></i>
              )}
              &nbsp;
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
