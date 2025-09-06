HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="Todo.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><i class="fas fa-tasks"></i> Todo List</h1>
            <p>List your Tasks Here</p>
        </div>
        
        <div class="task-input">
            <input type="text" id="taskInput" placeholder="Enter a new task...">
            <button id="addTaskBtn"><i class="fas fa-plus"></i> Add Task</button>
        </div>
        
        <div class="controls">
            <div class="filters">
                <button class="filter-btn active" data-filter="all">All Tasks</button>
                <button class="filter-btn" data-filter="active">Active</button>
                <button class="filter-btn" data-filter="completed">Completed</button>
            </div>
            <div class="delete-all-container">
                <button class="delete-all-btn" id="deleteAllBtn" disabled>
                    <i class="fas fa-trash" style = "margin-right: 2px;"></i> Delete All
                </button>
            </div>
        </div>
        
        <div class="tasks" id="tasksContainer"> </div>
        
        <div class="stats">
            <span id="totalTasks">Total: 0 tasks</span>
            <span id="completedTasks">Completed: 0</span>
        </div>
    </div> 

    <div class="notifications-container" id="notificationsContainer"> </div>

   <script src="TodoList.js"> </script>
</body>
</html>

CSS

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Times New Roman', Times, serif;
}

body {
    background: linear-gradient(120deg, #e1e4e9 0%, #b7c6df 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 20px;
}

.container {
    width: 100%;
    max-width: 600px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
}

.header {
    background: #4a6fa5;
    color: white;
    padding: 25px 30px;
    text-align: center;
    flex-shrink: 0;
}

.header h1 {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 5px;
}

.header p {
    font-size: 20px;
    opacity: 0.9;
}

.task-input {
    padding: 25px;
    border-bottom: 1px solid #eee;
    display: flex;
    gap: 12px;
    flex-shrink: 0;
}

.task-input input {
    flex: 1;
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
}

.task-input input:focus {
    border-color: #4a6fa5;
    box-shadow: 0 0 0 2px rgba(74, 111, 165, 0.2);
}

.task-input button {
    background: #4a6fa5;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0 20px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.3s;
}

.task-input button:hover {
    background: #3a5a80;
}

.controls {
    display: flex;
    justify-content: space-between;
    padding: 15px 25px;
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
    flex-shrink: 0;
}

.filters {
    display: flex;
}

.filter-btn {
    padding: 8px 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    transition: all 0.3s;
    border-radius: 4px;
    margin-right: 8px;
}

.filter-btn.active {
    color: #4d75b1;
    background: rgba(65, 97, 145, 0.1);
}

.filter-btn:hover {
    background: rgba(86, 117, 163, 0.1);
}

.delete-all-btn {
    padding: 8px 16px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.3s;
}

.delete-all-btn:hover {
    background: #c82333;
}

.delete-all-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.tasks {
    padding: 0;
    flex: 1;
    overflow-y: auto;
    max-height: 400px;
}

.tasks::-webkit-scrollbar {
    width: 8px;
}

.tasks::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.tasks::-webkit-scrollbar-thumb {
    background: #b2b1b1;
    border-radius: 4px;
}

.tasks::-webkit-scrollbar-thumb:hover {
    background: #888888;
}

.task {
    display: flex;
    align-items: center;
    padding: 18px 25px;
    border-bottom: 1px solid #eee;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.task:hover {
    background: #f9fafb;
}

.task.completed {
    opacity: 0.7;
}

.task-check {
    margin-right: 15px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #ddd;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.task-check.checked {
    background: #4a6fa5;
    border-color: #4a6fa5;
}

.task-check.checked i {
    display: block;
    color: white;
    font-size: 12px;
}

.task-check i {
    display: none;
}

.task-text {
    flex: 1;
    font-size: 16px;
    color: #333;
    transition: all 0.3s;
}

.task.completed .task-text {
    text-decoration: line-through;
    color: #888;
    opacity: 0.6;
}

.task-delete {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 18px;
    padding: 5px;
    transition: color 0.3s;
}

.task-delete:hover {
    color: #dc3545;
}

.empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #888;
}

