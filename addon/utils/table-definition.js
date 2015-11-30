import Ember from 'ember';

export default Ember.Object.extend({
  enableSearch: true,
  enableSort: true,
  enablePagination: false,
  enableColumnResize: true,

  sortColumnId: '',
  sortOrder: '',

  searchText: 'A',

  pageNum: 1,
  rowCount: 10,
  rowCountOptions: [5, 10, 25, 50, 100],

  minRowsForFooter: 25,

  columns: []
});
