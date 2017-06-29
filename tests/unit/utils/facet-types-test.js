import facetTypes from '../../../utils/facet-types';
import { module, test } from 'qunit';

module('Unit | Utility | facet types');

test('Basic creation test', function(assert) {
  assert.ok(facetTypes);

  assert.ok(facetTypes.VALUES);
});