.empty-state i {
    font-size: 50px;
    margin-bottom: 15px;
    opacity: 0.5;
}

.empty-state p {
    font-size: 16px;
    margin-bottom: 10px;
}

.empty-state .subtext {
    font-size: 14px;
}

.stats {
    padding: 15px 25px;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
    flex-shrink: 0;
}

.notifications-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
}

.notification {
    padding: 16px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
    animation-fill-mode: both;
    min-width: 280px;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.notification.success {
    background: linear-gradient(135deg, #28a745, #20c997);
}

.notification.info {
    background: linear-gradient(135deg, #007bff, #6f42c1);
}

.notification.danger {
    background: linear-gradient(135deg, #dc3545, #e83e8c);
}

.notification.warning {
    background: linear-gradient(135deg, #ffc107, #ff8c00);
    color: #333;
}

.notification.vacant {
    background: linear-gradient(120deg, rgb(198, 197, 197), rgb(17, 221, 221));
    color: #333;
}

.notification i {
    font-size: 18px;
    flex-shrink: 0;
}

.notification-text {
    flex: 1;
    font-size: 14px;
    line-height: 1.4;
}

@media (max-width: 480px) {
    .task-input {
        flex-direction: column;
    }
    
    .task-input button {
        padding: 12px;
    }
    
    .controls {
        flex-direction: column;
        gap: 10px;
    }
    
    .filters {
        justify-content: center;
    }
    
    .delete-all-container {
        text-align: center;
    }
    
    .tasks {
        max-height: 350px;
    }
    
    .notifications-container {
        right: 10px;
        left: 10px;
        max-width: none;
    }
    
    .notification {
        min-width: auto;
    }
}

JS

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksContainer = document.getElementById('tasksContainer');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');
    const notificationsContainer = document.getElementById('notificationsContainer');
    
    let tasksArr = []; 
    let currentFilter = 'all';

    function loadTasks() { 
        let str = localStorage.getItem("tasks_data");
        tasksArr = str ? JSON.parse(str) : [];
    }

    function saveTasks() {
        localStorage.setItem("tasks_data", JSON.stringify(tasksArr));
    }

    function call() {
        loadTasks(); 
        displayTasks();
        updateCountOfTasks();
        
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                displayTasks();
            });
        });
        
        deleteAllBtn.addEventListener('click', deleteAllTasks);
    }
    
    function showNotification(message, type = 'success') { 
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon = '';
        switch(type) {
            case 'success': icon = 'fas fa-check-circle'; break;
            case 'info':    icon = 'fas fa-edit'; break;
            case 'danger':  icon = 'fas fa-trash-alt'; break;
            case 'vacant':  icon = 'fas fa-exclamation-circle'; break;
            case 'warning': icon = 'fas fa-check-double'; break;
        }
        
        notification.innerHTML = `
            <i class="${icon}"></i>
            <div class="notification-text">${message}</div>
        `;
        
        notificationsContainer.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    function addTask() { 
        const text = taskInput.value.trim();
        if (text) {
            const now = new Date().toLocaleString();
            const newTask = {
                id: Date.now(),
                text: text,
                completed: false,
                submittedAt: now,
                completedAt: null
            };
            tasksArr.unshift(newTask);
            taskInput.value = '';  
            displayTasks();
            updateCountOfTasks();
            EnableDeleteAll();
            saveTasks();
            showNotification(`Task "${text}" added successfully!`, 'success');
        }
        else {
            showNotification(`Enter Task First!`, 'vacant');
        }
    }
    
    function toggleTask(id) { 
        let task = tasksArr.find(t => t.id === id);
        if (!task) return;

        const previousState = task.completed;
        tasksArr = tasksArr.map(t => {
            if (t.id === id) {
                let updated = {...t, completed: !t.completed};
                updated.completedAt = updated.completed ? new Date().toLocaleString() : null;
                return updated;
            }
            return t;
        });
        
        displayTasks();
        updateCountOfTasks();
        saveTasks();
        
        if (!previousState && task.completed) {
            showNotification(`Task "${task.text}" completed!`, 'warning');
        }
    }
    
    function editTask(id) { 
        const task = tasksArr.find((t) => t.id === id);
        if (!task) return;
        const newText = prompt("Edit task:", task.text);
        if (newText && newText.trim() !== "" && newText.trim() !== task.text) {
            const oldText = task.text;
            task.text = newText.trim();
            displayTasks();
            updateCountOfTasks();
            saveTasks();
            showNotification(`Task "${oldText}" updated to "${newText.trim()}"`, 'info');
        }
        else {
           showNotification(`Task not updated`, 'vacant');
        }
    }
    
    function deleteTask(id) { 
        const task = tasksArr.find(t => t.id === id);
        if (!task) return;
        
        const taskText = task.text;
        tasksArr = tasksArr.filter(task => task.id !== id);
        displayTasks(); 
        updateCountOfTasks();
        EnableDeleteAll();
        saveTasks();
        showNotification(`Task "${taskText}" deleted`, 'danger');
    }
    
    function deleteAllTasks() {
        if (tasksArr.length === 0) return;
        if (confirm("Are you sure you want to delete all tasks?")) {
            const taskCount = tasksArr.length;
            tasksArr = [];
            displayTasks();
            updateCountOfTasks();
            EnableDeleteAll();
            saveTasks();
            showNotification(`All ${taskCount} tasks deleted`, 'danger');
        }
    }
    
    function EnableDeleteAll() { 
        if (tasksArr.length === 0) {
            deleteAllBtn.disabled = true;
            deleteAllBtn.style.opacity = 0.5;
            deleteAllBtn.style.cursor = 'not-allowed';
        } 
        else {
            deleteAllBtn.disabled = false;
            deleteAllBtn.style.opacity = 1;
            deleteAllBtn.style.cursor = 'pointer';
        }
    }
    
    function displayTasks() {
        const filteredTasks = tasksArr.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed; 
            return true;
        });
        
        tasksContainer.innerHTML = '';
        
        if (filteredTasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            let message, submessage;
            if (currentFilter === 'all') {
                message = 'No tasks yet!';
                submessage = 'Add a task to get started.';
            } 
            else if (currentFilter === 'active') {
                message = 'No active tasks!';
                submessage = 'All tasks are completed or Tasks are not entered.';
            }
            else {
                message = 'No completed tasks!';
                submessage = 'Complete some tasks to see them here.';
            }
            emptyState.innerHTML = `
                <i class="fas fa-clipboard-list"></i>
                <p>${message}</p>
                <div class="subtext">${submessage}</div>
            `;
            tasksContainer.appendChild(emptyState);
            return;
        }
        
        filteredTasks.forEach(task => {
            let taskElement = document.createElement('div');
            taskElement.className = `task ${task.completed ? 'completed' : ''}`;
            taskElement.innerHTML = `
                <div class="task-check ${task.completed ? 'checked' : ''}" data-id="${task.id}">
                    <i class="fas fa-check"></i>
                </div>
                <div class="task-text">
                    ${task.text}
                    <div style="font-size:12px; color:#666; margin-top:4px;">
                        <span>Submitted: ${task.submittedAt}</span><br>
                        ${task.completedAt ? `<span>Completed: ${task.completedAt}</span>` : ""}
                    </div>
                </div>
                <button class="task-edit" data-id="${task.id}" style="margin-left:8px; background:none; border:none; cursor:pointer; color:#4a6fa5;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-delete" data-id="${task.id}" style="margin-left:8px;">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            tasksContainer.appendChild(taskElement);
        });
        
        tasksContainer.querySelectorAll('.task-check').forEach(checkbox => {
            checkbox.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                toggleTask(id);
            });
        });
        
        tasksContainer.querySelectorAll('.task-delete').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteTask(id);
            });
        });
    
        tasksContainer.querySelectorAll('.task-edit').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                editTask(id);
            });
        });
    }
    
    function updateCountOfTasks() {
        const total = tasksArr.length;
        const completed = tasksArr.filter(task => task.completed).length;
        totalTasksSpan.textContent = `Total: ${total} task${total !== 1 ? 's' : ''}`;
        completedTasksSpan.textContent = `Completed: ${completed}`;
    }
    call();
});
