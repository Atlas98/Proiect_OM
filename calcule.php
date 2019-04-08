
<?php


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
		fwrite($pipes[0], "350");		// a
		//$reply = stream_get_contents($pipes[1]);
		//echo $reply;
		//echo "<br>";
		
		fwrite($pipes[0], "150 63 200 500 OL_50 0 20 24 30 100");
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

	    $return = stream_get_contents($pipes[1]);
	    echo nl2br($return);
	    fclose($pipes[1]);
	    echo "reached here";

	    // It is important that you close any pipes before calling
	    // proc_close in order to avoid a deadlock
	    $return_value = proc_close($process);

	    echo "command returned $return_value\n";
	}
	

	//$return = shell_exec("./AtlasTest");
	//echo $return;
?>
