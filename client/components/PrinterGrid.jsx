import React, {PropTypes} from 'react';
import 'bootstrap-webpack';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';
import {default as PrinterCard} from './DroppablePrinterCard';
import PrinterGroupControl from './PrinterGroupControl';

var PrinterGrid = ({printers, printerHandlers, doTransferFile}) => {
  let rows = _.chunk(printers, 3);
  const selected = _.filter(printers, x => x.selected);
  return (<div>
    <h2 style={{display: 'inline-block'}}>Printers</h2>
    <PrinterGroupControl printers={selected}
                         printerHandlers={printerHandlers}/>
    {rows.map((row, i) =>
      <Row key={i}>
        {row.map(printer => {
          printer.name = `${printer.hostname}:${printer.port}`;
          return <Col sm={4} key={printer.id}>
            <PrinterCard printer={printer} printerHandlers={printerHandlers}
                         onDrop={doTransferFile}/>
           </Col>;
        })}
      </Row>
    )}
  </div>);
};

PrinterGrid.proptypes = {
  printerHandlers: PropTypes.object,
};

export default PrinterGrid;
