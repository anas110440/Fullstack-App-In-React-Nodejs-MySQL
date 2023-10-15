import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { AuthContext } from '../../helpers/AuthContext';

const Navbar = ({ name }) => {
  const { authState, setAuthState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({ username: '', id: 0, status: false });
  };
  return (
    <div className="navbar1">
      {authState.status && (
        <>
          <Link to="/"> Home Page</Link>
          <Link to="/createpost"> Create A Post</Link>
        </>
      )}
      {!authState.status ? (
        <>
          <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
        </>
      ) : (
        <>
          <span>{name}</span>
          <Link to="/" onClick={() => logout()}>
            {' '}
            Log Out
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
