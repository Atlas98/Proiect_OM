
function compute() {
	var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("output").innerHTML = this.responseText;
        }
    };
    request.open("POST", "calcule.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

     // my values, used for testing - quick access
     //        db->base_data.Cs    = 1.4;
     //        db->base_data.P_V   = 1.7;
     //        db->base_data.n_V   = 150;
     //        db->base_data.i_TCT = 2.5;
     //        db->base_data.i_R   = 6.3;
     //        db->base_data.l     = 320;
     //        db->base_data.G     = 380;
     //        db->base_data.F_m   = 570;
    var cs 			= getFieldValue('cs');
    var pv 			= getFieldValue('pv');
    var nv 			= getFieldValue('nv');
    var itct 		= getFieldValue('itct');
    var ir 			= getFieldValue('ir');
    var l 			= getFieldValue('l');
    var g 			= getFieldValue('g');
    var fm 			= getFieldValue('fm');

    var a 			= getFieldValue('a');
   	var c 			= getFieldValue('c');
   	var dp1 		= getFieldValue('dp1');
   	var aprel 		= getFieldValue('aprel');
   	var q 			= getFieldValue('q');
   	var material 	= getFieldValue('material');
   	var id_material = getFieldValue('id_material');
   	var dca 		= getFieldValue('dca');
   	var det 		= getFieldValue('det');
   	var dr 			= getFieldValue('dr');
   	var fa 			= getFieldValue('fa'); 

    var requestString = "cs=" + cs + "&pv=" + pv + "&nv=" + nv + "&itct=" + itct + "&ir=" + ir + "&l=" + l + "&g=" + g + "&fm=" + fm + "&a=" + a + "&c=" + c
     + "&dp1=" + dp1 + "&aprel=" + aprel + "&q=" + q + "&material=" + material + "&id_material=" + id_material + "&dca=" + dca + "&det=" + det + "&dr=" + dr + "&fa=" + fa;
    request.send(requestString);
    console.log("Sent request: " + requestString);
}

function getFieldValue(field) {
	return document.getElementById(field).value;
}