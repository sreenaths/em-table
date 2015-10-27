import Ember from 'ember';
import layout from '../templates/components/em-table-pagination-ui';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['pagination-view'],

  atFirst: function () {
    return this.get('pageNum') == 1;
  }.property('pageNum'),

  atLast: function () {
    return this.get('pageNum') == this.get('totalPages');
  }.property('pageNum', 'totalPages'),

  _possiblePages: function () {
    var pageNum = this.get('pageNum'),
        totalPages = this.get('totalPages'),
        possiblePages = [],
        startPage = 1,
        endPage = totalPages,
        delta = 0;

    if(totalPages > 5) {
      startPage = pageNum - 2, endPage = pageNum + 2;

      if(startPage < 1) {
        delta = 1 - startPage;
      }
      else if(endPage > totalPages) {
        delta = totalPages - endPage;
      }

      startPage += delta, endPage += delta;
    }

    while(startPage <= endPage) {
      possiblePages.push({
        isCurrent: startPage == pageNum,
        pageNum: startPage++
      });
    }

    return possiblePages;
  }.property('pageNum', 'totalPages')
});
