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

    for (var j = 0; j < fArr.length; j += 3) {
        var colorCode = "#" + buildColor(fArr[j], fArr[j + 1], fArr[j + 2]);
        var e = document.createElement('div');
        e.innerHTML = colorCode;
        e.classList.add("scale-in-center");
        e.setAttribute("style", "width: 200px; height: 200px; padding: 10px; color: white; background-color:" + colorCode + ";");
        document.getElementById("colors").appendChild(e);
    }
}

// Takes a character, transforms it to fit a 0-255 value and returns it as a Hexidecimal number.
// Turns the character's ASCII value into a fraction of the range of available characters (32-122) and multiplies that by 255.
function charToHex(ch) {
    if (ch != undefined) {
        var dec = Math.ceil(((ch.charCodeAt(0) - 32) / 90) * 255); 
        
    } else {
        // If the value is empty, ie there are not enough characters to build a color code, generates a random number to replace it.
        var dec = Math.ceil(((getRandomInt(32, 123) - 32) / 90) * 255); 
        console.log(dec);
    }
    return dec.toString(16);
}

// Takes the three R G B values and builds a color code.
function buildColor(c1, c2, c3) {
    return "" + charToHex(c1) + charToHex(c2) + charToHex(c3);
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