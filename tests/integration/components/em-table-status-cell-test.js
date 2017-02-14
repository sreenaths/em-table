import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table-status-cell', 'Integration | Component | em table status cell', {
  integration: true
});

test('Basic creation test', function(assert) {

  this.render(hbs`{{em-table-status-cell}}`);

  assert.equal(this.$().text().trim(), 'Not Available!');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#em-table-status-cell}}
      template block text
    {{/em-table-status-cell}}
  `);

  assert.equal(this.$().text().trim(), 'Not Available!');
});
