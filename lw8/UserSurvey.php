<?php
require_once('./src/common.inc.php'); 

$requestSurveyLoader = new RequestSurveyLoader();
$surveyFileStorage = new SurveyFileStorage();

$survey = $requestSurveyLoader->createSurveyInfo();
//echo 'Входящие параметры<br><br>';
//SurveyPrinter::viewData($survey);
SurveyFileStorage::saveSurveyToFile($survey);
