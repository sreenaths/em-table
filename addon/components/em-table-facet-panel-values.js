import Ember from 'ember';
import layout from '../templates/components/em-table-facet-panel-values';

const LIST_LIMIT = 7;

export default Ember.Component.extend({
  layout: layout,

  data: null,
  checkedCount: null,

  tableDefinition: null,
  dataProcessor: null,

  tmpFacetConditions: null,

  hideValues: true,
  limitList: true,

  classNames: ['em-table-facet-panel-values'],
  classNameBindings: ['hideValues', 'limitList', 'hideFilter', 'hideMoreLess', 'hideSelectAll'],

  filterText: null,
  isVisible: Ember.computed("data.facets.length", "tableDefinition.minValuesToDisplay", function () {
    return this.get("data.facets.length") >= this.get("tableDefinition.minValuesToDisplay");
  }),
  hideFilter: Ember.computed("allFacets.length", function () {
    return this.get("allFacets.length") < LIST_LIMIT;
  }),
  hideMoreLess: Ember.computed("filteredFacets.length", function () {
    return this.get("filteredFacets.length") < LIST_LIMIT;
  }),
  hideSelectAll: Ember.computed("fieldFacetConditions", "checkedCount", "data.facets", function () {
    return this.get("fieldFacetConditions.in.length") === this.get("data.facets.length");
  }),

  fieldFacetConditions: Ember.computed("tmpFacetConditions", "data.column.id", function () {
    var columnID = this.get("data.column.id"),
        conditions = this.get(`tmpFacetConditions.${columnID}`),
        facets = this.get("data.facets") || [];

    if(!conditions) {
      conditions = {
        in: facets.map(facet => facet.value)
      };
      this.set(`tmpFacetConditions.${columnID}`, conditions);
    }

    return conditions;
  }),

  allFacets: Ember.computed("data.facets", "fieldFacetConditions", function () {
    var facets = this.get("data.facets") || [],

        checkedValues = this.get("fieldFacetConditions.in"),
        selectionHash = {};

    if(checkedValues) {
      checkedValues.forEach(function (valueText) {
        selectionHash[valueText] = 1;
      });
    }

    return Ember.A(facets.map(function (facet) {
      facet = Ember.Object.create(facet);
      facet.set("checked", selectionHash[facet.value]);

      if(!facet.get("displayText")) {
        facet.set("displayText", facet.get("value"));
      }

      return facet;
    }));
  }),

  filteredFacets: Ember.computed("allFacets", "filterText", function () {
    var allFacets = this.get("allFacets"),
        filterText = this.get("filterText"),
        filteredFacets;

    if(filterText) {
      filteredFacets = allFacets.filter(function (facet) {
        return facet.get("value").match(filterText);
      });
    }
    else {
      filteredFacets = allFacets;
    }

    return filteredFacets;
  }),

  actions: {
    toggleValueDisplay: function () {
      this.toggleProperty("hideValues");
      this.get("parentView").sendAction("toggleValuesDisplayAction", !this.get("hideValues"), this.get("data"));
    },
    toggleListLimit: function () {
      this.toggleProperty("limitList");
    },
    clickedCheckbox: function (facet) {
      var checkedValues = this.get("fieldFacetConditions.in"),
          value = facet.get("value"),
          valueIndex = checkedValues.indexOf(value);

      facet.toggleProperty("checked");

      if(facet.get("checked")) {
        if(valueIndex === -1) {
          checkedValues.push(value);
        }
      }
      else if(valueIndex !== -1) {
        checkedValues.splice(valueIndex, 1);
      }

      this.set("checkedCount", checkedValues.length);
    },

    selectAll: function () {
      var filteredFacets = this.get("filteredFacets"),
          checkedValues = this.get("fieldFacetConditions.in");

      filteredFacets.forEach(function (facet) {
        if(!facet.get("checked")) {
          checkedValues.push(facet.get("value"));
        }

        facet.set("checked", true);
      });

      this.set("fieldFacetConditions.in", checkedValues);
      this.set("checkedCount", checkedValues.length);
    },
    clickedOnly: function (facet) {
      var allFacets = this.get("allFacets"),
          checkedValues = [];

      allFacets.forEach(function (facet) {
        facet.set("checked", false);
      });

      facet.set("checked", true);
      checkedValues.push(facet.get("value"));

      this.set("fieldFacetConditions.in", checkedValues);
      this.set("checkedCount", checkedValues.length);
    }
  }

});
