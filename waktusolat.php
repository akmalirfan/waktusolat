<?php
error_reporting(0);
header('Content-Type: application/json');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$xml = simplexml_load_file('http://www2.e-solat.gov.my/xml/today/?'.$_SERVER['QUERY_STRING']);
$masa = (string) $xml->channel->children('http://purl.org/dc/elements/1.1/')->date;
$tempat = (string) $xml->channel->link;
$waktusolat = array();

foreach ($xml->channel->item as $item) {
    $waktusolat[(string) $item->title] = (string) $item->description;
}

echo json_encode(
    array(
        "masa" => $masa,
        "tempat" => $tempat,
        "waktusolat" => $waktusolat
    )
);