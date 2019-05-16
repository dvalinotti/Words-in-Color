$(document).foundation();

var stored = ""; // Initialize variable that will store the current value of the text box - prevents re-randomized color values
// Submit button function.
function submit() {
    var value = document.getElementById("sent").value;

    if (value != stored) {                                  // Compares current text field value to stored value to avoid re-randomizing
        document.documentElement.style.height = "auto";     // Fixes weird style issues 
        var oldColors = document.getElementById("colors").children;
        if (oldColors.length > 1) {                         // Clears existing color values when resubmitting.
            for (var i = 0; i < oldColors.length; i++) {
                oldColors[i].style.display = "none";
            }
        }
        document.getElementById("palette").style.display = "block";
        stored = value;
        generate(value);
    }

}

// Wrapper function.
function generate(str) {
    str = str.replace(/\s/g, ''); // Removes all spaces (better color generation)
    var fArr = str.split("");
    var colors = [];
    for (var j = 0; j < fArr.length; j += 3) {
        var colorCode = "#" + buildColor(fArr[j], fArr[j + 1], fArr[j + 2]);
        colors.push(colorCode);
        var e = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = colorCode;
        e.appendChild(p);
        e.classList.add("scale-in-center", "color-block");
        e.setAttribute("style", "background-color:" + colorCode + ";");
        document.getElementById("colors").appendChild(e);
    }
    backgroundCycle(colors);
}

// Takes a character, transforms it to fit a 0-255 value and returns it as a Hexidecimal number.
// Turns the character's ASCII value into a fraction of the range of available characters (32-122) and multiplies that by 255.
function charToHex(ch) {
    var dec;
    if (ch != undefined) {
        dec = Math.ceil(((ch.charCodeAt(0) - 32) / 90) * 255); 
        
    } else {
        // If the value is empty, ie there are not enough characters to build a color code, generates a random number to replace it.
        dec = Math.ceil(((getRandomInt(32, 123) - 32) / 90) * 255); 
    }
    return dec.toString(16);
}

// Takes the three R G B values and builds a color code.
function buildColor(c1, c2, c3) {
    return "" + charToHex(c1) + charToHex(c2) + charToHex(c3);
}

function backgroundCycle(c) {
    document.getElementById('background').style.animation = null;
    document.getElementById('background').style.webkitAnimation = null;
    var s = "@keyframes colorchange { ";    // Return string
    var n = c.length;               // Num of arguments
    //console.log(1 / (n-1));
    var r = (1 / (n-1)) * 100;                          // Keyframe iteration value
    //console.log(r);                                      // Percent (keyframe)
    for (i = 0; i < n; i++) {
        s += "\n" + r*i + "% {background: " + c[i] + ";} ";
    }
    
    if (document.getElementById('animation')) {
        var anim = document.querySelector('#animation');
        anim.parentNode.removeChild(anim);
    }

    var e = document.createElement('style');
    e.type = 'type/css';
    e.id = 'animation';
    var rule = document.createTextNode(s + "}");
    e.appendChild(rule);
    document.getElementsByTagName('head')[0].appendChild(e);
    document.getElementById('background').style.animation = 'colorchange 2s';
    document.getElementById('background').style.webkitAnimation = 'colorchange 2s';
}

// Generate a random number between min and max.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Allows user to hit enter to submit
$("#sent").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#submit").click();
    }
});