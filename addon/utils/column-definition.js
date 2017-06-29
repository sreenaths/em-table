import Ember from 'ember';

import facetTypes from './facet-types';

function getContentAtPath(row) {
  var contentPath = this.get('contentPath');

  if(contentPath) {
    return Ember.get(row, contentPath);
  }
  else {
    throw new Error("contentPath not set!");
  }
}

function returnEmptyString() {
  return "";
}

var ColumnDefinition = Ember.Object.extend({
  id: "",
  headerTitle: "Not Available!",

  cellComponentName: null,

  enableSearch: true,
  enableSort: true,
  enableColumnResize: true,

  minWidth: "150px",

  contentPath: null,
  observePath: false,

  cellDefinition: null,

  pin: "center",

  facetType: facetTypes.VALUES,

  beforeSort: null,
  getCellContent: getContentAtPath,
  getSearchValue: getContentAtPath,
  getSortValue: getContentAtPath,

  init: function () {
    if(!this.get("id")) {
      throw new Error("ID is not set.");
    }
  },
});

ColumnDefinition.make = function (rawDefinition) {
  if(Array.isArray(rawDefinition)) {
    return rawDefinition.map(function (def) {
      return ColumnDefinition.create(def);
    });
  }
  else if(typeof rawDefinition === 'object') {
    return ColumnDefinition.create(rawDefinition);
  }
  else {
    throw new Error("rawDefinition must be an Array or an Object.");
  }
};

ColumnDefinition.makeFromModel = function (ModelClass, columnOptions) {
  var attributes = Ember.get(ModelClass, 'attributes'),
      columns = [];
  if(attributes) {
    attributes.forEach(function (meta, name) {
      var column = Ember.Object.create({
        id: name,
        headerTitle: name.capitalize(),
        contentPath: name,
      });

      if(columnOptions) {
        column.setProperties(columnOptions);
      }

      columns.push(column);
    });

    return ColumnDefinition.make(columns);
  }
  else {
    throw new Error("Value passed is not a model class");
  }
};

ColumnDefinition.fillerColumn = ColumnDefinition.create({
  id: "fillerColumn",
  headerTitle: "",
  getCellContent: returnEmptyString,
  getSearchValue: returnEmptyString,
  getSortValue: returnEmptyString,

  enableSearch: false,
  enableSort: false,
  enableColumnResize: false,
});

export default ColumnDefinition;
