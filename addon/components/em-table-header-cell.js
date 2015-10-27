import Ember from 'ember';
import layout from '../templates/components/em-table-header-cell';

export default Ember.Component.extend({
  layout: layout,

  sortIconCSS: function () {
    var css = 'sort-icon ';
    if(this.get('column.searchAndSortable') === false) {
      css = 'no-display';
    }
    else if(this.get('parentView.sortColumnId') === this.get('column.id')) {
      css += this.get('parentView.sortOrder');
    }

    return css;
  }.property('parentView.sortOrder', 'parentView.sortColumnId', 'column.searchAndSortable'),

  _onColResize: function (event) {
    if(!this.startEvent) {
      this.startEvent = event;
    }

    this.header.set(
      'column.width',
      (this.startWidth + event.clientX - this.startEvent.clientX) + 'px'
    );
  },

  _endColResize: function () {
    document.removeEventListener('mousemove', this.onColResize);
    document.removeEventListener('mouseup', this.endColResize);
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
        header: this,
        startWidth: this.get('element').offsetWidth,
        startEvent: null
      };
      mouseTracker.onColResize = this._onColResize.bind(mouseTracker);
      mouseTracker.endColResize = this._endColResize.bind(mouseTracker);

      document.addEventListener('mousemove', mouseTracker.onColResize);
      document.addEventListener('mouseup', mouseTracker.onColResize);
    }
  }
});
