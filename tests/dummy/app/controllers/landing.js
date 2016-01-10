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

  // Adding linked column
  columns.push({
    id: 'linkedColumn',
    headerTitle: 'Linked Column',
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

  // Adding observed with no value = pending column
  columns.push({
    id: 'pendingColumn',
    headerTitle: 'Pending Column',
    contentPath: 'noValue',
    observePath: true,
  });

  // Adding date column
  columns.push({
    id: 'dateColumn',
    headerTitle: 'Date Column',
    contentPath: 'dateValue',
    cellDefinition: {
      type: "date"
    }
  });

  return ColumnDef.make(columns);
}

function createData(columnCount, rowCount) {
  var data = [],
      row;

  // Generate static part of data
  for(var j = 0; j < rowCount; j++) {
    row = Ember.Object.create();
    for(var i = 0; i < columnCount; i++) {
      row.set('col' + i, 'Column ' + i + ' - Data ' + j);
    }
    row.set('rowId', j);
    row.set("dateValue", Date.now());
    data.push(row);
  }

  // Null data
  data[3].set('col0', null);

  // data that would be clipped with ellipsis
  data[3].set('col1', "Data that would be clipped with ellipsis.");

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
  columns: createColumn(5),
  rows: createData(5, 30),

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
  ])

});
