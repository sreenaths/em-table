import Ember from 'ember';
import layout from '../templates/components/em-table-pagination-ui';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['pagination-view'],

  atFirst: Ember.computed('pageNum', function () {
    return this.get('pageNum') === 1;
  }),

  atLast: Ember.computed('pageNum', 'totalPages', function () {
    return this.get('pageNum') === this.get('totalPages');
  }),

  _possiblePages: Ember.computed('pageNum', 'totalPages', function () {
    var pageNum = this.get('pageNum'),
        totalPages = this.get('totalPages'),
        possiblePages = [],
        startPage = 1,
        endPage = totalPages,
        delta = 0;

    if(totalPages > 5) {
      startPage = pageNum - 2;
      endPage = pageNum + 2;

      if(startPage < 1) {
        delta = 1 - startPage;
      }
      else if(endPage > totalPages) {
        delta = totalPages - endPage;
      }

      startPage += delta;
      endPage += delta;
    }

    while(startPage <= endPage) {
      possiblePages.push({
        isCurrent: startPage === pageNum,
        pageNum: startPage++
      });
    }

    return possiblePages;
  })
});
