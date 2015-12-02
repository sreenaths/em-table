# Em-table

A simple table component for Ember 2.0.

Supports - Sorting, Searching, Pagination & Cell-level loading
For more info & examples please visit [em-table wiki].(https://github.com/sreenaths/em-table/wiki)

## Usage

* Add em-table as dependency in package.json
* npm install
* Add the table using `{{em-table columns=columns rows=rows}}`
** `columns` must be an ember array of column definitions (`import ColumnDef from 'em-table/utils/column-definition';`)
** `rows` an Ember array of Ember records

## Running demo app

* `ember server`
* Visit your app at http://localhost:4200.

Checkout the demo app to see a sample implementation. Its under tests/dummy/app.

## Dev Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
