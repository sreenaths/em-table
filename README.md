# Em-table

A simple table component for Ember 1.13.11 and higher.

Supports - Sorting, Searching, Pagination & Cell-level loading
For more info & examples please visit [em-table wiki](https://github.com/sreenaths/em-table/wiki).

## Usage

* Add `em-table` as dependency in your project's package.json
* npm install
* Add the table using `{{em-table columns=columns rows=rows}}`
  * **columns** - Must be an Ember.Array of column definitions ( `import ColumnDef from 'em-table/utils/column-definition';` )
  * **rows** -  An Ember.Array of Ember.Object(s)

* Checkout the demo app to see a sample implementation. Its under `tests/dummy/app`.

## Running demo app

* `ember server`
* Visit your app at http://localhost:4200.

## Dev Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`
