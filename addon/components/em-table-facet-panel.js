import Ember from 'ember';
import layout from '../templates/components/em-table-facet-panel';

const MIN_VALUES_FOR_FILTER = 15;

export default Ember.Component.extend({
  layout: layout,

  classNames: ["em-table-facet-panel"],
  isVisible: Ember.computed.alias('tableDefinition.enableFaceting'),

  tableDefinition: null,
  dataProcessor: null,
  tmpFacetConditions: {},

  filterText: null,
  enableFilter: Ember.computed("dataProcessor.facetedFields.length", function () {
    return this.get("dataProcessor.facetedFields.length") >= MIN_VALUES_FOR_FILTER;
  }),

  didInsertElement: Ember.observer("filterText", "dataProcessor.facetedFields", function () {
    var fields = this.get("dataProcessor.facetedFields"),
        filterText = this.get("filterText"),
        filterRegex = new RegExp(filterText, "i"),
        elements = Ember.$(this.get("element")).find(".field-list>li");

    elements.each(function (index, element) {
      var foundMatch = !filterText || Ember.get(fields, `${index}.column.headerTitle`).match(filterRegex);
      Ember.$(element)[foundMatch ? "show" : "hide"]();
    });
  }),

  _facetConditionsObserver: Ember.observer("tableDefinition.facetConditions", function () {
    var facetConditions = Ember.$.extend({}, this.get("tableDefinition.facetConditions"));
    this.set("tmpFacetConditions", facetConditions);
  }),

  actions: {
    applyFilters: function () {
      this.set("tableDefinition.facetConditions", this.get("tmpFacetConditions"));
    },
    clearFilters: function () {
      this.set("tableDefinition.facetConditions", null);
      Ember.$(this.get("element")).find(".facet-checkbox").attr("value", 0);
    },
    valueChanged: function (column, facetConditions) {
      this.set(`tmpFacetConditions.${column.id}`, facetConditions);
    }
  }
});
