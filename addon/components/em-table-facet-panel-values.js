import Ember from 'ember';
import layout from '../templates/components/em-table-facet-panel-values';

const LIST_LIMIT = 7;

export default Ember.Component.extend({
  layout: layout,

  data: null,

  tableDefinition: null,
  dataProcessor: null,

  hideValues: true,
  limitList: true,

  classNames: ['em-table-facet-panel-values'],
  classNameBindings: ['hideValues', 'limitList', 'hideFilter', 'hideMoreLess'],

  filterText: null,
  hideFilter: Ember.computed("allFacets.length", function () {
    return this.get("allFacets.length") < LIST_LIMIT;
  }),
  hideMoreLess: Ember.computed("filteredFacets.length", function () {
    return this.get("filteredFacets.length") < LIST_LIMIT;
  }),

  getSelectionHash: function (facetConditions) {
    var selectionHash = {};

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
    }

    return selectionHash;
  },

  allFacets: Ember.computed("data.facets", "tableDefinition.facetConditions", "data.column.id", function () {
    var facets = this.get("data.facets"),

        columnID = this.get("data.column.id"),
        facetConditions = this.get(`tableDefinition.facetConditions.${columnID}`),
        selectionHash = this.getSelectionHash(facetConditions);

    return Ember.A(facets.map(function (facet) {
      facet = Ember.Object.create(facet);
      facet.set("selection", selectionHash[facet.value]);
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

  _getFacetConditions: function () {
    var facets = this.get("allFacets"),
        inValues = [],
        notInValues = [];

    facets.forEach(function (facet) {
      switch(facet.get("selection")) {
        case 1:
          inValues.push(facet.value);
        break;
        case 2:
          notInValues.push(facet.value);
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
    toggleListLimit: function () {
      this.toggleProperty("limitList");
    },
    clickedCheckbox: function (facet) {
      var value = facet.get("selection") || 0,
          column = this.get("data.column");

      value = (value + 1) % 3;
      facet.set("selection", value);

      this.sendAction("valueChanged", column, this._getFacetConditions());
    }
  }

});
