/*jshint browser: true */

import Ember from 'ember';

import TableDef from 'em-table/utils/table-definition';
import ColumnDef from 'em-table/utils/column-definition';

import DummyModel from '../models/dummy-model';

function createColumn(columnCount) {
  var columns = [];

  // Generate columns
  for(var i = 0; i < columnCount; i++) {
    columns.push({
      id: 'col' + i,
      headerTitle: 'Column ' + i,
      contentPath: 'col' + i,
      observePath: true
    });
  }

  columns[1].headerTitle = "Header that would be clipped with ellipsis.";

  // Adding computed property column
  columns.push({
    id: 'computedColumn',
    headerTitle: 'Computed property column',
    contentPath: 'computedValue',
    observePath: true,
  });

  // Adding anchor column
  columns.push({
    id: 'anchorColumn',
    headerTitle: 'Anchor Column',
    contentPath: 'rowId',
    cellComponentName: 'em-table-linked-cell',
    getCellContent: function () {
      return [{
        href: 'https://www.npmjs.com/package/em-table',
        displayText: "View"
      }, {
        href: 'https://www.npmjs.com/package/em-table',
        displayText: "Download",
        download: true
      }];
    }
  });

  // Adding linked column 1
  columns.push({
    id: 'linkedColumn1',
    headerTitle: 'Linked Column 1',
    contentPath: 'rowId',
    observePath: true,
    cellComponentName: 'em-table-linked-cell',
    getCellContent: function (row) {
      return {
        routeName: 'row',
        id: row.get('rowId'),
        displayText: "Row " + row.get('rowId') + " link"
      };
    }
  });

  // Adding linked column 2
  columns.push({
    id: 'linkedColumn2',
    headerTitle: 'Multiple links target=_blank',
    contentPath: 'rowId',
    observePath: true,
    cellComponentName: 'em-table-linked-cell',
    cellDefinition: {
      target: "_blank"
    },
    getCellContent: function (row) {
      return [{
        routeName: 'row',
        model: row.get('rowId'),
        text: "Row " + row.get('rowId') + " link 1"
      },{
        routeName: 'row',
        model: row.get('rowId'),
        text: "Row " + row.get('rowId') + " link 2"
      }];
    }
  });

  // Adding observed with no value = pending column
  columns.push({
    id: 'pendingColumn',
    headerTitle: 'Pending Column',
    contentPath: 'noValue',
    observePath: true,
  });

  // Status column
  columns.push({
    id: 'statusColumn',
    headerTitle: 'Status Column',
    contentPath: 'statusValue',
    cellComponentName: 'em-table-status-cell'
  });

  // Adding progress column
  columns.push({
    id: 'progressColumn',
    headerTitle: 'Progress Column',
    contentPath: 'progressValue',
    cellComponentName: 'em-table-progress-cell'
  });

  // Adding date column
  columns.push({
    id: 'dateColumn',
    headerTitle: 'Date Formatted Column',
    contentPath: 'dateValue',
    cellDefinition: {
      type: "date"
    }
  });

  // Adding duration column
  columns.push({
    id: 'durationColumn',
    headerTitle: 'Duration Formatted Column',
    contentPath: 'durationValue',
    cellDefinition: {
      type: "duration"
    }
  });

  // Adding memory column
  columns.push({
    id: 'memoryColumn',
    headerTitle: 'Memory Formatted Column',
    contentPath: 'memoryValue',
    cellDefinition: {
      type: "memory"
    }
  });

  return ColumnDef.make(columns);
}

function createData(columnCount, rowCount) {
  var data = [],
      row,
      Row = Ember.Object.extend({
        computedValue: Ember.computed("col0", function () {
          return this.get("col0");
        })
      });

  var statuses = ["NEW", "INITED", "STARTED", "initializing",
      "scheduled", "running", "in-progress", "committing", "finished", "succeeded",
      "terminating", "failed", "killed", "error"];

  // Generate static part of data
  for(var j = 0; j < rowCount; j++) {
    row = Row.create();

    for(var i = 0; i < columnCount; i++) {
      row.set('col' + i, 'Column ' + i + ' - Data ' + j);
    }
    row.set('rowId', j);
    row.set("progressValue", Math.random());
    row.set("statusValue", statuses[j % statuses.length]);

    row.set("dateValue", Date.now());
    row.set("durationValue", parseInt(Math.random() * 10000));
    row.set("memoryValue", parseInt(Math.random() * 10000));

    data.push(row);
  }

  // Null data - Not Available must be displayed
  data[2].set('col0', null);

  // data that would be clipped with ellipsis
  data[3].set('col1', "Data that would be clipped with ellipsis.");

  // Not available entries for formatted column
  data[2].set('progressValue', undefined);
  data[3].set('dateValue', undefined);
  data[4].set('durationValue', undefined);
  data[5].set('memoryValue', undefined);

  // Null : Not available entries for formatted column
  data[3].set('progressValue', null);
  data[4].set('dateValue', null);
  data[5].set('durationValue', null);
  data[6].set('memoryValue', null);

  // Invalid entries for formatted column
  data[4].set('progressValue', "{}");
  data[5].set('dateValue', "{}");
  data[6].set('durationValue', "{}");
  data[7].set('memoryValue', "{}");

  // Generate dynamic part of data
  window.setInterval(function () {
    var row = parseInt(Math.random() * rowCount),
        col = parseInt(Math.random() * columnCount),
        value = data[row].get("col" + col);

    if(value) {
      value = value.split(" : ")[0];
      value = value + " : " + parseInt(Math.random() * 100);

      data[row].set("col" + col, value);
    }
  }, 1000);

  return Ember.A(data);
}

export default Ember.Controller.extend({
  columns: createColumn(3),
  rows: createData(3, 30),

  customTableDefinition: TableDef.create(),
  searchText: Ember.computed.alias('customTableDefinition.searchText'),

  init: function () {
    var that = this;
    setInterval(function () {
      that.set('searchText', parseInt(Math.random() * 10));
    }, 1000);
  },

  simpleColumns: ColumnDef.make([
    {
      id: 'id',
      headerTitle: 'Id',
      contentPath: 'id'
    }, {
      id: 'name',
      headerTitle: 'Name',
      contentPath: 'name'
    }
  ]),
  simpleRows: Ember.A([
    Ember.Object.create({
      id: 1,
      name: "Gopi"
    }), Ember.Object.create({
      id: 2,
      name: "Jaya"
    })
  ]),

  columnsFromModel: ColumnDef.makeFromModel(DummyModel),
  rowsForColumnsFromModel: Ember.A([
    Ember.Object.create({
      attr1: "path1",
      attr2: "path2",
      attr3: "path3"
    })
  ]),

  actions: {
    sortActionTest: function (colId, order) {
      Ember.Logger.log(`sortAction called - ${colId}:${order}`);
    },
    pageActionTest: function (page) {
      Ember.Logger.log(`pageAction called - ${page}`);
    }
  }

});
