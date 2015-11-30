import Ember from 'ember';
import layout from '../templates/components/em-table-cell';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['table-cell'],
  classNameBindings: ['innerCell'],

  innerCell: Ember.computed('index', function () {
    if(this.get('index')) {
      return 'inner';
    }
  }),

  row: null,
  columnDefinition: null,

  _value: null,
  _observedPath: null,
  _cellContent: null,
  _isPending: false,

  _addObserver: function (path) {
    this._removeObserver();
    this.get('row').addObserver(path, this, this._onValueChange);
    this.set('_observedPath', path);
  },

  _removeObserver: function () {
    var path = this.get('_observedPath');
    if(path) {
      this.get('row').removeObserver(path, this, this._onValueChange);
      this.set('_observedPath', null);
    }
  },

  //TODO: Create a txt component, and move formatting, not available etc. into it
  _normalizeContent: function (content) {
    if(typeof content === 'number') {
      content = content.toString();
    }
    return content;
  },

  _pathObserver: Ember.on('init', Ember.observer('row', 'columnDefinition.contentPath', 'columnDefinition.observePath', function () {
    var path = this.get('columnDefinition.contentPath');
    if(path && this.get('columnDefinition.observePath')) {
      this._addObserver(path);
    }
  })),

  _onValueChange: function (row, path) {
    this.set('_value', row.get(path));
  },

  _cellContentObserver: Ember.on('init', Ember.observer('row', 'columnDefinition', '_value', function () {
    var cellContent = this.get('columnDefinition').getCellContent(this.get('row')),
        that = this;
    if(cellContent && cellContent.then) {
      cellContent.then(function (content) {
        that.setProperties({
          _cellContent: this._normalizeContent(content),
          _isPending: false
        });
      });
      this.set('_isPending', true);
    }
    else {
      this.set('_cellContent', this._normalizeContent(cellContent));
    }
  })),

  willDestroy: function () {
    this._removeObserver();
  }
});
