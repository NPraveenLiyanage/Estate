import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignUP from "./pages/SignUP";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Signin" element={<Signin />}/>
      <Route path="/SignUP" element={<SignUP />}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/listing/:listingId" element={<Listing />}/>

      <Route element={<PrivateRoute />}> 
        <Route path="/Profile" element={<Profile />}/>
        <Route path="/create-listing" element={<CreateListing />}/>
        <Route path="/update-listing/:listingId" element={<UpdateListing />}/>
      </Route>

      <Route path="/About" element={<About />}/>
    </Routes>
    </BrowserRouter>
  )
}
