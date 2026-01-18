import "./ProductCardSkeleton.css";

const ProductCardSkeleton = () => {
    return (
        <div className="bg-white product-card-main flex flex-col rounded-lg shadow-sm overflow-hidden">
            <div className="relative w-full h-[50%] bg-gray-200 skeleton-shimmer"></div>
            <div className="p-3 flex flex-col grow-1 justify-between">
                <div className="h-4 bg-gray-200 rounded mb-2 skeleton-shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 skeleton-shimmer"></div>
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-gray-200 rounded skeleton-shimmer"></div>
                        ))}
                    </div>
                    <div className="h-3 w-12 bg-gray-200 rounded skeleton-shimmer"></div>
                </div>
                <div className="h-5 mt-auto bg-gray-200 rounded-md skeleton-shimmer"></div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
