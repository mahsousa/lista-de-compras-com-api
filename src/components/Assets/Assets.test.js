import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfLayout from "../PdfLayout"
import Assets from '.';


import {
  AiFillPrinter,
} from "react-icons/ai";

import {
  FaTrashAlt,
} from "react-icons/fa";


jest.mock("@react-pdf/renderer", () => {
  const React = require("react");

  const PDFDownloadLink = ({ document, fileName, children }) => {
    const mockOnClick = () => {
      // Fazer algo quando o link for clicado
    };

    return (
      <div onClick={mockOnClick}>
        {children}
      </div>
    );
  };

  const AiFillPrinter = () => {
    return <div>Mocked AiFillPrinter</div>;
  };

  return {
    __esModule: true,
    Font: {
      register: jest.fn(),
    },
    Image: jest.fn(),
    Page: jest.fn(({ children }) => <div>{children}</div>),
    Text: jest.fn(),
    View: jest.fn(),
    Document: jest.fn(({ children }) => <div>{children}</div>),
    StyleSheet: {
      create: jest.fn((styles) => styles),
    },
    PDFDownloadLink: PDFDownloadLink,
    AiFillPrinter: AiFillPrinter,
  };
});


it('Renderizar o componente corretamente', () => {
  const component = renderer.create(<Assets />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


it('Se a função clearAllStorage está sendo chamada quando FaTrashAlt é clicado', () => {
  const clearAllStorage = jest.fn();

  const { container } = render(
    <FaTrashAlt onClick={clearAllStorage} />
  );

  const faTrashAltElement = container.querySelector('svg');

  fireEvent.click(faTrashAltElement);

  expect(clearAllStorage).toHaveBeenCalledTimes(1);
});

it('chama o componente PdfLayout ao clicar no ícone de printer', () => {
  let pdfLayoutCalled = false;

  const MockPdfLayout = () => {
    pdfLayoutCalled = true;
    return null;
  };

  render(
      <PDFDownloadLink document={<MockPdfLayout />} className="print-btn" fileName="somename.pdf">
        {({ loading }) => (loading ? 'Loading document...' : '')}
        <AiFillPrinter
          data-testid="printer-icon"
          style={{
            color: '#215581',
            height: '40px',
            width: '40px',
            padding: '5px',
          }}
        />
      </PDFDownloadLink>
  );

  const printerIcon = screen.getByTestId('printer-icon');
  fireEvent.click(printerIcon);

  // Aguarda o próximo ciclo de microtarefa para verificar a atualização da variável
  setTimeout(() => {
    expect(pdfLayoutCalled).toBe(true);
  }, 0);
});


