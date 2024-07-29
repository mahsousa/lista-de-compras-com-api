import styled from "styled-components";


export const Container = styled.div`
    // max-width:1120px;
    gap:20px;
    // justify-content: space-around;

    @media (max-width:320px){
        display: flex;
        flex-wrap: wrap;
        gap:0;
        justify-content: center;
        margin: 10px 0;
      }

      @media (min-width: 481px) and (max-width: 991px){
        display:flex;
        flex-wrap:wrap;
        gap:0;
        margin: 20px 0;
      }
`;
