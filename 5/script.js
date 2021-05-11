function organizeByTag(toDos) {
  var tags = new Map();
  toDos.forEach(function (task) {
    task.tags.forEach(function (tag) {
      if (!tags.has(tag)) tags.set(tag, []);
      tags.get(tag).push(task.description);
    });
  });
  return tags;
}

function main(toDoObjects) {
  "use strict";

  var toDos = toDoObjects.map(function (toDo) {
    return toDo.description;
  });

  function addTask(task) {}

  $(".tabs a span")
    .toArray()
    .forEach(function (element) {
      $(element).on("click", function () {
        var $element = $(element);
        var $content = $("#content");
        $(".tabs a span").removeClass("active");
        $element.addClass("active");
        $("main .content").empty();
        if ($element.parent().is(":nth-child(1)")) {
          for (var i = toDos.length - 1; i > -1; i--) {
            $content.append($("<li>").text(toDos[i]));
          }
          console.log("Щелчок на первой вкладке!");
        } else if ($element.parent().is(":nth-child(2)")) {
          $content = $("<ul>");
          toDos.forEach(function (todo) {
            $content.append($("<li>").text(todo));
          });
          $("main .content").append($content);
          console.log("Щелчок на второй вкладке!");
        } else if ($element.parent().is(":nth-child(3)")) {
          console.log("Щелчок на вкладке Теги");
          var organizedByTag = organizeByTag(toDoObjects);
          for (var tag of organizedByTag.keys()) {
            var $tagName = $("<h3>").text(tag),
              $content = $("<ul>");
            organizedByTag.get(tag).forEach(function (description) {
              var $li = $("<li>").text(description);
              $content.append($li);
            });
            $("main .content").append($tagName);
            $("main .content").append($content);
          }
        } else {
          $content = $("<div>");
          var $input = $("<input>");
          var $tagInput = $("<input>");
          var $button = $("<button>");
          $button.text("+");
          var addTask = function () {
            var tags = $tagInput.val().split(",");
            toDoObjects.push({
              description: $input.val(),
              tags: tags,
            });
            toDos = toDoObjects.map(function (toDo) {
              return toDo.description;
            });
            $input.val("");
            $tagInput.val("");
            $(".tabs a:first-child span").trigger("click");
          };
          $button.on("click", addTask);
          $tagInput.on("keypress", function (e) {
            if (e.which == 13) {
              addTask();
            }
          });
          $content.append($input);
          $content.append($tagInput);
          $content.append($button);
          $("main .content").append($content);
          console.log("Щелчок на третьей вкладке!");
        }
      });
    });

  $(".tabs a:first-child span").trigger("click");
}

$(document).ready(function () {
  $.getJSON("tasks.json", function (toDoObjects) {
    // вызов функции main с аргументом в виде объекта toDoObjects
    console.log(toDoObjects);
    main(toDoObjects);
  });
});
