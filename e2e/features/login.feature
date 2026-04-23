@login
Feature: Login modal

    Scenario: I can login with a valid user
        Given I am at the login modal
        When I set a valid username and a valid password
        Then I am logged in
    
    Scenario: An alert is displayed if the user is not matching
        Given I am at the login modal
        When I don't set a username nor a password
        Then an alert is displayed with the error "Please fill out Username and Password."

    Scenario: Scripts are not executed
        Given I am at the login modal
        When I set an script as the username and password
        Then an alert is displayed with the error "User does not exist."
        And the script wasn't executed
