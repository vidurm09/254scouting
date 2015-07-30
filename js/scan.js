var lastCode = 0;

function initializeDB() {
    if(typeof localStorage.init === 'undefined' || localStorage.init == "false"){
        localStorage.init = "true";
        localStorage.sets = "{}";
        console.log("init");
    }
}

function render() {
    renderHeader("test");
}

function notify(message) {
    var object = $(".notifs").append("<div class='notif'><strong>Scanned</strong> " + message + "</div>");
    $(object).children().delay(3000).fadeOut('slow');
    beep();
}

function beep() {
    var sound = document.getElementById("beep");
    sound.play();
}

function parseData(str) {
    return str.split(" ");
}

function saveData(str) {
    var data = parseData(str);
    notify(data[0]);
    var sets = JSON.parse(localStorage.sets);
    var id = data[0];
    data.shift();
    data.pop();
    if(!sets.hasOwnProperty(id)) {
        sets[id] = [];
        sets[id].push(data);
        localStorage.sets = JSON.stringify(sets);
    }
    else {
        sets[id].push(data);
        localStorage.sets = JSON.stringify(sets);
    }
}

$(document).ready(function() {
    initializeDB();
    $('#reader').html5_qrcode(function(data) {
            console.log("Found Code: " + data);
            if (data != lastCode) {
                document.getElementById("reader").style.backgroundColor = "#2ecc71";
                saveData(data);
            }
            else {
                console.log("ERROR: Duplicate Code");
                document.getElementById("reader").style.backgroundColor = "#0070ff";
            }
            lastCode = data;
        },
        function(error) {
            console.log(error);
            document.getElementById("reader").style.backgroundColor = "#0070ff";
        },
        function(videoError) {
            console.log(videoError);
            document.getElementById("reader").style.backgroundColor = "#0070ff";
        }
    );
});