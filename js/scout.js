var data = {
    dataForm: [],
    sets: [],
};

var currCode = 0;

/*setInterval(function() {
    var request = $.ajax({
        url: "https://team254-scouting-trvrsalom.c9.io/express:8080",
        method: "POST",
        data: localStorage['scannedSets'],
        dataType: "JSONP",
        /*success: function( response ) {
          console.log( response ); // server response
        },
        error: function( xhr, status, errorThrown ) {
          alert( "Sorry, there was a problem!" );
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
        }
    //});;
}, 2000)*/

function render() {
    renderHeader("test");
    $(".section").hide();
    if (getHash().length != 0) {
        var str = getHash().substring(1);
        var toRender = JSON.parse(str);
        //Make sure the static field comes first.
        for (var i = 0; i < toRender['items'].length; i++) {
            if (toRender['items'][i]["type"] == "static")
                renderStatic(toRender['items'][i]["name"]);
        }
        for (var i = 0; i < toRender['items'].length; i++) {
            if (toRender['items'][i]["type"] == "text")
                renderText(toRender['items'][i]["name"]);
            else if (toRender['items'][i]["type"] == "counter")
                renderCounter(toRender['items'][i]["name"]);
            else if (toRender['items'][i]["type"] == "tf")
                renderTF(toRender['items'][i]["name"]);
            else if (toRender['items'][i]["type"] == "static")
            //do nothing, since we already rendered it.
            ;
            else if (toRender['items'][i]["type"] == "rating")
                renderRating(toRender['items'][i]["name"]);
            else
                $("#maingrid").append("<div class='sixteen wide column'><div class='ui negative message'><div class='header'>Looks like something went wrong...</div><p>It looks like there was an invalid input type.</p></div></div>");
        }
        for (var i = 1; i < $("#maingrid").children().length; i++) {
            data["dataForm"].push($("#maingrid").children()[i].id);
        }
    }
    else
        $("#maingrid").append("<div class='sixteen wide column'><div class='ui negative message'><div class='header'>Looks like something went wrong...</div><p>We suggest you create a form first</p></div></div>");
    qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "No data...",
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

}

function renderText(title) {
    var object = $("#maingrid").append("<div class='four wide column' id='" + title + "' data-type='text'><span class='item'></span><div class='ui card' id='input'><div class='content'><div class='header' id='title'>" + title + "</div><div class='description'><div class='ui input'><input type='text' onclick='this.value = '';' id='textVal' placeholder='" + title + "'></div></div></div></div></div>");
}

function renderCounter(title) {
    var object = $("#maingrid").append("<div class='four wide column' id='" + title + "' data-type='counter'><span class='item'></span><div class='ui card' id='input'><div class='content'><div class='header' id='title'>" + title + "</div><div class='description'><div class='ui buttons'><div class='ui red button' id='minus' onclick='$(this).parent().children()[1].innerHTML = $(this).parent().children()[1].innerHTML > 0 ? parseInt($(this).parent().children()[1].innerHTML)-1 : $(this).parent().children()[1].innerHTML;'>-</div><div class='ui button' onclick='this.innerHTML = \"0\";' id='counterVal' name='counterVal'>0</div><div class='ui green button' id='plus' onclick='$(this).parent().children()[1].innerHTML = $(this).parent().children()[1].innerHTML.length <= 3 ? parseInt($(this).parent().children()[1].innerHTML)+1 : $(this).parent().children()[1].innerHTML;'>+</div></div></div></div></div>");
}

function renderTF(title) {
    var object = $("#maingrid").append("<div class='four wide column' id='" + title + "' data-type='tf' data-value='e'><span class='item'></span><div class='ui card' id='input'><div class='content'><div class='header' id='title'>" + title + "</div><div class='description'><div class='ui buttons'><div class='ui red button' id='false' onclick='$(this).addClass(\"disabled\"); $($(this).parent().children()[1]).removeClass(\"disabled\");  $($(this).parent().parent().parent().parent().parent()[0]).attr(\"data-value\", \"f\");'>False</div><div class='ui green button' id='True' onclick='$(this).addClass(\"disabled\"); $($(this).parent().children()[0]).removeClass(\"disabled\"); $($(this).parent().parent().parent().parent().parent()[0]).attr(\"data-value\", \"t\");'>True</div></div></div></div></div></div>");
}

function renderStatic(title) {
    var object = $("#maingrid").append("<div class='four wide column' id='" + title + "' data-type='static'><span class='item'></span><div class='ui card' id='input'><div class='content'><div class='header' id='title'>" + title + "</div><div class='description'><div class='ui input'><input type='text' onclick='this.value = \"\";' id='textVal' placeholder='" + title + "'></div></div></div></div></div>");
}


function renderRating(title) {
    var object = $("#maingrid").append("<div class='four wide column' id='" + title + "' data-type='rating' data-value='0'><span class='item'></span><div class='ui card' id='input'><div class='content'><div class='header' id='title'>" + title + "</div><div class='description'><div id='temp'></div></div></div></div></div>");
    $("#staticfield").val("");
    var rating = $('#temp');
    rating.raty({
        score: 1
    });
    rating = rating[0];
    rating.id = "rating";
}

function saveData() {
    var currSet = [];
    for (var i = 1; i < $("#maingrid").children().length; i++) {
        var dataType = $($("#maingrid").children()[i]).data('type');
        if (dataType == "text") {
            currSet.push($($("#maingrid").children()[i].children[1].children[0].children[1].children[0].children[0]).val());
        }
        else if (dataType == "static") {
            currSet.push($($("#maingrid").children()[i].children[1].children[0].children[1].children[0].children[0]).val());
        }
        else if (dataType == "counter") {
            currSet.push(parseInt($($("#maingrid").children()[i].children[1].children[0].children[1].children[0].children[1])[0].innerHTML));
        }
        else if (dataType == "rating") {
            currSet.push(parseInt($($("#maingrid").children()[i]).children().children().children().children().raty('score')));
        }
        else if (dataType == "tf") {
            currSet.push($($("#maingrid").children()[i]).attr('data-value'));
        }
    }
    data['sets'].push(currSet);
    localStorage['scannedSets'] = JSON.stringify(data['sets'])
    $("#matchcount")[0].innerHTML = data['sets'].length;

}

function generateString() {
    var str = [];
    for (var i = 0; i < data.sets.length; i++) {
        str[i] = "";
        for (var x = 0; x < data.sets[i].length; x++) {
            str[i] = str[i] + data.sets[i][x] + " ";
        }
    }
    return str;
}

function generateCode() {
    $('#maingrid').hide();
    qrcode.clear();
    var str = generateString();
    qrcode.makeCode(str[currCode]);
    document.getElementById("codeinfo").innerHTML = "Now showing code: " + parseInt(currCode + 1) + " of " + str.length + " (" + str[currCode].split(" ")[0] + ")";
    $('.section').show();
}

function nextCode() {
    if (currCode + 1 < generateString().length)
        currCode++;
    generateCode();
}

function previousCode() {
    if (currCode > 0)
        currCode--;
    generateCode();
}

function switchView(id, secondID) {
    $(id).show();
    $(secondID).hide();
}

function clearInput() {
    for (var i = 0; i < document.getElementsByName('counterVal').length; i++)
        document.getElementsByName('counterVal')[i].click();
    for (var i = 0; i < document.getElementsByTagName('input').length; i++)
        document.getElementsByTagName('input')[i].click();
}

function clearCodes() {
    clearInput();
    data["sets"] = [];
    $("#matchcount")[0].innerHTML = data['sets'].length;
}