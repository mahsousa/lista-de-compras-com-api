import React, { useEffect } from "react";
import ListItem from "../ListItem";
import * as C from "./style"; 
import ItemService from "../../services/item-service";


const List = ({ itens, setItens, listItens}) =>{

  useEffect(() =>{
    listItens();
  },[]);

  //um filtro que carrega todas as transações onde é diferente do ID passado por parametro
  
  const onDelete = (ID) =>{
      var itemService = new ItemService(); 
      itemService.deleteTransaction(ID).then(
        () => {
          listItens();
        }
      );
  }

    return(
      <C.Table>
        <C.Thead>
          <C.Tr>
            <C.Th width={40}>Descrição:</C.Th>
            <C.Th width={40}>Valor:</C.Th>
            <C.Th width={10} alignCenter>Tipo:</C.Th>
            <C.Th width={10}></C.Th>
          </C.Tr>
        </C.Thead>
        <C.Tbody>
          {itens?.map((item, index) => (
          <ListItem key={index} item={item} onDelete={onDelete}/>
          ))}
        </C.Tbody>
      </C.Table>
    )
}

export default List;

