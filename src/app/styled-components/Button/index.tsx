import styled from "styled-components";

type ButtonProps = {
  margin?: string;
  design?: string;
  backcolor?: string;
  backcolorHover?: string;
  backcolorActive?: string;
  borderHover?: string;
  borderActive?: string;
  radiusBorder?: string;
  widthMax?: string;
  widthMin?: string;
  fontSize?: string;
  slowed?: string;
  contentBefore?: string;
  contentAfter?: string;
  size?: string;
  spaceBetween?: string;
  dropdown?: string;
  opacityHover?: string;
  opacityActive?: string;
};

const ButonLink = styled.button`
  max-width: 480px;
  // min-width: 60px;
  // height: 44px;
  display: flex;
  justify-content: center;
  gap: 6px;
  text-align: center;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid #ffffff;
  margin: 5px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  background-color: #3a00e5;
  transition: all 0.2s linear;
  &:hover {
    background-color: rgba(58, 0, 229, 0.7);
    // color: #3a00e5;
    // opacity: 0.7;
  }
  &:active {
    // background-color: #555555;
    border: 2px solid #bdc3c7;
    opacity: 0.35;
  }
`;

export const Button = styled(ButonLink)<ButtonProps>`
  ${(props) => {
    switch (props.design) {
      case "success":
        return `
      background-color: rgb(87, 102, 236);
      &:hover {
        background-color: rgb(104, 117, 235);
      }
      &:active {
        background-color: rgb(49, 62, 179);
        border: 2px solid rgb(87, 102, 236);
      }
      `;
      case "warning":
        return `
      background-color: #f1c40f;
      &:hover {
        background-color: #ffd900;
      }
      &:active {
        background-color: #b89d31;
        border: 2px solid #f1c40f;
      }
    `;
      case "danger":
        return `
      background-color: #F7F5FF;
      color: #3a00e5;
      &:hover {
        background-color: #e27777;
      }
      &:active {
        background-color: #7e2a1b;
        border: 2px solid #e74c3c;
      }
    `;
      case "lite":
        return `
        color: #3a00e5;
      background-color: #F7F5FF;
      &:hover {
        background-color: rgba(247, 245, 255, 0.7);
      }
      &:active {
        // background-color: #7e2a1b;
        border: 2px solid #F7F5FF;
      }
    `;
      case "clear":
        return `
        color: #3a00e5;
      background-color: white;
      &:hover {
        background-color: white;
      }
      &:active {
        // background-color: #7e2a1b;
        border: 2px solid #F7F5FF;
      }
    `;
    }
  }}
  ${(props) => {
    switch (props.size) {
      case "small":
        return `
          gap: 4px;
          padding: 8px 12px;
          font-size: 12px;
          border-radius: 10px;
          img {
            height: 16px;
          }
      `;
      case "medium":
        return `
          gap: 6px;
          padding: 12px 16px;
          font-size: 14px;
          border-radius: 14px;
          img {
            height: 20px;
          }
    `;
      case "large":
        return `
          gap: 6px;
          padding: 16px 20px;
          font-size: 16px;
          border-radius: 16px;
          img {
            height: 24px;
          }
    `;
    }
  }}
  ${(props) => {
    switch (props.dropdown) {
      case "small":
        return `
          gap: 32px;
      `;
      case "medium":
        return `
          gap: 40px;
    `;
      case "large":
        return `
          gap: 48px;
    `;
    }
  }}
  gap: ${(props) => (props.spaceBetween ? props.spaceBetween : "")};
  color: ${(props) => (props.color ? props.color : "")};
  background-color: ${(props) => (props.backcolor ? props.backcolor : "")};
  border-radius: ${(props) => (props.radiusBorder ? props.radiusBorder : "")};
  max-width: ${(props) => (props.widthMax ? props.widthMax : "")};
  min-width: ${(props) => (props.widthMin ? props.widthMin : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "")};
  transition: all ${(props) => (props.slowed ? props.slowed : "")}s ease;
  margin: ${(props) => (props.margin ? props.margin : "5px")};
  &:before {
    content: ${(props) => props.contentBefore ?? ""};
  }
  &:after {
    content: ${(props) => props.contentAfter ?? ""};
  }
  &:hover {
    background-color: ${(props) => props.backcolorHover ?? ""};
    border: ${(props) => props.borderActive ?? ""};
    opacity: ${(props) => props.opacityHover ?? ""};
  }
  &:active {
    background-color: ${(props) => props.backcolorActive ?? ""};
    border: ${(props) => props.borderActive ?? ""};
    opacity: ${(props) => props.opacityActive ?? ""};
  }
`;
