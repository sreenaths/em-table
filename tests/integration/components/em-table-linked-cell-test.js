import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table-linked-cell', 'Integration | Component | em table linked cell', {
  integration: true
});

test('Basic rendering test', function(assert) {
  this.render(hbs`{{em-table-linked-cell}}`);

  assert.equal(this.$().text().trim(), 'Not Available!');
});
