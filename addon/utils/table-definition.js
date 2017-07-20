import Ember from 'ember';

export default Ember.Object.extend({

  recordType: "",

  // Search
  enableSearch: true,
  searchText: '',

  // Faceting
  enableFaceting: false,
  facetConditions: null,

  // Sort
  enableSort: true,
  sortColumnId: '',
  sortOrder: '',

  // Pagination
  enablePagination: true,
  pageNum: 1,
  rowCount: 10,
  rowCountOptions: [5, 10, 25, 50, 100],

  enableColumnResize: true,

  minRowsForFooter: 25,

  columns: [],

  _pageNumResetObserver: Ember.observer('searchText', 'facetConditions', 'rowCount', function () {
    this.set('pageNum', 1);
  }),

  _facetResetObserver: Ember.observer('searchText', function () {
    this.set('facetConditions', null);
  }),

});
