import Ember from 'ember';

function getContentAtPath(row) {
  var contentPath = this.get('contentPath');

  if(contentPath) {
    return row.get(contentPath);
  }
  else {
    throw new Error("contentPath not set!");
  }
}

var ColumnDefinition = Ember.Object.extend({
  id: "",
  headerTitle: "Not Available!",

  cellComponentName: null,

  enableSearch: true,
  enableSort: true,
  enableColumnResize: true,

  contentPath: null,
  observePath: false,

  onSort: null,
  getCellContent: getContentAtPath,
  getSearchValue: getContentAtPath,
  getSortValue: getContentAtPath,

  init: function () {
    if(!this.get("id")) {
      throw new Error("ID is not set.");
    }
  }
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

export default ColumnDefinition;
