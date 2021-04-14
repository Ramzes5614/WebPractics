var main = function () {
"use strict";
$(".tabs a:nth-код для этого элемента может выглядеть вот так:child(1)").on("click", function () {
/span></a>/span></a> делаем все вкладки неактивными
$(".tabs span").removeClass("active");
/span></a>/span></a> делаем активной первую вкладку
$(".tabs a:nth-код для этого элемента может выглядеть вот так:child(1) span").addClass("active");
/span></a>/span></a> очищаем основное содержание, чтобы переопределить его
$("main .content").empty();
/span></a>/span></a> возвращается false, так как мы не переходим по ссылке
return false;
});
$(".tabs a:nth-код для этого элемента может выглядеть вот так:child(2)").on("click", function () {
$(".tabs span").removeClass("active");
4
$(".tabs a:nth-код для этого элемента может выглядеть вот так:child(2) span").addClass("active");
$("main .content").empty();
return false;
});
$(".tabs a:nth-код для этого элемента может выглядеть вот так:child(3)").on("click", function () {
$(".tabs span").removeClass("active");
$(".tabs a:nth-код для этого элемента может выглядеть вот так:child(3) span").addClass("active");
$("main .content").empty();
return false;
});
};