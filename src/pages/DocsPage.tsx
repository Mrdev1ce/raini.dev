import React, { lazy, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { IThemeAware, ThemeContext } from "../context/ThemeContext";
import { highlightBlock, initHighlighting, registerLanguage } from "highlight.js";
import FullPageLoader from "../components/FullPageLoader";

const Rain = lazy(() => import("../components/Rain"));

const ReadmeWrapper = styled.section<IThemeAware>(({ theme }) => ({
  maxWidth: "80%",
  zIndex: 2,
  color: theme.TEXT_MAIN,
  h1: {
    fontSize: "3rem",
    lineHeight: "0",
    paddingBottom: "20px",
    textAlign: "center",
  },
  article: {
    borderRadius: "5px",
    margin: "20px 0",
    width: "100%",
    background: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
    padding: "20px",
  },
  "#readme": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "p > a > img": {
    marginRight: "5px",
  },
  ".highlight": {
    borderRadius: "5px",
    boxShadow: "inset 0 0 15px rgba(0,0,0,0.1)",
    padding: "15px",
  },
  ".octicon": {
    display: "none",
  },
}));

const DocsComponent = (props: any) => {
  const [theme] = useContext(ThemeContext);
  const [readme, setReadme] = useState("");
  const path = `https://api.github.com/repos/Raini-js/${props.repository}/readme`;

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

  return <ReadmeWrapper theme={theme} dangerouslySetInnerHTML={{ __html }} />;
};

const Overlay = styled.div({
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

export default function DocsPage({ repository }: any) {
  return (
    <Rain>
      <Overlay />
      <DocsComponent repository={repository} />
    </Rain>
  );
}
