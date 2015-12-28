import TableDefinition from '../../../utils/table-definition';
import { module, test } from 'qunit';

module('Unit | Utility | table definition');

test('Class creation test', function(assert) {
  assert.ok(TableDefinition);
});

test('Default instance test', function(assert) {
  var definition = TableDefinition.create();

  assert.ok(definition);

  assert.equal(definition.pageNum, 1);
  assert.equal(definition.rowCount, 10);
  assert.equal(definition.minRowsForFooter, 25);
});

test('Page-num reset test', function(assert) {
  var definition = TableDefinition.create();

  assert.equal(definition.pageNum, 1);

  definition.set("pageNum", 5);
  assert.equal(definition.pageNum, 5);

  definition.set("searchText", "x");
  assert.equal(definition.pageNum, 1);

  definition.set("pageNum", 5);
  definition.set("rowCount", 5);
  assert.equal(definition.pageNum, 1);
});
