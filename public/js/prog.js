var Response = document.getElementById('response');

var Input = document.getElementById('yourInput');


$(".dropdown-item").on("click", function() {
    console.log($(this).text());

    var Option = $(this).text();

    $("#dropdownMenu2").text(Option);
});