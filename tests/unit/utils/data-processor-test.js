import Ember from 'ember';

import DataProcessor from '../../../utils/data-processor';
import { module, test } from 'qunit';

module('Unit | Utility | data processor');

test('Class creation test', function(assert) {
  assert.ok(DataProcessor);
});

test('Instance default test', function(assert) {
  var processor;

  Ember.run(function () {
    processor = DataProcessor.create({
      tableDefinition: Ember.Object.create(),
      startSearch: function () {
        // Test Search
      },
      startSort: function () {
        // Test Sort
      }
    });
  });

  assert.ok(processor);
  assert.equal(processor.get('isSorting'), false);
  assert.equal(processor.get('isSearching'), false);

  assert.ok(processor._searchObserver);
  assert.ok(processor._sortObserver);
  assert.ok(processor.startSearch);
  assert.ok(processor.startSort);
  assert.ok(processor.compareFunction);
  assert.ok(processor.totalPages);
  assert.ok(processor.processedRows);
});

test('compareFunction test', function(assert) {
  var processor;

  Ember.run(function () {
    processor = DataProcessor.create({
      tableDefinition: Ember.Object.create(),
      startSearch: function () {},
      startSort: function () {}
    });
  });

  assert.equal(processor.compareFunction(1, 1), 0);
  assert.equal(processor.compareFunction(1, 2), -1);
  assert.equal(processor.compareFunction(2, 1), 1);

  assert.equal(processor.compareFunction("a", "a"), 0);
  assert.equal(processor.compareFunction("a", "b"), -1);
  assert.equal(processor.compareFunction("b", "a"), 1);

  assert.equal(processor.compareFunction(null, null), -1);
  assert.equal(processor.compareFunction(1, null), 1);
  assert.equal(processor.compareFunction(null, 2), -1);
  assert.equal(processor.compareFunction("a", null), 1);
  assert.equal(processor.compareFunction(null, "b"), -1);

  assert.equal(processor.compareFunction(undefined, undefined), -1);
  assert.equal(processor.compareFunction(1, undefined), 1);
  assert.equal(processor.compareFunction(undefined, 2), -1);
  assert.equal(processor.compareFunction("a", undefined), 1);
  assert.equal(processor.compareFunction(undefined, "b"), -1);
});