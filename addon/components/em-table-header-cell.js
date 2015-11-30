import Ember from 'ember';
import layout from '../templates/components/em-table-header-cell';

export default Ember.Component.extend({
  layout: layout,

  title: null, // Header cell Name
  attributeBindings: ['title'],

  definition: null,
  tableDefinition: null,

  classNames: ['table-header-cell'],

  sortIconCSS: Ember.computed('tableDefinition.sortOrder', 'tableDefinition.sortColumnId', function () {
    if(this.get('tableDefinition.sortColumnId') === this.get('definition.id')) {
      return this.get('tableDefinition.sortOrder');
    }
  }),

  actions: {
    sort: function () {
      this.get('parentView').send('sort');
    },
    startColResize: function () {
      this.get('parentView').send('startColResize');
    }
  }
});
