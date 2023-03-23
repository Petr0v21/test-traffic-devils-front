import React, {useContext} from "react";
import styled from "styled-components";
import {ContentType} from "../../../../types";

const ItemStyled = styled.div<{back?: boolean}>`
  padding: 0.5em 10%;
  display: flex;
  label {
    width: 25%;
    padding: 0.5em 0;
    text-align: center;
    border: 1px solid black;
    word-break: break-all;
  }
`;

const Item: React.FC<ContentType> = (props) => {
  return (
    <ItemStyled>
      <label className="item-id">{props.id}</label>
      <label>{props.email}</label>
      <label>{props.username}</label>
      <label>{props.website}</label>
    </ItemStyled>
  );
};

export default Item;
