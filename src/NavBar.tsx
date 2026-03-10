import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "./SignIn-SignUp-Components/SignIn";
import SignUp from "./SignIn-SignUp-Components/SignUp";

function NavBar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSignIn(false);
        setShowSignUp(false);
      }
    };

    if (showSignIn || showSignUp) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showSignIn, showSignUp]);

  const handleLoginSuccess = () => {
    setShowSignIn(false);
    navigate('/');
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
    navigate('/');
  };

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <>
      <div className="nav-bar">
        <svg fill="none" height="48" viewBox="0 0 40 48" width="40" xmlns="http://www.w3.org/2000/svg">
          <g fill="#2563eb"><path d="m0 4h10v10h-10z"/>
            <path d="m20 4h10v10h-10z" opacity=".6"/><path d="m10 14h10v10h-10z" opacity=".6"/>
            <path d="m20 14h10v10h-10z" opacity=".45"/><path d="m30 14h10v10h-10z" opacity=".3"/>
            <path d="m0 24h10v10h-10z" opacity=".6"/><path d="m10 24h10v10h-10z" opacity=".45"/>
            <path d="m20 24h10v10h-10z" opacity=".3"/><path d="m30 24h10v10h-10z" opacity=".15"/>
            <path d="m10 34h10v10h-10z" opacity=".3"/><path d="m20 34h10v10h-10z" opacity=".15"/>
          </g>
        </svg>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Team">Team</Link></li>
          <li><Link to="/Blog">Blog</Link></li>
          <li><Link to="/About">About</Link></li>
        </ul>
        <button onClick={() => setShowSignIn(true)}>SignIn</button>
      </div>
      {showSignIn && (
        <div 
          style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: "white", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            zIndex: 1000
          }}
          onClick={() => setShowSignIn(false)}
        >
          <div 
            style={{ 
              backgroundColor: "white", 
              padding: "30px", 
              borderRadius: "12px", 
              position: "relative",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowSignIn(false)} 
              style={{ 
                position: "absolute", 
                top: "15px", 
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666"
              }}
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
          style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: "white", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            zIndex: 1000
          }}
          onClick={() => setShowSignUp(false)}
        >
          <div 
            style={{ 
              backgroundColor: "white", 
              padding: "30px", 
              borderRadius: "12px", 
              position: "relative",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowSignUp(false)} 
              style={{ 
                position: "absolute", 
                top: "15px", 
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666"
              }}
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
      )}
    </>
  );
}

export default NavBar;
