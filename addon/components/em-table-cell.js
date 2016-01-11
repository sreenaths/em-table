import Ember from 'ember';
import layout from '../templates/components/em-table-cell';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['table-cell'],
  classNameBindings: ['innerCell', 'isWaiting'],

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
  isWaiting: false,

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

  _pathObserver: Ember.on('init', Ember.observer('row', 'columnDefinition.contentPath', 'columnDefinition.observePath', function () {
    var path = this.get('columnDefinition.contentPath');
    if(path && this.get('columnDefinition.observePath')) {
      this._addObserver(path);
    }
  })),

  _onValueChange: function (row, path) {
    this.set('_value', row.get(path));
    this.highlightCell();
  },

  _cellContentObserver: Ember.on('init', Ember.observer('row', 'columnDefinition', '_value', function () {
    var cellContent = this.get('columnDefinition').getCellContent(this.get('row')),
        that = this;
    if(cellContent && cellContent.then) {
      cellContent.then(function (content) {
        that.setProperties({
          _cellContent: content,
          isWaiting: false
        });
      });
      this.set('isWaiting', true);
    }
    else if(cellContent === undefined && this.get('columnDefinition.observePath')) {
      this.set('isWaiting', true);
    }
    else {
      this.setProperties({
        _cellContent: cellContent,
        isWaiting: false
      });
    }
  })),

  highlightCell: function () {
    var element = this.$();

    element.removeClass("bg-transition");
    element.addClass("highlight");
    Ember.run.later(function () {
      element.addClass("bg-transition");
      element.removeClass("highlight");
    }, 100);
  },

  willDestroy: function () {
    this._removeObserver();
  }
});
