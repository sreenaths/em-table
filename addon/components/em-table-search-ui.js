import Ember from 'ember';
import layout from '../templates/components/em-table-search-ui';

export default Ember.Component.extend({
  layout: layout,

  tableDefinition: null,
  dataProcessor: null,

  classNames: ['search-ui'],
  classNameBindings: ['hasError'],
  isVisible: Ember.computed.alias('tableDefinition.enableSearch'),

  searchTypes: ["Regex", "SQL"],
  actualSearchType: null,

  text: Ember.computed.oneWay('tableDefinition.searchText'),

  _actualSearchTypeDecider: Ember.observer("tableDefinition.searchType", "text", function () {
    var searchType = this.get("tableDefinition.searchType"),
        actualSearchType = this.get("actualSearchType");

    switch(searchType) {
      case "SQL":
      case "Regex":
        actualSearchType = searchType;
        break;

      case "manual":
        if(!actualSearchType) {
          actualSearchType = "Regex";
        }
        // Will be set from the template
        break;

      case "auto":
        var text = this.get("text"),
            columns = this.get('tableDefinition.columns');

        if(text) {
          actualSearchType = this.get("dataProcessor.sql").validateClause(text, columns) ? "SQL" : "Regex";
        }
        else {
          actualSearchType = null;
        }
        break;
    }

    this.set("actualSearchType", actualSearchType);
  }),

  hasError: Ember.computed("text", "actualSearchType", "tableDefinition.searchType", function () {
    var text = this.get("text"),
        columns = this.get('tableDefinition.columns'),
        actualSearchType = this.get("actualSearchType");

    if(text) {
      switch(actualSearchType) {
        case "SQL":
            return !this.get("dataProcessor.sql").validateClause(text, columns);
        case "Regex":
          try {
            new RegExp(text);
          }
          catch(e) {
            return true;
          }
      }
    }
  }),

  actions: {
    search: function () {
      this.get('parentView').send('search', this.get('text'), this.get("actualSearchType"));
    }
  }
});
