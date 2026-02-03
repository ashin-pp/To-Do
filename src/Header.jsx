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



  function toggle(index){
    const update=[...tasks];

    update[index].completed=!update[index].completed;
    setTasks(update);
  }

  return (
<div className="min-h-screen flex items-center justify-center bg-yellow-100">


    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl
      p-6 backdrop-blur-lg">
             
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
          
            maxLength={20}
            minLength={3}
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
                onClick={() => remove(i)}
                className="bg-red-200 hover:bg-red-300 px-2 py-1 rounded-lg"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

     
     
    </div>
  </div>
);

}

export default Header;
