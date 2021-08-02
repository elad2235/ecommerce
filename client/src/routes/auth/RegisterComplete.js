import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        const user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        history.push("/");
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };
  const completeRegisterForm = (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        defaultValue={email}
        disabled
      ></input>
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={handleChange}
        autoFocus
        placeholder="Enter Your password"
      ></input>
      <button type="submit" className="btn btn-raised">
        Submit
      </button>
    </form>
  );

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {completeRegisterForm}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
