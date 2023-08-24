Feature: Todo Add
  Users want to add new Todo Items

  Scenario: TodoEdit page has save button
    Given todoList is empty
    When User opens TodoAdd page
    Then User sees AddTodo page
    And Save button is visible
    And Cancel button is visible
