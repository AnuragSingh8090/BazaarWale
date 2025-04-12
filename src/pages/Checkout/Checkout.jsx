import "./Checkout.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sucessToast, errorToast } from "../../components/Toasters/Toasters";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const Checkout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Payment
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  const [showFixedMobileButton, setShowFixedMobileButton] = useState(false);
  const orderSummaryRef = useRef(null);
  const placeOrderBtnContainerRef = useRef(null);

  // Saved addresses (in a real app, these would be fetched from API/backend)
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      fullName: "John Doe",
      mobileNumber: "9876543210",
      pincode: "560001",
      address: "123, First Floor, Main Street, Downtown",
      city: "Bangalore",
      state: "Karnataka",
      addressType: "home",
      isDefault: true,
    },
    {
      id: 2,
      fullName: "John Doe",
      mobileNumber: "9876543210",
      pincode: "400001",
      address: "456, Second Floor, Business Park, Tech Hub",
      city: "Mumbai",
      state: "Maharashtra",
      addressType: "work",
      isDefault: false,
    },
  ]);

  // Saved payment methods (in a real app, these would be fetched from API/backend)
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([
    {
      id: 1,
      type: "card",
      cardNumber: "4111 XXXX XXXX 1111",
      cardHolderName: "John Doe",
      expiryDate: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "upi",
      upiId: "johndoe@upi",
      isDefault: false,
    },
  ]);

  // Selected address
  const [selectedAddressId, setSelectedAddressId] = useState(
    savedAddresses.find((addr) => addr.isDefault)?.id || null
  );

  // Address state for new address form
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    mobileNumber: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    addressType: "home",
  });

  // Form validation state
  const [isAddressValid, setIsAddressValid] = useState(
    selectedAddressId !== null
  );

  // State for adding new payment method
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [newPaymentForm, setNewPaymentForm] = useState({
    type: "card",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
    upiId: ""
  });

  // Selected payment method - no preselection, require explicit user selection
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Track if overall checkout is valid (both address and payment method selected)
  const [isCheckoutValid, setIsCheckoutValid] = useState(false);

  // Add state for form errors
  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
    upiId: ""
  });

  // Check if address form is valid
  useEffect(() => {
    if (selectedAddressId) {
      setIsAddressValid(true);
      return;
    }

    const { fullName, mobileNumber, pincode, address, city, state } =
      addressForm;

    // Simple validation
    const isMobileValid = /^[0-9]{10}$/.test(mobileNumber);
    const isPincodeValid = /^[0-9]{6}$/.test(pincode);

    setIsAddressValid(
      fullName.length > 3 &&
        isMobileValid &&
        isPincodeValid &&
        address.length > 5 &&
        city.length > 0 &&
        state.length > 0
    );
  }, [addressForm, selectedAddressId]);

  // Check if overall checkout is valid
  useEffect(() => {
    setIsCheckoutValid(isAddressValid && paymentMethod !== null);
  }, [isAddressValid, paymentMethod]);

  // Handle address form change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle address selection
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    setShowAddNewAddress(false);
  };

  // Handle new address button
  const handleAddNewAddressClick = () => {
    setSelectedAddressId(null);
    setShowAddNewAddress(true);
  };

  // Handle set as default address
  const handleSetDefaultAddress = (addressId) => {
    setSavedAddresses((addresses) =>
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  // Handle form submission
  const handleAddressSubmit = (e) => {
    if (e) e.preventDefault();

    if (!isAddressValid) {
      errorToast("Please select or fill all required address fields");
      return;
    }

    if (showAddNewAddress) {
      // In a real app, you would save the new address to the backend here
      const newAddress = {
        id: savedAddresses.length + 1,
        ...addressForm,
        isDefault: savedAddresses.length === 0,
      };

      setSavedAddresses([...savedAddresses, newAddress]);
      setSelectedAddressId(newAddress.id);
      setShowAddNewAddress(false);
      sucessToast("New address added successfully!");
    }

    // Move to payment step
    setActiveStep(2);

    // Force recalculation of scroll position for fixed button
    setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 100);
  };

  // Handle payment method change
  const handlePaymentChange = (method) => {
    setPaymentMethod(method);

    // Force recalculation of fixed button visibility after payment selection
    setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 100);
  };

  // Handle new payment form change
  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "cardNumber") {
      // Format card number to have spaces after every 4 digits
      const formattedValue = value
        .replace(/\s/g, '')  // Remove existing spaces
        .match(/.{1,4}/g)?.join(' ') || value;  // Add space after every 4 chars
      
      setNewPaymentForm(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else if (name === "expiryDate") {
      // Format expiry date to have MM/YY format
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      
      setNewPaymentForm(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setNewPaymentForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle payment form type change
  const handlePaymentTypeChange = (type) => {
    // Clear errors when switching payment types
    setFormErrors({
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
      upiId: ""
    });
    
    setNewPaymentForm(prev => ({
      ...prev,
      type
    }));
  };

  // Validate the payment form input
  const validatePaymentForm = () => {
    let isValid = true;
    const errors = {
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
      upiId: ""
    };

    if (newPaymentForm.type === 'card') {
      // Validate card number - should be 16 digits with spaces
      const cardNumberDigits = newPaymentForm.cardNumber.replace(/\s/g, '');
      if (!cardNumberDigits || cardNumberDigits.length !== 16 || !/^\d+$/.test(cardNumberDigits)) {
        errors.cardNumber = "Please enter a valid 16-digit card number";
        isValid = false;
      }

      // Validate card holder name - should be at least 3 chars
      if (!newPaymentForm.cardHolderName || newPaymentForm.cardHolderName.length < 3) {
        errors.cardHolderName = "Please enter a valid name (at least 3 characters)";
        isValid = false;
      }

      // Validate expiry date - should be in MM/YY format and not expired
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!newPaymentForm.expiryDate || !expiryRegex.test(newPaymentForm.expiryDate)) {
        errors.expiryDate = "Please enter a valid expiry date (MM/YY)";
        isValid = false;
      } else {
        // Check if card is expired
        const [month, year] = newPaymentForm.expiryDate.split('/');
        const expiryDate = new Date(20 + year, month - 1, 1); // Set to 1st day of the month
        const currentDate = new Date();
        if (expiryDate < currentDate) {
          errors.expiryDate = "Card has expired";
          isValid = false;
        }
      }

      // Validate CVV - should be 3 digits
      if (!newPaymentForm.cvv || !/^\d{3}$/.test(newPaymentForm.cvv)) {
        errors.cvv = "Please enter a valid 3-digit CVV";
        isValid = false;
      }
    } else if (newPaymentForm.type === 'upi') {
      // Validate UPI ID - should match pattern username@upiservice
      const upiRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+$/;
      if (!newPaymentForm.upiId || !upiRegex.test(newPaymentForm.upiId)) {
        errors.upiId = "Please enter a valid UPI ID (e.g., username@upiservice)";
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle save payment method
  const handleSavePaymentMethod = () => {
    if (validatePaymentForm()) {
      // Add payment method
      if (newPaymentForm.type === 'card') {
        let cardLabel = `Card ending in ${newPaymentForm.cardNumber.slice(-4)}`;
        setSavedPaymentMethods([...savedPaymentMethods, {
          id: Date.now(),
          type: 'card',
          cardNumber: newPaymentForm.cardNumber,
          cardHolderName: newPaymentForm.cardHolderName,
          expiryDate: newPaymentForm.expiryDate,
          isDefault: savedPaymentMethods.length === 0
        }]);
        
        // Select this payment method
        setPaymentMethod("saved-card");
      } else if (newPaymentForm.type === 'upi') {
        setSavedPaymentMethods([...savedPaymentMethods, {
          id: Date.now(),
          type: 'upi',
          upiId: newPaymentForm.upiId,
          isDefault: savedPaymentMethods.length === 0
        }]);
        
        // Select this payment method
        setPaymentMethod("saved-upi");
      }

      // Reset form
      setNewPaymentForm({
        type: 'card',
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvv: '',
        upiId: ''
      });
      setShowAddPaymentForm(false);
      sucessToast("Payment method added successfully!");
    } else {
      errorToast("Please fix the errors in the form");
    }
  };

  // Handle place order
  const handlePlaceOrder = () => {
    if (!isAddressValid) {
      errorToast("Please complete address information");
      setActiveStep(1);
      return;
    }

    if (!paymentMethod) {
      errorToast("Please select a payment method");
      return;
    }

    setIsLoading(true);

    // Get payment method details for confirmation
    let paymentDetails = "Cash on Delivery";
    if (paymentMethod === "saved-card") {
      const card = savedPaymentMethods.find((method) => method.type === "card");
      paymentDetails = `Card ending in ${card.cardNumber.split(" ").pop()}`;
    } else if (paymentMethod === "saved-upi") {
      const upi = savedPaymentMethods.find((method) => method.type === "upi");
      paymentDetails = `UPI: ${upi.upiId}`;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      sucessToast(`Order placed successfully with ${paymentDetails}!`);

      // Navigate to order confirmation page (in a real app)
      // For now, navigate to orders page
      navigate("/orders");
    }, 2000);
  };

  // Get selected address details
  const selectedAddress = selectedAddressId
    ? savedAddresses.find((addr) => addr.id === selectedAddressId)
    : null;

  // Dummy order summary data for display
  const orderSummary = {
    subtotal: 15296,
    discount: 500,
    deliveryFee: 0,
    tax: 765,
    total: 15561,
    items: 4,
  };

  // Handle scroll event for mobile fixed button
  useEffect(() => {
    const handleScroll = () => {
      if (!orderSummaryRef.current) return;

      // For address step - show fixed Continue button when summary is not visible
      if (activeStep === 1) {
        const summaryRect = orderSummaryRef.current.getBoundingClientRect();
        const isSummaryVisible =
          summaryRect.bottom > 0 && summaryRect.top < window.innerHeight;
        setShowFixedMobileButton(!isSummaryVisible);
      } 
      // For payment step - show fixed Place Order button when summary button is not visible
      else if (activeStep === 2 && paymentMethod && placeOrderBtnContainerRef.current) {
        const btnContainerRect = placeOrderBtnContainerRef.current.getBoundingClientRect();
        const isBtnVisible =
          btnContainerRect.bottom > 0 && btnContainerRect.top < window.innerHeight;
        setShowFixedMobileButton(!isBtnVisible);
      } 
      // Hide fixed button otherwise
      else {
        setShowFixedMobileButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeStep, paymentMethod]);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 checkout-container">
      <ScrollToTop />

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-xs md:text-sm">
            Complete your purchase by providing your delivery and payment
            details
          </p>
        </div>

        {/* Checkout Process Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full max-w-md">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  activeStep >= 1
                    ? "bg-[var(--primary)] step-indicator-active"
                    : "bg-gray-300"
                }`}
              >
                1
              </div>
              <span className="text-xs mt-1 font-medium">Address</span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                activeStep >= 2 ? "bg-[var(--primary)]" : "bg-gray-300"
              }`}
            ></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  activeStep >= 2
                    ? "bg-[var(--primary)] step-indicator-active"
                    : "bg-gray-300"
                }`}
              >
                2
              </div>
              <span className="text-xs mt-1 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Section: Form and Payment */}
          <div className="lg:col-span-2 ">
            {/* Address Section */}
            <div
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                activeStep === 1 ? "block" : "hidden lg:block"
              }`}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800">
                  Delivery Address
                </h2>
                {activeStep === 2 && (
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-[var(--primary)] text-sm font-medium hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>

              <div
                className={`p-5 ${
                  activeStep === 2 ? "hidden lg:block" : "block"
                }`}
              >
                {/* Saved Addresses */}
                {savedAddresses.length > 0 && (
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-700">
                        Saved Addresses
                      </h3>
                      <button
                        onClick={handleAddNewAddressClick}
                        className="text-[var(--primary)] text-sm hover:underline"
                      >
                        + Add New Address
                      </button>
                    </div>

                    <div className="space-y-3">
                      {savedAddresses.map((address) => (
                        <div
                          key={address.id}
                          className={`border rounded-lg p-3 saved-item ${
                            selectedAddressId === address.id ? "selected" : ""
                          }`}
                          onClick={() => handleAddressSelect(address.id)}
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                checked={selectedAddressId === address.id}
                                onChange={() => handleAddressSelect(address.id)}
                                className="h-4 w-4 text-[var(--primary)]"
                              />
                              <div className="ml-3">
                                <p className="font-medium">
                                  {address.fullName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {address.address}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {address.city}, {address.state} -{" "}
                                  {address.pincode}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Mobile: {address.mobileNumber}
                                </p>
                                <div className="flex items-center mt-2 space-x-2">
                                  <span className="inline-block text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                                    {address.addressType
                                      .charAt(0)
                                      .toUpperCase() +
                                      address.addressType.slice(1)}
                                  </span>
                                  {address.isDefault && (
                                    <span className="inline-block text-xs bg-blue-100 px-2 py-1 rounded-full text-blue-700">
                                      Default
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {selectedAddressId === address.id &&
                              !address.isDefault && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSetDefaultAddress(address.id);
                                  }}
                                  className="text-sm text-[var(--primary)] hover:underline self-start"
                                >
                                  Set as default
                                </button>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Address Form */}
                {(showAddNewAddress || savedAddresses.length === 0) && (
                  <form onSubmit={handleAddressSubmit}>
                    {savedAddresses.length > 0 && (
                      <h3 className="font-medium text-gray-700 mb-3">
                        Add New Address
                      </h3>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label
                          className="block text-gray-700 text-sm font-medium mb-1"
                          htmlFor="fullName"
                        >
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={addressForm.fullName}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent text-sm"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-medium mb-1"
                          htmlFor="mobileNumber"
                        >
                          Mobile Number*
                        </label>
                        <input
                          type="tel"
                          id="mobileNumber"
                          name="mobileNumber"
                          value={addressForm.mobileNumber}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent text-sm"
                          placeholder="10-digit mobile number"
                          maxLength="10"
                          pattern="[0-9]{10}"
                          required
                        />
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-medium mb-1"
                          htmlFor="pincode"
                        >
                          Pincode*
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={addressForm.pincode}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent text-sm"
                          placeholder="6-digit pincode"
                          maxLength="6"
                          pattern="[0-9]{6}"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label
                          className="block text-gray-700 text-sm font-medium mb-1"
                          htmlFor="address"
                        >
                          Address (House No, Building, Street, Area)*
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={addressForm.address}
                          onChange={handleAddressChange}
                          rows="2"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent text-sm"
                          placeholder="Enter your full address"
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-medium mb-1"
                          htmlFor="city"
                        >
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent text-sm"
                          placeholder="Enter city name"
                          required
                        />
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-medium mb-1"
                          htmlFor="state"
                        >
                          State*
                        </label>
                        <select
                          id="state"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent text-sm"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <p className="block text-gray-700 text-sm font-medium mb-1">
                          Address Type
                        </p>
                        <div className="flex space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="addressType"
                              value="home"
                              checked={addressForm.addressType === "home"}
                              onChange={handleAddressChange}
                              className="h-4 w-4 text-[var(--primary)]"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Home
                            </span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="addressType"
                              value="work"
                              checked={addressForm.addressType === "work"}
                              onChange={handleAddressChange}
                              className="h-4 w-4 text-[var(--primary)]"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Work
                            </span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="addressType"
                              value="other"
                              checked={addressForm.addressType === "other"}
                              onChange={handleAddressChange}
                              className="h-4 w-4 text-[var(--primary)]"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Other
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      {savedAddresses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowAddNewAddress(false)}
                          className="text-gray-600 text-sm font-medium hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                      {activeStep === 1 && (
                        <button
                          type="submit"
                          className={`bg-gradient-to-r from-blue-500 to-[var(--primary)] text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-500 transition duration-300 shadow-md active:scale-[0.98] ${
                            showAddNewAddress && !isAddressValid
                              ? "button-disabled"
                              : ""
                          }`}
                          disabled={showAddNewAddress && !isAddressValid}
                        >
                          Continue to Payment
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {savedAddresses.length > 0 && !showAddNewAddress && activeStep === 1 && (
                  <div className="mt-6 text-right">
                    <button
                      onClick={handleAddressSubmit}
                      className={`bg-gradient-to-r from-blue-500 to-[var(--primary)] text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-500 transition duration-300 shadow-md active:scale-[0.98] ${
                        !selectedAddressId ? "button-disabled" : ""
                      }`}
                      disabled={!selectedAddressId}
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}
              </div>

              {/* Address Summary (shown only in step 2) */}
              {activeStep === 2 && selectedAddress && (
                <div className="p-5 border-t border-gray-100 lg:hidden">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="font-medium">{selectedAddress.fullName}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedAddress.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedAddress.city}, {selectedAddress.state} -{" "}
                        {selectedAddress.pincode}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Mobile: {selectedAddress.mobileNumber}
                      </p>
                      <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                        {selectedAddress.addressType.charAt(0).toUpperCase() +
                          selectedAddress.addressType.slice(1)}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveStep(1)}
                      className="text-[var(--primary)] text-sm font-medium hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Section */}
            <div
              className={`bg-white rounded-xl shadow-md overflow-hidden mt-3 ${
                activeStep === 2 ? "block" : "hidden"
              }`}
            >
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800">
                  Payment Method
                </h2>
              </div>

              <div className="p-5">
                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all payment-method-option ${
                      paymentMethod === "cod"
                        ? "border-[var(--primary)] bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handlePaymentChange("cod")}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        checked={paymentMethod === "cod"}
                        onChange={() => handlePaymentChange("cod")}
                        className="h-4 w-4 text-[var(--primary)]"
                      />
                      <label
                        htmlFor="cod"
                        className="ml-3 flex items-center cursor-pointer w-full"
                      >
                        <span
                          className={`${
                            paymentMethod === "cod"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          } p-1 rounded mr-3 transition-colors`}
                        >
                          <i className="fa-solid fa-wallet"></i>
                        </span>
                        <div>
                          <p
                            className={`font-medium ${
                              paymentMethod === "cod"
                                ? "text-[var(--primary)]"
                                : "text-gray-800"
                            }`}
                          >
                            Cash on Delivery
                          </p>
                          <p className="text-xs text-gray-500">
                            Pay when your order is delivered
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Credit/Debit Card */}
                  {savedPaymentMethods.find(
                    (method) => method.type === "card"
                  ) ? (
                    <div
                      className={`border rounded-lg p-3 cursor-pointer transition-all payment-method-option relative ${
                        paymentMethod === "saved-card"
                          ? "border-[var(--primary)] bg-blue-50 selected"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => handlePaymentChange("saved-card")}
                    >
                      {savedPaymentMethods.find(
                        (method) => method.type === "card"
                      )?.isDefault && (
                        <span className="payment-type-badge bg-blue-100 text-blue-700">
                          Default
                        </span>
                      )}
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="saved-card"
                          name="paymentMethod"
                          checked={paymentMethod === "saved-card"}
                          onChange={() => handlePaymentChange("saved-card")}
                          className="h-4 w-4 text-[var(--primary)]"
                        />
                        <label
                          htmlFor="saved-card"
                          className="ml-3 flex items-center cursor-pointer w-full"
                        >
                          <span
                            className={`${
                              paymentMethod === "saved-card"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-600"
                            } p-1 rounded mr-3 transition-colors flex items-center justify-center w-8 h-8`}
                          >
                            <i className="fa-solid fa-credit-card"></i>
                          </span>
                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                paymentMethod === "saved-card"
                                  ? "text-[var(--primary)]"
                                  : "text-gray-800"
                              }`}
                            >
                              Credit/Debit Card
                            </p>
                            <p className="text-xs text-gray-500 card-number mt-1">
                              {
                                savedPaymentMethods.find(
                                  (method) => method.type === "card"
                                )?.cardNumber
                              }
                            </p>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-xs text-gray-500">
                                Expires:{" "}
                                {
                                  savedPaymentMethods.find(
                                    (method) => method.type === "card"
                                  )?.expiryDate
                                }
                              </p>
                              <p className="text-xs text-gray-500">
                                {
                                  savedPaymentMethods.find(
                                    (method) => method.type === "card"
                                  )?.cardHolderName
                                }
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 opacity-70 cursor-not-allowed payment-method-option disabled">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          disabled
                          className="h-4 w-4 text-gray-300"
                        />
                        <label
                          htmlFor="card"
                          className="ml-3 flex items-center cursor-not-allowed w-full"
                        >
                          <span className="bg-gray-100 text-gray-400 p-1 rounded mr-3">
                            <i className="fa-solid fa-credit-card"></i>
                          </span>
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-xs text-gray-500">
                              Add a card to enable this payment method
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* UPI */}
                  {savedPaymentMethods.find(
                    (method) => method.type === "upi"
                  ) ? (
                    <div
                      className={`border rounded-lg p-3 cursor-pointer transition-all payment-method-option relative ${
                        paymentMethod === "saved-upi"
                          ? "border-[var(--primary)] bg-blue-50 selected"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => handlePaymentChange("saved-upi")}
                    >
                      {savedPaymentMethods.find(
                        (method) => method.type === "upi"
                      )?.isDefault && (
                        <span className="payment-type-badge bg-purple-100 text-purple-700">
                          Default
                        </span>
                      )}
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="saved-upi"
                          name="paymentMethod"
                          checked={paymentMethod === "saved-upi"}
                          onChange={() => handlePaymentChange("saved-upi")}
                          className="h-4 w-4 text-[var(--primary)]"
                        />
                        <label
                          htmlFor="saved-upi"
                          className="ml-3 flex items-center cursor-pointer w-full"
                        >
                          <span
                            className={`${
                              paymentMethod === "saved-upi"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-600"
                            } p-1 rounded mr-3 transition-colors flex items-center justify-center w-8 h-8`}
                          >
                            <img src="/upi.svg" alt="UPI" className="h-6 w-6" />
                          </span>
                          <div>
                            <p
                              className={`font-medium ${
                                paymentMethod === "saved-upi"
                                  ? "text-[var(--primary)]"
                                  : "text-gray-800"
                              }`}
                            >
                              UPI
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded mr-2">
                                @
                              </span>
                              <p className="text-xs text-gray-700 font-medium">
                                {
                                  savedPaymentMethods.find(
                                    (method) => method.type === "upi"
                                  )?.upiId
                                }
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 opacity-70 cursor-not-allowed payment-method-option disabled">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="upi"
                          name="paymentMethod"
                          disabled
                          className="h-4 w-4 text-gray-300"
                        />
                        <label
                          htmlFor="upi"
                          className="ml-3 flex items-center cursor-not-allowed w-full"
                        >
                          <span className="bg-gray-100 text-gray-400 p-1 rounded mr-3 flex items-center justify-center w-8 h-8">
                            <img src="/upi.png" alt="UPI" className="h-6 w-6 opacity-50" />
                          </span>
                          <div>
                            <p className="font-medium">UPI</p>
                            <p className="text-xs text-gray-500">
                              Add a UPI ID to enable this payment method
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Payment selection prompt */}
                  {!paymentMethod && (
                    <div className="mt-3 text-sm text-red-500 flex items-center">
                      <i className="fa-solid fa-circle-info mr-1"></i>
                      Please select a payment method to continue
                    </div>
                  )}

                  {/* Add new payment method */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      className="text-[var(--primary)] text-sm font-medium hover:underline flex items-center"
                      onClick={() => setShowAddPaymentForm(true)}
                    >
                      <i className="fa-solid fa-plus mr-2"></i>
                      Add a new payment method
                    </button>
                  </div>

                  {/* Add Payment Method Form */}
                  {showAddPaymentForm && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <form onSubmit={handleSavePaymentMethod}>
                        <h3 className="font-medium text-gray-700 mb-3">Add New Payment Method</h3>
                        
                        {/* Payment Type Selection */}
                        <div className="mb-4">
                          <p className="block text-gray-700 text-sm font-medium mb-2">
                            Payment Type
                          </p>
                          <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="paymentType"
                                checked={newPaymentForm.type === "card"}
                                onChange={() => handlePaymentTypeChange("card")}
                                className="h-4 w-4 text-[var(--primary)]"
                              />
                              <span className="ml-2 text-sm text-gray-700 flex items-center">
                                <i className="fa-solid fa-credit-card mr-1"></i>
                                Credit/Debit Card
                              </span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="paymentType"
                                checked={newPaymentForm.type === "upi"}
                                onChange={() => handlePaymentTypeChange("upi")}
                                className="h-4 w-4 text-[var(--primary)]"
                              />
                              <span className="ml-2 text-sm text-gray-700 flex items-center">
                                <img src="/upi.png" alt="UPI" className="h-4 w-4 mr-1" />
                                UPI
                              </span>
                            </label>
                          </div>
                        </div>
                        
                        {/* Credit/Debit Card Form */}
                        {newPaymentForm.type === "card" && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="cardNumber">
                                Card Number*
                              </label>
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={newPaymentForm.cardNumber}
                                onChange={handlePaymentFormChange}
                                className={`w-full p-2 border rounded payment-form-field ${formErrors.cardNumber ? "error" : "border-gray-300"}`}
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                required
                              />
                              {formErrors.cardNumber ? (
                                <p className="payment-error-message">{formErrors.cardNumber}</p>
                              ) : (
                                <p className="text-xs text-gray-500 mt-1">Format: XXXX XXXX XXXX XXXX</p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="cardHolderName">
                                Card Holder Name*
                              </label>
                              <input
                                type="text"
                                id="cardHolderName"
                                name="cardHolderName"
                                value={newPaymentForm.cardHolderName}
                                onChange={handlePaymentFormChange}
                                className={`w-full p-2 border rounded payment-form-field ${formErrors.cardHolderName ? "error" : "border-gray-300"}`}
                                placeholder="Name as on card"
                                required
                              />
                              {formErrors.cardHolderName && (
                                <p className="payment-error-message">{formErrors.cardHolderName}</p>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="expiryDate">
                                  Expiry Date*
                                </label>
                                <input
                                  type="text"
                                  id="expiryDate"
                                  name="expiryDate"
                                  value={newPaymentForm.expiryDate}
                                  onChange={handlePaymentFormChange}
                                  className={`w-full p-2 border rounded payment-form-field ${formErrors.expiryDate ? "error" : "border-gray-300"}`}
                                  placeholder="MM/YY"
                                  maxLength="5"
                                  required
                                />
                                {formErrors.expiryDate && (
                                  <p className="payment-error-message">{formErrors.expiryDate}</p>
                                )}
                              </div>
                              
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="cvv">
                                  CVV*
                                </label>
                                <input
                                  type="text"
                                  id="cvv"
                                  name="cvv"
                                  value={newPaymentForm.cvv}
                                  onChange={handlePaymentFormChange}
                                  className={`w-full p-2 border rounded payment-form-field ${formErrors.cvv ? "error" : "border-gray-300"}`}
                                  placeholder="123"
                                  maxLength="3"
                                  required
                                />
                                {formErrors.cvv && (
                                  <p className="payment-error-message">{formErrors.cvv}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* UPI Form */}
                        {newPaymentForm.type === "upi" && (
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="upiId">
                              UPI ID*
                            </label>
                            <input
                              type="text"
                              id="upiId"
                              name="upiId"
                              value={newPaymentForm.upiId}
                              onChange={handlePaymentFormChange}
                              className={`w-full p-2 border rounded payment-form-field ${formErrors.upiId ? "error" : "border-gray-300"}`}
                              placeholder="username@upi"
                              required
                            />
                            {formErrors.upiId ? (
                              <p className="payment-error-message">{formErrors.upiId}</p>
                            ) : (
                              <p className="text-xs text-gray-500 mt-1">Format: username@upiservice</p>
                            )}
                          </div>
                        )}
                        
                        {/* Form Actions */}
                        <div className="mt-5 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddPaymentForm(false);
                              setFormErrors({
                                cardNumber: "",
                                cardHolderName: "",
                                expiryDate: "",
                                cvv: "",
                                upiId: ""
                              });
                              setNewPaymentForm({
                                type: 'card',
                                cardNumber: '',
                                cardHolderName: '',
                                expiryDate: '',
                                cvv: '',
                                upiId: ''
                              });
                            }}
                            className="text-gray-600 text-sm hover:underline"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSavePaymentMethod}
                            className="bg-gradient-to-r from-blue-500 to-[var(--primary)] text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-500 transition duration-300 shadow-md active:scale-[0.98]"
                          >
                            Save Payment Method
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Order Summary */}
          <div className="lg:col-span-1" ref={orderSummaryRef}>
            <div className="bg-white rounded-xl shadow-md sticky top-30 summary-sticky">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800">
                  Order Summary
                </h2>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">
                    {orderSummary.items} items
                  </span>{" "}
                  in your cart
                </p>

                {/* Price breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₹{orderSummary.subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">
                      -₹{orderSummary.discount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-green-600 font-medium">
                      {orderSummary.deliveryFee === 0
                        ? "Free"
                        : `₹${orderSummary.deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      ₹{orderSummary.tax.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between mb-3">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-lg text-gray-800">
                      ₹{orderSummary.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div
                  id="place-order-button-container"
                  ref={placeOrderBtnContainerRef}
                >
                  {/* Place Order Button - Always visible in payment step, but disabled when no payment method is selected */}
                  {activeStep === 2 && (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={!isCheckoutValid || isLoading}
                      className={`w-full mt-4 bg-gradient-to-r from-blue-500 to-[var(--primary)] text-white py-2.5 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-500 transition duration-300 shadow-md active:scale-[0.98] flex items-center justify-center cursor-pointer ${
                        !isCheckoutValid || isLoading ? "button-disabled" : ""
                      } ${isLoading ? "loading-animation" : ""}`}
                    >
                      {isLoading ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-lock mr-2"></i>
                          Place Order
                        </>
                      )}
                    </button>
                  )}

                  {/* Desktop-only button for step 1 */}
                  {activeStep === 1 && (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={!isCheckoutValid || isLoading}
                      className={`w-full mt-4 bg-gradient-to-r from-blue-500 to-[var(--primary)] text-white py-2.5 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-500 transition duration-300 shadow-md active:scale-[0.98] hidden lg:flex items-center justify-center cursor-pointer ${
                        !isCheckoutValid || isLoading ? "button-disabled" : ""
                      } ${isLoading ? "loading-animation" : ""}`}
                    >
                      {isLoading ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-lock mr-2"></i>
                          Place Order
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Mobile Checkout Button - Only shown on mobile and when original button is not in view */}
      <div
        className={`fixed-checkout-btn ${
          showFixedMobileButton ? "visible" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-800">Total:</span>
          <span className="font-bold text-lg text-gray-800">
            ₹{orderSummary.total.toLocaleString()}
          </span>
        </div>

        {activeStep === 1 ? (
          <button
            onClick={handleAddressSubmit}
            disabled={!isAddressValid}
            className={`w-full bg-gradient-to-r from-blue-500 to-[var(--primary)] text-white py-2.5 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-500 transition duration-300 shadow-md active:scale-[0.98] flex items-center justify-center cursor-pointer ${
              !isAddressValid ? "button-disabled" : ""
            }`}
          >
            <i className="fa-solid fa-arrow-right mr-2"></i>
            Continue to Payment
          </button>
        ) : (
          <button
            onClick={handlePlaceOrder}
            disabled={!isCheckoutValid || isLoading}
            className={`w-full bg-gradient-to-r from-blue-500 to-[var(--primary)] text-white py-2.5 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-500 transition duration-300 shadow-md active:scale-[0.98] flex items-center justify-center cursor-pointer ${
              !isCheckoutValid || isLoading ? "button-disabled" : ""
            } ${isLoading ? "loading-animation" : ""}`}
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                Processing...
              </>
            ) : (
              <>
                <i className="fa-solid fa-lock mr-2"></i>
                Place Order
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
