import Ember from 'ember';
import layout from '../templates/components/em-table-progress-cell';

export default Ember.Component.extend({
  layout: layout,

  _definition: Ember.computed("definition", function () {
    return Ember.Object.extend({
      valueMin: 0,
      valueMax: 1,
      striped: true,
      style: null
    }).create(this.get("definition"));
  })
});
