import React, { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            My Tasks
          </h1>

          <form onSubmit={addTodo} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
              >
                <PlusCircle size={20} />
                Add
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg group hover:bg-gray-100 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                >
                  {todo.completed ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <span
                  className={`flex-1 text-gray-800 ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {todos.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No tasks yet. Add one to get started!
              </div>
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-6 text-sm text-gray-500 text-center">
              {todos.filter(t => t.completed).length} of {todos.length} tasks completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;