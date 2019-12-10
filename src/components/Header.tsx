import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import { IThemeAware, ThemeContext } from "../context/ThemeContext";

interface INameAware {
  name: string;
}

const StyledHeader = styled.header<IThemeAware>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  z-index: 3;
  color: ${({ theme }) => theme.TEXT_MAIN};
  text-shadow: 3px 3px 2px ${({ theme }) => theme.TEXT_INVERSE};
  width: 100%;
  background: rgba(0, 0, 0, 0.5);

  & > nav > ul {
    list-style: none;
    padding: 0 20px;

    & > li > a,
    & > li > a:hover,
    & > li > a:visited,
    & > li > a:active {
      text-decoration: none;
    }
  }
`;

const Logo = styled(Link)`
  font-size: 3rem;
  padding: 5px 20px;
  font-family: "Caveat Brush", sans-serif;
  text-decoration: none;

  &:hover,
  &:visited,
  &:active {
    text-decoration: none;
  }
`;

export default function Header(): ReactElement {
  const [projects, setProjects] = useState<string[]>([]);
  const [theme] = useContext(ThemeContext);
  const path = `https://api.github.com/users/Raini-js/repos`;

  useEffect(() => {
    fetch(path)
      .then<INameAware[]>(x => x.json())
      .then(x => x.map(({ name }) => name).filter(name => name != "raini.dev"))
      .then(setProjects);
  }, [path, projects, setProjects]);

  return (
    <StyledHeader theme={theme}>
      <Logo to="/">R</Logo>
      <nav>
        <ul>
          {projects.map(project => (
            <li key={project}>
              <Link to={`/docs/${project}`}>@raini/{project}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </StyledHeader>
  );
}
