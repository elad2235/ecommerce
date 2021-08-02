import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Home from "./routes/Home";
import RegisterComplete from "./routes/auth/RegisterComplete";
import Header from "./components/nav/Header";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      } else {
        console.log("No User");
      }
    });

    return unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Register/complete" component={RegisterComplete} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
