import Ember from 'ember';

/**
 * Handles Sorting, Searching & Pagination
 */
export default Ember.Object.extend({
  isSorting: false,
  isSearching: false,

  tableDefinition: null,

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

  startSearch: function () {
    var searchText = this.get('tableDefinition.searchText'),
        rows = this.get('_sortedRows') || [],
        columns = this.get('tableDefinition.columns');

    function checkRow(column) {
      var value;
      if(!column.get('enableSearch')) {
        return false;
      }
      value = column.getSearchValue(this);
      return (typeof value === 'string') ? value.match(searchText) : false;
    }

    if(searchText) {
      rows = rows.filter(function (row) {
        return columns.some(checkRow, row);
      });
    }

    this.setProperties({
      _searchedRows: rows,
      isSearching: false
    });
  },

  startSort: function () {
    var rows = this.get('rows'),
        sortColumnId = this.get('tableDefinition.sortColumnId'),
        column = this.get('tableDefinition.columns').find(function (element) {
          return element.get('id') === sortColumnId;
        }),
        ascending = this.get('tableDefinition.sortOrder') === 'asc',
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
        });

        sortArray.sort(function (a, b){
          console.log(a.value, b.value);
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
