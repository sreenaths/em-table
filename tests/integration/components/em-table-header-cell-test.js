import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table-header-cell', 'Integration | Component | em table header cell', {
  integration: true
});

test('Basic rendering test', function(assert) {
  this.render(hbs`{{em-table-header-cell}}`);

  assert.equal(this.$().text().trim(), '');
});
