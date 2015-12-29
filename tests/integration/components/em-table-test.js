import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table', 'Integration | Component | em table', {
  integration: true
});

test('Basic rendering test', function(assert) {
  this.render(hbs`{{em-table}}`);

  assert.equal(this.$('.data-availability-message').text().trim(), 'No columns available!');
});
