
export default function generateColor(str) {
    str = str.replace(/\s/g, '');
    let fArr = str.split("");
    let colors = [];
    for (let j = 0; j < fArr.length; j += 3) {
        let colorCode = "#" + buildColor(fArr[j], fArr[j + 1], fArr[j + 2]);
        colors.push(colorCode);
    }

    if (colors.length > 5) {
        colors = colors.slice(0, 5)
    }

    return colors;
}

function buildColor(c1, c2, c3) {
    console.log(c1 + ", " + c2 + ", " + c3)
    return "" + charToHex(c1) + charToHex(c2) + charToHex(c3);
}

function charToHex(ch) {
    var dec;
    if (ch !== undefined) {
        dec = Math.ceil(((ch.charCodeAt(0) - 32) / 90) * 255); 
        
    } else {
        // If the value is empty, ie there are not enough characters to build a color code, generates a random number to replace it.
        dec = Math.ceil(((getRandomInt(32, 123) - 32) / 90) * 255); 
        if (dec < 16) {
            dec += (16 - dec);
        }
    }
    console.log(dec)
    return dec.toString(16);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}