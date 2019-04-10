var interactive = 0;
var started = 0;
var show_base_values = 1;

var show_prompt_a = 0;
var show_prompt_c = 0;
var show_prompt_dp1 = 0;
var show_prompt_aprel = 0;
var show_prompt_q = 0;
var show_prompt_material = 0;
var show_prompt_id_material = 0;
var show_prompt_dca = 0;
var show_prompt_det = 0;
var show_prompt_dr = 0;
var show_prompt_fa = 0;

var show_response = 0;

// cuts out garbage
function filter_interactives(inter) {
	console.log(inter);
	var ret;
	ret = inter.replace("/No value chosen<br />/g", '');
	//ret = inter.replace("<br >", '');
	console.log("Return: " + ret);
	return ret;

}


// response = html response
function display_state(response) {
	// split[] - first half is interactive messages
	// 		   - second half is the response
	var output = document.getElementById("output");
	output.innerHTML = ''; // clear
	//output.innerHTML += '';

	//var presplit = response.split('Executing console main...<br />') + '';	// split php response
	//output.innerHTML += response;
	//console.log(response);
	var split = response.split('<br />');	// split response (starting at ==) from C messages
	//output.innerHTML += split;

	/*for (var i = 0; i < split.length; i++) {
		output.innerHTML += split[i] + "<br>";
	}	*/

	var interactives_string =  split[0];	// filter out garbage from the first split
	var response = split[1];	// the response variable, with all the results
	//output.innerHTML += "Interactives are: " + interactives_string;
	//output.innerHTML += "<br>";
	//output.innerHTML += "Response is: " + response;


	// split[0] = "Loading application...";
	// split[1] = "Prompt a";
	// split[2] = "Prompt c";
	// split[3] = "Prompt dp1";
	// split[4] = "Prompt aprel";
	// split[5] = "Prompt Q";
	// split[6] = "Prompt simbol";
	// split[7] = "Prompt tratament";
	// split[8] = "Prompt dca";
	// split[9] = "Prompt det";
	// split[10] = "Prompt dr";
	// split[11] = "Prompt fa";


	if(show_base_values == 1) {
		show_base_values = 0;
		toggle_id('cs_box');
		toggle_id('pv_box');
		toggle_id('nv_box');
		toggle_id('itct_box');
		toggle_id('ir_box');
		toggle_id('l_box');
		toggle_id('g_box');
		toggle_id('fm_box');
	}

	if(show_prompt_a == 0 && !started) {
		started = 1;
		show_prompt_a = 1;
	}

	//var interactives = interactives_string.split("<br />");
	//console.log(interactives);
	
	if(show_response) {
		toggle_field('fa_box', 0);
		toggle_field('compute-button', 0);
		toggle_field('part1',0);
		document.getElementById('part2').style.width = '100%';
		for(var i = 12; i < split.length; i++) {
			output.innerHTML += split[i] + "<br>";
		}
		return;
	}

	if(show_prompt_fa) {
		//toggle_id('fa_box');
		output.innerHTML += split[11];
		show_response = 1;	
		show_prompt_fa = 0;

		toggle_field('fa_box', 1);
		toggle_field('dr_box', 0);
	}
	if(show_prompt_dr) {
		//toggle_id('dr_box');
		output.innerHTML += split[10];
		show_prompt_fa = 1;
		show_prompt_dr = 0;

		toggle_field('dr_box', 1);
		toggle_field('det_box', 0);
	}
	if(show_prompt_det) {
		//toggle_id('det_box');
		output.innerHTML += split[9];
		show_prompt_dr = 1;
		show_prompt_det = 0;

		toggle_field('dca_box', 0);
		toggle_field('det_box', 1);
	}
	if(show_prompt_dca) {
		//toggle_id('dca_box');
		output.innerHTML += split[8];
		show_prompt_det = 1;
		show_prompt_dca = 0;

		toggle_field('material_box', 0);
		toggle_field('id_material_box', 0);
		toggle_field('dca_box', 1);
	}
	if(show_prompt_id_material) {
		//toggle_id('id_material_box');
		//output.innerHTML += split[1];
		//show_prompt_dca = 1;
		// combined with material
	}
	if(show_prompt_material) {
		//toggle_id('material_box');
		output.innerHTML += split[6];
		show_prompt_dca = 1;
		show_prompt_material = 0;
		show_prompt_id_material = 0;

		toggle_field('material_box', 1);
		toggle_field('id_material_box', 1);
		toggle_field('q_box', 0);
	}
	

	// part 1
	if(show_prompt_q) {
		//toggle_id('q_box');
		output.innerHTML += split[5];
		show_prompt_material = 1;
		show_prompt_q = 0;

		toggle_field('q_box', 1);
		toggle_field('aprel_box', 0);
	}
	if(show_prompt_aprel) {
		//toggle_id('aprel_box');
		output.innerHTML += split[4];
		show_prompt_q = 1;
		show_prompt_aprel = 0;

		toggle_field('aprel_box', 1);
		toggle_field('dp1_box', 0);
	}

	if(show_prompt_dp1) {
		//toggle_id('dp1_box');
		output.innerHTML += split[3];
		show_prompt_aprel = 1;
		show_prompt_dp1 = 0;

		toggle_field('dp1_box', 1);
		toggle_field('c_box', 0);
	}

	if(show_prompt_c) {
		//toggle_id('c_box');
		output.innerHTML += split[2];
		show_prompt_dp1 = 1;
		show_prompt_c = 0;

		toggle_field('c_box', 1);
		toggle_field('a_box', 0);
	}

	if(show_prompt_a) {
		//toggle_id('a_box');
		output.innerHTML += split[1];
		show_prompt_c = 1;
		show_prompt_a = 0;

		toggle_field('a_box', 1);
	}
}

function compute() {
	var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	if(interactive == 1) {
        		//console.log(this.responseText);
        		display_state(this.responseText);
        	}
        	else {
            	document.getElementById("output").innerHTML = this.responseText;
        	}
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


function start_interactive() {
	interactive = 1;
	// hide others
	toggle_id('a_box');
	toggle_id('c_box');
	toggle_id('dp1_box');
	toggle_id('aprel_box');
	toggle_id('q_box');
	toggle_id('material_box');
	toggle_id('id_material_box');
	toggle_id('dca_box');
	toggle_id('det_box');
	toggle_id('dr_box');
	toggle_id('fa_box');
	toggle_id('interactive-button');
}


function toggle_field(field, show) {
	var fieldElement = document.getElementById(field);
	if(show) {
		fieldElement.style.display = "block";
	}
	else {
		fieldElement.style.display = "none";
	}
}
function toggle_id(field) {
	var fieldElement = document.getElementById(field);
	if(fieldElement.style.display == "none") {
		fieldElement.style.display = "block";
	}
	else {
		fieldElement.style.display = "none";
	}
 }

function getFieldValue(field) {
	return document.getElementById(field).value;
}
