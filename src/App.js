import { Toaster } from "react-hot-toast";
import "./App.css";
import "./Styles/styles.css"
import Routing from "./Routing/Routing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleGetCustomerUserDetails, handleGetUserDetails } from "./Redux/AuthSlice";

function App() {
  const { userDetails, user, token } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user !== null) {
      if (user?.loginType === "Employee") {
        dispatch(handleGetUserDetails({ id: user?.employeeMasterID, token, loginType: user?.loginType }));
      }
      else {
        dispatch(handleGetCustomerUserDetails({ id: user?.employeeMasterID, token, loginType: user?.loginType }));
      }
    }
  }, [user]);

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <Routing />
    </>
  );
}

export default App;
