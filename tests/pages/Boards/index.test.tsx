import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../../../src/pages/Boards'

// Add this at the top of your file
declare global {
  interface Window {
    mockedDragDropContext: { onDragEnd: any };
    testHelpers: {
      onDragEnd: (result: any) => void;
    };
  }
}

vi.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => children,
  Droppable: ({ children }) => children({ 
    innerRef: () => {}, 
    droppableProps: {}, 
    placeholder: null
  }),
  Draggable: ({ children }) => children({
    innerRef: () => {},
    draggableProps: {},
    dragHandleProps: {}
  })
}));

describe('Home Component', () => {
    beforeEach(() => {
        vi.mock('../../src/helpers/getRandomColors', () => ({
            getRandomColors: () => ({ bg: '#f0f0f0', text: '#000000' })
        }))
    })

    describe('Render', () => {
        it('should render the component', () => {
            render(<Home />)
            expect(screen.getByText('Backlog')).toBeInTheDocument()
        })

        it('should render 5 columns', () => {
            render(<Home />)
            const modalContainer = screen.getAllByTestId(/add-task/)
            expect(modalContainer).toHaveLength(5)
        })

        it('should render the AddModal when the button is clicked', () => {
            render(<Home />)
            const addButton = screen.getByTestId('add-task-backlog')
            fireEvent.click(addButton)
            expect(screen.getByTestId('modal-container')).toHaveClass('grid')
        })
    })

    describe('Add Task', () => {
        it('should add a task to the backlog column', () => {
            render(<Home />)
            
            const addButton = screen.getByTestId('add-task-backlog')
            fireEvent.click(addButton)
            const modalContainer = screen.getByTestId('modal-container')
            expect(modalContainer).toHaveClass('grid')
            const tagInput = screen.getByTestId('tag-input')
            fireEvent.change(tagInput, { target: { value: 'Test' } })
            const addTagButton = screen.getByTestId('add-tag-button')
            fireEvent.click(addTagButton)
            const titleInput = screen.getByTestId('title-input')
            fireEvent.change(titleInput, { target: { value: 'Test' } })
            const descriptionInput = screen.getByTestId('description-input')
            fireEvent.change(descriptionInput, { target: { value: 'Test' } })
            const prioritySelect = screen.getByTestId('priority-select')
            fireEvent.change(prioritySelect, { target: { value: 'Test' } })
            const deadlineInput = screen.getByTestId('deadline-input')
            fireEvent.change(deadlineInput, { target: { value: 'Test' } })
            const submitButton = screen.getByTestId('submit-button')
            fireEvent.click(submitButton)

            const task = screen.getByTestId('task-Test')
            expect(task).toBeInTheDocument()

            // Find the closest column ancestor
            const columnElement = task.closest('[data-testid^="column-"]');

            // Verify it's the expected column
            expect(columnElement).toHaveAttribute('data-testid', `column-Backlog`);
        })

        it('should add a task to the pending column', () => {
            render(<Home />)
            
            const addButton = screen.getByTestId('add-task-pending')
            fireEvent.click(addButton)
            const modalContainer = screen.getByTestId('modal-container')
            expect(modalContainer).toHaveClass('grid')
            const tagInput = screen.getByTestId('tag-input')
            fireEvent.change(tagInput, { target: { value: 'Test1' } })
            const addTagButton = screen.getByTestId('add-tag-button')
            fireEvent.click(addTagButton)
            const titleInput = screen.getByTestId('title-input')
            fireEvent.change(titleInput, { target: { value: 'Test1' } })
            const descriptionInput = screen.getByTestId('description-input')
            fireEvent.change(descriptionInput, { target: { value: 'Test1' } })
            const prioritySelect = screen.getByTestId('priority-select')
            fireEvent.change(prioritySelect, { target: { value: 'Test1' } })
            const deadlineInput = screen.getByTestId('deadline-input')
            fireEvent.change(deadlineInput, { target: { value: 'Test1' } })
            const submitButton = screen.getByTestId('submit-button')
            fireEvent.click(submitButton)

            const task = screen.getByTestId('task-Test1')
            expect(task).toBeInTheDocument()

            // Find the closest column ancestor
            const columnElement = task.closest('[data-testid^="column-"]');

            // Verify it's the expected column
            expect(columnElement).toHaveAttribute('data-testid', `column-Pending`);
        })

        it('should add a task to the todo column', () => {
            render(<Home />)
            
            const addButton = screen.getByTestId('add-task-todo')
            fireEvent.click(addButton)
            const modalContainer = screen.getByTestId('modal-container')
            expect(modalContainer).toHaveClass('grid')
            const tagInput = screen.getByTestId('tag-input')
            fireEvent.change(tagInput, { target: { value: 'Test2' } })
            const addTagButton = screen.getByTestId('add-tag-button')
            fireEvent.click(addTagButton)
            const titleInput = screen.getByTestId('title-input')    
            fireEvent.change(titleInput, { target: { value: 'Test2' } })
            const descriptionInput = screen.getByTestId('description-input')
            fireEvent.change(descriptionInput, { target: { value: 'Test2' } })
            const prioritySelect = screen.getByTestId('priority-select')
            fireEvent.change(prioritySelect, { target: { value: 'Test2' } })
            const deadlineInput = screen.getByTestId('deadline-input')
            fireEvent.change(deadlineInput, { target: { value: 'Test2' } })
            const submitButton = screen.getByTestId('submit-button')
            fireEvent.click(submitButton)

            const task = screen.getByTestId('task-Test2')
            expect(task).toBeInTheDocument()

            // Find the closest column ancestor
            const columnElement = task.closest('[data-testid^="column-"]');

            // Verify it's the expected column
            expect(columnElement).toHaveAttribute('data-testid', `column-To Do`);
        })

        it('should add a task to the doing column', () => {
            render(<Home />)
            
            const addButton = screen.getByTestId('add-task-doing')
            fireEvent.click(addButton)
            const modalContainer = screen.getByTestId('modal-container')
            expect(modalContainer).toHaveClass('grid')
            const tagInput = screen.getByTestId('tag-input')
            fireEvent.change(tagInput, { target: { value: 'Test3' } })
            const addTagButton = screen.getByTestId('add-tag-button')
            fireEvent.click(addTagButton)   
            const titleInput = screen.getByTestId('title-input')    
            fireEvent.change(titleInput, { target: { value: 'Test3' } })
            const descriptionInput = screen.getByTestId('description-input')
            fireEvent.change(descriptionInput, { target: { value: 'Test3' } })
            const prioritySelect = screen.getByTestId('priority-select')
            fireEvent.change(prioritySelect, { target: { value: 'Test3' } })
            const deadlineInput = screen.getByTestId('deadline-input')
            fireEvent.change(deadlineInput, { target: { value: 'Test3' } })
            const submitButton = screen.getByTestId('submit-button')
            fireEvent.click(submitButton)

            const task = screen.getByTestId('task-Test3')
            expect(task).toBeInTheDocument()
        })

        it('should add a task to the done column', () => {
            render(<Home />)
            
            const addButton = screen.getByTestId('add-task-done')
            fireEvent.click(addButton)
            const modalContainer = screen.getByTestId('modal-container')
            expect(modalContainer).toHaveClass('grid')
            const tagInput = screen.getByTestId('tag-input')
            fireEvent.change(tagInput, { target: { value: 'Test4' } })
            const addTagButton = screen.getByTestId('add-tag-button')
            fireEvent.click(addTagButton)
            const titleInput = screen.getByTestId('title-input')
            fireEvent.change(titleInput, { target: { value: 'Test4' } })
            const descriptionInput = screen.getByTestId('description-input')
            fireEvent.change(descriptionInput, { target: { value: 'Test4' } })
            const prioritySelect = screen.getByTestId('priority-select')
            fireEvent.change(prioritySelect, { target: { value: 'Test4' } })
            const deadlineInput = screen.getByTestId('deadline-input')
            fireEvent.change(deadlineInput, { target: { value: 'Test4' } })
            const submitButton = screen.getByTestId('submit-button')
            fireEvent.click(submitButton)

            const task = screen.getByTestId('task-Test4')
            expect(task).toBeInTheDocument()

            // Find the closest column ancestor
            const columnElement = task.closest('[data-testid^="column-"]');

            // Verify it's the expected column
            expect(columnElement).toHaveAttribute('data-testid', `column-Done`);
        })
    })

    // describe('Drag and Drop', () => {

    //     it('should move a task from backlog to pending column', () => {
    //         render(<Home />)
            
    //         cy.get('[data-testid="column-Backlog"]')
    //         .find('[data-testid="task-Admin Panel Front-end"]')
    //         .as('sourceTask').trigger('dragstart');

    //         cy.get('[data-testid="column-Pending"]').as('targetColumn');
            
    //         cy.get('@targetColumn')
    //         .trigger('dragover', { force: true })
    //         .trigger('drop', { force: true });

    //         cy.get('@targetColumn')
    //         .find('[data-testid="task-Admin Panel Front-end"]')
    //     })
    // })

})