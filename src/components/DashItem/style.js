import styled from "styled-components";

export const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  background-color: #fff;
  border-radius:5px;
  margin: 20px;
  padding: 20px;

  @media(max-width:320px){
    padding: 15px;
    margin: 2px;
    width:100px;
  }

  @media(max-width:750px){

    p{
      font-size: 12px;
    }

    span{
      font-size:20px;
    }

    svg{
      display:none;
    }
  }

  @media (min-width: 481px) and (max-width: 991px){
    margin: 2px;
    padding: 10px;
    justify-content: center;
  }
  

`;

export const Header = styled.header`
    display: flex;
    aligh-items: center;
    justify-content: space-around;
    width: 100%;
    gap:10px;

    svg{
      width: 20px;
      height: 20px;
    }
`;

export const HeaderTitle = styled.p`
    font-size: 20px;
    color: #3B5369;
`;

export const Total = styled.span`
    font-size:30px;
    font-weight:bold;
    color: #2F77B5;
`;

export const TotalRed = styled.span`
    font-size:30px;
    font-weight:bold;
    color: red;
`;

