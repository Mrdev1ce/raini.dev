import styled from "@emotion/styled";
import { IThemeAware } from "../context/ThemeContext";

export const Header = styled.header<IThemeAware>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100vw;
  min-height: 100vh;
  color: ${({ theme }) => theme.TEXT_MAIN};
  background-color: ${({ theme }) => theme.TEXT_INVERSE};
  text-shadow: 3px 3px 2px ${({ theme }) => theme.TEXT_INVERSE};

  & > * {
    z-index: 2;
  }
`;
