import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

export default function SubscribeEmail() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Successfully subscribed! Welcome to our community.');
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className=" py-12 ">
      <div className="max-w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left side - Content */}
            <div className="bg-gradient-to-br from-blue-500 to-sky-600 p-8 sm:p-12 text-white">
              <div className="flex items-center mb-6">
                <Mail className="h-8 w-8 mr-3" />
                <h2 className="text-2xl sm:text-3xl font-bold">Stay Updated</h2>
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Never Miss Out on Amazing Deals!
              </h3>
              
              <div className="space-y-3 text-blue-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <p>Get exclusive access to flash sales and limited-time offers</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <p>Be the first to know about new arrivals across all categories</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <p>Receive personalized product recommendations</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <p>Join millions of happy shoppers saving big every day</p>
                </div>
              </div>

              <div className="mt-8 text-sm text-blue-200">
                <p>🔒 Your privacy is protected. Unsubscribe anytime.</p>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 sm:p-12 bg-[#f3f9fb]">
              <div className="max-w-md mx-auto">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Subscribe Now
                </h4>
                <p className="text-gray-600 mb-8">
                  Join our newsletter for the latest updates on electronics, fashion, home & kitchen, books, and everything in between!
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-[#a7a5a5] focus:border-blue-500 transition-colors ${
                          status === 'error' ? 'border-red-300' : 'border-gray-300'
                        }`}
                        disabled={status === 'loading'}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                      />
                      <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {message && (
                    <div className={`flex items-center p-3 rounded-lg text-sm ${
                      status === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {status === 'success' ? (
                        <Check className="h-4 w-4 mr-2 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      )}
                      {message}
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                      status === 'loading'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 active:transform active:scale-95'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    {status === 'loading' ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Subscribing...
                      </div>
                    ) : (
                      'Subscribe to Newsletter'
                    )}
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    By subscribing, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                      Terms of Service
                    </a>
                  </p>
                </div>

                {/* Trust indicators */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      2M+ Subscribers
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Spam-Free
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}