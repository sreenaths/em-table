# Em-table

A simple table addon for Ember 1.13.11 and higher.

Supports - Sorting, Searching, Pagination & Cell-level loading.

For more info & examples please visit [em-table wiki](https://github.com/sreenaths/em-table/wiki).

## Installation

`npm install --save em-table`

## Usage

* Table can now be added into your template using em-table tag. For example `{{em-table columns=columns rows=rows}}`.
  * **columns** - Must be an Ember.Array of column definitions
  * **Importing column definition** - `import ColumnDefinition from 'em-table/utils/column-definition';`
  * **rows** -  An Ember.Array of Ember.Object(s)
* Checkout the demo app to see a sample implementation. Its under `tests/dummy/app`.

## Prerequisites
* node.js
* ember v1.13.11 or above
* ember-cli v1.13.11 or above

## Running UTs
* `npm run test`

## Running demo app

* `ember server`
* Visit your app at http://localhost:4200.
