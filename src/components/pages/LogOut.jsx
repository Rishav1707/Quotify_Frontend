import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";

const LogOut = (props) => {
  const { setIsLoggedIn } = props;
  const navigate = useNavigate();
  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.get(`${URL}/logoutUser`, {
          withCredentials: true,
        });
        localStorage.removeItem("currentUser");
        setIsLoggedIn(false);
        toast.success("See you soon!");
        navigate("/login");
      } catch (error) {
        console.log("Something went wrong while logging out", error);
      }
    };
    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default LogOut;
