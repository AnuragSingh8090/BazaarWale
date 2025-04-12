import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);



  // Sample orders with real product images
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setOrders([
        {
          id: "OD2023112901",
          date: "Nov 29, 2023",
          total: 2499.99,
          status: "Delivered",
          deliveryDate: "Dec 3, 2023",
          items: [
            {
              id: 1,
              name: "Smartphone X Pro",
              price: 1499.99,
              image: "https://m.media-amazon.com/images/I/61L1ItFgFHL.jpg",
              quantity: 1,
              size: "128GB",
              color: "Midnight Black",
              status: "Delivered"
            },
            {
              id: 2,
              name: "Wireless Earbuds",
              price: 999.99,
              image: "https://m.media-amazon.com/images/I/61eDXs9QFNL.jpg",
              quantity: 1,
              size: "One Size",
              color: "White",
              status: "Delivered"
            }
          ],
          deliveryAddress: "123 Main St, Apartment 4B, New York, NY 10001",
          paymentMethod: "Credit Card ending in 4242"
        },
        {
          id: "OD2023111501",
          date: "Nov 15, 2023",
          total: 3599.99,
          status: "Processing",
          estimatedDelivery: "Nov 21, 2023",
          items: [
            {
              id: 3,
              name: "Laptop Pro 16",
              price: 3599.99,
              image: "https://m.media-amazon.com/images/I/61bX2AoGj2L.jpg",
              quantity: 1,
              size: "16 inch",
              color: "Silver",
              status: "Processing"
            }
          ],
          deliveryAddress: "123 Main St, Apartment 4B, New York, NY 10001",
          paymentMethod: "Credit Card ending in 4242"
        },
        {
          id: "OD2023102201",
          date: "Oct 22, 2023",
          total: 129.99,
          status: "Cancelled",
          cancelDate: "Oct 23, 2023",
          items: [
            {
              id: 4,
              name: "Bluetooth Speaker",
              price: 129.99,
              image: "https://m.media-amazon.com/images/I/71WNWq6hLxL.jpg",
              quantity: 1,
              size: "Medium",
              color: "Black",
              status: "Cancelled"
            }
          ],
          deliveryAddress: "123 Main St, Apartment 4B, New York, NY 10001",
          paymentMethod: "Credit Card ending in 4242"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === "all") return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  // Order status badge color & icon
  const getStatusInfo = (status) => {
    switch (status) {
      case "Delivered":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: "fa-solid fa-check-circle text-green-500",
          gradient: "from-green-50 to-green-100"
        };
      case "Processing":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: "fa-solid fa-gear text-blue-500 animate-spin-slow",
          gradient: "from-blue-50 to-blue-100"
        };
      case "Shipped":
        return {
          color: "bg-purple-100 text-purple-800 border-purple-200",
          icon: "fa-solid fa-truck text-purple-500",
          gradient: "from-purple-50 to-purple-100"
        };
      case "Cancelled":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: "fa-solid fa-ban text-red-500",
          gradient: "from-red-50 to-red-100"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: "fa-solid fa-circle-info text-gray-500",
          gradient: "from-gray-50 to-gray-100"
        };
    }
  };

  // Function to handle order cancellation
  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: "Cancelled" }
        : order
    ));
  };

  // Function to handle individual item cancellation
  const handleCancelItem = (orderId, itemId) => {
    setOrders(orders.map(order => {
      if (order.id !== orderId) return order;

      const updatedItems = order.items.map(item =>
        item.id === itemId ? { ...item, status: "Cancelled" } : item
      );

      // If all items are cancelled, mark the whole order as cancelled
      const allCancelled = updatedItems.every(item => item.status === "Cancelled");

      return {
        ...order,
        status: allCancelled ? "Cancelled" : order.status,
        items: updatedItems
      };
    }));
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "text-green-600";
      case "Processing": return "text-blue-600";
      case "Shipped": return "text-purple-600";
      case "Cancelled": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  // Function to format price in Indian Rupees
  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Toggle order expansion
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 lg:px-6">
      <ScrollToTop />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2"><i className="fa-solid fa-box"></i> My Orders</h1>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin text-[var(--primary)] mb-4">
              <i className="fa-solid fa-circle-notch text-3xl"></i>
            </div>
            <p>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="flex justify-center mb-4">
              <i className="fa-solid fa-box-open text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-4">You haven't placed any orders with us yet.</p>
            <Link
              to="/"
              className="inline-block bg-[var(--primary)] text-white px-4 py-2 rounded-md hover:bg-[#007ab3] transition-colors cursor-pointer"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100 transform transition-transform duration-300 hover:shadow-md hover:scale-[1.01]">
                <div className="p-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-medium text-base">Order #{order.id}</h2>
                      <p className="text-xs text-gray-500">Placed on {order.date}</p>
                    </div>
                    <div className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {order.items.map(item => (
                    <div key={item.id} className="p-3 flex items-center">
                      {/* Image - Fixed and smaller */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden mr-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </div>

                      {/* Product Info - Smaller text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.size && <span className="mr-2">Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className={`text-xs ${getStatusColor(item.status || order.status)}`}>
                            {item.status || order.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {order.status === "Delivered" ?
                              `Delivered on ${order.deliveryDate}` :
                              order.estimatedDelivery ?
                                `Expected delivery ${order.estimatedDelivery}` :
                                ""
                            }
                          </span>
                        </div>
                        <div className="mt-1 text-sm font-medium text-[var(--primary)]">
                          {formatPrice(item.price)}
                        </div>
                      </div>

                      {/* Quantity - Right side */}
                      <div className="ml-3 flex-shrink-0">
                        <span className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-gray-50 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-600">Total: </span>
                    <span className="text-sm font-medium text-[var(--primary)]">{formatPrice(order.total)}</span>
                  </div>

                  {order.status === "Processing" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-3 py-1 bg-red-50 border border-red-200 rounded text-xs text-red-600 hover:bg-red-100 cursor-pointer flex items-center gap-1"
                    >
                      <i className="fa-solid fa-ban mr-1"></i>
                      <span>Cancel Order</span>
                    </button>
                  )}

                  {order.status === "Delivered" && (
                    <Link
                      to={`/order/${order.id}`}
                      className="px-3 py-1 bg-[var(--primary-light)] border border-[var(--primary)] rounded text-xs text-[var(--primary)] hover:bg-[#dbf0f8] cursor-pointer flex items-center gap-1"
                    >
                      <i className="fa-solid fa-receipt mr-1"></i>
                      <span>View Details</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 