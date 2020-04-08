import "highlight.js/styles/github.css"
import React from "react"
import { Docs } from "../components/Docs"
import { Header } from "../components/Header"
import { Main } from "../components/Main"
import { IRepositoryAware } from "../types"

export default function DocsPage({ repository }: IRepositoryAware) {
  return (
    <Main>
      <Header></Header>
      <Docs source={`https://api.github.com/repos/raini-dev/${repository}/readme`} />
    </Main>
  )
}
