import Ember from 'ember';
import layout from '../templates/components/em-table-facet-panel-values';

const MIN_VALUES_FOR_FILTER = 7;
const MAX_DISPLAYED_VALUES = 100;

export default Ember.Component.extend({
  layout: layout,

  data: null,

  tableDefinition: null,
  dataProcessor: null,

  hideValues: true,
  moreClicked: false,
  showMore: false,

  classNames: ['em-table-facet-panel-values'],
  classNameBindings: ['hideValues'],

  filterText: null,
  enableFilter: Ember.computed("data.facets.length", function () {
    return this.get("data.facets.length") >= MIN_VALUES_FOR_FILTER;
  }),

  _laterTimer: null,
  didInsertElement: function () {
    this.set("_laterTimer", Ember.run.later(this, function () {
      this._filterObserver();
      this._facetConditionsObserver();
    }));
  },

  willDestroyElement: function () {
    Ember.run.cancel(this.get("_laterTimer"));
  },

  _filterObserver: Ember.observer("filterText", "data.facets", "moreClicked", function () {
    var facets = this.get("data.facets"),
        filterText = this.get("filterText"),
        filterRegex = new RegExp(filterText, "i"),
        limit = this.get("moreClicked") ? MAX_DISPLAYED_VALUES : MIN_VALUES_FOR_FILTER,
        elements = Ember.$(this.get("element")).find(".value-list>li"),
        matchCount = 0;

    elements.each(function (index, element) {
      var foundMatch = !filterText || facets[index].value.match(filterRegex);

      if(foundMatch) {
        matchCount++;
      }

      Ember.$(element)[(foundMatch && matchCount <= limit) ? "show" : "hide"]();
    });

    this.set("showMore", matchCount >= MIN_VALUES_FOR_FILTER);
  }),

  checkboxes: Ember.computed(function () {
    return Ember.$(this.get("element")).find(".value-list>li .facet-checkbox");
  }),

  // To over wright UI facet selections based on values in tableDefinition.facetConditions
  _facetConditionsObserver: Ember.observer("tableDefinition.facetConditions", "data", function () {
    var columnID = this.get("data.column.id"),
        facets = this.get("data.facets"),
        facetConditions = this.get(`tableDefinition.facetConditions.${columnID}`),
        selectionHash = {};

    if(facetConditions) {
      if(facetConditions.in) {
        facetConditions.in.forEach(function (valueText) {
          selectionHash[valueText] = 1;
        });
      }
      if(facetConditions.notIn) {
        facetConditions.notIn.forEach(function (valueText) {
          selectionHash[valueText] = 2;
        });
      }

      this.get("checkboxes").each(function (index, element) {
        var valueText = facets[index].value;
        Ember.$(element).attr("value", selectionHash[valueText] || 0);
      });
    }
  }),

  _getFacetConditions: function () {
    var facets = this.get("data.facets"),
        inValues = [],
        notInValues = [];

    this.get("checkboxes").each(function (index, element) {
      switch(Ember.$(element).attr("value")) {
        case "1":
          inValues.push(facets[index].value);
        break;
        case "2":
          notInValues.push(facets[index].value);
        break;
      }
    });

    return {
      in: inValues,
      notIn: notInValues
    };
  },

  actions: {
    toggleValueDisplay: function () {
      this.toggleProperty("hideValues");
    },
    toggleMore: function () {
      this.toggleProperty("moreClicked");
    },
    clickedCheckbox: function (index) {
      var element = Ember.$(this.get("element")).find(`#check-${index}`),
          value = (parseInt(element.attr("value") || "0") + 1) % 3,
          column = this.get("data.column");

      element.attr("value", value);

      this.sendAction("valueChanged", column, this._getFacetConditions());
    }
  }

});
