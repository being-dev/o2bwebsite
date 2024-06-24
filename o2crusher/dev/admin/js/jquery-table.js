var myMap={};
myMap["A"]= "w1";
myMap["B"]= "ed";
myMap["C"]= "rt";
myMap["D"]= "23";
myMap["E"]= "e3";
myMap["F"]= "z1";
myMap["G"]= "z2";
myMap["H"]= "r0";
myMap["I"]= "t5";
myMap["J"]= "y7";
myMap["K"]= "b2";
myMap["L"]= "p0";
myMap["M"]= "i8";
myMap["N"]= "R4";
myMap["O"]= "T5";
myMap["P"]= "60";
myMap["Q"]= "P1";
myMap["R"]= "Q2";
myMap["S"]= "T5";
myMap["T"]= "UI";
myMap["U"]= "R5";
myMap["V"]= "6T";
myMap["W"]= "N8";
myMap["X"]= "00";
myMap["Y"]= "2Q";
myMap["Z"]= "V6";
myMap["a"]= "U1";
myMap["b"]= "A1";
myMap["c"]= "7T";
myMap["d"]= "NE";
myMap["e"]= "MX";
myMap["f"]= "G1";
myMap["g"]= "2G";
myMap["h"]= "01";
myMap["i"]= "TT";
myMap["j"]= "6Q";
myMap["k"]= "W3";
myMap["l"]= "VT";
myMap["m"]= "BT";
myMap["n"]= "4R";
myMap["o"]= "5T";
myMap["p"]= "U8";
myMap["q"]= "U9";
myMap["r"]= "9Z";
myMap["s"]= "1L";
myMap["t"]= "2E";
myMap["u"]= "7z";
myMap["v"]= "bv";
myMap["w"]= "vg";
myMap["x"]= "cx";
myMap["y"]= "wq";
myMap["z"]= "re";
myMap["1"]= "yt";
myMap["2"]= "po";
myMap["3"]= "lk";
myMap["4"]= "hg";
myMap["5"]= "6X";
myMap["6"]= "S1";
myMap["7"]= "S2";
myMap["8"]= "3S";
myMap["9"]= "S4";
myMap["0"]= "S9";

function jqueryEnc(input){
	var encodedString = btoa(input);
	var result="";
	for (let i = 0; i < encodedString.length; i++) {
		var innresult = encodedString[i];
		if(myMap[encodedString[i]] != undefined){
			innresult = myMap[encodedString[i]];
		}
		result += innresult;
	}
	return result;
}

function jqueryDesc(input){
	var result="";
		var count = 1;
		var lastChar = "";
		for (var cc = 0; cc < input.length; cc++) {
			var currChar = input[cc];
			if (count % 2 == 0) {
				result += Object.keys(myMap).find(key => myMap[key] === (lastChar + currChar));
			}
			lastChar = currChar;
			count++;
		}
		return atob(result);
}