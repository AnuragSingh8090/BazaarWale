
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser, loginStart } from "../store/slices/userSlice";
import apiService from "./apiService";

const useLoginInterceptor = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        dispatch(logoutUser());
        return;
      }
      else {
        try {
          dispatch(loginStart());
          const response = await apiService.getBasicUserData();
          const { name, email, userId, cart } = response.user;
          dispatch(loginUser({ name, email, userId, cart, token }));
        } catch (error) {
          console.log(error)
        }
      }
    };

    validateToken();
  }, []);
};

export default useLoginInterceptor;

