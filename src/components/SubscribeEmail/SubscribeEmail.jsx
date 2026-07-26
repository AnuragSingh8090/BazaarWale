import { useEffect, useState, useRef } from "react";
import { Mail, Check, AlertCircle, Bell } from "lucide-react";
import { errorToast, sucessToast } from "../Toasters/Toasters";
import apiService from "../../services/apiService";
import { Link } from "react-router-dom";

export default function SubscribeEmail() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const AbortSignal = useRef(new AbortController());
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email) {
        setStatus("error");
        setMessage("Please enter your email address");
        return;
      }

      if (!validateEmail(email)) {
        setStatus("error");
        setMessage("Please enter a valid email address");
        return;
      }
      setStatus("loading");
      const response = await apiService.newsletter({ email }, AbortSignal.current.signal);

      if (response) {
        setStatus("success");
        sucessToast("Successfully subscribed! Welcome to our community.");
        setEmail("");
        setStatus("idle");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      setStatus("failed");
      setMessage("Failed to Subscribe !!");
      errorToast(
        error.response ? error.response.data.message : "Internal Server Error!"
      );
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      AbortSignal.current.abort();
    };
  }, []);

  return (
    <section className="py-3 xs:py-4 sm:py-6">
      <div className="w-full px-3 xs:px-4">
        <div className="max-w-lg sm:max-w-xl mx-auto bg-[var(--bg-white)] rounded-xl shadow-sm border border-[var(--border-light)] p-3.5 xs:p-5 sm:p-6 text-center relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 bg-[var(--primary-lighter)] text-[var(--primary)] rounded-full mb-2 xs:mb-3 relative z-10">
            <Bell className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-4.5 sm:w-4.5" />
          </div>

          <h2 className="heading relative z-10">
            Subscribe to our Newsletter
          </h2>

          <p className="sub-heading mb-3 xs:mb-4 mx-auto relative z-10 max-w-sm xs:max-w-md">
            Get the latest updates on new products, exclusive deals, and upcoming sales directly in your inbox.
          </p>

          <div className="max-w-xs xs:max-w-sm mx-auto w-full space-y-2.5 relative z-10">
            <div className="flex flex-col xs:flex-row gap-2">
              <div className="relative flex-1 group">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 xs:h-4 xs:w-4 transition-colors ${status === 'error' ? 'text-[var(--error)]' : 'text-[var(--text-muted)] group-focus-within:text-[var(--primary)]'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={status === "loading"}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  className={`w-full pl-8 xs:pl-9 pr-3 py-1.5 xs:py-2 text-[11px] xs:text-xs bg-[var(--bg-white)] border rounded-lg focus:outline-none transition-all ${status === "error"
                    ? "border-[var(--error)] bg-red-50 focus:border-[var(--error)]"
                    : "border-[var(--border-default)] focus:border-[var(--primary)] shadow-sm focus:shadow-md"
                    }`}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className={`py-1.5 xs:py-2 px-4 xs:px-5 rounded-lg font-semibold text-[11px] xs:text-xs text-white transition-all flex justify-center items-center shrink-0 cursor-pointer ${status === "loading"
                  ? "bg-[var(--border-medium)] cursor-not-allowed"
                  : "bg-[var(--primary)] hover:brightness-110 active:scale-[0.98] shadow-sm hover:shadow-md"
                  }`}
              >
                {status === "loading" ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-white/20 border-t-white mr-1.5"></div>
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

            {message && (
              <div
                className={`flex items-start gap-1.5 p-1.5 xs:p-2 rounded-lg text-[10px] xs:text-xs font-medium animate-[fadeIn_0.3s_ease-out] text-left ${status === "success"
                  ? "bg-[var(--success-light)] text-[var(--success-dark)] border border-[var(--success)]"
                  : "bg-red-50 text-[var(--error)] border border-red-200"
                  }`}
              >
                {status === "success" ? (
                  <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                )}
                <p className="leading-snug">{message}</p>
              </div>
            )}
          </div>

          <p className="text-[9px] xs:text-[10px] text-[var(--text-muted)] mt-3 xs:mt-3.5 relative z-10">
            By subscribing, you agree to our{" "}
            <Link to="/privacy_policy" className="text-[var(--primary)] hover:underline font-medium">Privacy Policy</Link>
            {" "}and{" "}
            <Link to="/terms_conditions" className="text-[var(--primary)] hover:underline font-medium">Terms and Conditions</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
