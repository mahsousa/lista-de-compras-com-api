import React from "react";
import * as C from "./style";

import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
} from "react-icons/fa";

const ListItem = ({item, onDelete}) => {
  return (
    <C.Tr>
      <C.Td>{item.descricao}</C.Td>
      <C.Td>{item.quantia}</C.Td>
      <C.Td alignCenter>
        {item.saida ? (
          <FaRegArrowAltCircleDown color="red" />
        ) : (
          <FaRegArrowAltCircleUp color="green"/>
        )}
      </C.Td>
      <C.Td alignCenter>
        <FaTrash data-testid={`delete-button-${item.id}`} onClick={() => onDelete(item.id)}/>
      </C.Td>
    </C.Tr>
  )
}

export default ListItem;