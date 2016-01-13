import Ember from 'ember';
import layout from '../templates/components/em-table-linked-cell';

export default Ember.Component.extend({
  layout: layout,

  definition: null,
  content: null,

  normalizedLinks: Ember.computed("content", function () {
    var content = this.get("content"),
        links;

    if(content) {
      if(!Array.isArray(content)) {
        content = [content];
      }

      links = content.map(function (link) {
        var model;

        link = Ember.Object.create(link);

        if(!link.get("text")) {
          link.set("text", link.get("displayText") || link.get("routeName") || link.get("href"));
        }
        if(link.get("model") === undefined) {
          link.set("model", link.get("id"));
        }

        model = link.get("model");
        link.set("withModel", model !== undefined);

        return link;
      });
    }

    return links;
  })
});
