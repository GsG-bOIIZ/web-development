<?php
class Survey
{
    private ?string $firstName;
    private ?string $email;
    private ?string $activity;
    private ?string $agreement;

    public function __construct(?string $email, ?string $firstName, ?string $activity, ?string $agreement) 
    {
        $this->email = $email;
        $this->firstName = $firstName;
        $this->activity = $activity;
        $this->agreement = $agreement;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }
    public function getFirstName(): ?string
    {
        return $this->firstName;
    }
    public function getActivity(): ?string
    {
        return $this->activity;
    }
    public function getAgreement(): ?string
    {
        return $this->agreement;
    }
}