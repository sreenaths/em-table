import Ember from 'ember';

var facetTypes = {
  VALUES: {
    componentName: "em-table-facet-panel-values",

    toClause: function (column, facetConditions) {
      var values, clauses = [];

      if(facetConditions) {
        if(Ember.get(facetConditions, "in.length")) {
          values = facetConditions.in.map(function (value) {
            return JSON.stringify(value);
          });
          clauses.push(`${column.id} IN (${values})`);
        }

        if(Ember.get(facetConditions, "notIn.length")) {
          values = facetConditions.notIn.map(function (value) {
            return JSON.stringify(value);
          });
          clauses.push(`${column.id} NOT IN (${values})`);
        }

        return clauses.join(" AND ");
      }
    },

    facetRows: function (column, rows) {
      var facetedDataHash = {},
          facetedDataArr = [];

      rows.forEach(function (row) {
        var value = column.getSearchValue(row);

        if(typeof value === "string") {
          if(!facetedDataHash[value]) {
            facetedDataHash[value] = {
              count: 0,
              value: value
            };
            facetedDataArr.push(facetedDataHash[value]);
          }
          facetedDataHash[value].count++;
        }

      });

      if(facetedDataArr.length) {
        facetedDataArr = facetedDataArr.sort(function (a, b) {
          return -(a.count - b.count); // Sort in reverse order
        });
        return facetedDataArr;
      }
    }
  },
};

export default facetTypes;
