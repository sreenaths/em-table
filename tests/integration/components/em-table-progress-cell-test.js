import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table-progress-cell', 'Integration | Component | em table progress cell', {
  integration: true
});

test('Basic creation test', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{em-table-progress-cell content=0.5}}`);

  assert.equal(this.$().text().trim(), '50%');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#em-table-progress-cell content=0.5}}
      template block text
    {{/em-table-progress-cell}}
  `);

  assert.equal(this.$().text().trim(), '50%');
});
