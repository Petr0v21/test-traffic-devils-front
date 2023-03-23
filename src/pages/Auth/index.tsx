import React from "react";
import FormLogIn from "../../app/component/Auth/FormLogIn";
import FormSignUp from "../../app/component/Auth/FormSignUp";
import {Route, Routes} from "react-router-dom";

const Auth = () => {
  return (
    <div className="authpage">
      <Routes>
        <Route path="*" element={<FormLogIn />} />
        <Route path="signup" element={<FormSignUp />} />
      </Routes>
    </div>
  );
};

export default Auth;
