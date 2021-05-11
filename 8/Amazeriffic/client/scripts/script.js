var main = function(toDosObj){
  var tabs = [];


tabs.push({
      "name": "Новые",
      "content": function (callback) {
          $.getJSON("toDosTags.json", function (toDoObjects) {
              var $content,
                  i;
              $content = $("<ul>");
              for (i = toDoObjects.length - 1; i >= 0; i--) {
                  var $todoListItem = liaWithDeleteOnClick(toDoObjects[i]);
                  $content.append($todoListItem);
              }
              callback(null, $content);
          }).fail(function (jqXHR, textStatus, error) {
              callback(error, null);
          });
      }
  });
    
  tabs.push({
      "name": "Старые",
      "content": function (callback) {
          $.getJSON("toDosTags.json", function (toDoObjects) {
              var $content,
                  i;
              $content = $("<ul>");
              for (i = 0; i <= toDoObjects.length - 1; i++) {
                  var $todoListItem = liaWithDeleteOnClick(toDoObjects[i]);
                  $content.append($todoListItem);
              }
              callback(null, $content);
          }).fail(function (jqXHR, textStatus, error) {
              callback(error, null);
          });
      }
  });

  tabs.push({
      "name": "Теги",
      "content": function (callback) {
          $.getJSON("toDosTags.json", function (toDoObjects) {
              var organizedByTag = organizeByTags(toDoObjects)
              organizedByTag.forEach(tag=>{
                  var $tagName = $("<h4>").text(tag.name)
                  $tagName.addClass("tagLable")
                  $content = $("<ul>")
                  tag.toDos.forEach(description=>{
                      var $li = $("<li>").text(description)
                      $content.append($li)
                  })
                  $("main .content").append($tagName)
                  $("main .content").append($content)
              })
              callback(null, $content);
          }).fail(function (jqXHR, textStatus, error) {
              callback(error, null);
          });
      }
  });
  
  tabs.push({
      "name": "Добавить",
      "content": function () {
              $content = $('<textarea type="text" class="description" placeholder="Введите новую задачу"></textarea>'
    +'<textarea type="text" class="tags" placeholder="Введите теги"></textarea>'+'<button class="addBtn">+</button>')
              $("main .content").append($content);
              $(".addBtn").on("click",function(){
                  var description=$(".description").val();
                  var tags = $(".tags").val().split(",");
                                     
                  if(description!=''){
                      var newToDo = {"description":description,"tags":tags}
                      $.post("/todos", newToDo, function (result) {
                          
                          toDosObj.push(newToDo)
                          toDos = toDosObj.map(toDo=> {return toDo.description}) 
                          alert("Добавлена новая задача");
                          $(".description").val("")
                          $(".tags").val("")
                      });                           
                  }
              })
          }
  });
  
  tabs.forEach(function (tab) {
  var $aElement = $("<a>").attr("href",""),
    $spanElement = $("<span>").text(tab.name);
  $aElement.append($spanElement);
  $("main .tabs").append($aElement);

  $spanElement.on("click", function () {
    var $content;
    $(".tabs a span").removeClass("active");
    $spanElement.addClass("active");
    $("main .content").empty();
    tab.content(function (err, $content) {
      if (err !== null) {
        alert ("Возникла проблема при обработке запроса: " + err);
      } else {
        $("main .content").append($content);
      }
    });
    return false;
  });
});
  $(".tabs a:first-child span").trigger("click");
}
$(document).ready(function(){
  $.getJSON("toDosTags.json",function(toDosObj){
      main(toDosObj)
  })
});

var organizeByTags = function (toDoObjects) {
  var tags = []
  toDoObjects.forEach(toDo => {
      toDo.tags.forEach(tag=>{
          if(tags.indexOf(tag)===-1)
          tags.push(tag)
      })
  });
  var tagObjects = tags.map(tag=>{
      var toDoWithTags = []
      toDoObjects.forEach(toDo=>{
          if(toDo.tags.indexOf(tag)!==-1){
              toDoWithTags.push(toDo.description)
          }
      })
      return {"name":tag,"toDos":toDoWithTags}
  })
  return tagObjects
};

var liaWithDeleteOnClick = function(todo) {
  var $todoListItem = $("<li>").text(todo.description),
      $todoRemoveLink = $("<a>").attr("href", "todos/" + todo._id),
      $todoEditLink = $("<a>").attr("href", "todos/" + todo._id);
  $todoRemoveLink.text("Удалить");
  $todoEditLink.text("Редактировать")
  $todoEditLink.addClass("delete")
  $todoRemoveLink.addClass("delete");
  
  
  $todoRemoveLink.on("click", function () {
      $.ajax({
          "url": "todos/" + todo._id,
          "type": "DELETE"
      }).done(function (response) {
          $(".tabs a:first-child span").trigger("click");
      }).fail(function (err) {
          console.log("error on delete 'todo'!");
      });
      return false;
  });
  $todoEditLink.on("click", function () {
      var newDescription = prompt("Введите новое наименование для задачи",
      todo.description);
      if (newDescription !== null && newDescription.trim() !== "") {
          $.ajax({
              url: "todos/" + todo._id,
              type: "PUT",
              data: { "description": newDescription }
          }).done(function (response) {
              $(".tabs a:nth-child(1) span").trigger("click");
          }).fail(function (err) {});
      }
      return false;
  });
  $todoListItem.append($todoRemoveLink);
  $todoListItem.append($todoEditLink);
  return $todoListItem;
};

