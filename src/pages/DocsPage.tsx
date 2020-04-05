import React, { lazy, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { IThemeAware, ThemeContext } from "../context/ThemeContext";
import { highlightBlock, initHighlighting, registerLanguage } from "highlight.js";
import FullPageLoader from "../components/FullPageLoader";
import { IPathAware } from "../core/IPathAware";

const Rain = lazy(() => import("../components/Rain"));

const DocsWrapper = styled.section<IThemeAware>`
  width: 80%;
  max-width: 900px;
  z-index: 2;
  color: ${({ theme }) => theme.TEXT_MAIN};

  h1 {
    font-size: 3rem;
    line-height: 0;
    padding-bottom: 20px;
    text-align: center;
  }

  article {
    border-radius: 5px;
    margin: 20px 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: rgba(0, 0, 0, 0.3);
    padding: 20px;
  }

  #readme {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & p > a > img {
    margin-right: 5px;
  }

  & .highlight {
    border-radius: 5px;
    text-shadow: none;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
    padding: 15px;
  }

  & .octicon {
    display: none;
  }
`;

interface IRepositoryAware {
  repository?: string;
}

const DocsComponent = ({ repository }: IRepositoryAware) => {
  const [theme] = useContext(ThemeContext);
  const [readme, setReadme] = useState("");
  const path = `https://api.github.com/repos/Raini-js/${repository}/readme`;

  useEffect(() => {
    if (!readme) {
      fetch(path, {
        headers: {
          Accept: "application/vnd.github.v3.html",
        },
      })
        .then(x => {
          if (x.status == 404) {
            return "<h2>Requested package not found</h2>";
          }

          return x.text();
        })
        .then(setReadme);
    } else {
      registerLanguage("typescript", require("highlight.js/lib/languages/typescript"));
      registerLanguage("shell", require("highlight.js/lib/languages/shell"));
      initHighlighting();
      document.querySelectorAll("#readme .highlight").forEach(highlightBlock);
    }
  }, [readme, setReadme, path]);

  if (!readme) {
    return <FullPageLoader />;
  }

  const __html = readme;

  return <DocsWrapper theme={theme} dangerouslySetInnerHTML={{ __html }} />;
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default function DocsPage({ repository }: IRepositoryAware & IPathAware) {
  return (
    <Rain>
      <Overlay />
      <DocsComponent repository={repository} />
    </Rain>
  );
}
