import Ember from 'ember';
import layout from '../templates/components/em-table-search-ui';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['search-view'],

  text: '',
  _boundText: function () {
    return this.get('text') || '';
  }.property(),

  _validRegEx: function () {
    var regExText = this.get('_boundText');
    regExText = regExText.substr(regExText.indexOf(':') + 1);
    try {
      new RegExp(regExText, 'im');
    }
    catch(e) {
      return false;
    }
    return true;
  }.property('_boundText'),

  actions: {
    search: function () {
      if(this.get('_validRegEx')) {
        this.get('parentView').send('search', this.get('_boundText'));
      }
    }
  }
});
