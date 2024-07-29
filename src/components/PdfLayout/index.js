import React from 'react';
import { Font, Image, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


Font.register({
  family: 'Poppins',
  src: 'http://fonts.gstatic.com/s/poppins/v1/hlvAxH6aIdOjWlLzgm0jqg.ttf',
});

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingHorizontal: 35,
  },
  titlePage: {
    fontSize: 25,
    padding: 20,
    marginBottom: 40,
    textAlign: 'center',
    backgroundColor: '#E4E4E4',
    color: '#808080',
  },
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 5,
    fontSize: 16,
  },
  section: {
    fontFamily: 'Poppins',
    padding: 5,
  },
  informacoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
  },
  infoTitulo: {
    width: 150,
  }
});



// Create Document Component
export const PdfLayout = () => {


  function getdata() {
    return JSON.parse(localStorage.getItem('transactionsList'));
  }


  function getdata() {
    return JSON.parse(localStorage.getItem('transactions'));
  }

  function renderRow(row) {
    return (
      <Document style={styles.informacoes}>
        <View style={styles.infoTitulo}>
          <Text style={styles.line}>{row.descricao}</Text>
        </View>
        <View style={styles.infoTitulo}>
          <Text style={styles.line}>{row.saida ? '-' : '+'}{row.quantia.toString().replace('.',',')}</Text>
        </View>
        <View style={styles.infoTitulo}>
          <Text style={styles.line}>{row.saida ? 'Despesa' : 'Novo Orçamento'}</Text>
        </View>
      </Document>
    )
  }

  function renderRowTotais(totalOrcamento, totalGasto, saldoDisponivel) {
    return (
      <Document style={styles.informacoes}>
        <View style={styles.infoTitulo}>
          <Text style={styles.line}>R${totalOrcamento.toFixed(2).toString().replace('.',',')}</Text>
        </View>
        <View style={styles.infoTitulo}>
          <Text style={styles.line}>R${totalGasto.toFixed(2).toString().replace('.',',')}</Text>
        </View>
        <View style={styles.infoTitulo}>
          <Text style={styles.line}>R${saldoDisponivel.toFixed(2).toString().replace('.',',')}</Text>
        </View>
      </Document>
    )
  }

  function prepararSessaoTotais(data){
    let totalOrcamento = 0, totalGasto = 0, saldoDisponivel = 0;
    for(let i = 0; i < data.length; i++){
      if(data[i].saida){
        totalGasto += parseFloat(data[i].quantia);
      }
      else{
        totalOrcamento += parseFloat(data[i].quantia);
      }
    }
    saldoDisponivel = totalOrcamento - totalGasto;

    rowsTotais.push(renderRowTotais(totalOrcamento, totalGasto, saldoDisponivel));

  }

  let rows = [];
  let rowsTotais = [];
  let data = getdata();

  if (data != null) {
    prepararSessaoTotais(data);

    for (let i = 0; i < data.length; i++) {
      rows.push(renderRow(data[i]));
    }
  }

  let date = new Date();
  let dataFormatada = ((date.getDate() )) + "." + ((date.getMonth() + 1)) + "." + date.getFullYear(); 

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.titlePage}>
          Relação de Gastos - {dataFormatada}
        </Text>

        <View style={styles.contentTitle}>
          <View style={styles.infoTitulo}>
            <Text style={styles.line}>Total Orçamento:</Text>
          </View>
          <View style={styles.infoTitulo}>
            <Text style={styles.line}>Total Gasto:</Text>
          </View>
          <View style={styles.infoTitulo}>
            <Text style={styles.line}>Saldo Disponivel:</Text>
          </View>
        </View>
        <View style={styles.section}>
          {rowsTotais}
        </View>



        <View style={styles.contentTitle}>
          <View style={styles.infoTitulo}>
            <Text style={styles.line}>Descrição:</Text>
          </View>
          <View style={styles.infoTitulo}>
            <Text style={styles.line}>Valor:</Text>
          </View>
          <View style={styles.infoTitulo}>
            <Text style={styles.line}>E | S: </Text>
          </View>
        </View>
        <View style={styles.section}>
          {rows}
        </View>
      </Page>
    </Document>
  )
};

export default PdfLayout;