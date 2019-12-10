import styled from "@emotion/styled";
import { IThemeAware, ThemeContext } from "../context/ThemeContext";
import React, { ReactElement, useContext } from "react";

const StyledFooter = styled.footer<IThemeAware>`
  width: 100%;
  max-width: 100vw;
  z-index: 2;
  padding: 20px 0;
  text-align: center;
  background-color: ${({ theme }) => theme.DARK};
  color: ${({ theme }) => theme.TEXT_MAIN};

  & > a {
    color: ${({ theme }) => theme.TEXT_MAIN};
  }
`;

export default function Footer(): ReactElement {
  const [theme] = useContext(ThemeContext);
  return (
    <StyledFooter theme={theme}>
      Image by&nbsp;
      <a href="https://pixabay.com/users/MabelAmber-1377835/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3881675">
        Mabel Amber, still incognito...
      </a>
      &nbsp; from&nbsp;
      <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3881675">
        Pixabay
      </a>
    </StyledFooter>
  );
}
