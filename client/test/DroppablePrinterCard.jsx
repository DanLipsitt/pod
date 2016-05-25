import chai from 'chai';
chai.should();
import React from 'react';

import {
  default as DroppablePrinterCard,
} from '../components/DroppablePrinterCard';

describe('DroppablePrinterCard', () => {

  it('should allow drop by default', () => {
    const props = require('../fixtures/DroppablePrinterCard/default.js');
    const obj = <DroppablePrinterCard {...props} />;
    obj.props.canDrop.should.equal(true);
  });

  it('should not allow drop if offline', () => {
    const props = require('../fixtures/DroppablePrinterCard/offline.js');
    const obj = <DroppablePrinterCard {...props} />;
    obj.props.canDrop.should.equal(false);
  });

});
