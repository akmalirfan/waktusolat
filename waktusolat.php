<?php
error_reporting(0);
header('Content-Type: application/json');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$string = file_get_contents('https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&'.$_SERVER['QUERY_STRING']);
$json = json_decode($string, true);

echo json_encode(
    array(
        "masa" => $json['serverTime'],
        "tempat" => $json['zone'],
        "waktusolat" => array(
            "Subuh" => $json['prayerTime'][0]['fajr'],
            "Syuruk" => $json['prayerTime'][0]['syuruk'],
            "Zuhur" => $json['prayerTime'][0]['dhuhr'],
            "Asar" => $json['prayerTime'][0]['asr'],
            "Maghrib" => $json['prayerTime'][0]['maghrib'],
            "Isyak" => $json['prayerTime'][0]['isha']
        ),
        "tarikhhijrah" => $json['prayerTime'][0]['hijri']
    )
);