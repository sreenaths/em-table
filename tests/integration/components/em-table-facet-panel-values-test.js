import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table-facet-panel-values', 'Integration | Component | em table facet panel values', {
  integration: true
});

test('Basic render test', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.set("tmpFacetConditions", {});
  this.render(hbs`{{em-table-facet-panel-values tmpFacetConditions=tmpFacetConditions}}`);

  assert.ok(this.$().text().trim());

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#em-table-facet-panel-values tmpFacetConditions=tmpFacetConditions}}
      template block text
    {{/em-table-facet-panel-values}}
  `);

  assert.ok(this.$().text().trim());
});
