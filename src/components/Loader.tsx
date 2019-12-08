import styled from "@emotion/styled";

export const Loader = styled.div({
  background: `url(${require("../assets/img/loading.svg")}) no-repeat center top`,
  backgroundSize: "cover",
  height: "50px",
  width: "50px",
  zIndex: 1,
});
