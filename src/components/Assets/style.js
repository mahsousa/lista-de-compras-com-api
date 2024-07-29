import styled from "styled-components";

export const Container = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius:5px;
  margin: 20px;
  padding: 20px;

  @media (max-width:320px){
    margin:0 2px;
  }

  @media (min-width: 481px) and (max-width: 991px){
    margin: 2px;
    padding: 10px;
    justify-content: center;
  }
`;