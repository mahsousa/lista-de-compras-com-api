import React, { Fragment, useState } from "react";
import * as C from "./style";


const Form = ({ handleAdd, transactionsList, setTransactionsList }) => {
  const [descricao, setDescricao] = useState("");
  const [quantia, setQuantia] = useState("");
  const [isDespesa, setDespesa] = useState(false);

  const generateID = () => Math.round(Math.random() * 1000);

  const handleSave = () => {
    if (!descricao || !quantia) {
      alert("Informe a descrição e o valor!");
      return;
    } else if (quantia < 1) {
      alert("O valor tem que ser positivo!");
      return;
    }

    const transaction = {
      id: generateID(),
      descricao: descricao,
      quantia: quantia,
      saida: isDespesa,
    };

    handleAdd(transaction);

    setDescricao("");
    setQuantia("");
  };

  return (
    <React.Fragment key="form-fragment">
      <C.Container>
        <C.InputContent>
          <C.Label>Descrição</C.Label>
          <C.Input id="descricao" data-testid="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </C.InputContent>
        <C.InputContent>
          <C.Label>Valor</C.Label>
          <C.InputValor id="valor" data-testid="valor"
            value={quantia}
            type="number"
            onChange={(e) => setQuantia(e.target.value)}
          />
        </C.InputContent>
        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            defaultChecked
            name="group1"
            data-testid="entrada"
            onChange={() => setDespesa(!isDespesa)}
          />
          <C.Label htmlFor="rIncome">Entrada</C.Label>
          <C.Input
            type="radio"
            id="rDespesas"
            name="group1"
            data-testid="saida"
            onChange={() => setDespesa(!isDespesa)}
          />
          <C.Label id="saida" htmlFor="rDespesas">Saída</C.Label>
        </C.RadioGroup>
        <C.Button onClick={handleSave}>ADICIONAR</C.Button>
      </C.Container>
    </React.Fragment>
  );
};

export default Form;
