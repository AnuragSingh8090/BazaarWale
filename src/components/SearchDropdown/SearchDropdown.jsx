import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
import { searchProductsData } from "../../constants/companyDetails";

const SearchDropdown = () => {
  const [searchText, setSearchText] = useState("");
  const [showSearchDrop, setShowSearchDrop] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const prevWidthRef = useRef(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    if (searchText) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setSearchLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSearchDrop(false);
      }
    };

    const handleResize = () => {
      // Mobile soft keyboard triggers window height resize.
      // Only close dropdown if horizontal width actually changes (orientation change or desktop resize).
      if (window.innerWidth !== prevWidthRef.current) {
        prevWidthRef.current = window.innerWidth;
        setShowSearchDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const clearSearch = (e) => {
    e.stopPropagation();
    setSearchText("");
    setShowSearchDrop(false);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      setShowSearchDrop(false);
      navigate("/products");
    }
  };

  const filteredProducts = searchProductsData.filter((prod) =>
    prod.name.toLowerCase().includes(searchText.toLowerCase()) ||
    prod.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className="inputContainer flex items-center justify-center search_container w-full text-xs rounded-lg px-2.5 xs:px-3 min-[500px]:px-3.5 md:px-3 py-1.5 xs:py-2 min-[500px]:py-2 md:py-1.5 bg-[var(--primary-light)] gap-2 transition-colors duration-200 relative focus-within:bg-[var(--bg-white)] focus-within:ring-1 focus-within:ring-[var(--primary)] border border-transparent focus-within:border-[var(--primary)] cursor-text"
        onClick={() => {
          setShowSearchDrop(true);
          inputRef.current?.focus();
        }}
      >
        <i
          className="fa-solid fa-magnifying-glass active:scale-[0.95] text-[var(--primary)] cursor-pointer text-xs shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            handleSearch();
          }}
        ></i>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          className="w-full bg-transparent text-[var(--text-dark)] focus:outline-none placeholder:text-[var(--text-muted)] text-[11px] xs:text-xs md:text-[14px]"
          onChange={(e) => {
            setSearchText(e.target.value);
            if (!showSearchDrop) setShowSearchDrop(true);
          }}
          value={searchText}
          onFocus={() => setShowSearchDrop(true)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
        />
        <div className="w-4 h-4 shrink-0 flex items-center justify-center">
          {searchText ? (
            <i
              className="fa-solid fa-xmark text-[var(--text-muted)] hover:text-[var(--text-dark)] cursor-pointer text-xs transition-colors"
              onClick={clearSearch}
              title="Clear search"
            ></i>
          ) : null}
        </div>
      </div>

      {showSearchDrop && (
        <div className="drop_container absolute top-full left-0 right-0 w-full mt-1.5 bg-white border border-[var(--border-default)] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col z-50 md:z-[100] max-h-[300px] md:max-h-[320px]">
          <div className="sticky top-0 z-10 px-2.5 xs:px-3.5 py-2 xs:py-2.5 bg-white border-b border-[var(--border-light)] flex items-center justify-between shadow-xs shrink-0">
            <span className="text-[10px] xs:text-[11px] font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-1.5">
              <i className="fa-solid fa-fire text-[var(--accent)] text-[10px] xs:text-xs"></i>
              {searchText.trim() ? "Search Results" : "Featured Products"}
            </span>
            <span className="text-[9px] xs:text-[10px] text-[var(--text-secondary)] font-medium">
              {searchLoading ? "Searching..." : `${filteredProducts.length} items`}
            </span>
          </div>

          <div className="search-dropdown-scroll scroll-smooth flex-1 divide-y divide-[var(--border-light)] max-h-[240px] md:max-h-[260px] overflow-y-auto">
            {searchLoading ? (
              <div className="p-5 xs:p-6 text-center text-xs text-[var(--text-secondary)] flex items-center justify-center gap-2">
                <ImSpinner8 className="animate-spin text-[var(--primary)] text-sm xs:text-base" />
                <span className="text-[11px] xs:text-xs">Searching products...</span>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    setShowSearchDrop(false);
                    navigate(prod.link || "/products");
                  }}
                  className="flex items-center gap-2 xs:gap-3 p-2 xs:p-2.5 hover:bg-[var(--primary-lighter)] transition-colors cursor-pointer group"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-8 h-8 xs:w-10 xs:h-10 object-contain rounded-md bg-[var(--bg-light)] p-1 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] xs:text-xs font-semibold text-[var(--text-dark)] group-hover:text-[var(--primary)] truncate transition-colors">
                      {prod.name}
                    </p>
                    <span className="text-[9px] xs:text-[10px] text-[var(--text-secondary)] font-medium">
                      {prod.category}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] xs:text-xs font-bold text-[var(--primary)]">{prod.price}</p>
                    {prod.discount && (
                      <span className="text-[8px] xs:text-[9px] font-semibold text-[var(--success)] bg-green-50 px-1 xs:px-1.5 py-0.5 rounded">
                        {prod.discount}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5 xs:p-6 text-center space-y-1">
                <i className="fa-solid fa-magnifying-glass-minus text-lg xs:text-xl text-[var(--text-muted)] mb-1 block"></i>
                <p className="text-[11px] xs:text-xs font-semibold text-[var(--text-dark)]">No products found</p>
                <p className="text-[10px] xs:text-[11px] text-[var(--text-muted)]">Try searching for "iPhone", "MacBook", etc.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
