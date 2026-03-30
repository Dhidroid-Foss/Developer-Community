// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { TbLocationQuestion } from "react-icons/tb";
// import '../Overall-Style-sheet/SignIn.css';

// function SignIn({ onLoginSuccess, onClose, onSwitchToSignUp }: { 
//   onLoginSuccess?: () => void; 
//   onClose?: () => void;
//   onSwitchToSignUp?: () => void;
// }) {
//   const [username,setUsername] = useState("");
//   const [password,setPassword] = useState("");
//   const [error,setError] = useState("");
//   const [success,setSuccess] = useState("");

//   const navigate = useNavigate();

//   const handleEvent = (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!username || !password) {
//       setError("Please fill all fields!");
//       return;
//     }

//     setSuccess("Login successful! Redirecting...");
//     onLoginSuccess?.();
//     setTimeout(() => {
//       navigate("/Dashboard");
//     }, 1500);

//   };

//   return (
//     <>
//       <div>
//         <TbLocationQuestion className="signin-icon" />
//         <h3>Login Page</h3>

//         {error && <p className="signin-error">{error}</p>}
//         {success && <p className="signin-success">{success}</p>}
//         <div className="form-content">
//         <form className="signin-form" onSubmit={handleEvent}>
//           <div className="signin-form-group">
//             <label htmlFor="username">Username:</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div className="signin-form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//         </div>
//       </div>
//       <div className="signin-form-footer">
//         <p>
//           Don't have an account?{" "}
//           <a onClick={onSwitchToSignUp}
//              className="signin-link">
//             Sign up
//           </a>
//         </p>
//         <p>
//           Forgot password- <span onClick={() => { onClose?.(); navigate("/ResetPassword"); }}
//           className="forgot-link">
//             Click Here
//           </span>
//         </p>
//       </div>
//     </>
//   );
// }

// export default SignIn;
