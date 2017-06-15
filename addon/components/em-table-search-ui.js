import Ember from 'ember';
import layout from '../templates/components/em-table-search-ui';

export default Ember.Component.extend({
  layout: layout,

  tableDefinition: null,
  dataProcessor: null,

  classNames: ['search-ui'],
  isVisible: Ember.computed.alias('tableDefinition.enableSearch'),

  isSQLClause: Ember.computed("text", function () {
    var text = this.get("text"),
        columns = this.get('tableDefinition.columns');

    return this.get("dataProcessor.sql").validateClause(text, columns);
  }),

  text: Ember.computed.oneWay('tableDefinition.searchText'),

  actions: {
    search: function () {
      this.get('parentView').send('search', this.get('text'));
    }
  }
});
