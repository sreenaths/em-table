import Ember from 'ember';
import layout from '../templates/components/em-table-header-cell';

export default Ember.Component.extend({
  layout: layout

  sortIconCSS: function () {
    var css = 'sort-icon ';
    if(this.get('column.searchAndSortable') == false) {
      css = 'no-display';
    }
    else if(this.get('parentView.sortColumnId') == this.get('column.id')) {
      css += this.get('parentView.sortOrder');
    }

    return css;
  }.property('parentView.sortOrder', 'parentView.sortColumnId', 'column.searchAndSortable'),

  _onColResize: function (event) {
    var data = event.data;

    if(!data.startEvent) {
      data.startEvent = event;
    }

    data.thisHeader.set(
      'column.width',
      (data.startWidth + event.clientX - data.startEvent.clientX) + 'px'
    );
  },

  _endColResize: function (event) {
    var thisHeader = event.data.thisHeader;
    $(document).off('mousemove', thisHeader._onColResize);
    $(document).off('mouseup', thisHeader._endColResize);
  },

  actions: {
    sort: function () {
      var column = this.get('column'),
          onSort = column.get('onSort');

      if(!onSort || onSort.call(column, column)) {
        this.get('parentView').send('sort', this.get('column.id'));
      }
    },
    startColResize: function () {
      var mouseTracker = {
        thisHeader: this,
        startWidth: $(this.get('element')).width(),
        startEvent: null
      };
      $(document).on('mousemove', mouseTracker, this._onColResize);
      $(document).on('mouseup', mouseTracker, this._endColResize);
    }
  }
});
