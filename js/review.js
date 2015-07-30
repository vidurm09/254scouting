function render() {
    renderHeader("test");
}

function prepTable() {
    if (getHash() != "" && typeof getHash() != undefined) {
        var str = getHash().substring(1);
        var toRender = JSON.parse(str);
        var header = document.getElementById("headers");
        //Make sure the static field comes first.
        for (var i = 0; i < toRender['items'].length; i++) {
            if (toRender['items'][i]["type"] == "static")
                $(header).append("<th>" + toRender['items'][i]["name"] + "</th>");
        }
        for (var i = 0; i < toRender['items'].length; i++) {
            if (toRender['items'][i]["type"] == "text")
                $(header).append("<th>" + toRender['items'][i]["name"] + "</th>");
            else if (toRender['items'][i]["type"] == "counter")
                $(header).append("<th>" + toRender['items'][i]["name"] + "</th>");
            else if (toRender['items'][i]["type"] == "static")
            //do nothing, since we already rendered it.
            ;
            else if (toRender['items'][i]["type"] == "rating")
                $(header).append("<th>" + toRender['items'][i]["name"] + "</th>");
            else
                $("#maingrid").append("<div class='sixteen wide column'><div class='ui negative message'><div class='header'>Looks like something went wrong...</div><p>It looks like there was an invalid input type.</p></div></div>");
        }
        for (var i = 1; i < $("#maingrid").children().length; i++) {
            data["dataForm"].push($("#maingrid").children()[i].id);
        }
    }
    else
        $("#maingrid").append("<div class='sixteen wide column'><div class='ui negative message'><div class='header'>Looks like something went wrong...</div><p>We can't find the template of data. Make sure you have created a form and opened the correct link. </p></div></div>");
}

function getRowContent(identifier) {
    var sums = [];
    var data = JSON.parse(localStorage.sets)[identifier];
    for (var i = 0; i < data[0].length; i++)
        sums[i] = 0;
    for (var i = 0; i < data.length; i++) {
        for (var x = 0; x < data[i].length; x++) {
            sums[x] = parseInt(sums[x]) + parseInt(data[i][x]);
        }
    }
    for (var i = 0; i < sums.length; i++) {
        sums[i] = parseInt(sums[i]) / data.length;
    }
    return sums;
}

function renderTable() {
    if (localStorage.sets.length > 2) {
        var tbody = document.getElementById("tbody")
        tbody.innerHTML = "";
        var data = JSON.parse(localStorage.sets);
        for (var i = 0; i < Object.keys(data).length; i++) {
            var row = tbody.insertRow(0);
            var titleCell = row.insertCell(0);
            titleCell.innerHTML = Object.keys(data)[i];
            row.onclick = function() {
                moreData($(this).children()[0].innerHTML);
            }
            var averages = getRowContent(Object.keys(data)[i]);
            for (var x = 0; x < averages.length; x++) {
                var newcell = row.insertCell(x + 1);
                newcell.innerHTML = averages[x];
            }
        }
    }
    else
        $("#maingrid").append("<div class='sixteen wide column'><div class='ui negative message'><div class='header'>Looks like something went wrong...</div><p>No data has been scanned.</p></div></div>");
}

function moreData(identifier) {
    //Add code to get more data from id
    console.log(identifier);
}

$(document).ready(function() {
    prepTable();
    renderTable();
});