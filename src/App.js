import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form";
import "./App.css";
import ItemService from "./services/item-service";
import List from "./components/List";

const App = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const quantiaSaida = transactionsList
      .filter((item) => item.saida)
      .map((transaction) => Number(transaction.quantia));

    const quantiaEntrada = transactionsList
      .filter((item) => !item.saida)
      .map((transaction) => Number(transaction.quantia));

    const saida = quantiaSaida.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const entrada = quantiaEntrada.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const total = Math.abs(entrada - saida).toFixed(2);

    setEntrada(`${entrada}`);
    setSaida(`${saida}`);
    setTotal(`${Number(entrada) < Number(saida) ? "-" : ""}${total}`);
  }, [transactionsList]);

  const handleAdd = (transaction) => {
    var itemService = new ItemService();
    itemService.createTransaction(transaction).then(
      () => {
        handleList();
      }
    );
  };

  const handleList = () =>{
    var itemService = new ItemService();
    itemService.getTransactions().then(
      (response) => {
        setTransactionsList(response);
      }
    );
  }
  return (
    <>
      <Header />
      <div className="Inicio">
        <Dashboard className="resume" entrada={entrada} saida={saida} total={total} />
        <div className="Form">
          <Form
            handleAdd={handleAdd}
            transactionsList={transactionsList}
            setTransactionsList={setTransactionsList}
          />
          <List itens={transactionsList} setItens={(setTransactionsList)} listItens={handleList}/>
        </div>
      </div>
      <GlobalStyle />
    </>
  );
};

export default App;
