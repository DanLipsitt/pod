import React, {PropTypes} from 'react';
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import {onlyUpdateForKeys} from 'recompose';

const GlyphButton = (props) =>
  <Button {...props}>
    <Glyphicon glyph={props.glyph} />
    {' '} {props.children}
  </Button>;
GlyphButton.defaultProps = {
  disabled: false,
};

const StartButton = (props) =>
  <GlyphButton {...props} glyph="play" />;

// The resume sends the 'pause'command, which is actually a
// pause/unpause toggle.
const ResumeButton = (props) =>
  <Button {...props}>
    <Glyphicon glyph="pause"/><Glyphicon glyph="play"/>
    {' '} {props.children}
  </Button>;

const StopButton = (props) =>
  <GlyphButton {...props} glyph="stop" />;

const PauseButton = (props) =>
  <GlyphButton {...props} glyph="pause" />;

const RestartButton = (props) =>
  <GlyphButton {...props} glyph="repeat" />;

const Placeholder = () =>
  <GlyphButton disabled glyph="stop"
               style={{color: 'transparent !important'}}/>;

const StartStopButtons = onlyUpdateForKeys(
  // Ignore printerHandlers - they should only change when printer ids do.
  ['printerId', 'printerState', 'printerFile'],
  ({printerId, printerState, printerFile, printerHandlers}) => {

    const start = () => printerHandlers.start(printerId);
    const cancel  = () => printerHandlers.cancel(printerId);
    const pause = () => printerHandlers.pause(printerId);
    const restart = () => printerHandlers.restart(printerId);

    let Start = (props) => <StartButton {...props} onClick={start}/>;
    let Resume = (props) => <ResumeButton {...props} onClick={pause}/>;
    let Stop = (props) => <StopButton {...props} onClick={cancel}/>;
    let Pause = (props) =>  <PauseButton {...props} onClick={pause}/>;

    const buttons = (printerState, printerFile) => {
      switch (printerState) {
        case 'Printing':
          return <ButtonGroup><Pause/><Placeholder/></ButtonGroup>;
        case 'Paused':
          return <ButtonGroup><Resume/><Stop/></ButtonGroup>;
        case 'Operational':
          if(printerFile) {
            return <ButtonGroup><Start/><Placeholder/></ButtonGroup>;
          } else {
            return <ButtonGroup><Start disabled/><Placeholder/></ButtonGroup>;
          }
        default:
          return <ButtonGroup><Start disabled/><Placeholder/></ButtonGroup>;
      }
    };

    return buttons(printerState, printerFile);
  }
);

StartStopButtons.propTypes = {
  printerHandlers: PropTypes.objectOf(PropTypes.func).isRequired,
  printer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    state: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export {StartButton, ResumeButton, StopButton, PauseButton, RestartButton,
        Placeholder};
export default StartStopButtons;
