import Ember from 'ember';
import layout from '../templates/components/em-table-progress-cell';

export default Ember.Component.extend({
  layout: layout,

  content: null,

  message: Ember.computed("content", function () {
    var content = this.get("content");

    if(content === undefined || content === null) {
      return "Not Available!";
    }
    else if(isNaN(parseFloat(content))){
      return "Invalid Data!";
    }
  }),

  _definition: Ember.computed("definition", function () {
    return Ember.Object.extend({
      valueMin: 0,
      valueMax: 1,
      striped: true,
      style: null
    }).create(this.get("definition"));
  })
});
