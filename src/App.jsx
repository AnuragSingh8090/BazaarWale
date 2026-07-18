import { Routes, Route } from "react-router-dom";
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

function App() {
  const isAuthPage = false;
  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/electronics" element={<Products />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about_us" element={<About_Us />} />
        <Route path="/terms_conditions" element={<Terms_Conditions />} />
        <Route path="/privacy_policy" element={<Privacy_Policy />} />
        <Route path="/cancellation_return_policy" element={<Cancellation_Return_Policy />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/clothing" element={<Products />} />
        <Route path="/kids" element={<Products />} />
        <Route path="/beauty" element={<Products />} />
        <Route path="/home_appliences" element={<Products />} />
        <Route path="/kitchen" element={<Products />} />
        <Route path="/personal_care" element={<Products />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer />
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
