import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('landing', {path: '/'});
  this.route('row', {path: '/row/:row_id'});
  this.route('event');
});

export default Router;
