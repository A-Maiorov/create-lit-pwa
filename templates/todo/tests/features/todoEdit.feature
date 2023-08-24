Feature: Todo Edit
  Users want to edit their Todo Items

  Background:
    Given TodoList contains 1 item with status: "todo" And text: "do nothing"

  Scenario: TodoEdit page has save button
    When User opens TodoEdit page
    Then Save button is visible
    And Cancel button is visible
    And Complete button is visible
    And Delete button is visible
