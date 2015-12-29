import DS from 'ember-data';

export default DS.Model.extend({
  attr1: DS.attr("string"),
  attr2: DS.attr("string"),
  attr3: DS.attr("string")
});
