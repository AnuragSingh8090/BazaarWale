import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiShare2, FiTruck, FiRefreshCw, FiStar } from "react-icons/fi";
import { AiFillStar, AiOutlineStar, AiFillHeart } from "react-icons/ai";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [activeTab, setActiveTab] = useState("description");
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);
    const [relatedFavorites, setRelatedFavorites] = useState([]);
    const [relatedCart, setRelatedCart] = useState({});

    // Sample product data - replace with actual API call
    const product = {
        id: productId,
        name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
        brand: "AudioTech Pro",
        price: 2499,
        originalPrice: 4999,
        rating: 4.5,
        reviews: 1250,
        inStock: true,
        images: [
            "https://picsum.photos/600/600?random=1",
            "https://picsum.photos/600/600?random=2",
            "https://picsum.photos/600/600?random=3",
            "https://picsum.photos/600/600?random=4",
        ],
        colors: ["Black", "White", "Blue", "Red"],
        sizes: ["S", "M", "L", "XL"],
        description: "Experience premium sound quality with our wireless Bluetooth headphones featuring active noise cancellation. Perfect for music lovers and professionals alike. Enjoy up to 30 hours of battery life and comfortable over-ear design.",
        specifications: {
            "Brand": "AudioTech Pro",
            "Model": "AT-WH1000",
            "Connectivity": "Bluetooth 5.0",
            "Battery Life": "30 hours",
            "Charging Time": "2 hours",
            "Weight": "250g",
            "Driver Size": "40mm",
            "Frequency Response": "20Hz - 20kHz",
        },
        features: [
            "Active Noise Cancellation (ANC)",
            "Premium 40mm drivers",
            "30-hour battery life",
            "Quick charge support",
            "Comfortable over-ear design",
            "Built-in microphone",
            "Foldable design",
            "Carrying case included",
        ],
    };

    const relatedProducts = [
        {
            id: 2,
            name: "Wireless Earbuds Pro",
            price: 1999,
            originalPrice: 3999,
            image: "https://picsum.photos/300/300?random=10",
            rating: 4.3,
            reviews: 850,
        },
        {
            id: 3,
            name: "Smart Watch Ultra",
            price: 3999,
            originalPrice: 7999,
            image: "https://picsum.photos/300/300?random=11",
            rating: 4.6,
            reviews: 1120,
        },
        {
            id: 4,
            name: "Portable Speaker",
            price: 1499,
            originalPrice: 2999,
            image: "https://picsum.photos/300/300?random=12",
            rating: 4.4,
            reviews: 670,
        },
        {
            id: 5,
            name: "Gaming Headset",
            price: 2999,
            originalPrice: 5999,
            image: "https://picsum.photos/300/300?random=13",
            rating: 4.7,
            reviews: 1450,
        },
    ];

    const toggleRelatedFavorite = (productId) => {
        setRelatedFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const addToRelatedCart = (productId) => {
        setRelatedCart((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    const removeFromRelatedCart = (productId) => {
        setRelatedCart((prev) => {
            const newCart = { ...prev };
            if (newCart[productId] > 1) {
                newCart[productId] -= 1;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    };

    const deleteFromRelatedCart = (productId) => {
        setRelatedCart((prev) => {
            const newCart = { ...prev };
            delete newCart[productId];
            return newCart;
        });
    };

    const handleMouseMove = (e) => {
        if (!isZooming) return;

        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    const handleAddToCart = () => {
        console.log("Added to cart:", { product, quantity, selectedSize, selectedColor });
        // Implement add to cart logic
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate("/checkout");
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: `Check out ${product.name}`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Error sharing:", err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="mb-4 text-sm">
                    <span className="text-gray-500 cursor-pointer hover:text-[var(--primary)]" onClick={() => navigate("/")}>Home</span>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-500 cursor-pointer hover:text-[var(--primary)]" onClick={() => navigate("/electronics")}>Products</span>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-700">{product.name.substring(0, 30)}...</span>
                </div>

                {/* Main Product Section */}
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image Section */}
                        <div className="space-y-4">
                            {/* Main Image with Zoom */}
                            <div
                                className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200"
                                onMouseEnter={() => setIsZooming(true)}
                                onMouseLeave={() => setIsZooming(false)}
                                onMouseMove={handleMouseMove}
                            >
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className={`w-full h-full object-contain transition-transform duration-200 ${isZooming ? "scale-150 cursor-crosshair" : ""
                                        }`}
                                    style={
                                        isZooming
                                            ? {
                                                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            }
                                            : {}
                                    }
                                />
                                {/* Discount Badge */}
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${selectedImage === index
                                            ? "border-[var(--primary)] shadow-md"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info Section */}
                        <div className="space-y-5">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>

                                {/* Rating */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            i < Math.floor(product.rating) ? (
                                                <AiFillStar key={i} className="text-yellow-400 text-lg" />
                                            ) : (
                                                <AiOutlineStar key={i} className="text-gray-300 text-lg" />
                                            )
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {product.rating} ({product.reviews} reviews)
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                                        Save ₹{product.originalPrice - product.price}
                                    </span>
                                </div>

                                {/* Stock Status */}
                                {product.inStock ? (
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-green-600 font-medium text-sm">✓ In Stock</span>
                                        <span className="text-gray-500 text-xs">(Ships within 24 hours)</span>
                                    </div>
                                ) : (
                                    <div className="mb-4">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
                                            <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
                                                <span className="text-lg">⚠</span>
                                                Currently Out of Stock
                                            </p>
                                            <p className="text-red-500 text-xs mt-1">Add to wishlist to be notified when available</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Color Selection */}
                            {product.colors && product.colors.length > 0 && (
                                <div className={!product.inStock ? "opacity-50 pointer-events-none" : ""}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                        Select Color {!product.inStock && <span className="text-xs text-red-500">(Unavailable)</span>}
                                    </h3>
                                    <div className="flex gap-2 flex-wrap">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-4 py-2 rounded-md border-2 transition-all ${selectedColor === color
                                                    ? "border-[var(--primary)] bg-blue-50 text-[var(--primary)]"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className={!product.inStock ? "opacity-50 pointer-events-none" : ""}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                        Select Size {!product.inStock && <span className="text-xs text-red-500">(Unavailable)</span>}
                                    </h3>
                                    <div className="flex gap-2 flex-wrap">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-4 py-2 rounded-md border-2 transition-all ${selectedSize === size
                                                    ? "border-[var(--primary)] bg-blue-50 text-[var(--primary)]"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className={!product.inStock ? "opacity-50 pointer-events-none" : ""}>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Quantity {!product.inStock && <span className="text-xs text-red-500">(Unavailable)</span>}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={!product.inStock}
                                        className="w-10 h-10 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-bold disabled:cursor-not-allowed"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-semibold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        disabled={!product.inStock}
                                        className="w-10 h-10 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-bold disabled:cursor-not-allowed"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 flex-wrap">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    title={!product.inStock ? "Product is currently out of stock" : "Add to cart"}
                                    className="flex-1 min-w-[200px] bg-[var(--primary)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 flex items-center justify-center gap-2 transition-all"
                                >
                                    <FiShoppingCart size={20} />
                                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={!product.inStock}
                                    title={!product.inStock ? "Product is currently out of stock" : "Buy now"}
                                    className="flex-1 min-w-[200px] bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 transition-all"
                                >
                                    {product.inStock ? "Buy Now" : "Unavailable"}
                                </button>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className="flex-1 border-2 border-gray-300 py-2 px-4 rounded-lg hover:border-red-500 hover:bg-red-50 flex items-center justify-center gap-2 transition-all"
                                >
                                    {isFavorite ? (
                                        <AiFillHeart size={20} className="text-red-500" />
                                    ) : (
                                        <FiHeart size={20} />
                                    )}
                                    <span>Wishlist</span>
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="flex-1 border-2 border-gray-300 py-2 px-4 rounded-lg hover:border-[var(--primary)] hover:bg-blue-50 flex items-center justify-center gap-2 transition-all"
                                >
                                    <FiShare2 size={20} />
                                    <span>Share</span>
                                </button>
                            </div>

                            {/* Delivery Info */}
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex items-start gap-3">
                                    <FiTruck className="text-[var(--primary)] mt-1" size={20} />
                                    <div>
                                        <p className="font-semibold text-sm">Free Delivery</p>
                                        <p className="text-sm text-gray-600">Delivered in 3-5 business days</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FiRefreshCw className="text-[var(--primary)] mt-1" size={20} />
                                    <div>
                                        <p className="font-semibold text-sm">Easy Returns</p>
                                        <p className="text-sm text-gray-600">7 days return policy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
                    <div className="border-b border-gray-200 mb-6">
                        <div className="flex gap-8">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`pb-3 font-semibold transition-colors ${activeTab === "description"
                                    ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Description
                            </button>
                            <button
                                onClick={() => setActiveTab("specifications")}
                                className={`pb-3 font-semibold transition-colors ${activeTab === "specifications"
                                    ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Specifications
                            </button>
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`pb-3 font-semibold transition-colors ${activeTab === "reviews"
                                    ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Reviews ({product.reviews})
                            </button>
                        </div>
                    </div>

                    {activeTab === "description" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Product Description</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                            <ul className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === "specifications" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Technical Specifications</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex border-b border-gray-100 pb-3">
                                        <span className="font-semibold text-gray-700 w-1/2">{key}</span>
                                        <span className="text-gray-600 w-1/2">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                            <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-gray-800">{product.rating}</div>
                                    <div className="flex items-center gap-1 my-2">
                                        {[...Array(5)].map((_, i) => (
                                            <AiFillStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-600">{product.reviews} reviews</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {/* Sample reviews */}
                                <div className="border-b pb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <AiFillStar key={i} className="text-yellow-400 text-sm" />
                                            ))}
                                        </div>
                                        <span className="text-sm font-semibold">Excellent Product!</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">Great sound quality and comfortable to wear for long hours.</p>
                                    <p className="text-xs text-gray-400">- John Doe, 2 days ago</p>
                                </div>
                                <div className="border-b pb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex">
                                            {[...Array(4)].map((_, i) => (
                                                <AiFillStar key={i} className="text-yellow-400 text-sm" />
                                            ))}
                                            <AiOutlineStar className="text-gray-300 text-sm" />
                                        </div>
                                        <span className="text-sm font-semibold">Very Good</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">Good value for money. Noise cancellation works well.</p>
                                    <p className="text-xs text-gray-400">- Jane Smith, 5 days ago</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Related Products */}
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                    <div className="flex flex-wrap gap-3">
                        {relatedProducts.map((relProduct) => (
                            <ProductCard
                                key={relProduct.id}
                                product={relProduct}
                                isFavorite={relatedFavorites.includes(relProduct.id)}
                                onToggleFavorite={toggleRelatedFavorite}
                                cartQuantity={relatedCart[relProduct.id] || 0}
                                onAddToCart={addToRelatedCart}
                                onRemoveFromCart={removeFromRelatedCart}
                                onDeleteFromCart={deleteFromRelatedCart}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
