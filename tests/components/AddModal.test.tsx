import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddModal from '../../src/components/AddModal'
import '@testing-library/jest-dom'

// Custom test utility function
const expectElementCountToIncrease = (
  queryFn: () => HTMLElement[],
  action: () => void,
  expectedIncrease = 1
) => {
  const initialCount = queryFn().length
  action()
  const finalCount = queryFn().length
  expect(finalCount).toBe(initialCount + expectedIncrease)
}

// Helper functions
const renderOpenModal = () => {
  return render(
    <AddModal
      isOpen={true}
      onClose={vi.fn()}
      setOpen={vi.fn()}
      handleAddTask={vi.fn()}
    />
  )
}

const addTag = async (tagName: string) => {
  const tagInput = screen.getByTestId('tag-input')
  const addTagButton = screen.getByTestId('add-tag-button')
  
  await userEvent.clear(tagInput)
  await userEvent.type(tagInput, tagName)
  await userEvent.click(addTagButton)
}

// Mock for predictable colors
vi.mock('../../src/helpers/getRandomColors', () => ({
  getRandomColors: () => ({ bg: '#f0f0f0', text: '#000000' })
}))

describe('AddModal Component', () => {
  // Each test gets a fresh component 
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  describe('Tag Management', () => {
    it('should add a new tag when tag title is entered and Add Tag button is clicked', async () => {
      // Arrange
      renderOpenModal()
      const tagsContainer = screen.getByTestId('tags-container')
      expect(tagsContainer.children).toHaveLength(0)
      
      // Act
      await addTag('Important')
      
      // Assert
      expect(tagsContainer.children).toHaveLength(1)
      expect(screen.getByTestId('tag-Important')).toBeInTheDocument()
      expect(screen.getByTestId('tag-Important')).toHaveTextContent('Important')
    })
    
    it('should clear tag input after adding a tag', async () => {
      // Arrange
      renderOpenModal()
      const tagInput = screen.getByTestId('tag-input')
      
      // Act
      await userEvent.type(tagInput, 'Important')
      expect(tagInput).toHaveValue('Important')
      await userEvent.click(screen.getByTestId('add-tag-button'))
      
      // Assert
      expect(tagInput).toHaveValue('')
    })
    
    it('should support adding multiple tags', async () => {
      // Arrange
      renderOpenModal()
      const tagsContainer = screen.getByTestId('tags-container')
      
      // Act
      await addTag('Important')
      await addTag('Urgent')
      
      // Assert
      expect(tagsContainer.children).toHaveLength(2)
      expect(screen.getByTestId('tag-Important')).toBeInTheDocument()
      expect(screen.getByTestId('tag-Urgent')).toBeInTheDocument()
    })
    
    it('should not add empty tags', async () => {
      // Arrange
      renderOpenModal()
      const tagsContainer = screen.getByTestId('tags-container')
      
      // Act
      await addTag('   ') // Whitespace only
      
      // Assert
      expect(tagsContainer.children).toHaveLength(0)
    })
    
    it('should apply styles to tags', async () => {
      // Arrange
      renderOpenModal()
      
      // Act
      await addTag('Important')
      
      // Assert
      const tag = screen.getByTestId('tag-Important')
      expect(tag).toHaveStyle({
        backgroundColor: '#f0f0f0',
        color: '#000000'
      })
    })
  })
  
  describe('Modal Visibility', () => {
    it('should display when isOpen is true', () => {
      // Arrange & Act
      renderOpenModal()
      
      // Assert
      const modalContainer = screen.getByTestId('modal-container')
      expect(modalContainer).toHaveClass('grid')
      expect(modalContainer).not.toHaveClass('hidden')
    })
    
    it('should not display when isOpen is false', () => {
      // Arrange & Act
      render(<AddModal isOpen={false} onClose={vi.fn()} setOpen={vi.fn()} handleAddTask={vi.fn()} />)
      
      // Assert 
      const modalContainer = screen.getByTestId('modal-container')
      expect(modalContainer).toHaveClass('hidden')
      expect(modalContainer).not.toHaveClass('grid')
    })
  })
})
