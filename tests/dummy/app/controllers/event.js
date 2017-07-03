import Ember from 'ember';

import ColumnDefinition from 'em-table/utils/column-definition';
import TableDef from 'em-table/utils/table-definition';

export default Ember.Controller.extend({

  customTableDefinition: TableDef.create({
    enableFaceting: true,
  }),

  columns1: ColumnDefinition.make([{
    id: 'name',
    headerTitle: 'Event Name (Faceting disabled)',
    contentPath: 'name',
    cellComponentName: 'em-table-linked-cell',
    getCellContent: function (row) {
      return {
        routeName: "row",
        model: row.get("entityID"),
        text: row.get("name")
      };
    },
    facetType: null,
    pin: "left"
  },{
    id: 'entityID',
    headerTitle: 'Id',
    contentPath: 'entityID',
    classNames: ["red-top-border", "green-right-border"],
    pin: "left",
  },{
    id: 'submitter',
    headerTitle: 'Submitter',
    contentPath: 'submitter'
  },{
    id: 'status',
    headerTitle: 'Status',
    contentPath: 'status',
    cellComponentName: 'em-table-status-cell',
    observePath: true
  },{
    id: 'progress',
    headerTitle: 'Progress',
    contentPath: 'progress',
    cellComponentName: 'em-table-progress-cell',
    observePath: true
  },{
    id: 'startTime',
    headerTitle: 'Start Time',
    contentPath: 'startTime',
    cellDefinition: {
      type: 'date'
    }
  },{
    id: 'endTime',
    headerTitle: 'End Time',
    contentPath: 'endTime',
    cellDefinition: {
      type: 'date'
    }
  },{
    id: 'duration',
    headerTitle: 'Duration',
    contentPath: 'duration',
    cellDefinition: {
      type: 'duration'
    }
  },{
    id: 'queue',
    headerTitle: 'Queue',
    contentPath: 'queue'
  },{
    id: 'callerID',
    headerTitle: 'Caller ID',
    contentPath: 'callerID'
  },{
    id: 'link',
    headerTitle: 'Link',
    contentPath: 'link',
    cellComponentName: "em-table-linked-cell",
    cellDefinition: {
      target: "_blank"
    },
    pin: "right"
  }]),

  columns2: Ember.computed(function () {
    var columns = this.get("columns1").slice();
    columns.splice(10, 1);
    return columns;
  }),

  columns3: Ember.computed(function () {
    var columns = this.get("columns1").slice();
    columns.splice(0, 2);
    return columns;
  }),

  columns4: Ember.computed(function () {
    var columns = this.get("columns1").slice();
    columns.splice(2, 8);
    return columns;
  }),

  columns5: Ember.computed(function () {
    var columns = this.get("columns1").slice();
    columns.splice(2, 9);
    return columns;
  }),

  columns6: Ember.computed(function () {
    var columns = this.get("columns1").slice();
    columns.splice(0, 10);
    return columns;
  }),

  columns7: Ember.computed(function () {
    var columns = this.get("columns1").slice();
    columns[3].pin = "left";
    columns[4].pin = "right";
    return columns;
  }),

  rows: Ember.computed(function () {
    var rows = [];

    function getRandNum(length) {
      return Math.floor(Math.random() * Math.pow(10, length));
    }

    var Record = Ember.Object.extend({
      endTime: Ember.computed("startTime", function () {
        return this.get("startTime") + Math.random() * 100000;
      }),
      duration: Ember.computed("startTime", "endTime", function () {
        return this.get("endTime") - this.get("startTime");
      }),
    });

    for(var i = 0; i < 100; i++) {
      var record = Record.create({
        entityID: "id_" + getRandNum(1),
        name: "name " + getRandNum(5),
        submitter: "submitter_" + getRandNum(1),

        status: "status" + getRandNum(1),
        progress: Math.random(),
        startTime: getRandNum(10),

        queue: "caller_" + getRandNum(1) % 2,
        callerID: "caller_" + getRandNum(1),
        link: {
          text: "google.com",
          href: "http://google.com"
        },
      });

      rows.push(record);
    }
    return rows;
  })

});
