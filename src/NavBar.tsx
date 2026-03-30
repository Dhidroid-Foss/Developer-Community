// import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import SignIn from "./SignIn-SignUp-Components/SignIn";
// import SignUp from "./SignIn-SignUp-Components/SignUp";
import logo from './assets/Explorer-Null-Logo.png?url';
import './Overall-Style-sheet/NavBar.css';
import './Overall-Style-sheet/SignIn.css';
import './Overall-Style-sheet/SignUp.css';

function NavBar() {
  // const [showSignIn, setShowSignIn] = useState(false);
  // const [showSignUp, setShowSignUp] = useState(false);
   const navigate = useNavigate();

  // useEffect(() => {
  //   const handleEscape = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape') {
  //       setShowSignIn(false);
  //       setShowSignUp(false);
  //     }
  //   };

  //   if (showSignIn || showSignUp) {
  //     document.addEventListener('keydown', handleEscape);
  //     document.body.style.overflow = 'hidden';
  //   }

  //   return () => {
  //     document.removeEventListener('keydown', handleEscape);
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [showSignIn, showSignUp]);

  // const handleLoginSuccess = () => {
  //   setShowSignIn(false);
  //   navigate('/');
  // };

  // const handleSignUpSuccess = () => {
  //   setShowSignUp(false);
  //   navigate('/');
  // };

  // const switchToSignUp = () => {
  //   setShowSignIn(false);
  //   setShowSignUp(true);
  // };

  // const switchToSignIn = () => {
  //   setShowSignUp(false);
  //   setShowSignIn(true);
  // };

  return (

        <header className="nav-bar-elements">
          <div className="nav-bar-name-and-logo">
              <img className="Explorer-image" src={logo} alt="Logo" />
                <h3 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Explorer Null</h3>
            {/* <TbLocationQuestion /> */}
          </div>
            <div className="nav-bar-elements-link">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Team">Team</Link></li>
                <li><Link to="/Blog">Blog</Link></li>
                <li><Link to="/About">About</Link></li>
              </ul>
            </div>

        {/* <button onClick={() => setShowSignIn(true)}>SignIn</button>
      </div>
      {showSignIn && (
        <div 
          className="signin-modal-overlay"
          onClick={() => setShowSignIn(false)}
        >
          <div 
            className="signin-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowSignIn(false)} 
              className="signin-close-button"
            >
              ✕
            </button>
            <SignIn 
              onLoginSuccess={handleLoginSuccess} 
              onClose={() => setShowSignIn(false)}
              onSwitchToSignUp={switchToSignUp}
            />
          </div>
        </div>
      )}
      
      {showSignUp && (
        <div 
          className="signup-modal-overlay"
          onClick={() => setShowSignUp(false)}
        >
          <div 
            className="signup-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowSignUp(false)} 
              className="signup-close-button"
            >
              ✕
            </button>
            <SignUp 
              onSignUpSuccess={handleSignUpSuccess} 
              onClose={() => setShowSignUp(false)}
              onSwitchToSignIn={switchToSignIn}
            />
          </div>
        </div>
      )} */}
          </header>
  );
}

export default NavBar;
