Feature: Users API
  Retrieve a user from the fake JSON API.

  Scenario: Get a user by ID
    Given the API base url is configured
    When I send a "GET" request to "/users/3"
    Then the response status should be 200
    And the response body should contain "id" with value 3
    And the response body property "name" should not be empty
