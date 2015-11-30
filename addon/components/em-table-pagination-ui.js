import Ember from 'ember';
import layout from '../templates/components/em-table-pagination-ui';

export default Ember.Component.extend({
  layout: layout,

  tableDefinition: null,
  dataProcessor: null,

  classNames: ['pagination-ui'],
  isVisible: Ember.computed.alias('tableDefinition.enablePagination'),

  atFirst: Ember.computed('tableDefinition.pageNum', function () {
    return this.get('tableDefinition.pageNum') === 1;
  }),

  atLast: Ember.computed('tableDefinition.pageNum', 'tableDefinition.totalPages', function () {
    return this.get('tableDefinition.pageNum') === this.get('tableDefinition.totalPages');
  }),

  rowCountOptions: Ember.computed('tableDefinition.rowCountOptions', 'tableDefinition.rowCount', function () {
    var options = this.get('tableDefinition.rowCountOptions'),
        rowCount = this.get('tableDefinition.rowCount');

    return options.map(function (option) {
      return {
        value: option,
        selected: option === rowCount
      };
    });
  }),

  _possiblePages: Ember.computed('tableDefinition.pageNum', 'dataProcessor.totalPages', function () {
    var pageNum = this.get('tableDefinition.pageNum'),
        totalPages = this.get('dataProcessor.totalPages'),
        possiblePages = [],
        startPage = 1,
        endPage = totalPages,
        delta = 0;

    if(totalPages > 5) {
      startPage = pageNum - 2;
      endPage = pageNum + 2;

      if(startPage < 1) {
        delta = 1 - startPage;
      }
      else if(endPage > totalPages) {
        delta = totalPages - endPage;
      }

      startPage += delta;
      endPage += delta;
    }

    while(startPage <= endPage) {
      possiblePages.push({
        isCurrent: startPage === pageNum,
        pageNum: startPage++
      });
    }

    return possiblePages;
  }),

  actions: {
    rowSelected: function (value) {
      value = parseInt(value);
      if(this.get('tableDefinition.rowCount') != value) {
        this.get('parentView').send('search', value);
      }
    }
  }
});
