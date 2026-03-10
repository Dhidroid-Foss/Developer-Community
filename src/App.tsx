import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./Index";
import SignIn from "./SignIn-SignUp-Components/SignIn";
import Signup from "./SignIn-SignUp-Components/SignUp";
import NavBar from "./NavBar";
import Footer from "./Footer";
import OtpVerfication from "./SignIn-SignUp-Components/OtpVerfication";
import ResetKey from "./SignIn-SignUp-Components/ResetPassword";
import "./App.css";
import About from "./Nav-Componentes/About";
import TeamPage from "./Nav-Componentes/Team";
import Blog from "./Nav-Componentes/Blog";
import Event from "./Footer-Link-Components/Event";


function AppContent() {
  const location = useLocation();
  const hideNavBar = ["/signup", "/signin", "/ResetPassword"].includes(location.pathname);

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/OtpVerify" element={<OtpVerfication />} />
        <Route path="/ResetPassword" element={<ResetKey />} />
        <Route path="/About" element={<About />} />
        <Route path="/Team" element={<TeamPage />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Event" element={<Event />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;