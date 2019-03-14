import Ember from 'ember';

export default Ember.Object.extend({

  recordType: "",

  // Search
  enableSearch: true,
  searchText: '',
  searchType: 'auto', // Can be either of auto, manual, regex OR sql
  _actualSearchType: "Regex", // Set from em-table-search-ui

  // Faceting
  enableFaceting: false,
  facetConditions: null,
  minFieldsForFilter: 15,
  minValuesToDisplay: 2,
  facetValuesPageSize: 10,

  // Sort
  enableSort: true,
  sortColumnId: '',
  sortOrder: '',
  headerAsSortButton: false,

  // Pagination
  enablePagination: true,
  pageNum: 1,
  rowCount: 10,
  rowCountOptions: [5, 10, 25, 50, 100],

  enableColumnResize: true,
  showScrollShadow: false,

  minRowsForFooter: 25,

  columns: [],

  _pageNumResetObserver: Ember.observer('searchText', 'facetConditions', 'rowCount', function () {
    this.set('pageNum', 1);
  }),

});
