import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


import Dashboard from '.';

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


it('renders the component value correctly', () => {
  const component = renderer.create(<Dashboard entrada="10" saida="10" total="10" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


