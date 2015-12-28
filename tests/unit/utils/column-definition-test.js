import Ember from 'ember';
import ColumnDefinition from '../../../utils/column-definition';
import { module, test } from 'qunit';

module('Unit | Utility | column definition');

test('Class creation test', function(assert) {
  assert.ok(ColumnDefinition);

  assert.ok(ColumnDefinition.make);
});

test('make - Instance creation test', function(assert) {

  var definition = ColumnDefinition.make({
    id: "testId"
  });
  var definitions = ColumnDefinition.make([{
    id: "testId 1"
  },{
    id: "testId 2"
  }]);

  // Single
  assert.ok(definition);

  // Multiple
  assert.ok(definitions);
  assert.ok(Array.isArray(definitions));
  assert.equal(definitions.length, 2);
});

test('make - Instance creation failure test', function(assert) {
  assert.throws(function () {
    ColumnDefinition.make({});
  });
});

test('Instance test', function(assert) {
  var definition = ColumnDefinition.make({
    id: "testId",
    contentPath: "a.b"
  });
  var data = Ember.Object.create({
    a: {
      b: 42
    }
  });

  assert.ok(definition.getCellContent);
  assert.ok(definition.getSearchValue);
  assert.ok(definition.getSortValue);

  assert.equal(definition.id, "testId");
  assert.equal(definition.headerTitle, "Not Available!");
  assert.equal(definition.contentPath, "a.b");

  assert.equal(definition.getCellContent(data), 42);
  assert.equal(definition.getSearchValue(data), 42);
  assert.equal(definition.getSortValue(data), 42);
});
