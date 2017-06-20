import Ember from 'ember';
import Definition from '../utils/table-definition';
import ColumnDefinition from '../utils/column-definition';
import DataProcessor from '../utils/data-processor';

import layout from '../templates/components/em-table';

function createAssigner(targetPath, targetKey, sourcePath) {
  return Ember.on("init", Ember.observer(targetPath, sourcePath, function () {
    var target = this.get(targetPath),
        source = this.get(sourcePath);
    if(target && source !== undefined) {
      target.set(targetKey, source);
    }
  }));
}

export default Ember.Component.extend({
  layout: layout,

  definition: null,
  dataProcessor: null,

  headerComponentNames: ['em-table-search-ui', 'em-table-pagination-ui'],
  footerComponentNames: ['em-table-pagination-ui'],

  leftPanelComponentName: "",
  rightPanelComponentName: "",

  classNames: ["em-table"],

  assignDefinitionInProcessor: createAssigner('_dataProcessor', 'tableDefinition', '_definition'),
  assignRowsInProcessor: createAssigner('_dataProcessor', 'rows', 'rows'),
  assignColumnsInDefinition: createAssigner('_definition', 'columns', 'columns'),

  assignEnableSortInDefinition: createAssigner('_definition', 'enableSort', 'enableSort'),
  assignEnableSearchInDefinition: createAssigner('_definition', 'enableSearch', 'enableSearch'),
  assignEnablePaginationInDefinition: createAssigner('_definition', 'enablePagination', 'enablePagination'),
  assignRowCountInDefinition: createAssigner('_definition', 'rowCount', 'rowCount'),

  _definition: Ember.computed('definition', 'definitionClass', function () {
    return this.get('definition') || (this.get('definitionClass') || Definition).create();
  }),
  _dataProcessor: Ember.computed('dataProcessor', 'dataProcessorClass', function () {
    return this.get('dataProcessor') || (this.get('dataProcessorClass') || DataProcessor).create();
  }),

  displayFooter: Ember.computed("_definition.minRowsForFooter", "_dataProcessor.processedRows.length", function () {
    return this.get("_definition.minRowsForFooter") <= this.get("_dataProcessor.processedRows.length");
  }),

  _processedRowsObserver: Ember.observer('_dataProcessor.processedRows', function () {
    this.sendAction('rowsChanged', this.get('_dataProcessor.processedRows'));
  }),

  _columns: Ember.computed('_definition.columns', function () {
    var rawColumns = this.get('_definition.columns'),
        normalisedColumns = {
          left: [],
          center: [],
          right: [],
          length: rawColumns.length
        },
        widthText;

    rawColumns.forEach(function (column) {
      normalisedColumns[column.get("pin")].push({
        definition: column
      });
    });

    if(normalisedColumns.center.length) {
      widthText = (100 / normalisedColumns.center.length) + "%";
      normalisedColumns.center.forEach(function (column) {
        column.width = widthText;
      });
    }
    else {
      normalisedColumns.center = [{
        definition: ColumnDefinition.fillerColumn,
        width: "100%"
      }];
    }

    return normalisedColumns;
  }),

  message: Ember.computed('_columns.length',
      '_dataProcessor.processedRows.length', '_definition.recordType', function () {
    if(!this.get('_columns.length')) {
      return "No columns available!";
    }
    else if(!this.get("_dataProcessor.processedRows.length")) {
      let identifiers = Ember.String.pluralize(this.get('_definition.recordType') || "record");
      return `No ${identifiers} available!`;
    }
  }),

  actions: {
    search: function (searchText) {
      this.set('_definition.searchText', searchText);
      this.sendAction("searchAction", searchText);
    },
    sort: function (sortColumnId, sortOrder) {
      this.get("_definition").setProperties({
        sortColumnId,
        sortOrder
      });
      this.sendAction("sortAction", sortColumnId, sortOrder);
    },
    rowChanged: function (rowCount) {
      this.set('_definition.rowCount', rowCount);
      this.sendAction("rowAction", rowCount);
    },
    pageChanged: function (pageNum) {
      this.set('_definition.pageNum', pageNum);
      this.sendAction("pageAction", pageNum);
    }
  }
});
