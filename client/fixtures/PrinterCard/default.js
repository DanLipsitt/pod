export const printer = {
    id: 1,
    name: 'Printer 1',
    state: {text: 'Operational'},
    job: {
      file: {name: 'file.gcode'},
    },
}

export const  printerHandlers = {
    start: () => null,
    stop: () => null,
    pause: () => null,
}

export const connectDropTarget = function() {};

export const isOver = false;
export const canDrop = true;
