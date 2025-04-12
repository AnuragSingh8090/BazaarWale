import "./CartCard.css";
import { useState } from "react";
import { sucessToast } from "../Toasters/Toasters";
const CartCard = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [cartQty, setCartQty] = useState(1);
  const [itemPrice, setItemPrice] = useState(499);
  const uniquePrice = 499;
  function increaseQty() {
    if (cartQty < 10) {
      setCartQty(cartQty + 1);
      setItemPrice(uniquePrice * (cartQty + 1));
    }
  }

  function decreaseQty() {
    if (cartQty > 1) {
      setCartQty(cartQty - 1);
      setItemPrice(uniquePrice * (cartQty - 1));
    }
  }
  const handleDeleteItem = () => {
    setConfirmDelete(false);
    sucessToast("Item deleted successfully");
  };
  return (
    <div className="cardContainer min-h-[100px] w-[500px]  relative">
      <i
        className="fa-solid fa-trash-can absolute top-[10px] right-[10px] text-red-600 cursor-pointer active:scale-[0.95]"
        onClick={() => setConfirmDelete(true)}
      ></i>

      <div className="flex gap-[15px]">
        <img
          src="https://nobero.com/cdn/shop/files/black_e4d19185-c19d-4e7c-a14a-8d2a29c7bad3.jpg?v=1711976456&width=1066"
          alt=""
          className="h-[150px] rounded-[6px]"
        />

        <div className=" w-full mr-[25px]">
          <h2 className="text-[18px] font-[600] text-[#202020]">
            Loose Fit Printed T-shirt
          </h2>

          <p className="text-[15px] font-[500] text-[#3a3939] mt-[3px]">
            Brand - <span>H&M</span>
          </p>

          <p className="text-[15px] font-[500] text-[#3a3939] mt-[3px]">
            Size -{" "}
            <span className="bg-[#e0e0e0] text-[#3a3939] px-[8px] py-[2px] font-bold rounded-[3px]">
              M
            </span>
          </p>

          <p className="text-[15px] font-[500] text-[#3a3939] mt-[3px]">
            Price -{" "}
            <span className=" text-[#3a3939]  font-bold ">₹{uniquePrice}</span>
          </p>

          <div className=" border-t-[1px] mt-[5px] flex border-[#d8d8d8] items-center  pt-[5px]">
            <div className=" centerFlex w-full gap-[15px]">
              Qty :
              <div className="border-1 border-[#757575] centerFlex gap-[10px] px-[10px] rounded-[6px]">
                <i
                  className="fa-solid fa-minus cursor-pointer active:scale-[0.96]"
                  onClick={decreaseQty}
                ></i>
                <span className="text-[17px] font-[500]">{cartQty}</span>
                <i
                  className="fa-solid fa-plus cursor-pointer active:scale-[0.96]"
                  onClick={increaseQty}
                ></i>
              </div>
            </div>

            <p className="text-end  w-full text-[#3a3939] text-[17px] font-[500]">
              Total -{" "}
              <span className="text-[#3a3939] text-[17px] font-bold">
                ₹{itemPrice}
              </span>
            </p>
          </div>
        </div>
      </div>

      {confirmDelete ? (
        <div className="logoutPopup z-[9999] fixed top-[0] left-[0] h-screen w-screen flex items-center justify-center  bg-[#00000093]">
          <div className=" bg-white p-[10px] px-[20px] flex flex-col items-center justify-center gap-[20px] rounded-[10px] boxShadow-light">
            <h2 className="text-center text-[18px]">
              Do you want to delete this item?
            </h2>
            <div className="flex items-center justify-center gap-[20px] w-full ">
              <button
                onClick={handleDeleteItem}
                className="bg-red-600 py-[5px] px-[25px] cursor-pointer active:scale-[0.95] border-none rounded-[7px] text-white"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-green-600 py-[5px] px-[25px] cursor-pointer active:scale-[0.95] border-none rounded-[7px] text-white"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartCard;
