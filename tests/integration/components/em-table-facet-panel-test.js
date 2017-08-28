import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table-facet-panel', 'Integration | Component | em table facet panel', {
  integration: true
});

test('Basic renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{em-table-facet-panel}}`);

  assert.equal(this.$().text().replace(/\n|\r\n|\r| /g, '').trim(), 'NotAvailable!');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#em-table-facet-panel}}
      template block text
    {{/em-table-facet-panel}}
  `);

  assert.equal(this.$().text().replace(/\n|\r\n|\r| /g, '').trim(), 'NotAvailable!');
});
