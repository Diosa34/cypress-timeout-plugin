// Example:
// cy.colorLog('Not matching expected result', '#FF0000',
//              { displayName: "ERROR:", data: { comments: 'Wrong!', toDo: 'Need way more practice' } })
Cypress.Commands.add('colorLog',
    (message, hexColor, { displayName, $el, data = {}}) => {
        Cypress.log({
            displayName,
            message,
            $el,
            consoleProps: () => {
                // return an object which will
                // print to dev tools console on click
                return {
                    displayName,
                    message,
                    $el,
                    ...data
                }
            },
        })
    }
)