import { useState, useEffect } from "react";
import { sucessToast, errorToast } from "../../components/Toasters/Toasters";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser, updateUserData } from "../../store/slices/userSlice";

const MyAccount = () => {
  const [userLoading, setUserLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    isEmailVerified: null,
    isMobileVerified: null,
    twoFactorAuth: null,
    loginActivity: null,
    address: [],
    paymentMethod: [],
    gender: "",
  });

  const fetchUserData = async () => {
    const token = localStorage.getItem("userToken");
    try {
      setUserLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/userdata`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = response.data.user;
      setUserData({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isEmailVerified: user.isEmailVerified,
        isMobileVerified: user.isMobileVerified,
        twoFactorAuth: user.twoFactorAuth,
        gender: user.gender,
      });
      setUserLoading(false);
      console.log("response", response.data.user);
    } catch (error) {
      // setUserLoading(false);
      if (error.response.data.message === "jwt expired") {
        errorToast("Session Expired!! Please Login again");
        dispatch(logoutUser());
      } else {
        errorToast("Something Went Wrong, Failed to get Data!!");
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const dispatch = useDispatch();
  // UPI Image path
  const upiLogoPath = "/upi.svg";

  // CSS for animations and transitions
  const activeNavStyle = `
    .section-transition {
      transition: all 0.3s ease-in-out;
    }
    .section-active {
      box-shadow: 0 0 10px rgba(0, 100, 255, 0.1);
      transform: translateY(-2px);
    }
  `;

  // User information state
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    isEmailVerified: null,
    isMobileVerified: null,
  });

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      gender: userData.gender,
      isEmailVerified: userData.isEmailVerified,
      isMobileVerified: userData.isMobileVerified,
      address: userData.address,
    });
  }, [userData]);

  // Login activity
  const [loginActivity, setLoginActivity] = useState([
    {
      id: 1,
      device: "Windows PC",
      browser: "Chrome 118",
      location: "Bangalore, India",
      ip: "103.27.XX.XX",
      time: "2 hours ago",
      current: true,
    },
    {
      id: 2,
      device: "iPhone 13",
      browser: "Safari Mobile",
      location: "Bangalore, India",
      ip: "103.27.XX.XX",
      time: "Yesterday, 8:45 PM",
      current: false,
    },
    {
      id: 3,
      device: "MacBook Pro",
      browser: "Firefox 115",
      location: "Mumbai, India",
      ip: "117.55.XX.XX",
      time: "Oct 15, 2023, 10:12 AM",
      current: false,
    },
  ]);

  const handleLogoutDevice = (id) => {
    // In production this would make an API call to invalidate the session
    setLoginActivity(loginActivity.filter((device) => device.id !== id));
    sucessToast("Device logged out successfully!");
  };

  const handleLogoutAllDevices = () => {
    // In production this would make an API call to invalidate all sessions except current
    const currentDevice = loginActivity.find((device) => device.current);
    setLoginActivity(currentDevice ? [currentDevice] : []);
    sucessToast("Logged out from all other devices!");
  };

  // For edit mode toggle
  const [editMode, setEditMode] = useState({
    profile: false,
    password: false,
    address: false,
    payment: false,
  });

  // Active section state for navigation
  const [activeSection, setActiveSection] = useState("profile");

  // Sections for navigation
  const sections = [
    { id: "profile", title: "Profile Information", icon: "fa-user" },
    { id: "security", title: "Security Settings", icon: "fa-shield-halved" },
    { id: "addresses", title: "Address Book", icon: "fa-map-location-dot" },
    { id: "payments", title: "Payment Methods", icon: "fa-credit-card" },
    { id: "orders", title: "My Orders", icon: "fa-box" },
    { id: "wishlist", title: "My Wishlist", icon: "fa-heart" },
  ];

  // Handle scroll to track active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let foundActive = false;

      // Check sections in reverse order to prioritize the ones lower on the page
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(`section-${section.id}`);

        if (element && element.offsetTop <= scrollPosition) {
          if (activeSection !== section.id) {
            setActiveSection(section.id);
          }
          foundActive = true;
          break;
        }
      }

      // Special handling for delete account section
      if (!foundActive) {
        const deleteSection = document.getElementById("section-delete-account");
        if (deleteSection && deleteSection.offsetTop <= scrollPosition) {
          setActiveSection("delete-account");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(
      `section-${sectionId === "delete-account" ? "delete-account" : sectionId}`
    );
    if (section) {
      // Set active before scrolling for immediate visual feedback
      setActiveSection(sectionId);
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Form state for password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userProfileUpdateLoading, setUserProfileUpdateLoading] =
    useState(false);
  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const userUpdatedDetails = {
      name: userInfo.name,
      email: userInfo.email,
      gender: userInfo.gender,
      mobile: userInfo.mobile,
      isMobileVerified: userInfo.isMobileVerified,
      isEmailVerified: userInfo.isEmailVerified,
    };
    try {
      setUserProfileUpdateLoading(true);
      const token = localStorage.getItem("userToken");
      if (!token) {
        errorToast("Failed to update Profile");
        dispatch(logoutUser());
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/update-user-profile`,
        userUpdatedDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateUserData({ name: userInfo.name, email: userInfo.email }));
      setUserData({
        ...userData,
        name: userInfo.name,
        email: userInfo.email,
        mobile: userInfo.mobile,
        gender: userInfo.gender,
        isMobileVerified: userInfo.isMobileVerified,
        isMobileVerified: userInfo.isMobileVerified,
      });
      setUserProfileUpdateLoading(false);
      sucessToast("Profile updated successfully!");
      setEditMode({ ...editMode, profile: false });
    } catch (error) {
      setUserProfileUpdateLoading(false);
      if (error.response.data.message === "jwt expired") {
        errorToast("Session Expired!! Please Login again");
        dispatch(logoutUser());
      } else {
        errorToast("Failed to Update Profile!!");
        console.log(error);
      }
    }
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errorToast("Passwords do not match!");
      return;
    }
    sucessToast("Password updated successfully!");
    setEditMode({ ...editMode, password: false });
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Handle account deletion confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("userToken");
    try {
      setDeleteLoading(true);
      if (!token) {
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/delete-user`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowDeleteConfirm(false);
      setDeleteLoading(false);
      dispatch(logoutUser());
      sucessToast("Account deleted successfully!");
    } catch (error) {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
      if (error.response.data.message === "jwt expired") {
        errorToast("Session Expired!! Please Login again");
        dispatch(logoutUser());
      } else {
        console.log(error);
        errorToast(error.response.data.message);
      }
    }
  };

  // Email verification
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);

  const handleSendEmailOTP = async () => {
    try {
      setEmailLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/verify-user-email`,
        { email: userInfo.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      sucessToast("Verification code sent to your email!");
      setShowEmailVerify(true);
      setEmailLoading(false);
    } catch (error) {
      setEmailLoading(false);
      if (error.response.data.message === "jwt expired") {
        errorToast("Session Expired!! Please Login again");
        dispatch(logoutUser());
      } else {
        errorToast("Something Went Wrong, Failed to send OTP!!");
        console.log(error);
      }
    }
  };

  const verifyEmail = async () => {
    if (emailOtp.length !== 6) {
      errorToast("Please enter a valid 6-digit code");
      return;
    }

    try {
      setEmailOtpLoading(true);
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/user/auth/verify-user-email-otp`,
        { email: userInfo.email, otp: emailOtp },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      setEmailOtpLoading(false);
      setUserData({ ...userData, isEmailVerified: true });
      setUserInfo({ ...userInfo, isEmailVerified: true });
      sucessToast("Email verified successfully!");
      setShowEmailVerify(false);
      setEmailOtp("");
    } catch (error) {
      setEmailOtpLoading(false);
      if (error.response.data.message === "jwt expired") {
        errorToast("Session Expired!! Please Login again");
        dispatch(logoutUser());
      } else {
        console.log(error);
        errorToast(error.response.data.message);
      }
    }
  };

  // Mobile verification
  const [showMobileVerify, setShowMobileVerify] = useState(false);
  const [mobileLoading, setMobileLoading] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [mobileOtpLoading, setMobileOtpLoading] = useState(false);

  const handleSendMobileOTP = () => {
    // sucessToast("Verification code sent to your mobile number!");
    errorToast("This Service is Not Enabled Yet!!");
    // setShowMobileVerify(true);
  };

  const verifyMobile = () => {
    if (mobileOtp.length === 6) {
      setUserInfo({ ...userInfo, isMobileVerified: true });
      sucessToast("Mobile number verified successfully!");
      setShowMobileVerify(false);
      setMobileOtp("");
    } else {
      errorToast("Please enter a valid 6-digit code");
    }
  };

  const [twoFactorAuthLoading, setTwoFactorAuthLoading] = useState(false);
  // Update Two Factor Auth
  const updateTwoFactorAuth = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    try {
      setTwoFactorAuthLoading(true);
      if (!token) {
        return;
      }
      setUserData({ ...userData, twoFactorAuth: e.target.checked });
      const stringTwoFactorAuth = userData.twoFactorAuth ? "false" : "true";
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/user/auth/manage-twofactor-auth `,
        { twoFactorAuth: stringTwoFactorAuth },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTwoFactorAuthLoading(false);
      sucessToast(response.data.message);
    } catch (error) {
      setTwoFactorAuthLoading(false);
      if (error.response.data.message === "jwt expired") {
        errorToast("Session Expired!! Please Login again");
        dispatch(logoutUser());
      } else {
        console.log(error);
        errorToast(error.response.data.message);
      }
    }
  };

  const [loginActivityLoading, setLoginActivityLoading] = useState(false);
  // Update Login Activity
  const updateLoginActivity = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    try {
      setLoginActivityLoading(true);
      if (!token) {
        return;
      }
      setUserData({ ...userData, loginActivity: e.target.checked });
      const stringLoginActivity = userData.loginActivity ? "false" : "true";
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/user/auth/manage-login-activity`,
        { loginActivity: stringLoginActivity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoginActivityLoading(false);
      sucessToast(response.data.message);
    } catch (error) {
      setLoginActivityLoading(false);
      if (error.response.data.message === "jwt expired") {
        errorToast("Session Expired!! Please Login again");
        dispatch(logoutUser());
      } else {
        console.log(error);
        errorToast(error.response.data.message);
      }
    }
  };

  // Address management
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      mobile: "9876543210",
      street: "123 Main Street",
      city: "Tech City",
      state: "State",
      pincode: "560001",
      type: "home",
      isDefault: true,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    id: null,
    name: "",
    mobile: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    type: "home",
    isDefault: false,
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleAddAddress = (e) => {
    e.preventDefault();

    if (isEditingAddress) {
      // Update existing address
      const updatedAddresses = addresses.map((addr) => {
        if (addr.id === newAddress.id) {
          return newAddress;
        }
        // If the edited address is marked as default, update other addresses
        if (newAddress.isDefault && addr.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });

      setAddresses(updatedAddresses);
      sucessToast("Address updated successfully!");
    } else {
      // Add new address
      const addressId =
        addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;

      // If this is the first address or marked as default, make it default
      const updatedAddresses = newAddress.isDefault
        ? addresses.map((addr) => ({ ...addr, isDefault: false }))
        : [...addresses];

      setAddresses([
        ...updatedAddresses,
        {
          ...newAddress,
          id: addressId,
          isDefault: newAddress.isDefault || addresses.length === 0,
        },
      ]);
      sucessToast("Address added successfully!");
    }

    setEditMode({ ...editMode, address: false });
    setIsEditingAddress(false);
    setNewAddress({
      id: null,
      name: "",
      mobile: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      type: "home",
      isDefault: false,
    });
  };

  const editAddress = (address) => {
    setNewAddress({ ...address });
    setIsEditingAddress(true);
    setEditMode({ ...editMode, address: true });
  };

  const setDefaultAddress = (id) => {
    const selectedAddress = addresses.find((addr) => addr.id === id);
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    sucessToast(`Default address set to ${selectedAddress.city}`);
  };

  const deleteAddress = (id) => {
    const addressToDelete = addresses.find((a) => a.id === id);
    const remainingAddresses = addresses.filter((a) => a.id !== id);

    // If deleted address was default, make another one default
    if (addressToDelete.isDefault && remainingAddresses.length > 0) {
      remainingAddresses[0].isDefault = true;
    }

    setAddresses(remainingAddresses);
    sucessToast("Address deleted successfully!");
  };

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "credit",
      cardNumber: "**** **** **** 1234",
      name: "John Doe",
      expiryDate: "12/25",
      isDefault: true,
    },
  ]);

  const [newPayment, setNewPayment] = useState({
    id: null,
    type: "credit",
    cardNumber: "",
    name: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
    upiId: "",
  });

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentType, setPaymentType] = useState("card"); // card, upi
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const handleAddPayment = (e) => {
    e.preventDefault();

    if (isEditingPayment) {
      // Update existing payment method
      let updatedPayments;

      if (paymentType === "card") {
        // For card payment update
        const lastFour = newPayment.cardNumber.includes("*")
          ? newPayment.cardNumber.slice(-4)
          : newPayment.cardNumber.slice(-4);

        const maskedNumber = newPayment.cardNumber.includes("*")
          ? newPayment.cardNumber
          : `**** **** **** ${lastFour}`;

        updatedPayments = paymentMethods.map((method) => {
          if (method.id === newPayment.id) {
            return {
              ...newPayment,
              cardNumber: maskedNumber,
            };
          }
          // If edited method is marked as default, update others
          if (newPayment.isDefault && method.isDefault) {
            return { ...method, isDefault: false };
          }
          return method;
        });
      } else {
        // For UPI update
        updatedPayments = paymentMethods.map((method) => {
          if (method.id === newPayment.id) {
            return {
              ...method,
              upiId: newPayment.upiId,
              isDefault: newPayment.isDefault,
            };
          }
          // If edited method is marked as default, update others
          if (newPayment.isDefault && method.isDefault) {
            return { ...method, isDefault: false };
          }
          return method;
        });
      }

      setPaymentMethods(updatedPayments);
      sucessToast("Payment method updated successfully!");
    } else if (paymentType === "card") {
      const paymentId =
        paymentMethods.length > 0
          ? Math.max(...paymentMethods.map((p) => p.id)) + 1
          : 1;

      // Mask card number
      const lastFour = newPayment.cardNumber.slice(-4);
      const maskedNumber = `**** **** **** ${lastFour}`;

      // If marked as default, update others
      const updatedPayments = newPayment.isDefault
        ? paymentMethods.map((p) => ({ ...p, isDefault: false }))
        : [...paymentMethods];

      setPaymentMethods([
        ...updatedPayments,
        {
          id: paymentId,
          type: newPayment.type,
          cardNumber: maskedNumber,
          name: newPayment.name,
          expiryDate: newPayment.expiryDate,
          isDefault: newPayment.isDefault || paymentMethods.length === 0,
        },
      ]);

      sucessToast("Payment method added successfully!");
    } else if (paymentType === "upi") {
      const paymentId =
        paymentMethods.length > 0
          ? Math.max(...paymentMethods.map((p) => p.id)) + 1
          : 1;

      // If marked as default, update others
      const updatedPayments = newPayment.isDefault
        ? paymentMethods.map((p) => ({ ...p, isDefault: false }))
        : [...paymentMethods];

      setPaymentMethods([
        ...updatedPayments,
        {
          id: paymentId,
          type: "upi",
          upiId: newPayment.upiId,
          isDefault: newPayment.isDefault || paymentMethods.length === 0,
        },
      ]);

      sucessToast("UPI ID added successfully!");
    }

    setShowPaymentForm(false);
    setIsEditingPayment(false);
    setNewPayment({
      id: null,
      type: "credit",
      cardNumber: "",
      name: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
      upiId: "",
    });
  };

  const editPaymentMethod = (method) => {
    setPaymentType(method.type === "upi" ? "upi" : "card");
    setNewPayment({
      ...method,
      cvv: "", // Always reset CVV for security
    });
    setIsEditingPayment(true);
    setShowPaymentForm(true);
  };

  const deletePaymentMethod = (id) => {
    const methodToDelete = paymentMethods.find((p) => p.id === id);
    const remainingMethods = paymentMethods.filter((p) => p.id !== id);

    // If deleted method was default, make another one default
    if (methodToDelete.isDefault && remainingMethods.length > 0) {
      remainingMethods[0].isDefault = true;
    }

    setPaymentMethods(remainingMethods);
    sucessToast("Payment method removed!");
  };

  const setDefaultPayment = (id) => {
    const selectedMethod = paymentMethods.find((method) => method.id === id);
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );

    if (selectedMethod.type === "upi") {
      sucessToast(`Default payment set to UPI: ${selectedMethod.upiId}`);
    } else {
      const lastFour = selectedMethod.cardNumber.slice(-4);
      sucessToast(
        `Default payment set to ${selectedMethod.name}'s card (${lastFour})`
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen py-12 px-4">
      <ScrollToTop />
      <style>{activeNavStyle}</style>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-3">
            My Account
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Manage your profile, security settings, and account preferences
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky xl:top-31 lg:top-[165px]">
              {/* User Profile Summary */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
                {userLoading ? (
                  <div className="h-[152px] w-full rounded-md bg-gray-300 animate-pulse"></div>
                ) : (
                  <div className=" bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 border-4 border-white shadow-lg cursor-pointer">
                        <span className="text-2xl text-blue-500 font-bold">
                          {userData.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </span>
                      </div>
                      <h2 className="text-base font-bold">
                        {userData.name.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <p className="text-blue-100 text-xs">{userData.email}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Menu */}
              {userLoading ? (
                <div className="h-[332px] w-full rounded-xl shadow-md bg-gray-300 animate-pulse"></div>
              ) : (
                <div className="bg-white  rounded-xl shadow-md overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-xs font-medium text-[var(--primary)]">
                      Account Settings
                    </h3>
                  </div>
                  <div className="py-2 px-2">
                    <ul className="space-y-0.5">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <button
                            onClick={() => scrollToSection(section.id)}
                            className={`w-full flex items-center text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                              activeSection === section.id
                                ? "bg-blue-50 text-[var(--primary)] font-medium translate-x-1"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <i
                              className={`fa-solid ${
                                section.icon
                              } w-5 text-center mr-2 transition-all duration-300 ${
                                activeSection === section.id
                                  ? "text-[var(--primary)] scale-110"
                                  : "text-gray-400"
                              }`}
                            ></i>
                            <span
                              className={`transition-all duration-300 ${
                                activeSection === section.id
                                  ? "translate-x-0.5"
                                  : ""
                              }`}
                            >
                              {section.title}
                            </span>
                          </button>
                        </li>
                      ))}

                      <li className="pt-1.5 mt-1.5 border-t border-gray-100">
                        <button
                          onClick={() => scrollToSection("delete-account")}
                          className="w-full flex items-center text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all duration-300 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash w-5 text-center mr-2"></i>
                          Delete Account
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings */}
            {userLoading ? (
              <div className="h-[233px] w-full rounded-xl shadow-md bg-gray-300 animate-pulse"></div>
            ) : (
              <div
                id="section-profile"
                className="bg-white rounded-xl shadow-md overflow-hidden scroll-mt-24"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Profile Information
                    </h2>
                    <p className="text-sm text-gray-600">
                      Update your personal details
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditMode({ ...editMode, profile: !editMode.profile })
                    }
                    className="text-[var(--primary)] text-sm font-medium hover:underline flex items-center cursor-pointer"
                  >
                    <i
                      className={`fa-solid ${
                        editMode.profile ? "fa-times" : "fa-pen"
                      } mr-1`}
                    ></i>
                    {editMode.profile ? "Cancel" : "Edit"}
                  </button>
                </div>

                <div className="p-6">
                  {editMode.profile ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="fullname"
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            <i className="fa-solid fa-user text-[var(--primary)] mr-1"></i>
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullname"
                            value={userInfo.name}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                name: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="mobile"
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            <i className="fa-solid fa-phone text-[var(--primary)] mr-1"></i>
                            Gender
                          </label>
                          <div className="flex">
                            <select
                              value={userInfo.gender}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  gender: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                            >
                              <option value="" disabled>
                                {" "}
                                Select Gender
                              </option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="others">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="mobile"
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            <i className="fa-solid fa-phone text-[var(--primary)] mr-1"></i>
                            Mobile Number
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              id="mobile"
                              value={userInfo.mobile}
                              maxLength={10}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  mobile: e.target.value.replace(/\D/g, ""),
                                })
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                              disabled={userInfo.isMobileVerified}
                            />
                            {!userInfo.isMobileVerified && (
                              <button
                                type="button"
                                onClick={handleSendMobileOTP}
                                className="bg-blue-50 text-[var(--primary)] px-3 py-2 text-xs rounded-r-lg border border-l-0 border-gray-300 hover:bg-blue-100 cursor-pointer"
                              >
                                Verify
                              </button>
                            )}
                            {userInfo.isMobileVerified && (
                              <div className="bg-green-50 text-green-600 px-3 py-2 text-xs rounded-r-lg border border-l-0 border-gray-300 flex items-center">
                                <i className="fa-solid fa-check-circle mr-1"></i>{" "}
                                Verified
                              </div>
                            )}
                          </div>
                          {showMobileVerify && (
                            <div className="mt-2 flex">
                              <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                maxLength={6}
                                value={mobileOtp}
                                onChange={(e) =>
                                  setMobileOtp(
                                    e.target.value.replace(/\D/g, "")
                                  )
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                              />
                              <button
                                type="button"
                                onClick={verifyMobile}
                                className="bg-[var(--primary)] text-white px-3 py-2 text-xs rounded-r-lg hover:opacity-90 cursor-pointer"
                              >
                                Submit
                              </button>
                            </div>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            <i className="fa-solid fa-envelope text-[var(--primary)] mr-1"></i>
                            Email
                          </label>
                          <div className="flex">
                            <input
                              type="email"
                              id="email"
                              value={userInfo.email}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  email: e.target.value,
                                })
                              }
                              readOnly={emailLoading}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                              disabled={userInfo.isEmailVerified}
                            />
                            {!userInfo.isEmailVerified && (
                              <button
                                type="button"
                                disabled={emailLoading}
                                onClick={handleSendEmailOTP}
                                className="bg-blue-50 text-[var(--primary)] px-3 py-2 text-xs rounded-r-lg border border-l-0 border-gray-300 hover:bg-blue-100 cursor-pointer"
                              >
                                {emailLoading ? (
                                  <div className="flex items-center justify-center h-full w-full">
                                    <div className="w-6 h-6 border-4 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin"></div>
                                  </div>
                                ) : (
                                  "Verify"
                                )}
                              </button>
                            )}
                            {userInfo.isEmailVerified && (
                              <div className="bg-green-50 text-green-600 px-3 py-2 text-xs rounded-r-lg border border-l-0 border-gray-300 flex items-center">
                                <i className="fa-solid fa-check-circle mr-1"></i>{" "}
                                Verified
                              </div>
                            )}
                          </div>
                          {showEmailVerify && (
                            <div className="mt-2 flex">
                              <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                maxLength={6}
                                value={emailOtp}
                                readOnly={emailOtpLoading}
                                onChange={(e) =>
                                  setEmailOtp(e.target.value.replace(/\D/g, ""))
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                              />
                              <button
                                type="button"
                                onClick={verifyEmail}
                                disabled={emailOtpLoading}
                                className="bg-[var(--primary)] text-white px-3 py-2 text-xs rounded-r-lg hover:opacity-90 cursor-pointer"
                              >
                                {emailOtpLoading ? (
                                  <div className="flex items-center justify-center h-full w-full">
                                    <div className="w-6 h-6 border-4 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin"></div>
                                  </div>
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={userProfileUpdateLoading}
                          className="bg-gradient-to-r from-blue-300 w-[161.26px] to-blue-200 text-[var(--primary)] py-2 px-6 rounded-lg font-medium text-sm hover:from-blue-400 hover:to-blue-300 hover:text-white transition duration-300 shadow-md active:scale-[0.98] cursor-pointer"
                        >
                          {userProfileUpdateLoading ? (
                            <div className="flex items-center justify-center h-full w-full">
                              <div className="w-6 h-6 border-4 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <i className="fa-solid fa-save mr-1"></i>
                              Save Changes
                            </div>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Full Name</p>
                          <p className="text-sm font-medium">{userData.name}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Gender</p>
                          <div className="flex items-center">
                            <p className="text-sm font-medium capitalize">
                              {userData.gender}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Mobile Number</p>
                          <div className="flex items-center">
                            <p className="text-sm font-medium">
                              {userData.mobile}
                            </p>
                            {userData.isMobileVerified ? (
                              <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center">
                                <i className="fa-solid fa-check-circle mr-1"></i>{" "}
                                Verified
                              </span>
                            ) : (
                              <span className="ml-2 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                                Not Verified
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <div className="flex items-center">
                            <p className="text-sm font-medium">
                              {userData.email}
                            </p>
                            {userData.isEmailVerified ? (
                              <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center">
                                <i className="fa-solid fa-check-circle mr-1"></i>{" "}
                                Verified
                              </span>
                            ) : (
                              <span className="ml-2 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                                Not Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Security Settings */}
            {userLoading ? (
              <div className="h-[560px] w-full rounded-xl shadow-md bg-gray-300 animate-pulse"></div>
            ) : (
              <div
                id="section-security"
                className="bg-white rounded-xl shadow-md overflow-hidden scroll-mt-24"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Security Settings
                    </h2>
                    <p className="text-sm text-gray-600">
                      Manage your password and security preferences
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditMode({ ...editMode, password: !editMode.password })
                    }
                    className="text-[var(--primary)] text-sm font-medium hover:underline flex items-center cursor-pointer"
                  >
                    <i
                      className={`fa-solid ${
                        editMode.password ? "fa-times" : "fa-pen"
                      } mr-1`}
                    ></i>
                    {editMode.password ? "Cancel" : "Change"}
                  </button>
                </div>

                <div className="p-6">
                  {editMode.password ? (
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          <i className="fa-solid fa-lock text-[var(--primary)] mr-1"></i>
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            <i className="fa-solid fa-key text-[var(--primary)] mr-1"></i>
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            value={passwordForm.newPassword}
                            onChange={(e) =>
                              setPasswordForm({
                                ...passwordForm,
                                newPassword: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            <i className="fa-solid fa-check-double text-[var(--primary)] mr-1"></i>
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={(e) =>
                              setPasswordForm({
                                ...passwordForm,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-blue-300 to-blue-200 text-[var(--primary)] py-2 px-6 rounded-lg font-medium text-sm hover:from-blue-400 hover:to-blue-300 hover:text-white transition duration-300 shadow-md active:scale-[0.98] cursor-pointer"
                        >
                          <i className="fa-solid fa-key mr-1"></i>
                          Update Password
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Password</p>
                          <p className="text-sm font-medium">**********</p>
                        </div>
                        <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          <i className="fa-solid fa-shield-check mr-1"></i>
                          Secure
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">
                          Additional Security Options
                        </p>
                        <div className="space-y-2">
                          <div
                            className={`flex items-center ${
                              twoFactorAuthLoading
                                ? "pointer-none cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              id="2fa"
                              onChange={updateTwoFactorAuth}
                              disabled={twoFactorAuthLoading}
                              checked={userData.twoFactorAuth}
                              className="h-4 w-4 text-[var(--primary)] rounded border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                            />
                            <label
                              htmlFor="2fa"
                              className="ml-2 block text-sm text-gray-700 cursor-pointer"
                            >
                              Enable Two-Factor Authentication
                            </label>
                          </div>
                          <div
                            className={`flex items-center ${
                              loginActivityLoading
                                ? "pointer-none cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              id="loginAlert"
                              checked={userData.loginActivity}
                              onChange={updateLoginActivity}
                              disabled={loginActivityLoading}
                              className="h-4 w-4 text-[var(--primary)] rounded border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                            />
                            <label
                              htmlFor="loginAlert"
                              className="ml-2 block text-sm text-gray-700 cursor-pointer"
                            >
                              Email me about unusual login activity
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Login Activity Section */}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-sm font-medium text-gray-700">
                            Login Activity
                          </p>
                          <button
                            onClick={handleLogoutAllDevices}
                            className="text-xs text-red-600 hover:text-red-700 font-medium cursor-pointer"
                          >
                            <i className="fa-solid fa-right-from-bracket mr-1"></i>
                            Logout from all other devices
                          </button>
                        </div>

                        <div className="space-y-3">
                          {loginActivity.map((session) => (
                            <div
                              key={session.id}
                              className={`p-3 rounded-lg border ${
                                session.current
                                  ? "border-green-200 bg-green-50"
                                  : "border-gray-200"
                              } relative`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-3">
                                  <div className="mt-0.5">
                                    <i
                                      className={`fa-solid ${
                                        session.device.includes("iPhone") ||
                                        session.device.includes("Android")
                                          ? "fa-mobile-screen"
                                          : "fa-desktop"
                                      } text-gray-500`}
                                    ></i>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium flex items-center">
                                      {session.device}
                                      {session.current && (
                                        <span className="ml-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                                          Current
                                        </span>
                                      )}
                                    </p>
                                    <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-gray-500 mt-1">
                                      <p>
                                        <i className="fa-solid fa-globe mr-1"></i>{" "}
                                        {session.browser}
                                      </p>
                                      <p>
                                        <i className="fa-solid fa-location-dot mr-1"></i>{" "}
                                        {session.location}
                                      </p>
                                      <p>
                                        <i className="fa-solid fa-network-wired mr-1"></i>{" "}
                                        {session.ip}
                                      </p>
                                      <p>
                                        <i className="fa-regular fa-clock mr-1"></i>{" "}
                                        {session.time}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {!session.current && (
                                  <button
                                    onClick={() =>
                                      handleLogoutDevice(session.id)
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-700 font-medium cursor-pointer bg-red-50 hover:bg-red-100 p-2.5 rounded-full w-9 h-9 flex items-center justify-center"
                                    title="Logout from this device"
                                  >
                                    <i className="fa-solid fa-right-from-bracket text-base"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Address Book */}
            <div
              id="section-addresses"
              className="bg-white rounded-xl shadow-md overflow-hidden scroll-mt-24"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Address Book
                  </h2>
                  <p className="text-sm text-gray-600">
                    Manage your delivery addresses
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (editMode.address && isEditingAddress) {
                      // Cancel editing
                      setIsEditingAddress(false);
                      setNewAddress({
                        id: null,
                        name: "",
                        mobile: "",
                        street: "",
                        city: "",
                        state: "",
                        pincode: "",
                        type: "home",
                        isDefault: false,
                      });
                    }
                    setEditMode({ ...editMode, address: !editMode.address });
                  }}
                  className="text-[var(--primary)] text-sm font-medium hover:underline flex items-center cursor-pointer"
                >
                  <i
                    className={`fa-solid ${
                      editMode.address ? "fa-times" : "fa-plus"
                    } mr-1`}
                  ></i>
                  {editMode.address
                    ? isEditingAddress
                      ? "Cancel Editing"
                      : "Cancel"
                    : "Add New Address"}
                </button>
              </div>

              <div className="p-6">
                {editMode.address ? (
                  <form onSubmit={handleAddAddress} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="addressName"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          <i className="fa-solid fa-user text-[var(--primary)] mr-1"></i>
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="addressName"
                          value={newAddress.name}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="addressMobile"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          <i className="fa-solid fa-phone text-[var(--primary)] mr-1"></i>
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          id="addressMobile"
                          value={newAddress.mobile}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              mobile: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="addressStreet"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        <i className="fa-solid fa-road text-[var(--primary)] mr-1"></i>
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="addressStreet"
                        value={newAddress.street}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            street: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="addressCity"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          <i className="fa-solid fa-city text-[var(--primary)] mr-1"></i>
                          City
                        </label>
                        <input
                          type="text"
                          id="addressCity"
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="addressState"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          <i className="fa-solid fa-map text-[var(--primary)] mr-1"></i>
                          State
                        </label>
                        <input
                          type="text"
                          id="addressState"
                          value={newAddress.state}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              state: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="addressPincode"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          <i className="fa-solid fa-hashtag text-[var(--primary)] mr-1"></i>
                          Pincode
                        </label>
                        <input
                          type="text"
                          id="addressPincode"
                          value={newAddress.pincode}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              pincode: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                      <div className="mb-3 md:mb-0">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          <i className="fa-solid fa-tag text-[var(--primary)] mr-1"></i>
                          Address Type
                        </label>
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <input
                              id="addressTypeHome"
                              type="radio"
                              name="addressType"
                              checked={newAddress.type === "home"}
                              onChange={() =>
                                setNewAddress({ ...newAddress, type: "home" })
                              }
                              className="h-4 w-4 text-[var(--primary)] border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                            />
                            <label
                              htmlFor="addressTypeHome"
                              className="ml-2 block text-sm text-gray-700 cursor-pointer"
                            >
                              Home
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="addressTypeWork"
                              type="radio"
                              name="addressType"
                              checked={newAddress.type === "work"}
                              onChange={() =>
                                setNewAddress({ ...newAddress, type: "work" })
                              }
                              className="h-4 w-4 text-[var(--primary)] border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                            />
                            <label
                              htmlFor="addressTypeWork"
                              className="ml-2 block text-sm text-gray-700 cursor-pointer"
                            >
                              Work
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="addressTypeOther"
                              type="radio"
                              name="addressType"
                              checked={newAddress.type === "other"}
                              onChange={() =>
                                setNewAddress({ ...newAddress, type: "other" })
                              }
                              className="h-4 w-4 text-[var(--primary)] border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                            />
                            <label
                              htmlFor="addressTypeOther"
                              className="ml-2 block text-sm text-gray-700 cursor-pointer"
                            >
                              Other
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="defaultAddress"
                          type="checkbox"
                          checked={newAddress.isDefault}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              isDefault: e.target.checked,
                            })
                          }
                          className="h-4 w-4 text-[var(--primary)] rounded border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                        />
                        <label
                          htmlFor="defaultAddress"
                          className="ml-2 block text-sm text-gray-700 cursor-pointer"
                        >
                          Set as default address
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-300 to-blue-200 text-[var(--primary)] py-2 px-6 rounded-lg font-medium text-sm hover:from-blue-400 hover:to-blue-300 hover:text-white transition duration-300 shadow-md active:scale-[0.98] cursor-pointer"
                      >
                        <i
                          className={`fa-solid ${
                            isEditingAddress ? "fa-edit" : "fa-save"
                          } mr-1`}
                        ></i>
                        {isEditingAddress ? "Update Address" : "Save Address"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    {addresses.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="mb-3 inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                          <i className="fa-solid fa-map-marker-alt text-[var(--primary)] text-xl"></i>
                        </div>
                        <p className="text-gray-600 mb-3">
                          You don't have any saved addresses yet.
                        </p>
                        <button
                          onClick={() =>
                            setEditMode({ ...editMode, address: true })
                          }
                          className="inline-flex items-center text-sm text-[var(--primary)] hover:underline cursor-pointer"
                        >
                          <i className="fa-solid fa-plus mr-1"></i>
                          Add a new address
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((address) => (
                          <div
                            key={address.id}
                            className={`p-4 border rounded-lg relative hover:shadow-md transition-shadow duration-300 ${
                              address.isDefault
                                ? "border-blue-300 bg-blue-50"
                                : "border-gray-200"
                            }`}
                          >
                            {address.isDefault && (
                              <div className="absolute top-2 left-2">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              </div>
                            )}
                            <div className="absolute top-2 right-2 flex space-x-1">
                              <button
                                onClick={() => editAddress(address)}
                                className="bg-green-100 hover:bg-green-200 p-1.5 rounded-full cursor-pointer transition-colors text-green-600 w-7 h-7 flex items-center justify-center"
                                title="Edit address"
                              >
                                <i className="fa-solid fa-pen text-xs"></i>
                              </button>
                              <button
                                onClick={() => deleteAddress(address.id)}
                                className="bg-red-100 hover:bg-red-200 p-1.5 rounded-full cursor-pointer transition-colors text-red-600 w-7 h-7 flex items-center justify-center"
                                title="Delete address"
                              >
                                <i className="fa-solid fa-trash text-xs"></i>
                              </button>
                            </div>
                            <div className="flex items-start mb-1 mt-4">
                              <div className="mr-2 text-[var(--primary)]">
                                <i
                                  className={`fa-solid ${
                                    address.type === "home"
                                      ? "fa-home"
                                      : address.type === "work"
                                      ? "fa-briefcase"
                                      : "fa-location-dot"
                                  }`}
                                ></i>
                              </div>
                              <div className="flex-grow">
                                <p className="text-sm font-medium">
                                  {address.name}
                                </p>
                                <p className="text-xs text-gray-500 mb-1">
                                  {address.mobile}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {address.street}, {address.city},{" "}
                                  {address.state} - {address.pincode}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 pt-2 border-t border-gray-100">
                              <div className="flex items-center">
                                <input
                                  id={`default-address-${address.id}`}
                                  type="radio"
                                  name="defaultAddress"
                                  checked={address.isDefault}
                                  onChange={() => setDefaultAddress(address.id)}
                                  className="h-4 w-4 text-[var(--primary)] border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                                />
                                <label
                                  htmlFor={`default-address-${address.id}`}
                                  className="ml-2 block text-xs text-gray-700 cursor-pointer"
                                >
                                  Set as default address
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div
              id="section-payments"
              className="bg-white rounded-xl shadow-md overflow-hidden scroll-mt-24"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Payment Methods
                  </h2>
                  <p className="text-sm text-gray-600">
                    Manage your payment methods
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (showPaymentForm && isEditingPayment) {
                      setIsEditingPayment(false);
                      setNewPayment({
                        id: null,
                        type: "credit",
                        cardNumber: "",
                        name: "",
                        expiryDate: "",
                        cvv: "",
                        isDefault: false,
                        upiId: "",
                      });
                    }
                    setShowPaymentForm(!showPaymentForm);
                  }}
                  className="text-[var(--primary)] text-sm font-medium hover:underline flex items-center cursor-pointer"
                >
                  <i
                    className={`fa-solid ${
                      showPaymentForm ? "fa-times" : "fa-plus"
                    } mr-1`}
                  ></i>
                  {showPaymentForm
                    ? isEditingPayment
                      ? "Cancel Editing"
                      : "Cancel"
                    : "Add New Method"}
                </button>
              </div>

              <div className="p-6">
                {showPaymentForm ? (
                  <div className="mb-6">
                    <div className="flex mb-4 border-b border-gray-100">
                      <button
                        className={`px-4 py-2 text-sm ${
                          paymentType === "card"
                            ? "text-[var(--primary)] border-b-2 border-[var(--primary)] font-medium"
                            : "text-gray-600"
                        } cursor-pointer`}
                        onClick={() => setPaymentType("card")}
                      >
                        <i className="fa-solid fa-credit-card mr-1"></i>
                        Debit/Credit Card
                      </button>
                      <button
                        className={`px-4 py-2 text-sm ${
                          paymentType === "upi"
                            ? "text-[var(--primary)] border-b-2 border-[var(--primary)] font-medium"
                            : "text-gray-600"
                        } cursor-pointer`}
                        onClick={() => setPaymentType("upi")}
                      >
                        <img
                          src="/upi.svg"
                          alt="UPI"
                          className="w-6 h-6 inline-block mr-1"
                        />
                        UPI
                      </button>
                    </div>

                    {paymentType === "card" ? (
                      <form onSubmit={handleAddPayment} className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            <i className="fa-solid fa-credit-card text-[var(--primary)] mr-1"></i>
                            Card Type
                          </label>
                          <div className="flex space-x-4 mb-3">
                            <div className="flex items-center">
                              <input
                                id="typeCredit"
                                type="radio"
                                name="cardType"
                                checked={newPayment.type === "credit"}
                                onChange={() =>
                                  setNewPayment({
                                    ...newPayment,
                                    type: "credit",
                                  })
                                }
                                className="h-4 w-4 text-[var(--primary)] border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                              />
                              <label
                                htmlFor="typeCredit"
                                className="ml-2 block text-sm text-gray-700 cursor-pointer"
                              >
                                Credit Card
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="typeDebit"
                                type="radio"
                                name="cardType"
                                checked={newPayment.type === "debit"}
                                onChange={() =>
                                  setNewPayment({
                                    ...newPayment,
                                    type: "debit",
                                  })
                                }
                                className="h-4 w-4 text-[var(--primary)] border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                              />
                              <label
                                htmlFor="typeDebit"
                                className="ml-2 block text-sm text-gray-700 cursor-pointer"
                              >
                                Debit Card
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="cardNumber"
                              className="block text-xs font-medium text-gray-700 mb-1"
                            >
                              <i className="fa-solid fa-hashtag text-[var(--primary)] mr-1"></i>
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              value={newPayment.cardNumber}
                              onChange={(e) =>
                                setNewPayment({
                                  ...newPayment,
                                  cardNumber: e.target.value
                                    .replace(/\D/g, "")
                                    .replace(/(\d{4})(?=\d)/g, "$1 "),
                                })
                              }
                              placeholder="XXXX XXXX XXXX XXXX"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                              maxLength={19}
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cardName"
                              className="block text-xs font-medium text-gray-700 mb-1"
                            >
                              <i className="fa-solid fa-user text-[var(--primary)] mr-1"></i>
                              Name on Card
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              value={newPayment.name}
                              onChange={(e) =>
                                setNewPayment({
                                  ...newPayment,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="expiryDate"
                              className="block text-xs font-medium text-gray-700 mb-1"
                            >
                              <i className="fa-solid fa-calendar text-[var(--primary)] mr-1"></i>
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              value={newPayment.expiryDate}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                let formattedValue = value;
                                if (value.length > 2) {
                                  formattedValue =
                                    value.slice(0, 2) + "/" + value.slice(2, 4);
                                }
                                setNewPayment({
                                  ...newPayment,
                                  expiryDate: formattedValue,
                                });
                              }}
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-xs font-medium text-gray-700 mb-1"
                            >
                              <i className="fa-solid fa-lock text-[var(--primary)] mr-1"></i>
                              CVV
                            </label>
                            <input
                              type="password"
                              id="cvv"
                              value={newPayment.cvv}
                              onChange={(e) =>
                                setNewPayment({
                                  ...newPayment,
                                  cvv: e.target.value.replace(/\D/g, ""),
                                })
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center mt-3">
                          <input
                            id="defaultPayment"
                            type="checkbox"
                            checked={newPayment.isDefault}
                            onChange={(e) =>
                              setNewPayment({
                                ...newPayment,
                                isDefault: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-[var(--primary)] rounded border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                          />
                          <label
                            htmlFor="defaultPayment"
                            className="ml-2 block text-sm text-gray-700 cursor-pointer"
                          >
                            Set as default payment method
                          </label>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-300 to-blue-200 text-[var(--primary)] py-2 px-6 rounded-lg font-medium text-sm hover:from-blue-400 hover:to-blue-300 hover:text-white transition duration-300 shadow-md active:scale-[0.98] cursor-pointer"
                          >
                            <i
                              className={`fa-solid ${
                                isEditingPayment ? "fa-edit" : "fa-save"
                              } mr-1`}
                            ></i>
                            {isEditingPayment ? "Update Card" : "Save Card"}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleAddPayment} className="space-y-4">
                        <div>
                          <label
                            htmlFor="upiId"
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            <img
                              src="/upi.svg"
                              alt="UPI"
                              className="w-5 h-5 inline-block mr-1 text-[var(--primary)]"
                            />
                            UPI ID
                          </label>
                          <input
                            type="text"
                            id="upiId"
                            value={newPayment.upiId}
                            onChange={(e) =>
                              setNewPayment({
                                ...newPayment,
                                upiId: e.target.value,
                              })
                            }
                            placeholder="username@upi"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent cursor-text"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Popular UPI options: Google Pay, PhonePe, Paytm,
                            etc.
                          </p>
                        </div>

                        <div className="flex items-center mt-3">
                          <input
                            id="defaultUpi"
                            type="checkbox"
                            checked={newPayment.isDefault}
                            onChange={(e) =>
                              setNewPayment({
                                ...newPayment,
                                isDefault: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-[var(--primary)] rounded border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                          />
                          <label
                            htmlFor="defaultUpi"
                            className="ml-2 block text-sm text-gray-700 cursor-pointer"
                          >
                            Set as default payment method
                          </label>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-300 to-blue-200 text-[var(--primary)] py-2 px-6 rounded-lg font-medium text-sm hover:from-blue-400 hover:to-blue-300 hover:text-white transition duration-300 shadow-md active:scale-[0.98] cursor-pointer"
                          >
                            <i
                              className={`fa-solid ${
                                isEditingPayment ? "fa-edit" : "fa-save"
                              } mr-1`}
                            ></i>
                            {isEditingPayment ? "Update UPI" : "Save UPI"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : null}

                {/* Saved Payment Methods */}
                <div
                  className={
                    showPaymentForm ? "pt-4 border-t border-gray-100" : ""
                  }
                >
                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="mb-3 inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                        <i className="fa-solid fa-credit-card text-[var(--primary)] text-xl"></i>
                      </div>
                      <p className="text-gray-600 mb-3">
                        You don't have any saved payment methods yet.
                      </p>
                      <button
                        onClick={() => setShowPaymentForm(true)}
                        className="inline-flex items-center text-sm text-[var(--primary)] hover:underline cursor-pointer"
                      >
                        <i className="fa-solid fa-plus mr-1"></i>
                        Add a new payment method
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="pb-2 mb-3 border-b border-gray-100">
                        <h3 className="text-sm font-medium text-gray-800">
                          Saved Payment Methods
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`p-4 border rounded-lg relative ${
                              method.isDefault
                                ? "border-blue-300 bg-blue-50"
                                : "border-gray-200"
                            } hover:shadow-md transition-shadow duration-300`}
                          >
                            {method.isDefault && (
                              <div className="absolute top-2 left-2">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              </div>
                            )}
                            <div className="absolute top-2 right-2 flex space-x-1">
                              <button
                                onClick={() => editPaymentMethod(method)}
                                className="bg-green-100 hover:bg-green-200 p-1.5 rounded-full cursor-pointer transition-colors text-green-600 w-7 h-7 flex items-center justify-center"
                                title="Edit payment method"
                              >
                                <i className="fa-solid fa-pen text-xs"></i>
                              </button>
                              <button
                                onClick={() => deletePaymentMethod(method.id)}
                                className="bg-red-100 hover:bg-red-200 p-1.5 rounded-full cursor-pointer transition-colors text-red-600 w-7 h-7 flex items-center justify-center"
                                title="Delete payment method"
                              >
                                <i className="fa-solid fa-trash text-xs"></i>
                              </button>
                            </div>

                            <div className="flex items-center mt-4">
                              {method.type === "upi" ? (
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                  <img
                                    src="/upi.svg"
                                    alt="UPI"
                                    className="w-7 h-7"
                                  />
                                </div>
                              ) : method.type === "credit" ? (
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                  <i className="fa-solid fa-credit-card text-blue-700"></i>
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                  <i className="fa-solid fa-credit-card text-green-700"></i>
                                </div>
                              )}

                              <div>
                                {method.type === "upi" ? (
                                  <>
                                    <p className="text-sm font-medium">
                                      UPI ID
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      {method.upiId}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-sm font-medium">
                                      {method.type === "credit"
                                        ? "Credit Card"
                                        : "Debit Card"}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                      {method.cardNumber}
                                    </p>
                                    <div className="flex text-xs text-gray-500 mt-1">
                                      <p className="mr-3">{method.name}</p>
                                      <p>Expires: {method.expiryDate}</p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-gray-100">
                              <div className="flex items-center">
                                <input
                                  id={`default-payment-${method.id}`}
                                  type="radio"
                                  name="defaultPayment"
                                  checked={method.isDefault}
                                  onChange={() => setDefaultPayment(method.id)}
                                  className="h-4 w-4 text-[var(--primary)] border-gray-300 focus:ring-[var(--primary)] cursor-pointer"
                                />
                                <label
                                  htmlFor={`default-payment-${method.id}`}
                                  className="ml-2 block text-xs text-gray-700 cursor-pointer"
                                >
                                  Set as default payment method
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* My Orders and Wishlist Sections */}
            {userLoading ? (
              <div className="h-[216px] w-full rounded-xl shadow-md bg-gray-300 animate-pulse"></div>
            ) : (
              <div
                id="section-orders"
                className="bg-white rounded-xl shadow-md overflow-hidden scroll-mt-24"
              >
                <div className="p-6 text-center">
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                    <i className="fa-solid fa-box text-[var(--primary)] text-xl"></i>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    My Orders
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    View your order history and track current orders
                  </p>
                  <a
                    href="/orders"
                    className="inline-block bg-gradient-to-r from-blue-300 to-blue-200 text-[var(--primary)] py-2 px-6 rounded-lg font-medium text-sm hover:from-blue-400 hover:to-blue-300 hover:text-white transition duration-300 shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    View All Orders
                  </a>
                </div>
              </div>
            )}

            {userLoading ? (
              <div className="h-[216px] w-full rounded-xl shadow-md bg-gray-300 animate-pulse"></div>
            ) : (
              <div
                id="section-wishlist"
                className="bg-white rounded-xl shadow-md overflow-hidden scroll-mt-24"
              >
                <div className="p-6 text-center">
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                    <i className="fa-solid fa-heart text-red-500 text-xl"></i>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    My Wishlist
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    View and manage your favorite products
                  </p>
                  <a
                    href="/wishlist"
                    className="inline-block bg-gradient-to-r from-blue-300 to-blue-200 text-[var(--primary)] py-2 px-6 rounded-lg font-medium text-sm hover:from-blue-400 hover:to-blue-300 hover:text-white transition duration-300 shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    View Wishlist
                  </a>
                </div>
              </div>
            )}

            {/* Delete Account Section */}
            {userLoading ? (
              <div className="h-[148px] w-full rounded-xl shadow-md bg-gray-300 animate-pulse"></div>
            ) : (
              <div
                id="section-delete-account"
                className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100 scroll-mt-24"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <i className="fa-solid fa-exclamation-triangle text-red-500"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Delete Account
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>

                      {showDeleteConfirm ? (
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                          <p className="text-sm text-red-700 mb-3">
                            Are you sure you want to delete your account? All of
                            your data will be permanently removed. This action
                            cannot be undone.
                          </p>
                          <div className="flex space-x-3">
                            <button
                              onClick={handleDeleteAccount}
                              disabled={deleteLoading}
                              className="bg-red-500 hover:bg-red-600 w-[210px] text-white py-2 px-4 rounded-lg text-sm font-medium active:scale-[0.98] transition-all cursor-pointer"
                            >
                              {deleteLoading ? (
                                <div className="flex items-center justify-center h-full">
                                  <div className="w-4 h-4 border-4 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin"></div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <i className="fa-solid fa-trash mr-1"></i>
                                  Yes, Delete My Account
                                </div>
                              )}
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(false)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium active:scale-[0.98] transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="flex items-center  text-red-500 hover:text-red-600 text-sm font-medium bg-red-50 hover:bg-red-100 py-2 px-4 rounded-lg transition-colors active:scale-[0.98] cursor-pointer"
                        >
                          <i className="fa-solid fa-trash mr-1"></i>
                          Delete My Account
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
