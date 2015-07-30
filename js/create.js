function render() {
    renderHeader("test")
}
function createCounter() {
    var object = $("#maingrid").append("<div class='four wide column' id='" + $("#counterfield").val() + "' data-type='counter'><span class='item'></span><div class='ui card' id='input'><div class='content'><i class='right floated close icon' onclick='$(this).parent().parent().parent().remove()'></i><div class='header' id='title'>" + $("#counterfield").val() + "</div><div class='description'><div class='ui buttons'><div class='ui red button' id='minus' onclick='$(this).parent().children()[1].innerHTML = parseInt($(this).parent().children()[1].innerHTML)-1;'>-</div><div class='ui button'>0</div><div class='ui green button' id='plus' onclick='$(this).parent().children()[1].innerHTML = parseInt($(this).parent().children()[1].innerHTML)+1;'>+</div></div></div></div></div>");
    $("#counterfield").val("");
}

function createText() {
    var object = $("#maingrid").append("<div class='four wide column' id='" + $("#textfield").val() + "' data-type='text'><span class='item'></span><div class='ui card' id='input'><div class='content'><i class='right floated close icon' onclick='$(this).parent().parent().parent().remove()'></i><div class='header' id='title'>" + $("#textfield").val() + "</div><div class='description'><div class='ui input'><input type='text' placeholder='" + $("#textfield").val() + "'></div></div></div></div></div>");
    $("#textfield").val("");
}

function createTF() {
    var object = $("#maingrid").append("<div class='four wide column' id='" + $("#tf").val() + "' data-type='tf'><span class='item'></span><div class='ui card' id='input'><div class='content'><i class='right floated close icon' onclick='$(this).parent().parent().parent().remove()'></i><div class='header' id='title'>" + $("#tf").val() + "</div><div class='description'><div class='ui buttons'><div class='ui red button' id='false' onclick='$(this).addClass(\"disabled\"); $(this).parent().children()[0].removeClass(\"disabled\");'>False</div><div class='ui green button' id='True' onclick='$(this).addClass(\"disabled\"); $(this).parent().children()[1].removeClass(\"disabled\");'>True</div></div></div></div></div>");
    $("#tf").val("");
}

function createStaticText() {
    var object = $("#maingrid").append("<div class='four wide column' id='" + $("#staticfield").val() + "' data-type='static'><span class='item'></span><div class='ui card' id='input'><div class='content'><i class='right floated close icon' onclick='$(this).parent().parent().parent().remove()'></i><div class='header' id='title'>" + $("#staticfield").val() + "</div><div class='description'><div class='ui input'><input type='text' placeholder='" + $("#staticfield").val() + "'></div></div></div></div></div>");
    $("#staticfield").val("");
}

function createRating() {
    var object = $("#maingrid").append("<div class='four wide column' id='" + $("#ratingfield").val() + "' data-type='rating' data-value='0'><span class='item'></span><div class='ui card' id='input'><div class='content'><i class='right floated close icon' onclick='$(this).parent().parent().parent().remove()'></i><div class='header' id='title'>" + $("#ratingfield").val() + "</div><div class='description'><div id='temp'></div></div></div></div></div>");
    $("#staticfield").val("");
    var rating = $('#temp');
    rating.raty({score : 0});
    rating = rating[0];
    rating.id = "rating"
}

function generate() {
    var toCopy = $(".item").parent();
    var postHash = {"items" : []};
    for(var i = 0; i < toCopy.length; i++) {
        postHash['items'].push({"name" : toCopy[i].id, "type" : $(toCopy[i]).data('type')});
    }
    var finString = JSON.stringify(postHash);
    $('.modal').modal('show');
    $("#reviewform").attr("href", "https://preview.c9.io/trvrsalom/team254_scouting/review.html#" + finString);
    $("#scoutingform").attr("href", "https://preview.c9.io/trvrsalom/team254_scouting/scout.html#" + finString);
}
