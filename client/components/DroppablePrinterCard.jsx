import PrinterCard from './PrinterCard';
import {DropTarget} from 'react-dnd';
import {FILE_ITEM} from '../constants/DragItemTypes';

const printerCardTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem().id, [props.printer.id]);
    return props.printer;
  },

  canDrop(props, monitor) {
    return true;
  },
};

let DroppablePrinterCard = DropTarget(FILE_ITEM, printerCardTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }))(PrinterCard);

DroppablePrinterCard.proptypes = PrinterCard.proptypes;

export default DroppablePrinterCard;
