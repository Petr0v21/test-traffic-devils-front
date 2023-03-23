import {observer} from "mobx-react";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../../context/AuthContext";
import store from "../../../../stores/authStore";
import {Button} from "../../../styled-components/Button";
import {InputComponentChildren} from "../../../styled-components/Input";
import eyeShow from "@/static/images/Show.svg";
import eyeHide from "@/static/images/Hide.svg";

const FormLogIn: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await store.logIn();
        if (store.activeUser.accessToken) {
          auth?.login(
            store.activeUser.accessToken,
            store.activeUser.refreshToken,
            store.activeUser.name
          );
          navigate("/");
        }
      }}
    >
      <h2>Log In</h2>
      <InputComponentChildren size="medium">
        <input
          type="text"
          name="id"
          placeholder="email/phone"
          value={store.user.id}
          required
          onChange={(e) => store.addField(e.target.value, e.target.name)}
        />
      </InputComponentChildren>
      <InputComponentChildren size="medium">
        <input
          name="password"
          type={show ? "text" : "password"}
          placeholder="password"
          value={store.user.password}
          required
          onChange={(e) => store.addField(e.target.value, e.target.name)}
        />
        <img
          src={show ? eyeShow : eyeHide}
          alt="eye"
          onClick={() => setShow(!show)}
        />
      </InputComponentChildren>
      <Button>LogIn</Button>
      <Link to="signup">Sign Up</Link>
    </form>
  );
};

export default observer(FormLogIn);
