import { css, Global } from "@emotion/core"
import React from "react"

const globalStyles = css`
  body {
    font-family: "Montserrat", "Avenir Next", Avenir, "Helvetica Neue", "Lato", "Segoe UI",
      Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
  }

  * {
    color: #424c55;
  }

  & .octicon {
    display: none;
  }

  blockquote {
    background: linear-gradient(to right, #f5edf0, #d3dde8);
    border-left: 5px solid #d3dde8;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    max-width: 500px;
    margin-left: auto;
  }
  blockquote::before {
    color: #d3dde8;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }
  blockquote p {
    display: inline;
  }
  h1 {
    font-size: 3rem;
    line-height: 0;
    padding-bottom: 20px;
    text-align: center;
  }

  #readme {
    width: 90%;
    padding: 20px;

    & > article {
      width: 100%;

      padding: 0;
    }

    & p > a > img {
      margin-right: 5px;
    }
  }

  .highlight {
    background: #fff;
    border-radius: 4px;
    text-shadow: none;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 15px;
  }
`

export const GlobalStyles = () => <Global styles={globalStyles} />
