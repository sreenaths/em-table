import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import TableDefinition from '../../../utils/table-definition';
import ColumnDefinition from '../../../utils/column-definition';

moduleForComponent('em-table', 'Integration | Component | em table', {
  integration: true
});

test('Basic rendering test', function(assert) {
  this.render(hbs`{{em-table}}`);

  assert.equal(this.$('.table-message').text().trim(), 'No columns available!');
});

test('Records missing test', function(assert) {
  var definition = TableDefinition.create({
    recordType: "vertex"
  });

  this.set("columns", [ColumnDefinition.fillerColumn]);

  this.render(hbs`{{em-table columns=columns}}`);
  assert.equal(this.$('.table-message').text().trim(), 'No records available!');

  this.set("definition", definition);
  this.render(hbs`{{em-table columns=columns definition=definition}}`);
  assert.equal(this.$('.table-message').text().trim(), 'No vertices available!');
});
