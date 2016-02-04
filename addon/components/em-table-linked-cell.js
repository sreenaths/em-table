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
        var model,
            text = Ember.get(link, "text") || Ember.get(link, "displayText");

        if(text) {
          link = Ember.Object.create(link, {
            text: text
          });

          if(link.get("model") === undefined) {
            link.set("model", link.get("id"));
          }

          model = link.get("model");
          link.set("withModel", model !== undefined);

          return link;
        }
      });

      links = links.filter(function (link) {
        return link;
      });
    }

    return links;
  })
});
