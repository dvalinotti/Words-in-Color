$(document).foundation();

function submit() {
    var oldColors = document.getElementById("colors").children;
    if (oldColors.length > 1) {
        for (var i = 0; i < oldColors.length; i++) {
            oldColors[i].style.display = "none";
        }
    }
    var firstName = document.getElementById("sent").value;

    generate(firstName);
}

function generate(str) {
    //console.log(firstName + " " + lastName);
    var fArr = str.split("");
    for (var j = 0; j < fArr.length; j += 3) {
        var colorCode = "#" + buildColor(fArr[j], fArr[j + 1], fArr[j + 2]);
        var e = document.createElement('div');
        e.innerHTML = colorCode;
        e.setAttribute("style", "width: 300px; height: 300px; padding: 10px; color: white; background-color:" + colorCode + ";");
        document.getElementById("colors").appendChild(e);
    }
}

function charToHex(ch) {
    if (ch != undefined) {
        var dec = ch.charCodeAt(0);
    } else {
        var dec = "00"
    }
    return dec.toString(16);
}

function buildColor(c1, c2, c3) {
    return "" + charToHex(c1) + charToHex(c2) + charToHex(c3);
}

$("#sent").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#submit").click();
    }
});