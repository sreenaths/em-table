import Ember from 'ember';

import SQL from './sql';

/**
 * Handles Sorting, Searching & Pagination
 */
export default Ember.Object.extend({
  isSorting: false,
  isSearching: false,

  tableDefinition: null,

  sql: SQL.create(),

  rows: [],
  _sortedRows: [],
  _searchedRows: [],

  _searchObserver: Ember.on("init", Ember.observer('tableDefinition.searchText', '_sortedRows.[]', function () {
    Ember.run.once(this, "startSearch");
  })),

  _sortObserver: Ember.on("init", Ember.observer(
    'tableDefinition.sortColumnId',
    'tableDefinition.sortOrder',
    'rows.[]', function () {
      Ember.run.once(this, "startSort");
  })),

  regexSearch: function (clause, rows, columns) {
    var regex = new RegExp(clause, "i");

    function checkRow(column) {
      var value;
      if(!column.get('enableSearch')) {
        return false;
      }
      value = column.getSearchValue(this);

      if(typeof value === 'string') {
        value = value.toLowerCase();
        return value.match(regex);
      }

      return false;
    }

    return rows.filter(function (row) {
      return columns.some(checkRow, row);
    });
  },

  startSearch: function () {
    var searchText = String(this.get('tableDefinition.searchText')),
        rows = this.get('_sortedRows') || [],
        columns = this.get('tableDefinition.columns'),
        that = this;

    if(searchText) {
      this.set("isSearching", true);

      Ember.run.later(function () {
        var result;

        if(that.get("sql").validateClause(searchText, columns)) {
          result = that.get("sql").search(searchText, rows, columns);
        }
        else {
          result = that.regexSearch(searchText, rows, columns);
        }

        that.setProperties({
          _searchedRows: result,
          isSearching: false
        });
      });
    }
    else {
      this.set("_searchedRows", rows);
    }
  },

  compareFunction: function (a, b){
    // Checking for undefined and null to handle some special cases in JavaScript comparison
    // Eg: 1 > undefined = false & 1 < undefined = false
    // "a1" > null = false & "a1" < null = false
    if(a === undefined || a === null) {
      return -1;
    }
    else if(b === undefined || b === null) {
      return 1;
    }
    else if(a < b) {
      return -1;
    }
    else if(a > b) {
      return 1;
    }
    else {
      return 0;
    }
  },

  startSort: function () {
    var rows = this.get('rows'),
        sortColumnId = this.get('tableDefinition.sortColumnId'),
        column = this.get('tableDefinition.columns').find(function (element) {
          return element.get('id') === sortColumnId;
        }),
        descending = this.get('tableDefinition.sortOrder') === 'desc',
        that = this;

    if(rows && rows.get('length') > 0 && column) {
      this.set('isSorting', true);

      Ember.run.later(function () {
        /*
         * Creating sortArray as calling getSortValue form inside the
         * sort function every time would be more costly.
         */
        var sortArray = rows.map(function (row) {
          return {
            value: column.getSortValue(row),
            row: row
          };
        }),
        compareFunction = that.get("compareFunction");

        sortArray.sort(function (a, b) {
          var result = compareFunction(a.value, b.value);
          if(descending && result) {
            result = -result;
          }
          return result;
        });

        that.setProperties({
          _sortedRows: sortArray.map(function (record) {
            return record.row;
          }),
          isSorting: false
        });
      });
    }
    else {
      this.set('_sortedRows', rows);
    }
  },

  totalPages: Ember.computed('_searchedRows.length', 'tableDefinition.rowCount', function () {
    return Math.ceil(this.get('_searchedRows.length') / this.get('tableDefinition.rowCount'));
  }),

  // Paginate
  processedRows: Ember.computed('_searchedRows.[]', 'tableDefinition.rowCount', 'tableDefinition.pageNum', function () {
    var rowCount =  this.get('tableDefinition.rowCount'),
        startIndex = (this.get('tableDefinition.pageNum') - 1) * rowCount;
    return this.get('_searchedRows').slice(startIndex, startIndex + rowCount);
  }),
});
