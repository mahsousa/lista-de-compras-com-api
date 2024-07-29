import React from 'react'
import DashItem from '../DashItem';
import Assets from '../Assets';
import * as C from "./style"; 
import{
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign,
} from "react-icons/fa";



const Dashboard = ({entrada, saida, total}) => {
  const totalNum =  parseFloat(total);
  return (
      <C.Container>
        <DashItem title="Total Orçamento"  Icon={FaRegArrowAltCircleUp} iconColor="green" value={entrada}/>
        <DashItem title="Total Gasto" Icon={FaRegArrowAltCircleDown} iconColor="red" value={saida}/>
        <DashItem title="Disponivel" Icon={FaDollarSign} value={total} textoRed={ totalNum < 0 ? true : false}/>
        <Assets key="assets"/>
      </C.Container>
  );
};
export default Dashboard;