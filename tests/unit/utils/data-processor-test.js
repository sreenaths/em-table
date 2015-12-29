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
});
