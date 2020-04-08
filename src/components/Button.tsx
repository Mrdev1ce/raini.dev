import styled from "@emotion/styled"

export const Button = styled.button<{ background?: string; color?: string }>`
  margin: 0 15px;
  border: 0;
  padding: 10px 15px;
  cursor: pointer;
  display: inline-block;
  background-color: ${({ background }) => background || "#a63446"};
  color: ${({ color }) => color || "white"};
  font-weight: bold;
`
