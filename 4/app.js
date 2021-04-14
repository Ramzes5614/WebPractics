var main = function () {
"use strict";
$(".tabs a span").toArray().forEach(function (element) {
/span></a>/span></a> создаем обработчик щелчков для этого элемента
$(element).on("click", function () {
$(".tabs a span").removeClass("active");
$(element).addClass("active");
$("main .content").empty();
return false;
});
});
};
