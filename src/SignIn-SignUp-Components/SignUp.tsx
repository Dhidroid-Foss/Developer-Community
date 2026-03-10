import { useState } from "react";
import { TbLocationQuestion } from "react-icons/tb";
import { supabase } from "../Config/supabase";
import { useNavigate } from "react-router-dom";

function Signup({ onSignUpSuccess, onClose, onSwitchToSignIn }: {
  onSignUpSuccess?: () => void;
  onClose?: () => void;
  onSwitchToSignIn?: () => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const SendOTP = async (
    email: string,
  ) => {
    console.log("Sending OTP to:", email);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { username },
        shouldCreateUser: false
      },
    });
    if (error) {
      console.error("Send OTP error:", error.message);
      return { success: false, error: error.message };
    }

    console.log("OTP sent successfully!");
    return { success: true };
  };

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // switch (true) {
    //   case !username || !email || !password || !confirmPassword:
    //     setError("Please fill in all fields!");
    //     return;

    //   case password.length < 9:
    //     setError("Password must be at least 9 characters!");
    //     return;

    //   case password !== confirmPassword:
    //     setError("Passwords do not match!");
    //     return;
    // }

    // const existingUser = users.find(
    //   (u) => u.username === username || u.email === email,
    // );
    // if (existingUser) {
    //   setError("Username or Email already exists! Please login.");
    //   return;
    // }

    await SendOTP(email);
    setSuccess("Account created successfully!");
    
    setTimeout(() => {
      onSignUpSuccess?.();
    }, 1500);
  }

  return (
    <>
      <div className="App">
        <TbLocationQuestion />
        <h2>Signup Page</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        
        <div>
          <p>
            Already have an account?{" "}
            <a onClick={onSwitchToSignIn}
               style={{ cursor: "pointer", color: "blue" }}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
