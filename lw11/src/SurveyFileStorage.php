<?php

class SurveyFileStorage
{
    private const FOLDER_DATA = './data/';
    private const FILE_FIRST_NAME = "First Name";
    private const FILE_EMAIL = "Email";
    private const FILE_ACTIVITY = "Activity";
    private const FILE_AGREEMENT = "Agreement";
    private const DELIMETER_PARAMETERS = ": ";

    private function createFileName(Survey $survey): string
    {
        return self::FOLDER_DATA . mb_strtolower($survey->getEmail()) . '.txt';
    }

    public function loadSurveyFromFile(Survey $survey): Survey
    {
        $fileName = self::createFileName($survey);
        if (!$email and file_exists($fileName))
        {
            $tempArray = file($fileName);
            $arrayData = [];
            foreach ($tempArray as $line)
            {
                $tempString = explode(self::DELIMETER_PARAMETERS, $line);
                $arrayData[$tempString[0]] = $tempString[1] ?? null;
            }
            return new Survey(
                $arrayData[self::FILE_EMAIL], 
                $arrayData[self::FILE_FIRST_NAME], 
                $arrayData[self::FILE_ACTIVITY],
                $arrayData[self::FILE_AGREEMENT]
            );
        }  
        else
        {
            echo "<p>Данного файла не существует</p>";
            return new Survey(null, null, null, null);
        }      
    }

    public static function saveSurveyToFile(Survey $survey): void
    {        
        if (!$survey->getEmail())
        {
            echo "<br>Impossible email (for save Survey to file)<br><br>";
            return;
        }

        $fileName = self::createFileName($survey);
        $tempEmail = self::FILE_EMAIL . self::DELIMETER_PARAMETERS;
        $tempFirstName = self::FILE_FIRST_NAME . self::DELIMETER_PARAMETERS;
        $tempActivity = self::FILE_ACTIVITY . self::DELIMETER_PARAMETERS;
        $tempAgreement = self::FILE_AGREEMENT . self::DELIMETER_PARAMETERS;

        if (file_exists($fileName))
        {
            $tempArray = file($fileName);
            if ($survey->getFirstName() !== null)
            {
                $tempArray[1] = $tempFirstName . $survey->getFirstName() . "\n";
            }
            if ($survey->getActivity() !== null)
            {
                $tempArray[2] = $tempActivity . $survey->getActivity() . "\n";
            }
            if ($survey->getAgreement() !== null)
            {
                $tempArray[3] = $tempAgreement . $survey->getAgreement();
            }
            file_put_contents($fileName, $tempArray);
        }
        else
        {
            if (!file_exists(self::FOLDER_DATA))
            {
                mkdir(self::FOLDER_DATA);
            }
            $surveyTxt = fopen($fileName, "w");
            fwrite($surveyTxt, $tempEmail . $survey->getEmail() . "\n");
            fwrite($surveyTxt, $tempFirstName . $survey->getFirstName() . "\n");          
            fwrite($surveyTxt, $tempActivity . $survey->getActivity() . "\n");
            fwrite($surveyTxt, $tempAgreement . $survey->getAgreement());
            fclose($surveyTxt);
        }
    }   
}