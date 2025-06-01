import { Routes, Route, useLocation, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Contact from "./pages/Contact/Contact";
import Error from "./pages/Error/Error";
import Cart from "./pages/Cart/Cart";
import About_Us from "./pages/About_Us/About_Us";
import FAQ from "./pages/FAQ/FAQ";
import Wishlist from "./pages/Wishlist/Wishlist";
import Privacy_Policy from "./pages/Privacy_Policy/Privacy_Policy";
import Terms_Conditions from "./pages/Terms_Conditions/Terms_Conditions";
import Cancellation_Return_Policy from "./pages/Cancellation_Return_Policy/Cancellation_Return_Policy";
import MyAccount from "./pages/MyAccount/MyAccount";
import Orders from "./pages/Orders/Orders";
import Checkout from "./pages/Checkout/Checkout";
import Products from "./pages/Products/Products";
import { ToastContainer } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./redux/loginSlice";
import { useEffect, useState } from "react";
import { setUserData } from "./redux/userSlice";


function App() {
  const isLoggedin = useSelector((state)=> state.login.isLoggedin)
  const dispatch = useDispatch()
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  useEffect(()=>{
    const userStatus = JSON.parse(localStorage.getItem('isLoggedin') || false);
    if(userStatus){
      dispatch(loginUser())
      dispatch(setUserData())
    }
    else{
      dispatch(logoutUser())
    }
  })

  return (
    <>
      {!isAuthPage && <Navbar /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={isLoggedin ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isLoggedin ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/electronics" element={<Products />} />
        <Route path="/clothing" element={<Products />} />
        <Route path="/kids" element={<Products />} />
        <Route path="/beauty" element={<Products />} />
        <Route path="/home_appliences" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/kitchen" element={<Products />} />
        <Route path="/personal_care" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={isLoggedin ? <Checkout/> :  <Navigate to="/login" state={{ from: location }} replace /> } />
        <Route path="/about_us" element={<About_Us />} />
        <Route path="/terms_conditions" element={<Terms_Conditions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/wishlist" element={isLoggedin ? <Wishlist/> : <Navigate to="/login" state={{ from: location }} replace />}  />
        <Route path="/privacy_policy" element={<Privacy_Policy />} />
        <Route path="/cancellation_return_policy" element={<Cancellation_Return_Policy />} />
        <Route path="/account" element={isLoggedin ? <MyAccount/> : <Navigate to="/login" state={{ from: location }} replace />}  />
        <Route path="/orders" element={isLoggedin ? <Orders/> : <Navigate to="/login" state={{ from: location }} replace />}  />
        <Route path="*" element={<Error />} />
      </Routes>
      {!isAuthPage && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;
