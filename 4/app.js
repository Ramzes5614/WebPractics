var main = function () {
"use strict";
var makeTabActive = function (tabNumber) {
/span></a>/span></a> сконструируем селектор из tabNubmer
var tabSelector = ".tabs a:nth-код для этого элемента может выглядеть вот так:child(" + tabNumber + ") span";
$(".tabs span").removeClass("active");
$(tabSelector).addClass("active");
};
$(".tabs a:nth-код для этого элемента может выглядеть вот так:child(1)").on("click", function () {
makeTabActive(1);
return false;
});
$(".tabs a:nth-код для этого элемента может выглядеть вот так:child(2)").on("click", function () {
makeTabActive(2);
return false;
});
$(".tabs a:nth-код для этого элемента может выглядеть вот так:child(3)").on("click", function () {
makeTabActive(3);
return false;
});
};
