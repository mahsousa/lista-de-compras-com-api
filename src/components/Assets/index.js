import React from "react";
import * as C from "./style";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfLayout from "../PdfLayout"

import {
  AiFillPrinter,
} from "react-icons/ai";

import {
  FaTrashAlt,
} from "react-icons/fa";


function Assets() {

  function clearAllStorage() {
    localStorage.removeItem("transactions");
    window.location.reload(true);

  }

  return (
    <>
      <C.Container>
        <PDFDownloadLink document={<PdfLayout />} fileName="somename.pdf">
          {({ loading }) =>
            loading ? 'Loading document...' : ''
          }
          <AiFillPrinter style={{
            color: "#215581",
            height: '40px',
            width: '40px',
            padding:'5px'
          }} />
        </PDFDownloadLink >
        <FaTrashAlt style={{
          color: "#215581",
          height: '40px',
          width: '30px',
          padding:'5px'
        }} onClick={clearAllStorage} />
      </C.Container>
    </>
  )

}

export default Assets;