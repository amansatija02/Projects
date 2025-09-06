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
