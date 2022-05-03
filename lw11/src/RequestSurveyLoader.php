<?php

class RequestSurveyLoader
{
    private const POST_FIRST_NAME = "firstName";
    private const POST_ACTIVITY = "activity";
    private const POST_EMAIL = "email";
    private const POST_AGREEMENT = "agreement";
    

    public function createSurveyInfo(): Survey
    {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);
        if (!$input[self::POST_EMAIL]) 
        {
            echo "<br>Impossible email (for create Survey)<br><br>";
            return new Survey(null, null, null, null);
        }
        $email = $input[self::POST_EMAIL];
        $firstName = $input[self::POST_FIRST_NAME] ?? null;  
        $activity = $input[self::POST_ACTIVITY] ?? null;
        $agreement = $input[self::POST_AGREEMENT];

        return new Survey($email, $firstName, $activity, $agreement);
    }
}