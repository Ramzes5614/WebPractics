var organizeByTags = function (toDoObjects) {
var tags = [];
toDoObjects.forEach(function (toDo) {
toDo.tags.forEach(function (tag) {
if (tags.indexOf(tag) === -1) {
tags.push(tag);
}
});
});

var tagObjects = tags.map(function (tag) {
var toDosWithTag = toDoObjects.filter(function (toDo) {
if (toDo.tags.indexOf(tag) !== -1) {
return toDo.description;
}
}).map(function (toDo) { return toDo.description });
return { "name": tag, "toDos": toDosWithTag };
});
console.log(tagObjects)
return tagObjects;
};

var main = function (toDoObjects) {
	"use strict";
	var toDos = toDoObjects.map(function (toDo) {
		// просто возвращаем описание
		// этой задачи
		return toDo.description;
	});
	// сейчас весь старый код должен работать в точности как раньше!
	// ...


	$(".tabs a span").toArray().forEach(function (element) { 
		// создаем обработчик щелчков для этого элемента 
		$(element).on("click", function () {
			// поскольку мы используем версию элемента jQuery,
			// нужно создать временную переменную,
			// чтобы избежать постоянного обновления
			var $element = $(element);
			$(".tabs a span").removeClass("active"); 
			$(element).addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) { 
				for (var i = toDos.length-1; i > -1; i--) { 
					$(".content").append($("<li>").text(toDos[i]));
				}
			} 
			else if ($element.parent().is(":nth-child(2)")) { 
				toDos.forEach(function (todo) { 
					$(".content").append($("<li>").text(todo));
				});
			} 
			else if ($element.parent().is(":nth-child(3)")) {
				// ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ
				console.log("Щелчок на вкладке Теги");
				var organizedByTag = organizeByTags(toDoObjects);
				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
					$content = $("<ul>");
					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});	
			}
			else if ($element.parent().is(":nth-child(4)")) { 
				var $input = $("<input>").addClass("description"),
					$inputLabel = $("<p>").text("Новая задача: "),
					$tagInput = $("<input>").addClass("tags"),
					$tagLabel = $("<p>").text("Тэги: "),
					$button = $("<button>").text("+");

				$button.on("click", function () {
					var description = $input.val(),
						tags = $tagInput.val().split(","),
						// создаем новый элемент списка задач
						newToDo = {"description":description, "tags":tags};
					$.post("todos", newToDo, function (result) {
						console.log(result);
						// нужно отправить новый объект на клиент
						// после получения ответа сервера
						toDoObjects.push(newToDo);
						// обновляем toDos
						toDos = toDoObjects.map(function (toDo) {
							return toDo.description;
						});
						$input.val("");
						$tagInput.val("");	
					});
				});

				$("main .content").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
			}
			return false;
		})
	})


	$(".tabs a:first-child span").trigger("click");


};
$(document).ready(function () {
	$.getJSON("todos.json", function (toDoObjects) {
		// вызываем функцию main с задачами в качестве аргумента
		main(toDoObjects);
	});
});