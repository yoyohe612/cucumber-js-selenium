@math
Feature: Web Selenium Test
url:https://www.exercise1.com/values

  Scenario: totalBalance
    Given open url "https://www.exercise1.com/values"
    Then I should get correct number of values
    Then I should get all values larger than 0
    Then I should get all values with currencies
    And I should get the correct balance