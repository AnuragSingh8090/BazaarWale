import { Routes, Route, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Contact from "./pages/Contact/Contact";
import Error from "./pages/Error/Error";
import Cart from "./pages/Cart/Cart";
import About_Us from "./pages/About_Us/About_Us";
import Wishlist from "./pages/Wishlist/Wishlist";
import Privacy_Policy from "./pages/Privacy_Policy/Privacy_Policy";
import Terms_Conditions from "./pages/Terms_Conditions/Terms_Conditions";
import Cancellation_Return_Policy from "./pages/Cancellation_Return_Policy/Cancellation_Return_Policy";
import MyAccount from "./pages/MyAccount/MyAccount";
import Orders from "./pages/Orders/Orders";
import Checkout from "./pages/Checkout/Checkout";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import LoadingPage from "./components/loadinPage/LoadingPage";
import { ToastContainer } from "react-toastify";
import { useEffect, useRef } from "react";
import apiService from "./services/apiService";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, loginUser, stopLoading, updateRoute } from "./store/slices/userSlice";
import { errorToast } from "./components/Toasters/Toasters";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const abortControllerRef = useRef(null);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const { isLoggedIn, loading, lastRoute } = useSelector((state) => state.user)

  async function getUserBasicData() {
    abortControllerRef.current = new AbortController()
    const timeoutId = setTimeout(() => {
      abortControllerRef.current.abort();
    }, 10000);
    try {
      const response = await apiService.getBasicUserData(abortControllerRef.current.signal)
      const { user } = response
      dispatch(loginUser(user))

    }
    catch (error) {
      if (error.status !== 401 && error.name !== "AbortError") {
        console.log(error);
      }
      if (error.name === "AbortError" || error.name === 'CanceledError') {
        errorToast("Failed to Login, Please refresh")
      }
    }
    finally {
      clearTimeout(timeoutId);
      dispatch(stopLoading())
    }
  }

  useEffect(() => {
    getUserBasicData()
  }, [])

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      dispatch(updateRoute(location.pathname))
    }
  }, [location.pathname])



  if (loading) {
    return <LoadingPage />
  }

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to={lastRoute || "/"} replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to={lastRoute || "/"} replace /> : <Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about_us" element={<About_Us />} />
        <Route path="/terms_conditions" element={<Terms_Conditions />} />
        <Route path="/privacy_policy" element={<Privacy_Policy />} />
        <Route path="/cancellation_return_policy" element={<Cancellation_Return_Policy />} />
        <Route path="/electronics" element={<Products />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/clothing" element={<Products />} />
        <Route path="/kids" element={<Products />} />
        <Route path="/beauty" element={<Products />} />
        <Route path="/home_appliences" element={<Products />} />
        <Route path="/kitchen" element={<Products />} />
        <Route path="/personal_care" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer />
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;



export const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}

