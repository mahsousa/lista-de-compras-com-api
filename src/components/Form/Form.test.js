import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Importante para estender os matchers do jest-dom
import Form from ".";

it("armazena os valores corretamente", async () => {
  const handleAddMock = jest.fn();
  const setTransactionsList = jest.fn();
  const transactionsList = [];

  render(<Form
    handleAdd={handleAddMock}
    transactionsList={transactionsList}
    setTransactionsList={setTransactionsList}
  />);

  const descricaoInput = screen.getByTestId("descricao");
  const valorInput = screen.getByTestId("valor");
  const entradaRadio = screen.getByTestId("entrada");
  const saidaRadio = screen.getByTestId("saida");
  const adicionarButton = screen.getByText("ADICIONAR");

  // Verifica se os campos estão vazios inicialmente
  expect(descricaoInput).toHaveValue('');
  expect(valorInput).toHaveValue(null);
  expect(entradaRadio).toBeChecked();
  expect(saidaRadio).not.toBeChecked();

  // Preenche os campos do formulário
  fireEvent.change(descricaoInput, { target: { value: "Exemplo de transação" } });
  fireEvent.change(valorInput, { target: { value: "50" } });
  fireEvent.click(saidaRadio);

  // Verifica se os valores foram preenchidos corretamente
  expect(descricaoInput).toHaveValue("Exemplo de transação");
  expect(valorInput).toHaveValue(50);
  expect(entradaRadio).not.toBeChecked();
  expect(saidaRadio).toBeChecked();

  // Clica no botão de adicionar
  fireEvent.click(adicionarButton);

  // Verifica se os campos foram limpos após adicionar
  expect(descricaoInput).toHaveValue("");
  expect(descricaoInput).toHaveValue("");
  expect(valorInput).toHaveValue(null);
  expect(entradaRadio).not.toBeChecked();
  expect(saidaRadio).toBeChecked();

  // Verifica se a função handleAdd foi chamada corretamente
  expect(handleAddMock).toHaveBeenCalledTimes(1);
  expect(handleAddMock).toHaveBeenCalledWith({
    id: expect.any(Number),
    descricao: "Exemplo de transação",
    quantia: '50',
    saida: true,
  });
});
