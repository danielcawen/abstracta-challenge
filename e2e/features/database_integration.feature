Feature: DataBase Integration

    @db
    Scenario: The displayed information matches the backend
        Given I am at the home page
        When I go through all visible products
        Then They all match the information with the DataBase
