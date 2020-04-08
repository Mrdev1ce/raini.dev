import styled from "@emotion/styled"
import { highlightBlock, initHighlighting, registerLanguage } from "highlight.js"
import React, { FunctionComponent, useEffect, useState } from "react"
import withErrorBoundary from "../hocs/ErrorBoundary"
import { ISourceAware } from "../types"

const DocsWrapper = styled.section`
  display: flex;
  width: 100%;
  max-width: 800px;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  z-index: 3;
`

const DocsComponent: FunctionComponent<ISourceAware> = ({ source }) => {
  const [__html, setHtml] = useState("")

  useEffect(() => {
    if (!__html) {
      fetch(source, {
        headers: {
          Accept: "application/vnd.github.v3.html",
        },
      })
        .then(x => {
          if (x.status == 404) {
            return "<h2>Requested page not found</h2>"
          }

          return x.text()
        })
        .then(setHtml)
    } else {
      registerLanguage("typescript", require("highlight.js/lib/languages/typescript"))
      registerLanguage("shell", require("highlight.js/lib/languages/shell"))
      initHighlighting()
      document.querySelectorAll("#readme .highlight").forEach(highlightBlock)
    }
  }, [__html, setHtml, source])

  return <DocsWrapper dangerouslySetInnerHTML={{ __html }} />
}

export const Docs = withErrorBoundary(DocsComponent)
