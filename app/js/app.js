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
    str = str.replace(/\s/g, '');
    var fArr = str.split("");


    for (var j = 0; j < fArr.length; j += 3) {
        var colorCode = "#" + buildColor(fArr[j], fArr[j + 1], fArr[j + 2]);
        var e = document.createElement('div');
        e.innerHTML = colorCode;
        e.setAttribute("style", "width: 300px; height: 300px; padding: 10px; color: white; background-color:" + colorCode + ";");
        document.getElementById("colors").appendChild(e);
    }
}

function charToHex(ch, f) {
    if (ch != undefined) {
        var dec = Math.ceil(((ch.charCodeAt(0) - 32) / 90) * 255);
        
    } else {
        var dec = Math.ceil(((getRandomInt(32, 123) - 32) / 90) * 255);
        console.log(dec);
    }
    return dec.toString(16);
}

function buildColor(c1, c2, c3) {
    return "" + charToHex(c1, 1) + charToHex(c2, 1.5) + charToHex(c3, 2);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

$("#sent").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#submit").click();
    }
});