import React, {PropTypes} from 'react';
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap';

const StartStopButtons = ({printer, printerHandlers}) => {

  const start = () => printerHandlers.start(printer.id);
  const stop  = () => printerHandlers.stop(printer.id);
  const pause = () => printerHandlers.pause(printer.id);
  const restart = () => printerHandlers.restart(printer.id);

  const GlyphButton = (props) =>
    <Button {...props}>
      <Glyphicon glyph={props.glyph} />
    </Button>;
  GlyphButton.defaultProps = {
    disabled: false,
  };

  const StartButton = (props) =>
    <GlyphButton {...props} onClick={start} glyph="play" />;

  const StopButton = (props) =>
    <GlyphButton {...props} onClick={stop} glyph="stop" />;

  const PauseButton = (props) =>
    <GlyphButton {...props} onClick={pause} glyph="pause" />;

  const RestartButton = (props) =>
    <GlyphButton {...props} onClick={restart} glyph="repeat" />;

  const Placeholder = () =>
    <GlyphButton disabled glyph="stop"
                 style={{color: 'transparent !important'}}/>;

  const buttons = (state) => {
    switch (state.text) {
      case 'Printing':
        return <ButtonGroup><PauseButton/><Placeholder/></ButtonGroup>;
      case 'Paused':
        return <ButtonGroup><StartButton/><StopButton/></ButtonGroup>;
      case 'Operational':
        return <ButtonGroup><StartButton/><Placeholder/></ButtonGroup>;
      default:
        return <ButtonGroup><StartButton disabled/><Placeholder/></ButtonGroup>;
    }
  };

  return buttons(printer.state);
};

StartStopButtons.propTypes = {
  printerHandlers: PropTypes.objectOf(PropTypes.func).isRequired,
  printer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    state: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default StartStopButtons;
