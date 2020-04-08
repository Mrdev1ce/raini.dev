import React from "react"
import { Card } from "../components/Card"
import { Docs } from "../components/Docs"
import { Header } from "../components/Header"
import { Main } from "../components/Main"
import { IPathAware } from "../types"

const OpenEducationCard = () => (
  <Card title="Open Education">
    <strong>Raini</strong> is a free open source platform for creating and sharing educational
    programs related to software development and all the things around it.
  </Card>
)

const MakeAnImpactCard = () => (
  <Card title="Make an Impact">
    We are an open source community and we really appreciate participation.{" "}
    <strong>Welcome aboard!</strong>
  </Card>
)

const FindYourPassionCard = () => (
  <Card title="Find Your Passion">
    Register for upcoming programs around the globe or study at your own pace with the records of
    our previous workshops.
  </Card>
)

export default function LandingPage(_: IPathAware) {
  return (
    <Main>
      <Header>
        <MakeAnImpactCard />
        <OpenEducationCard />
        <FindYourPassionCard />
      </Header>
      <Docs source="https://api.github.com/repos/raini-dev/raini/readme" />
    </Main>
  )
}
