$(document).ready(function(){
    $.getJSON("users.json",function(toDosObj){
        main(toDosObj)
    })
});

var main = function(users){
    var tabs = [];
	// вкладка Пользователи
	tabs.push({
        "name": "Users",
        "content": function (callback) {
            $.getJSON("users.json", function (users) {
                var $content,
                    i;
                $content = $("<ul>");
                for (i = users.length - 1; i >= 0; i--) {
                    var $todoListItem = liaWithDeleteOnClick(users[i]);
                    $content.append($todoListItem);
                }
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            });
        }
    });

    tabs.push({
        "name": "Добавить",
        "content": function () {
                $content = $('<textarea type="text" id="username" class="description" placeholder="Введите нового пользователя"></textarea>'
			+'<button class="addBtn">+</button>')
                $("main .content").append($content);
                $(".addBtn").on("click",function(){
                    var username=$("#username").val();
                    if(checkUser(users,username)){
                        alert("Такой пользователь уже есть");
                        $("#username").val("")
                        return false
                    }               
                    if(username!=''){
                        var newUser = {"username":username}
                        $.post("/users", newUser, function (result) {
                            console.log(result);
                            alert("Добавлен новый пользователь");
                            $("#username").val("")
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

var liaWithDeleteOnClick = function(user) {
    var $todoListItem = $("<li>").text(user.username),
        $todoRemoveLink = $("<a>").attr("href",  user._id),
        $todoEditLink = $("<a>").attr("href", user._id);
    $todoRemoveLink.text("Удалить");
    $todoEditLink.text("Редактировать")
    $todoEditLink.addClass("delete")
    $todoRemoveLink.addClass("delete");
    $todoRemoveLink.on("click", function () {
        $.ajax({
            "url": user._id,
            "type": "DELETE"
        }).done(function (response) {
            $(".tabs a:first-child span").trigger("click");
        }).fail(function (err) {
            console.log("error on delete 'user'!");
        });
        return false;
    });
    $todoEditLink.on("click", function () {
        var newUsername = prompt("Введите новое имя для пользователя",
        user.username);
        if (newUsername !== null && newUsername.trim() !== "") {
            $.ajax({
                url: user._id,
                type: "PUT",
                data: { "username": newUsername }
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

var checkUser=(users,newUser)=>{
    console.log(users)
    for(var i =0; i<users.length;i++){
        if(users[i].username===newUser){
            return true
        }
    }
    return false
}