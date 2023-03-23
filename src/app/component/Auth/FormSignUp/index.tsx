import {observer} from "mobx-react";
import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";
import store from "../../../../stores/authStore";
import CheckBoxComponet from "../../../styled-components/SmallChecks";
import {Button} from "../../../styled-components/Button";
import {InputComponentChildren} from "../../../styled-components/Input";
import {InputSelectDefault} from "../../../styled-components/Select";

const FormSignUp: React.FC = (props) => {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await store.signUp();
        if (store.ok) {
          navigate("/auth/");
        }
      }}
    >
      <h2>Sign Up</h2>
      <InputComponentChildren size="medium">
        <input
          name="id"
          type="text"
          placeholder="email/phone"
          value={store.user.id}
          required
          onChange={(e) => store.addField(e.target.value, e.target.name)}
        />
      </InputComponentChildren>
      <InputComponentChildren size="medium">
        <input
          name="password"
          type="password"
          placeholder="password"
          value={store.user.password}
          required
          onChange={(e) => {
            store.addField(e.target.value, e.target.name);
          }}
        />
      </InputComponentChildren>
      {/* {valid && <label>Довжина пароля повинна бути більше за 6 символів</label>} */}
      <InputComponentChildren size="medium">
        <input
          name="name"
          type="text"
          placeholder="name"
          value={store.user.name}
          required
          onChange={(e) => store.addField(e.target.value, e.target.name)}
        />
      </InputComponentChildren>
      <InputSelectDefault size="medium">
        <InputComponentChildren size="medium">
          <input
            value={store.user.roles}
            placeholder="role"
            required
            readOnly
          />
        </InputComponentChildren>
        <div className="content">
          <p onClick={() => store.addField("user", "roles")}>user</p>
          <p onClick={() => store.addField("admin", "roles")}>admin</p>
          <p onClick={() => store.addField("super_admin", "roles")}>
            super_admin
          </p>
        </div>
      </InputSelectDefault>
      <div className="checkbox">
        <CheckBoxComponet size="medium" effect="bounce">
          <input type="checkbox" required />
        </CheckBoxComponet>
        <label>Agree with Politic Information</label>
      </div>
      <Button>SignUp</Button>
      <Link to="/profil">Go Back</Link>
    </form>
  );
};

export default observer(FormSignUp);
