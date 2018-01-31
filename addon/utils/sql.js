/*global alasql*/

import Ember from 'ember';

/*
 * A wrapper around AlaSQL
 */
export default Ember.Object.extend({

  constructQuery: function(clause) {
    return `SELECT * FROM ? WHERE ${clause}`;
  },

  validateClause: function (clause, columns) {
    clause = clause.toString();

    var query = this.constructQuery(this.normaliseClause(clause, columns || [])),
        valid = false;

    if(clause.match(/\W/g)) { // If it contain special characters including space
      try {
        alasql(query, [[{}]]);
        valid = true;
      }
      catch(e) {}
    }

    return valid;
  },

  createFacetClause: function (conditions, columns) {
    if(conditions && columns) {
      return columns.map(function (column) {
        if(column.get("facetType")) {
          return column.get("facetType.toClause")(column, conditions[Ember.get(column, "id")]);
        }
      }).filter(clause => clause).join(" AND ");
    }
  },

  normaliseClause: function (clause, columns) {
    clause = clause.toString();
    columns.forEach(function (column) {
      var headerTitle = column.get("headerTitle");
      clause = clause.replace(new RegExp(`"${headerTitle}"`, "gi"), column.get("id"));
    });
    return clause;
  },

  search: function (clause, rows, columns) {
    clause = this.normaliseClause(clause, columns);

    // Convert into a form that alasql can digest easily
    var dataSet = rows.map(function (row, index) {
      var rowObj = {
        _index_: index
      };

      columns.forEach(function (column) {
        if(column.get("enableSearch") && row) {
          rowObj[column.get("id")] = column.getSearchValue(row);
        }
      });

      return rowObj;
    });

    // Search
    dataSet = alasql(this.constructQuery(clause), [dataSet]);

    return dataSet.map(function (data) {
      return rows[data._index_];
    });
  }

});
