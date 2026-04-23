Feature: Buy Products

    @purchase
    Scenario: A user is able to buy a product
        Given I am at the cart page with a product on it
        When I place an order
        And Purchase it with all the order information set
        Then The purchase is correctly set
