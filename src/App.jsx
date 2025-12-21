import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import LoadingPage from "./components/loadinPage/LoadingPage";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import checkBackendConnection from "./services/checkBackendConnection";
import loginInterceptor from "./services/loginIntercepter";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.loading);
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const isAuthPage =location.pathname === "/login" || location.pathname === "/register";


  loginInterceptor();

  useEffect(() => {
    checkBackendConnection();
  }, []);

  useEffect(()=>{
    localStorage.setItem('Last Path',location.pathname)
    navigate(localStorage.getItem('Last Path'))
    localStorage.removeItem('Last Path')
  },[])




  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={isLoggedin ? <Navigate to="/"  /> : <Login />} 
        />
        <Route
          path="/register"
          element={isLoggedin ? <Navigate to="/"  /> : <Register />}
        />
        <Route path="/electronics" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about_us" element={<About_Us />} />
        <Route path="/terms_conditions" element={<Terms_Conditions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/wishlist" element={  isLoggedin ? <Wishlist /> : <Navigate to="/login"  />} />
        <Route path="/privacy_policy" element={<Privacy_Policy />} />
        <Route
          path="/cancellation_return_policy"
          element={<Cancellation_Return_Policy />}
        />
        <Route path="/account" element={  isLoggedin ? <MyAccount /> : <Navigate to="/login"  />} />
        <Route path="/orders" element={  isLoggedin ? <Orders /> : <Navigate to="/login"  />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
