// import { useState } from "react";
// import { TbLocationQuestion } from "react-icons/tb";
// import { supabase } from "../Config/supabase";
// import { useNavigate } from "react-router-dom";
// import '../Overall-Style-sheet/SignUp.css';

// function Signup({ onSignUpSuccess, onSwitchToSignIn }: {
//   onSignUpSuccess?: () => void;
//   onSwitchToSignIn?: () => void;
// }) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const SendOTP = async (
//     email: string,
//   ) => {
//     console.log("Sending OTP to:", email);
//     const { error } = await supabase.auth.signInWithOtp({
//       email,
//       options: {
//         emailRedirectTo: undefined,
//         shouldCreateUser: true,
//         data: { username }
//       },
//     });
//     if (error) {
//       console.error("Send OTP error:", error.message);
//       return { success: false, error: error.message };
//     }

//     console.log("OTP sent successfully!");
//     return { success: true };
//   };

//   const VerifyOTP = async (email: string, otp: string) => {
//     try {
//       const { data, error } = await supabase.auth.verifyOtp({
//         email,
//         token: otp,
//         type: 'email',
//       });

//       if (error) {
//         setError("Invalid OTP. Please try again.");
//         return false;
//       }

//       if (data.user) {
//         setSuccess("Email verified successfully! Redirecting...");
//         setTimeout(() => {
//           onSignUpSuccess?.();
//           navigate('/');
//         }, 1500);
//         return true;
//       }
//     } catch (err) {
//       console.error("Verification failed:", err);
//       setError("Verification failed. Please try again.");
//       return false;
//     }
//   };

//   async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!username || !email || !password || !confirmPassword) {
//       setError("Please fill in all fields!");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     const result = await SendOTP(email);
//     if (result.success) {
//       setShowOtpInput(true);
//       setSuccess("OTP sent to your email. Please verify.");
//     } else {
//       setError(result.error || "Failed to send OTP");
//     }
//   }

//   const handleOtpSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!otp) {
//       setError("Please enter the OTP");
//       return;
//     }

//     await VerifyOTP(email, otp);
//   };

//   const handleResendOtp = async () => {
//     setError("");
//     setSuccess("");
//     const result = await SendOTP(email);
//     if (result.success) {
//       setSuccess("OTP resent to your email.");
//       setOtp("");
//     } else {
//       setError("Failed to resend OTP");
//     }
//   };

//   return (
//     <>
//       <div className="App">
//         <TbLocationQuestion className="signup-icon" />
//         <h2>Signup Page</h2>
//         {error && <p className="signup-error">{error}</p>}
//         {success && <p className="signup-success">{success}</p>}
        
//         {!showOtpInput ? (
//           <form className="signup-form" onSubmit={handleSubmit}>
//             <div className="signup-form-group">
//               <label>Username:</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="signup-form-group">
//               <label>Email:</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="signup-form-group">
//               <label>Password:</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="signup-form-group">
//               <label>Confirm Password:</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>
//             <button type="submit">Sign Up</button>
//           </form>
//         ) : (
//           <form className="signup-form" onSubmit={handleOtpSubmit}>
//             <div className="signup-form-group">
//               <label>Enter OTP:</label>
//               <input
//                 type="text"
//                 placeholder="Enter the OTP sent to your email"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </div>
//             <button type="submit">Verify OTP</button>
//             <button type="button" onClick={handleResendOtp} style={{ marginTop: '10px', backgroundColor: '#666' }}>
//               Resend OTP
//             </button>
//           </form>
//         )}
        
//         <div className="signup-form-footer">
//           <p>
//             Already have an account?{" "}
//             <a onClick={onSwitchToSignIn}
//                className="signup-link">
//               Sign In
//             </a>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Signup;
