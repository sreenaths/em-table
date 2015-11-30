import Ember from 'ember';
import Definition from '../utils/table-definition';
import DataProcessor from '../utils/data-processor';

import layout from '../templates/components/em-table';

export default Ember.Component.extend({
  layout: layout,

  definition: Definition.create(),
  dataProcessor: DataProcessor.create(),

  rows: Ember.computed.alias('dataProcessor.rows'),
  columns: Ember.computed.alias('definition.columns'),

  headerComponentNames: ['em-table-search-ui', 'em-table-pagination-ui'],
  footerComponentNames: ['em-table-pagination-ui'],

  classNames: ["em-table"],

  displayFooter: Ember.computed("definition.minRowsForFooter", "dataProcessor.processedRows.length", function () {
    return this.get("definition.minRowsForFooter") <= this.get("dataProcessor.processedRows.length");
  }),

  setDefinitionInProcessor: Ember.on("init", Ember.observer('definition', function () {
    this.set('dataProcessor.tableDefinition', this.get('definition'));
  })),

  _processedRowsObserver: Ember.observer('dataProcessor.processedRows', function () {
    this.sendAction('rowsChanged', this.get('dataProcessor.processedRows'));
  }),

  _columns: Ember.computed('definition.columns', function () {
    var columns = this.get('definition.columns'),
        widthText = (100 / columns.length) + "%";

    return columns.map(function (column) {
      return {
        definition: column,
        width: widthText
      };
    });
  }),

  actions: {
    search: function (searchText) {
      this.set('definition.searchText', searchText);
    },
    rowChanged: function (rowCount) {
      this.set('definition.rowCount', rowCount);
    },
    changePage: function (pageNum) {
      this.set('definition.pageNum', pageNum);
    }
  }
});
