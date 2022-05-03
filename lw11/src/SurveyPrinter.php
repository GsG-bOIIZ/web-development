<?php

class SurveyPrinter
{
    public static function viewData(Survey $survey): void
    {
        if (!$survey->getEmail())
        {
            return;
        }

        echo
            '<p>Email: ' . $survey->getEmail() . "</p>" .
            '<p>Имя: ' . $survey->getFirstName() . "</p>" .
            '<p>Деятельность: ' . $survey->getActivity() . "</p>" . 
            '<p>Согласие на рассылку: ' . $survey->getAgreement() . "</p>";
    }
}
