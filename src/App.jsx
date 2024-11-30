import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignUP from "./pages/SignUP";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Signin" element={<Signin />}/>
      <Route path="/SignUP" element={<SignUP />}/>
      <Route path="/Profile" element={<Profile />}/>
      <Route path="/About" element={<About />}/>
    </Routes>
    </BrowserRouter>
  )
}
