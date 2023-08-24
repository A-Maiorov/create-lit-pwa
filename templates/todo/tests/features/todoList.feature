Feature: Todo list
    Users want to see what they need to do

    Background:
        Given User visits TodoList page

    Scenario: "Add" button opens Add todo page
        When User clicks Add button
        Then User sees AddTodo page

    Scenario: Todo item click opens a todo edit page
        Given TodoList contains <index> item with status: <status> And text: <text>
        When User clicks Todo item with index <index>
        Then User sees EditTodo page
        Examples:
            | index | status | text         |
            | 1     | 'todo' | 'do nothing' |

    Scenario: "Delete button removes completed Todo"
        Given TodoList contains <index> item with status: <status> And text: <text>
        When User clicks Delete button on todo with index <index>
        Then Todo with <index> disappears
        Examples:
            | index | status | text         |
            | 1     | 'done' | 'do nothing' |

    Scenario: User sees active todo
        Given TodoList contains <index> item with status: <status> And text: <text>
        Then <index> item has right arrow icon
        And <index> item has priority
        And <index> item's text is NOT line-through
        Examples:
            | index | status | text         |
            | 1     | 'todo' | 'do nothing' |

    Scenario: User sees completed todo
        Given TodoList contains <index> item with status: <status> And text: <text>
        Then <index> item has NO right arrow icon
        And <index> item has delete button
        And <index> item has done icon
        Examples:
            | index | status | text         |
            | 1     | 'done' | 'do nothing' |



