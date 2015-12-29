import Ember from 'ember';

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import ColumnDefinition from '../../../utils/column-definition';

moduleForComponent('em-table-cell', 'Integration | Component | em table cell', {
  integration: true
});

test('Basic rendering test', function(assert) {
  var columnDefinition = ColumnDefinition.create({
        id: 'id',
        contentPath: 'keyA'
      }),
      row = Ember.Object.create({
        keyA: 'valueA',
        keyB: 'valueB'
      });

  this.set('columnDefinition', columnDefinition);
  this.set('row', row);
  this.render(hbs`{{em-table-cell columnDefinition=columnDefinition row=row}}`);

  assert.equal(this.$().text().trim(), 'valueA');
});
