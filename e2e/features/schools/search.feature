Feature: Search all schools

  As a user I can search the list of all schools and select a school

  @schools @search
  Scenario: I can search the schools
    Given I am a parent
    When I tap on "search-button" component
    And I tap on "search-input" component
    And I type "Ryd" in "search-input"
    Then I should see 2 items in "all-school-list"
