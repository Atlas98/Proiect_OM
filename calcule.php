
<?php
	session_start();
	//print_r($_POST);

	

	$descriptorspec = array(
	   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
	   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
	   2 => array("file", "/tmp/error-output.txt", "a") // stderr is a file to write to
	);

	$cwd = null;
	//$env = array('PATH' => '/opt/lampp/htdocs/');
	//$cwd = '';
	//$env = array('null'=>'null');

	//$process = proc_open("/usr/bin/gdb -batch -x ./cmds ./AtlasTest >> debug.txt", $descriptorspec, $pipes, $cwd, $env);
	$process = proc_open("./AtlasTest", $descriptorspec, $pipes, $cwd, null);

	if (is_resource($process)) {
	    // $pipes now looks like this:
	    // 0 => writeable handle connected to child stdin
	    // 1 => readable handle connected to child stdout
	    // Any error output will be appended to /tmp/error-output.txt

		//echo stream_get_contents($pipes[1]);
		//fwrite($pipes[0], "350");		// a
		//fwrite($pipes[0], )
		$cs 			= $_POST['cs'];
		$pv 			= $_POST['pv'];
		$nv 			= $_POST['nv'];
		$itct 			= $_POST['itct'];
		$ir 			= $_POST['ir'];
		$l 				= $_POST['l'];
		$g 				= $_POST['g'];
		$fm 			= $_POST['fm'];

		$a 				= $_POST['a'];
		$c 				= $_POST['c'];
		$dp1 			= $_POST['dp1'];
		$aprel 			= $_POST['aprel'];
		$q 				= $_POST['q'];
		$material 		= $_POST['material'];
		$id_material 	= $_POST['id_material'];
		$dca 			= $_POST['dca'];
		$det 			= $_POST['det'];
		$dr 			= $_POST['dr'];
		$dperii			= $_POST['dperii'];
		$drotor 		= $_POST['drotor'];
		$dumar 			= $_POST['dumar'];
		$fa 			= $_POST['fa'];
		$lp_a			= $_POST['lp_a'];
		$lp_b 			= $_POST['lp_b'];

		$write_str = $cs . ' ' . $pv . ' ' . $nv . ' ' . $itct . ' ' . $ir . ' ' . $l . ' ' . $g . ' ' . $fm . ' ' . $a . ' ' . $c . ' ' . $dp1 . ' ' . $aprel . ' ' . $q . ' ' . $material . ' ' . $id_material . ' ' . $dca . ' ' . $det . ' ' . $dr . ' ' . $dperii . ' ' . $drotor . ' ' . $dumar . ' ' . $fa . ' ' . $lp_a . ' ' . $lp_b;
		//echo $write_str;
		//echo "<br>";
		
		fwrite($pipes[0], $write_str);

		//$write_str = "350 150 63 200 500 OL_50 0 20 24 30 100";
		//fwrite($pipes[0], "350 150 63 200 500 OL_50 0 20 24 30 100");
		/*
		fwrite($pipes[0], "150");		// c
		fwrite($pipes[0], "63");		// dp1
		fwrite($pipes[0], "200");		// Aprel
		fwrite($pipes[0], "500");		// Q
		fwrite($pipes[0], "OL_50");		// Materialul
		fwrite($pipes[0], "0");			// alea cu normale
		fwrite($pipes[0], "20");		// dca
		fwrite($pipes[0], "24");		// det
		fwrite($pipes[0], "30");		// dr
		fwrite($pipes[0], "100");		// forta axiala
		*/

	    fclose($pipes[0]);

	    $return = stream_get_contents($pipes[1]); 	// get response from process
	    echo nl2br($return);	// nl2br = \n -> <br>     <br> = new line in html
	    fclose($pipes[1]);	// close read stream

	    $return_value = proc_close($process);
	    echo "<br>"; // new line
	    echo "command returned $return_value<br>"; 	// for debugging purposes
	}
	

	//$return = shell_exec("./AtlasTest");
	//echo $return;
?>