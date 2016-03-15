import React from 'react';
import {default as TouchBackend} from 'react-dnd-touch-backend';
import {DragDropContext} from 'react-dnd';

var ReactQuerystringRouter = require('react-querystring-router'),
    ComponentPlayground = require('react-component-playground'),
    getComponentFixtureTree = require('./get-component-fixture-tree.js');

var getTitleForFixture = function(params) {
  var title = 'React Component Playground';

  // Set document title to the name of the selected fixture
  if (params.component && params.fixture) {
    title = params.component + ':' + params.fixture + ' – ' + title;
  }

  return title;
};

/**
 * Wrapper to add context that enables drag and drop components.
 */
@DragDropContext(TouchBackend({enableMouseEvents: true}))
class ComponentPlaygroundDnD extends React.Component {
  render() { return(<ComponentPlayground {...this.props} />); }
}

module.exports = new ReactQuerystringRouter.Router({
  container: document.getElementById('root'),
  defaultProps: {
    components: getComponentFixtureTree()
  },
  getComponentClass: function() {
    return ComponentPlaygroundDnD;
  },
  onChange: function(params) {
    document.title = getTitleForFixture(params);
  }
});
