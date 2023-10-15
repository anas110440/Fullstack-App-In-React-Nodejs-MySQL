import React,{useState ,useEffect , useContext} from 'react'
import { useParams,useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext';

import  axios  from 'axios';
const Profile = () => {
    let {id} = useParams();
    const [username,setUsername]= useState("")
    const [listOfPost,setListOfPost]= useState([])
      const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

   useEffect(()=>{
  axios.get(`http://localhost:3001/auth/profileinfo/${id}`).then((res)=>{
  setUsername(res.data.username)
  });
   
  axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((res)=>{
  setListOfPost(res.data)
  })

  },[]);

  return (
    <div className='profilePageContainer'>
        <div className="basicInfo">
            <h1>Username : {username} </h1>
        {authState.username === username &&
            <Link to='/changepassword'>Change Password</Link>}  
        </div>
 {listOfPost.map((post,key)=>{
          return (
          <div key={key} className='post'>
            <div className="title"  onClick={()=>navigate(`/post/${post.id}`)}> {post.title} </div>
              
              <div className="body"  onClick={()=>navigate(`/post/${post.id}`)}>
              <p>

              {post.postText}
              
              </p>
            
            </div>
            
            <div className="footer">
              
              <p className='d-inline'>
                {post.username}
                </p>
          
&nbsp;
            </div>
          
          </div>
)
        })}        </div>
  )
}

export default Profile