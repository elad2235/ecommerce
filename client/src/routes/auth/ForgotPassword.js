import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your inbox for password reset link");
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
        toast.error(e.message);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <h4> Recover Password </h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            autoFocus
          ></input>
        </div>
        <button className="btn btn-raised" disabled={!email}>
          {" "}
          Send Recovery Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
