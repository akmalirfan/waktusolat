<?php
header('Content-Type: application/xml');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
echo file_get_contents('http://www2.e-solat.gov.my/xml/today/?'.$_SERVER['QUERY_STRING']);