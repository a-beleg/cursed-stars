import bg from "./bg.svg";
import styled, { createGlobalStyle } from "styled-components";
import PixeloidSansWoff2 from "../fonts/PixeloidSans.woff2";
import { Textfit } from "react-textfit";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Pixeloid Sans";
    src: url(${PixeloidSansWoff2}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  body, html {
    margin: 0;
    padding: 0;
    user-select: none;
    font-family: "Pixeloid Sans", sans-serif;
    color: #000000;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  input, textarea {
    border: none;
    outline: none;
    background: none;
    color: #B8B8B8;
    font-family: inherit;
    font-size: inherit;
    resize: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export const RootContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  box-sizing: border-box;
  background-color: #fdd0fe;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  filter: blur(0.8px);
`;

export const Connect = styled(Textfit)`
  text-align: center;
  cursor: pointer;
`;

export const InputWrapper = styled.div<{ fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Mint = styled.div`
  cursor: pointer;
`;
export const Input = styled.input.attrs({
  className: "input",
  type: "number",
  min: 0,
  max: 25000,
})`
  width: 100%;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: textfield;

  &::placeholder {
    color: #b8b8b8;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const PopUp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #fdd0fe;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Manifest = styled.a<{fontSize:number}>`
  font-size: ${({fontSize})=>fontSize}px;
  position: fixed;
  bottom: 20px; 
  right: 20px; 
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
`;
