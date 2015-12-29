import Ember from 'ember';

import DataProcessor from '../../../utils/data-processor';
import TableDefinition from '../../../utils/table-definition';

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-table-pagination-ui', 'Integration | Component | em table pagination ui', {
  integration: true
});

test('Basic rendering test', function(assert) {
  var customRowCount = 25,
      definition = TableDefinition.create({
        rowCount: customRowCount
      }),
      processor;

  Ember.run(function () {
    processor = DataProcessor.create({
      tableDefinition: definition,
      rows: Ember.A([Ember.Object.create()])
    });
  });

  this.set('definition', definition);
  this.set('processor', processor);
  this.render(hbs`{{em-table-pagination-ui tableDefinition=definition dataProcessor=processor}}`);

  var paginationItems = this.$('li');
  assert.equal(paginationItems.length, 3);
  assert.equal($(paginationItems[0]).text().trim(), "First");
  assert.equal($(paginationItems[1]).text().trim(), "1");
  assert.equal($(paginationItems[2]).text().trim(), "Last - 1");

  var rowSelection = this.$('select')[0];
  assert.ok(rowSelection);
  assert.equal($(rowSelection).val(), customRowCount);
});
