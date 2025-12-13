import React, { useState } from "react";

function Header() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function helper(e) {
    setNewTask(e.target.value);
  }

  function add() {
    if (newTask.trim() !== "") {
      setTasks(prev => [...prev,{text:newTask,completed:false}]);
      setNewTask("");
    }
  }

  function remove(index) {
    let removed=window.confirm("Are you sure you want to delete this task?");
    if(removed){
      const newdata = tasks.filter((_, i) => i !== index);
     setTasks(newdata);
    }
    
  }

  function moveUp(index) {
    if (index > 0) {
      const update = [...tasks];
      [update[index], update[index - 1]] = [update[index - 1], update[index]];
      setTasks(update);
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const update = [...tasks];
      [update[index], update[index + 1]] = [update[index + 1], update[index]];
      setTasks(update);
    }
  }

  function toggle(index){
    const update=[...tasks];

    update[index].completed=!update[index].completed;
    setTasks(update);
  }

  return (
<div className="min-h-screen flex items-center justify-center bg-yellow-100">


    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl
      p-6 backdrop-blur-lg">

     
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          Total: {tasks.length}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          Completed: {tasks.filter(val => val.completed).length}
        </span>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
          Pending: {tasks.filter(val => !val.completed).length}
        </span>
      </div>

     
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        📝 To-Do List
      </h1>

     
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={helper}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          onClick={add}
          className="bg-indigo-500 hover:bg-indigo-600 text-white
            px-5 py-2 rounded-xl font-semibold shadow-md transition"
        >
          Add
        </button>
      </div>

     
      <ul className="space-y-3">
        {tasks.map((value, i) => (
          <li
            key={i}
            className={`flex items-center justify-between px-4 py-3
              rounded-xl shadow-sm transition
              ${value.completed ? "bg-green-100" : "bg-gray-100"}`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={value.completed}
                onChange={() => toggle(i)}
                className="w-5 h-5 accent-indigo-500 cursor-pointer"
              />

              <span
                className={`font-medium
                  ${value.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"}`}
              >
                {value.text}
              </span>
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => moveUp(i)}
                className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-lg"
              >
                👆
              </button>
              <button
                onClick={() => moveDown(i)}
                className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-lg"
              >
                👇
              </button>
              <button
                onClick={() => remove(i)}
                className="bg-red-200 hover:bg-red-300 px-2 py-1 rounded-lg"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

     
      {tasks.length === 0 && (
        <p className="text-center text-gray-400 mt-6 italic">
          No tasks yet. Add one ✨
        </p>
      )}
    </div>
  </div>
);

}

export default Header;
