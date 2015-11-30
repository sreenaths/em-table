import Ember from 'ember';
import layout from '../templates/components/em-table-search-ui';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['search-ui'],

  tableDefinition: null,
  isVisible: Ember.computed.alias('tableDefinition.enableSearch'),

  text: Ember.computed.oneWay('tableDefinition.searchText'),

  actions: {
    search: function () {
      this.get('parentView').send('search', this.get('text'));
    }
  }
});
