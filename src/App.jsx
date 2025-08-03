import { Routes, Route, useLocation } from "react-router-dom";
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
import { loginUser, logoutUser, loginStart } from "./store/slices/userSlice";
import axios from "axios";
import checkBackendConnection from "./services/checkBackendConnection";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const isUserLoading = useSelector((state) => state.user.loading);

  const ValidateUserLogin = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      dispatch(logoutUser());
      return;
    }

    try {
      dispatch(loginStart());
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/userdatabasic`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { name, email, userId, cart } = response.data.user;
      dispatch(loginUser({ name, email, userId, cart, token }));
    } catch (error) {
      dispatch(logoutUser());
    }
  };

  const validateUserEveryTime = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      dispatch(logoutUser());
      return;
    }
  };

  useEffect(() => {
    validateUserEveryTime();
  }, [location.pathname]);

  useEffect(() => {
    checkBackendConnection();
    ValidateUserLogin();
  }, []);

  if (isUserLoading) {
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
          element={isLoggedin ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/electronics" element={<Products />} />
        <Route
          path="/register"
          element={isLoggedin ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about_us" element={<About_Us />} />
        <Route path="/terms_conditions" element={<Terms_Conditions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/wishlist" element={isLoggedin ? <Wishlist /> : <Navigate to="/login" />} />
        <Route path="/privacy_policy" element={<Privacy_Policy />} />
        <Route
          path="/cancellation_return_policy"
          element={<Cancellation_Return_Policy />}
        />
        <Route path="/account" element={isLoggedin ? <MyAccount /> : <Navigate to="/login" />} />
        <Route path="/orders" element={isLoggedin ? <Orders /> : <Navigate to="/login" />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
