export const printerReducers = {
  OCTO_CURRENT: (state, {payload}) => state.map(
    printer => printer.id === payload.id ?
             Object.assign({}, printer, payload) :
             printer
  ),
};
