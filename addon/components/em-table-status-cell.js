import Ember from 'ember';
import layout from '../templates/components/em-table-status-cell';

export default Ember.Component.extend({
  layout: layout,

  content: null,

  classNames: ["em-table-status-cell"],

  statusName: Ember.computed("content", function () {
    var status = this.get("content");

    if(status) {
      status = status.toString().dasherize();
      status = "status-" + status;
    }
    return status;
  }),
});