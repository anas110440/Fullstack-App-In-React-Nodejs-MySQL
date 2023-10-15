import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import CreatePost from './Pages/CreatePost/CreatePost';
import Navbar from './component/Navbar/Navbar';
import Post from './Pages/Post/Post';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Pages/Profile/Profile';
import NotFound from './Pages/NotFound/NotFound';
import ChangePassword from './Pages/ChangePassword/ChangePassword';

const App = () => {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <Navbar name={authState.username} set={setAuthState} />

        <Routes>
          <Route path="/" exact element={<Home set={setAuthState} />} />
          <Route path="/createpost" exact element={<CreatePost />} />
          <Route path="/post/:id" exact element={<Post />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/profile/:id" exact element={<Profile />} />
          <Route path="/changepassword" exact element={<ChangePassword />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
export default App;
