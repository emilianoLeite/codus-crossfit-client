import { css } from "emotion";

export const boardStyle = css`
  display: grid;
  grid-template-columns: 1fr repeat(3, 300px) 1fr;
  @media (max-width: 450px) {
    grid-template-columns: repeat(3, 180px);
    overflow-x: scroll;
  }
`;

export const boardColumnStyle = css`
  margin: 20px;
  padding: 30px 15px;
  background-color: #fff;
  border-radius: 10px;
  border: 3px solid steelblue;
  &:first-of-type {
    grid-column-start: 2;
  }
  @media (max-width: 450px) {
    &:first-of-type {
      grid-column-start: 1;
    }
  }
`;

export const boardItemStyle = css`
  background-color: #eee;
  padding: 8px 15px;
  margin: 20px 0px;
`;

export const boardItemTitle = css`
  margin-top: 0px;
`;
