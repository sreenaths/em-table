import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table-column', 'Integration | Component | em table column', {
  integration: true
});

test('Basic rendering test', function(assert) {
  this.render(hbs`{{em-table-column}}`);

  assert.equal(this.$().text().trim(), '');
});
