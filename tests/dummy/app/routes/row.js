import Ember from 'ember';

export default Ember.Route.extend({
  params: null,

  model: function(params) {
    this.set('params', params);
  },

  setupController: function(controller, model) {
    controller.set('params', this.get('params'));
    this._super(controller, model);
  }
});
