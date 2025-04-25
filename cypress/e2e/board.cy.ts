/// <reference types="cypress" />
import '@testing-library/cypress'

// Add command type definition
declare global {
  namespace Cypress {
    interface Chainable {
      dragAndDrop(subject: string, target: string): Chainable<Element>
    }
  }
}

Cypress.Commands.add('dragAndDrop', (subject: string, target: string) => {
    Cypress.log({
        name: 'DRAGNDROP',
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 10;
    cy.get(target)
        .first()
        .then($target => {
            let coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .first()
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger('mousedown', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                            clientY: coordsDrag.y,
                            force: true
                        });
                    cy.get('body')
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x,
                            clientY: coordsDrop.y,
                            force: true            
                        })
                        .trigger('mouseup');
                });
        });
});

describe('Drag and Drop', () => {
    it('should add a task to the backlog column', () => {
        cy.visit('/');
        
        // Click the add task button for backlog
        cy.get('[data-testid="add-task-backlog"]').click();
        
        // Modal should be visible
        cy.get('[data-testid="modal-container"]').should('be.visible');
        
        // Fill the form
        cy.get('[data-testid="tag-input"]').type('CypressTest');
        cy.get('[data-testid="add-tag-button"]').click();
        cy.get('[data-testid="title-input"]').type('Cypress Test Task');
        cy.get('[data-testid="description-input"]').type('Testing with Cypress');
        cy.get('[data-testid="priority-select"]').select('medium');
        cy.get('[data-testid="deadline-input"]').type('50');
        
        // Submit the form
        cy.get('[data-testid="submit-button"]').click();
        
        // Verify the task is added to the backlog column
        cy.get('[data-testid="column-Backlog"]')
          .contains('Cypress Test Task')
          .should('exist');
    });
    
    it('should move a task from backlog to pending column', () => {
        cy.visit('/');
        cy.dragAndDrop('[data-testid="task-Admin Panel Front-end"]', '[data-testid="column-Pending"]');
    });
});