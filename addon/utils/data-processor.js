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

  _searchObserver: Ember.on("init", Ember.observer('tableDefinition.searchText', 'rows.[]', function () {
      Ember.run.once(this, "startSearch");
  })),

  _sortObserver: Ember.on("init", Ember.observer(
    'tableDefinition.sortColumnId',
    'tableDefinition.sortOrder',
    'rows.[]', function () {
      Ember.run.once(this, "startSort");
  })),

  startSearch: function () {
    console.log(this.get('tableDefinition.searchText'));
  },

  startSort: function () {
    console.log(this.get('tableDefinition.sortColumnId'), this.get('tableDefinition.sortOrder'));
  },

  totalPages: Ember.computed('_searchedRows.length', 'tableDefinition.rowCount', function () {
    return Math.ceil(this.get('_searchedRows.length') / this.get('tableDefinition.rowCount'));
  }),

  processedRows: Ember.computed("rows", function () {
    this.set('_sortedRows', this.get("rows"));
    this.set('_searchedRows', this.get("rows"));
    return this.get("rows");
  }),
});
