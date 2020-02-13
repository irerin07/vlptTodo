import React, { createContext, useContext, useReducer, useRef } from 'react';

const initialTodos = [
    {
        id:1,
        text: '1',
        done: true,
    },
    {
        id:2,
        text: '2',
        done: true,
    },
    {
        id:3,
        text: '3',
        done: true,
    },
    {
        id:4,
        text: '4',
        done: false,
    },
    {
        id:5,
        text: '5',
        done: false,
    },
];

function todoReducer(state, action) {
    switch (action.type){
        case "CREATE" :
            return state.concat(action.todo);
        case "TOGGLE" :
            return state.map(
                todo => todo.id === action.id ? { ...todo, done: !todo.done} : todo
            );
        case 'REMOVE' :
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(6);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value = {nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if(!context) {
        throw new Error('Can not find TodoProvider')
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if(!context) {
        throw new Error('Can not find TodoProvider')
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if(!context) {
        throw new Error('Can not find TodoProvider')
    }
    return context;
}