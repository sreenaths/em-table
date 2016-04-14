import Ember from 'ember';
import layout from '../templates/components/em-table-header-cell';

export default Ember.Component.extend({
  layout: layout,

  title: null, // Header cell Name
  attributeBindings: ['title'],

  definition: null,
  tableDefinition: null,
  dataProcessor: null,

  classNames: ['table-header-cell'],
  classNameBindings: ['isSorting'],

  isSorting: Ember.computed("dataProcessor.isSorting", function () {
    return this.get("dataProcessor.isSorting") && this.get('tableDefinition.sortColumnId') === this.get('definition.id');
  }),

  sortIconCSS: Ember.computed('tableDefinition.sortOrder', 'tableDefinition.sortColumnId', function () {
    if(this.get('tableDefinition.sortColumnId') === this.get('definition.id')) {
      return this.get('tableDefinition.sortOrder');
    }
  }),

  sortToggledTitle: Ember.computed('tableDefinition.sortOrder', 'tableDefinition.sortColumnId', function () {
    if(this.get('tableDefinition.sortColumnId') === this.get('definition.id')) {
      switch(this.get('tableDefinition.sortOrder')) {
        case "asc":
          return "descending";
        case "desc":
          return "ascending";
      }
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
