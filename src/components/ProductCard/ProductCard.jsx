import { FiHeart, FiShoppingCart, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { AiFillStar, AiOutlineStar, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({
    product,
    isFavorite,
    onToggleFavorite,
    cartQuantity = 0,
    onAddToCart,
    onRemoveFromCart,
    onDeleteFromCart,
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product-details/${product.id}`);
    };

    return (
        <div
            className="product-card-main bg-white flex flex-col justify-between rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden animate-fadeIn cursor-pointer"
            style={{
                animation: "cardFadeIn 0.5s ease-out forwards",
            }}
            onClick={handleCardClick}
        >
            <div className="relative flex items-center justify-center h-[50%] sm:shrink-0 w-full overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-100 object-contain"
                />
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors group/heart"
                >
                    {isFavorite ? (
                        <AiFillHeart size={16} className="text-red-500 group-hover/heart:scale-110 transition-transform" />
                    ) : (
                        <FiHeart size={16} className="text-gray-600 group-hover/heart:scale-110 group-hover/heart:text-red-500 transition-all" />
                    )}
                </button>

                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
            </div>

            <div className="px-3 pb-2 pt-1 flex flex-col justify-between gap-1 grow-1">
                <h3 className="font-medium leading-[1.3] text-[14px] text-gray-800 line-clamp-2 ">
                    {product.name}
                </h3>
                <div className="flex items-center gap-1.5 ">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            i < Math.floor(product.rating) ? (
                                <AiFillStar key={i} className="text-yellow-400 text-xs" />
                            ) : (
                                <AiOutlineStar key={i} className="text-gray-300 text-xs" />
                            )
                        ))}
                    </div>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold leading-[1.2] text-medium">₹{product.price}</span>
                    <span className="text-xs text-gray-500 line-through">
                        ₹{product.originalPrice}
                    </span>
                </div>

                {cartQuantity === 0 ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
                        className="w-full bg-[var(--primary)] text-white py-[4px] rounded-md text-[13px] font-medium hover:bg-opacity-90 flex items-center justify-center gap-2 mt-auto"
                    >
                        <FiShoppingCart size={14} />
                        Add to Cart
                    </button>
                ) : (
                    <div className="flex items-center gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => onRemoveFromCart(product.id)}
                            className="w-7 aspect-square bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center transition-colors"
                        >
                            <FiMinus size={15} className="text-gray-700" />
                        </button>
                        <span className="flex-1 text-center font-semibold text-gray-800">
                            {cartQuantity}
                        </span>
                        <button
                            onClick={() => onAddToCart(product.id)}
                            className="w-7 aspect-square bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center transition-colors"
                        >
                            <FiPlus size={15} className="text-gray-700" />
                        </button>
                        <button
                            onClick={() => onDeleteFromCart(product.id)}
                            className="w-7 aspect-square bg-red-50 hover:bg-red-100 rounded-md flex items-center justify-center transition-colors"
                        >
                            <FiTrash2 size={15} className="text-red-500" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
