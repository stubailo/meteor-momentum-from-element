if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("popupOpen", false);

  Template.body.helpers({
    popupOpen: function () {
      return Session.get("popupOpen");
    }
  });

  Template.body.events({
    'click .open-popup': function () {
      Session.set("popupOpen", ! Session.get("popupOpen"));
    },
    'click .close': function () {
      Session.set("popupOpen", false);
    }
  });

  Momentum.registerPlugin('from-element', function (options) {
    return {
      insertElement: function(node, next) {
        var $node = $(node);
        var $from = $(options.from);

        $node.insertBefore(next);

        var $overlay = $("<div>");
        $overlay.html($from.html());
        $overlay.attr("class", $from.attr("class"));
        $overlay.css({
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          position: "absolute",
          boxSizing: "border-box",
          opacity: 1
        });
        $node.append($overlay);

        var dest = {
          height: $node.height(),
          width: $node.width(),
          left: $node.css("left"),
          top: $node.css("top"),
          padding: $node.css("padding"),
          marginTop: $node.css("marginTop"),
          marginLeft: $node.css("marginLeft")
        };

        $node.css({
          height: $from.outerHeight(),
          width: $from.outerWidth(),
          left: $from.offset().left,
          top: $from.offset().top,
          padding: 0,
          margin: 0
        });

        $node.velocity(dest, {
          complete: function () {
            $node.css({
              height: "",
              width: "",
              left: "",
              top: "",
              padding: "",
              margin: ""
            });

            $overlay.remove();
          }
        });

        $overlay.velocity({
          opacity: 0
        });
      },
      removeElement: function(node) {
        var $node = $(node);
        var $from = $(options.from);

        $from.css({
          opacity: 0
        });

        var $overlay = $("<div>");
        $overlay.html($from.html());
        $overlay.attr("class", $from.attr("class"));
        $overlay.css({
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          position: "absolute",
          opacity: 0,
          boxSizing: "border-box"
        });
        $node.append($overlay);

        var dest = {
          height: $from.outerHeight(),
          width: $from.outerWidth(),
          left: $from.offset().left,
          top: $from.offset().top,
          padding: 0,
          marginTop: 0,
          marginLeft: 0
        };

        $node.velocity(dest, {
          complete: function () {
            $node.remove();
            $from.css({
              opacity: ""
            });
          }
        });

        $overlay.velocity({
          opacity: 1
        });
      }
    };
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
