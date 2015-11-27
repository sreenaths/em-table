import Ember from 'ember';

export default Ember.Object.extend({
  sortColumnId: '',
  sortOrder: '',

  searchText: '',
  searchColumnNames: null,

  pageNum: 1,
  rowCount: 10,
  rowCountOptions: [5, 10, 25, 50, 100],
  pageNavOnFooterAt: 25,
});
