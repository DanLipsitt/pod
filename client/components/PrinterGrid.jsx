import React from 'react';
import 'bootstrap-webpack';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';
import {default as PrinterCard} from './DroppablePrinterCard';

var PrinterGrid = ({printers, doTransferFile}) => {
  let rows = _.chunk(printers, 3);
  return (<div>
    <h2>Printers</h2>
    {rows.map((row, i) =>
      <Row key={i}>
        {row.map(printer => {
          printer.name = `${printer.hostname}:${printer.port}`;
          return <Col sm={4} key={printer.id}>
            <PrinterCard printer={printer} onDrop={doTransferFile}/>
           </Col>;
        })}
      </Row>
    )}
  </div>);
};

export default PrinterGrid;
