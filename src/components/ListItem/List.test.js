import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ListItem from ".";

it("verifica se a tabela foi renderizada corretamente", () => {
  const onDeleteMock = jest.fn();

  const item1 = { id: 1, descricao: "Item 1", quantia: 100, saida: false };

  render(
    <ListItem
      onDelete={onDeleteMock}
      item={item1}
    />
  );

  const deleteButtonItem1 = screen.getByTestId(`delete-button-${item1.id}`);

  expect(deleteButtonItem1).toBeInTheDocument();

  fireEvent.click(deleteButtonItem1);

  // Verifique se a função onDelete foi chamada com os IDs corretos
  expect(onDeleteMock).toHaveBeenCalledTimes(1);
  expect(onDeleteMock).toHaveBeenCalledWith(item1.id);
});
