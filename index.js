document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("create-task-form");
    const taskList = document.getElementById("tasks");
    let tasks = [];
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const taskDescription = document.getElementById("new-task-description").value;
      const taskPriority = document.getElementById("task-priority").value;
      const taskDueDate = document.getElementById("task-due-date").value;
  
      if (taskDescription !== "") {
        tasks.push({ description: taskDescription, priority: taskPriority, dueDate: taskDueDate });
        renderTasks();
      }
  
      // Clear the input fields
      document.getElementById("new-task-description").value = "";
      document.getElementById("task-due-date").value = "";
    });
  
    function renderTasks() {
      // Clear the task list
      taskList.innerHTML = "";
  
      // Sort tasks by priority: high -> medium -> low
      const sortedTasks = tasks.sort((a, b) => {
        const priorities = { high: 1, medium: 2, low: 3 };
        return priorities[a.priority] - priorities[b.priority];
      });
  
      // Add tasks to the DOM
      sortedTasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerText = `${task.description} (Due: ${task.dueDate || "No due date"})`;
  
        // Set task color based on priority
        switch (task.priority) {
          case "high":
            taskItem.style.color = "red";
            break;
          case "medium":
            taskItem.style.color = "yellow";
            break;
          case "low":
            taskItem.style.color = "green";
            break;
        }
  
        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
          tasks = tasks.filter(t => t.description !== task.description);
          renderTasks();
        });
  
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
      });
    }
  });
  