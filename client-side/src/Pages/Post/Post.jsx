import React,{useState ,useEffect , useContext} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import './style.css'
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate } from "react-router-dom";

import Comments from '../../component/Comments/Comments';

const Post = () => {
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const [postObject,setPostObject] = useState({});

  useEffect(()=>{
  Axios.get(`http://localhost:3001/posts/byId/${id}`).then((res)=>{
  setPostObject(res.data)
  })
  },[]);
const deletePost =(id)=>{
    Axios.delete(`http://localhost:3001/posts/${id}` , 
        {headers:{accessToken: localStorage.getItem("accessToken")}}
).then(()=>{
      navigate('/');
    }

    )
}

const editPost=(option)=>{
  if(option === "title"){
let newTitle = prompt("Enter a new title:")

Axios.put("http://localhost:3001/posts/title" ,{
  newTitle : newTitle,
  id: id
} ,
{headers:{accessToken: localStorage.getItem("accessToken")}}
).then(()=>{
   setPostObject({...postObject,title:newTitle});
}

    )
  }else{
let newPost = prompt("Enter a new Post:");
    
Axios.put("http://localhost:3001/posts/postText" ,{
  newText : newPost,
  id: id
} ,
{headers:{accessToken: localStorage.getItem("accessToken")}}
).then(()=>{
   setPostObject({...postObject,postText:newPost});
}

    )

  }
}

  return (
        <>
     <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title" onClick={()=>{

            if(authState.username === postObject.username){
              
              editPost("title")
            }
          }}
          > {postObject.title}

          {authState.username === postObject.username &&
          (<i className="fas fa-trash me-auto" onClick={()=>deletePost(postObject.id)}></i>
)}           </div>
          <div className="body" onClick={()=>{

            if(authState.username === postObject.username){
              
              editPost("body")
            }
          }}>{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <Comments />
      </div>
    </div>

    </>
  )
}

export default Post