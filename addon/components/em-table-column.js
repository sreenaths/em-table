import Ember from 'ember';

import layout from '../templates/components/em-table-column';

export default Ember.Component.extend({
  layout: layout,

  definition: null,
  rows: null,
  index: 0,

  tableDefinition: null,
  adjustedWidth: null,
  defaultWidth: "",

  classNames: ['table-column'],
  classNameBindings: ['innerColumn'],

  innerColumn: Ember.computed('index', function () {
    if(this.get('index')) {
      return 'inner';
    }
  }),

  didInsertElement: Ember.observer("adjustedWidth", "defaultWidth", function () {
    this.$().width(this.get('adjustedWidth') || this.get('defaultWidth'));
  }),

  _onColResize: function (event) {
    var data = event.data,
        width;

    if(!data.startEvent) {
      data.startEvent = event;
    }

    width = (data.startWidth + event.clientX - data.startEvent.clientX) + 'px';
    data.thisObj.set('adjustedWidth', width);
  },

  _endColResize: function (event) {
    var thisObj = event.data.thisObj;
    Ember.$(document).off('mousemove', thisObj._onColResize);
    Ember.$(document).off('mouseup', thisObj._endColResize);
  },

  actions: {
    sort: function () {
      var definition = this.get('definition'),
          onSort = definition.get('onSort');

      if(!onSort || onSort.call(definition, definition)) {
        let columnId = this.get('definition.id'),
            tableDefinition = this.get('tableDefinition');

        if(tableDefinition.get('sortColumnId') !== columnId) {
          tableDefinition.setProperties({
            sortColumnId: columnId,
            sortOrder: 'asc'
          });
        }
        else {
          tableDefinition.set('sortOrder', tableDefinition.get('sortOrder') === 'asc' ? 'desc' : 'asc');
        }
      }
    },
    startColResize: function () {
      var mouseTracker = {
        thisObj: this,
        startWidth: this.$().width(),
        startEvent: null
      };

      Ember.$(document).on('mousemove', mouseTracker, this._onColResize);
      Ember.$(document).on('mouseup', mouseTracker, this._endColResize);
    }
  }
});
