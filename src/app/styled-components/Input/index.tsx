import React, { useState } from "react";
import styled from "styled-components";
import eyeShow from "../../../static/images/Show.svg";
import eyeHide from "../../../static/images/Hide.svg";
import search from "../../../static/images/Search.svg";
import arrow from "../../../static/images/ArrowDownBlack.svg";

export type InputProps = {
  hideArrows?: boolean;
  size?: string;
  name?: string;
  type?: string;
  text?: string;
  changeHandler?: (event: any) => void;
  min?: string;
  max?: string;
  disable?: boolean;
  eye?: boolean;
  img?: boolean;
  invalid?: boolean;
  link?: string;
  val?: any;
  store?: any;
  list?: any;
  valid?: any;
  for?: any;
  children?: React.ReactNode;
  heightauto?: any;
  width?: string;
};

export const InputDefault = styled.div<InputProps>`
  max-width: ${(props) => (props.type === "percent" ? "80px" : "400px")};
  font-size: 12px;
  width: 200px;
  input {
    padding: 8px 2.4em 8px 10px;
    width: 100%;
  }
  img {
    position: absolute;
    right: 1em;
    cursor: pointer;
    width: 14px;
    height: 14px;
  }
  ${(props) => {
    switch (props.size) {
      case "small":
        return `
      font-size: 12px;
      width: 200px;
      input {
        padding: 8px;
      }
      img {
        width: 12px;
        height: 12px;
      }
      padding: 0px;
  `;
      case "medium":
        return `
      font-size: 14px;
      input {
        padding: 10px;
      }
      img {
        width: 14px;
        height: 14px;
      }
      width: 300px;
  `;
      case "large":
        return `
      font-size: 16px;
      input {
        padding: 12px;
      }
      img {
        width: 16px;
        height: 16px;
      }
      width: 400px;
  `;
    }
  }}
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 1px solid ${(props) => (props.invalid ? "red" : "#afb1b6")};
  border-radius: 8px;
  &:focus-within {
    border: 1px solid #6658d3;
  }
  input {
    border: 0;
    z-index: 0;
    background-color: transparent;
    font: inherit;
    // padding: 0.25em 0;
    &:focus {
      outline: 0;
    }
    ${(props) => (props.invalid ? "color: red" : "")}
    &::placeholder {
      ${(props) => (props.invalid ? "color: red" : "")}
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const TextAreaStyled = styled.div<InputProps>`
  // width: 250px;
  width: 360px;
  ${(props) => (props.heightauto ? "" : "height: 90px;")}
  font-size: 12px;
  ${(props) => {
    switch (props.size) {
      case "small":
        return `
      font-size: 12px;
      width: 240px;
  `;
      case "medium":
        return `
      font-size: 14px;
      width: 360px;
  `;
      case "large":
        return `
      font-size: 14px;
      width: 480px;
  `;
    }
  }}
  border: 1px solid ${(props) => (props.invalid ? "red" : "#afb1b6")};
  border-radius: 8px;
  textarea {
    width: 92%;
    height: 64%;
    padding: 1em;
    border: 0;
    z-index: 0;
    background-color: transparent;
    font: inherit;
    resize: none;
    &:focus {
      outline: 0;
    }
    &::placeholder {
      ${(props) => (props.invalid ? "color: red" : "")}
    }
  }
`;

export const InputComponentChildren: React.FC<InputProps> = (props) => {
  if (props.img) {
    return (
      <InputDefault {...props}>
        {props.children}
        <img
          src={props.link ?? arrow}
          alt="img"
          onClick={() => console.log("Click")}
        />
      </InputDefault>
    );
  }
  return <InputDefault {...props}>{props.children}</InputDefault>;
};

export const InputTextArea: React.FC<InputProps> = (props) => {
  return <InputDefault {...props}>{props.children}</InputDefault>;
};

export const InputDefaultComponent: React.FC<InputProps> = (props) => {
  const [show, setShow] = useState(false);
  if (props.eye === true) {
    return (
      <InputDefault {...props}>
        <input
          value={props.val ?? undefined}
          type={show ? "text" : "password"}
          name={props.name ?? "title"}
          required
          onChange={(event) => {
            if (props.store) {
              props.store.addField(event);
            } else {
              console.log("change");
            }
          }}
          disabled={props.disable ?? false}
          autoComplete="off"
          placeholder={props.text ?? "Password"}
        />
        <img
          src={show ? eyeShow : eyeHide}
          alt="eye"
          onClick={() => setShow(!show)}
        />
      </InputDefault>
    );
  } else if (props.type === "search") {
    return (
      <InputDefault {...props}>
        <input
          value={props.val ?? undefined}
          type="text"
          required
          name={props.name ?? "title"}
          onChange={(event) => {
            if (props.store) {
              props.store.addField(event);
            } else {
              console.log("change");
            }
          }}
          disabled={props.disable ?? false}
          autoComplete="off"
          placeholder={props.text ?? "Search .."}
        />
        <img src={search} alt="Search" onClick={() => console.log("Click")} />
      </InputDefault>
    );
  } else {
    if (props.img) {
      return (
        <InputDefault {...props}>
          <input
            value={props.val ?? undefined}
            type={props.type ?? "text"}
            required
            name={props.name ?? "title"}
            onChange={(event) => {
              if (props.store) {
                props.store.addField(event);
              } else {
                console.log("change");
              }
            }}
            disabled={props.disable ?? false}
            autoComplete="off"
            placeholder={props.text ?? "Text"}
          />
          <img
            src={props.link}
            alt="img"
            onClick={() => console.log("Click")}
          />
        </InputDefault>
      );
    } else {
      return (
        <InputDefault {...props}>
          <input
            value={props.val ?? undefined}
            type={props.type ?? "text"}
            required
            name={props.name ?? "title"}
            onChange={(event) => {
              if (props.store) {
                props.store.addField(event);
              } else {
                console.log("change");
              }
            }}
            min={props.min ?? ""}
            max={props.max ?? ""}
            disabled={props.disable ?? false}
            placeholder={props.text ?? "Text"}
            autoComplete="off"
          />
        </InputDefault>
      );
    }
  }
};

export default InputDefaultComponent;

export const InputSelectVal = styled.div<InputProps>`
  max-width: ${(props) => (props.type === "percent" ? "80px" : "400px")};
  font-size: 12px;
  width: 200px;
  input[type="number"] {
    padding: 8px 2.4em 8px 10px;
    width: 70%;
  }
  input[type="text"] {
    cursor: pointer;
    width: 30%;
    border-left: 1px solid black;
  }
  ${(props) => {
    switch (props.size) {
      case "small":
        return `
    font-size: 12px;
    width: 200px;
    input {
      padding: 8px;
    }
    padding: 0px;
`;
      case "medium":
        return `
    font-size: 14px;
    input {
      padding: 10px;
    }
    width: 300px;
`;
      case "large":
        return `
    font-size: 16px;
    input {
      padding: 12px;
    }
    width: 400px;
`;
    }
  }}
  ${(props) => (props.width ? `width: ${props.width};` : "")}
display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 1px solid ${(props) => (props.invalid ? "red" : "#afb1b6")};
  border-radius: 8px;
  &:focus-within {
    border: 1px solid #6658d3;
  }
  input {
    border: 0;
    z-index: 0;
    background-color: transparent;
    font: inherit;
    // padding: 0.25em 0;
    &:focus {
      outline: 0;
    }
    ${(props) => (props.invalid ? "color: red" : "")}
    &::placeholder {
      ${(props) => (props.invalid ? "color: red" : "")}
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
