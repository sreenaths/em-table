import Ember from 'ember';

export default Ember.Object.extend({
  isSorting: false,
  isSearching: false,

  tableDefinition: null,

  rows: [],

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

  processedRows: Ember.computed("rows", function () {
    return this.get("rows");
  }),
});
