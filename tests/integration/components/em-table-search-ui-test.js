import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table-search-ui', 'Integration | Component | em table search ui', {
  integration: true
});

test('Basic rendering test', function(assert) {
  this.render(hbs`{{em-table-search-ui}}`);

  assert.equal(this.$().text().trim(), 'Search');
});
