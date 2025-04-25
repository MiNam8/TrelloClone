/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useState } from 'react'
import { Board } from '../../data/board'
import { Columns } from '../../types'
import { onDragEnd } from '../../helpers/onDragEnd'
import { AddOutline } from 'react-ionicons'
import AddModal from '../../components/AddModal'
import Task from '../../components/Task'

// Add this type declaration
declare global {
  interface Window {
    testHelpers: {
      onDragEnd: (result: any) => void;
    };
  }
}

const Home = () => {
    const [columns, setColumns] = useState<Columns>(Board)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedColumn, setSelectedColumn] = useState('')

    const openModal = (columnId: any) => {
        setSelectedColumn(columnId)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleAddTask = (taskData: any) => {
        const newBoard = { ...columns }
        newBoard[selectedColumn].items.push(taskData)
        setColumns(newBoard);
    }

    const handleDragEnd = (result: DropResult) => {
        onDragEnd(result, columns, setColumns);
    };

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div data-testid="board-container" className="w-full flex items-start justify-between px-5 pb-8 md:gap-5 gap-10">
                    {Object.entries(columns).map(([columnId, column]: any) => {
                        return (
                            <div
                                className="w-full flex flex-col gap-0"
                                key={columnId}
                            >
                                <Droppable
                                    droppableId={columnId}
                                    key={columnId}
                                >
                                    {(provided: any) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                                                data-testid={`column-${column.name}`}
                                            >
                                                <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                                                    {column.name}
                                                </div>
                                                {column.items.map(
                                                    (task: any, index: any) => {
                                                        return (
                                                            <Draggable
                                                                key={task.id.toString()}
                                                                draggableId={task.id.toString()}
                                                                index={index}
                                                                data-testid={`task-${task.title}`}
                                                            >
                                                                {(
                                                                    provided: any
                                                                ) => {
                                                                    return (
                                                                        <>
                                                                            <Task
                                                                                provided={
                                                                                    provided
                                                                                }
                                                                                task={
                                                                                    task
                                                                                }
                                                                            />
                                                                        </>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    }
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    data-testid={`add-task-${columnId}`}
                                    onClick={() => {
                                        return openModal(columnId)
                                    }}
                                    onKeyDown={() => {
                                        return openModal(columnId)
                                    }}
                                    className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                                >
                                    <AddOutline color={'#555'} />
                                    Add Task
                                </div>
                            </div>
                        )
                    })}
                </div>
            </DragDropContext>

            <AddModal
                isOpen={modalOpen}
                onClose={closeModal}
                setOpen={setModalOpen}
                handleAddTask={handleAddTask}
            />
        </>
    )
}

export default Home
