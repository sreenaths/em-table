import Ember from 'ember';
import layout from '../templates/components/em-table';

import Cell from './em-table-cell';
import HeaderCell from './em-table-header-cell';

export default Ember.Component.extend({
  layout: layout,

  sortColumnId: '',
  sortOrder: '',

  searchText: '',
  searchRegEx: null,
  searchColumnNames: null,

  statusMessage: null,

  isSorting: false,
  isSearching: false,

  pageNum: 1,
  rowCount: 10,
  rowCountOptions: [5, 10, 25, 50, 100],
  pageNavOnFooterAt: 25,

  _sortedRows: null,

  init: function () {
    this._super();
    if(this.get('searchText')) {
      this._searchObserver();
    }
    this._sortObserver();
  },

  totalPages: Ember.computed('_searchedRows.length', 'rowCount', function () {
    return Math.ceil(this.get('_searchedRows.length') / this.get('rowCount'));
  }),

  hasPageNavOnFooter: Ember.computed('enablePagination', '_rows.length', 'pageNavOnFooterAt', function () {
    return this.get('enablePagination') && this.get('_rows.length') >= this.get('pageNavOnFooterAt');
  }),

  _showHeader: Ember.computed('enableSearch', 'enablePagination', 'extraHeaderItem', '_statusMessage', function () {
    return this.get('enableSearch') ||
        this.get('enablePagination') ||
        this.get('extraHeaderItem') ||
        this.get('_statusMessage');
  }),

  _statusMessage: Ember.computed('isSearching', 'isSorting', 'statusMessage', 'enableStatus', function() {
    if(this.get('enableStatus') === false) {
      return null;
    }
    if(this.get('isSorting')) {
      return "Sorting...";
    }
    else if(this.get('isSearching')) {
      return "Searching...";
    }
    return this.get('statusMessage');
  }),

  _pageNumResetObserver: Ember.observer('searchRegEx', 'rowCount', function () {
    this.set('pageNum', 1);
  }),

  _searchedRows: Ember.computed('columns.[]', '_sortedRows.[]', 'searchRegEx', function () {
    var regex = this.get('searchRegEx'),
        rows = this.get('_sortedRows') || [],
        searchColumnNames,
        columns;

    function checkRow(column) {
      var value;
      if(!column.get('searchAndSortable')) {
        return false;
      }
      value = column.getSearchValue(this);
      return (typeof value === 'string') ? value.match(regex) : false;
    }

    this.set('isSearching', false);

    if(!regex) {
      return rows;
    }
    else {
      searchColumnNames = this.get('searchColumnNames');
      columns = searchColumnNames ? this.get('columns').filter(function (column) {
        return searchColumnNames.indexOf(column.get('headerCellName')) !== -1;
      }) : this.get('columns');

      return rows.filter(function (row) {
        return columns.some(checkRow, row);
      });
    }
  }),

  _columns: Ember.computed('columns', function () {
    var columns = this.get('columns'),
        widthPercentageToFit = 100 / columns.length;

      columns.map(function (column) {
        var templateName = column.get('templateName'),
            cellOptions = {
              column: column
            };

        if(templateName) {
          cellOptions.templateName = templateName;
        }

        column.setProperties({
          width: widthPercentageToFit + "%",
          cellView: Cell.extend(cellOptions),
          headerCellView: HeaderCell.extend({
            column: column,
            table: this
          })
        });
      });

    return columns;
  }),

  _rows: Ember.computed('_searchedRows.[]', 'rowCount', 'pageNum', function () {
    var startIndex = (this.get('pageNum') - 1) * this.get('rowCount'),
        rows = this.get('_searchedRows').slice(startIndex, startIndex + this.get('rowCount'));
    this.sendAction('rowsChanged', rows);
    return rows;
  }),

  _searchObserver: Ember.observer('searchText', function () {
    var searchText = this.get('searchText'),
        columnNames = [],
        delimIndex,
        rowsCount,
        that = this;

    if(searchText) {
      delimIndex = searchText.indexOf(':');
      if(delimIndex !== -1) {
        columnNames = searchText.substr(0, delimIndex).
          split(",").
          reduce(function (arr, columnName) {
            columnName = columnName.trim();
            if(columnName) {
              arr.push(columnName);
            }
            return arr;
          }, []);
        searchText = searchText.substr(delimIndex + 1);
      }
      searchText = searchText.trim();
    }

    rowsCount = this.get('rows.length');

    if(rowsCount) {
      this.set('isSearching', true);

      Ember.run.later(function () {
        that.setProperties({
          searchRegEx: searchText ? new RegExp(searchText, 'im') : null,
          searchColumnNames: columnNames.length ? columnNames : null
        });
      }, 400);
    }
  }),

  _sortObserver: Ember.observer('sortColumnId', 'sortOrder', 'rows.[]', function () {
    var rows = this.get('rows'),
        sortColumnId = this.get('sortColumnId'),
        column = this.get('columns').find(function (element) {
          return element.get('id') === sortColumnId;
        }),
        ascending = this.get('sortOrder') === 'asc',
        that = this;

    if(rows && rows.get('length') > 0 && column) {
      this.set('isSorting', true);

      Ember.run.later(function () {
        /*
         * Creating sortArray as calling getSortValue form inside the
         * sort function would be more costly.
         */
        var sortArray = rows.map(function (row) {
          return {
            value: column.getSortValue(row),
            row: row
          };
        });

        sortArray.sort(function (a, b){
          if(ascending ^ (a.value > b.value)) {
            return -1;
          }
          else if(ascending ^ (a.value < b.value)) {
            return 1;
          }
          return 0;
        });

        that.setProperties({
          _sortedRows: sortArray.map(function (record) {
            return record.row;
          }),
          isSorting: false
        });

      }, 400);
    }
    else {
      this.set('_sortedRows', rows);
    }
  }),

  actions: {
    search: function (searchText) {
      this.set('searchText', searchText);
    },
    sort: function (columnId) {
      if(this.get('sortColumnId') !== columnId) {
        this.setProperties({
          sortColumnId: columnId,
          sortOrder: 'asc'
        });
      }
      else {
        this.set('sortOrder', this.get('sortOrder') === 'asc' ? 'desc' : 'asc');
      }
    },

    changePage: function (pageNum) {
      this.set('pageNum', pageNum);
    }
  }
});
