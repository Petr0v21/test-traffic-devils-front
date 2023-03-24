import React, {useContext} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../../context/AuthContext";
import ProfilIcon from "../../../static/images/ownerwhite.svg";

const HeaderStyled = styled.div<{back?: boolean}>`
  background: ${(props) => (props.back ? "#172024" : null)};
  height: 5vh;
  padding: 3vh 5vw 3vh 5vw;
  display: flex;
  align-items: center;
  a {
    color: white;
  }
  .header-nav {
    padding: 0 2vw 0 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  }

  .header-auth {
    position: absolute;
    right: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  }
  .header-login {
    width: 100px;
    height: 42px;
    background: rgba(87, 102, 236, 0.3);
    border-radius: 12px;
    letter-spacing: -0.05em;
  }
  .header-signIn {
    width: 200px;
    height: 42px;
    background: #5766ec;
    border-radius: 12px;
    letter-spacing: -0.05em;
  }

  .header-profil {
    position: absolute;
    right: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
    color: white;
    img {
      width: 15px;
      height: 17px;
    }
    label {
      cursor: pointer;
    }
  }
`;

const Header = (props: {back?: boolean}) => {
  const auth = useContext(AuthContext);
  return (
    <HeaderStyled back={props.back}>
      <Link to="/">
        <h1>Test</h1>
      </Link>
      <div className="header-nav"></div>

      {auth?.isAuthenticated ? (
        <>
          <Link to="/" className="header-profil">
            {auth.userName}
            <img alt="profil-icon" src={ProfilIcon} />
            <label onClick={() => auth.logout()}>Exit</label>
          </Link>
        </>
      ) : (
        <Link to="/auth" className="header-profil">
          Login
        </Link>
      )}
    </HeaderStyled>
  );
};

export default Header;
