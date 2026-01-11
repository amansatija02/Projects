# Todo List Web App

A simple but feature-rich Todo List application built using **HTML, CSS, and Vanilla JavaScript**.
Tasks are stored in **localStorage**, so data persists after page reloads.

---

## Features

* Add new tasks
* Edit existing tasks
* Mark tasks as completed or active
* Delete individual tasks
* Delete all tasks at once (with confirmation)
* Filter tasks:

  * All
  * Active
  * Completed
* Task timestamps:

  * Submitted time
  * Completed time
* Task statistics:

  * Total tasks
  * Completed tasks
* Notifications for all major actions
* Fully responsive UI
* LocalStorage-based persistence (no backend)

---

## Tech Stack

* **HTML5** – Structure
* **CSS3** – Styling, animations, responsive layout
* **JavaScript (ES6)** – Logic and DOM manipulation
* **Font Awesome** – Icons
* **LocalStorage API** – Data persistence

---

## Project Structure

```
Todo-List/
│
├── index.html        # Main HTML file
├── Todo.css          # Styling and layout
├── TodoList.js       # Application logic
└── README.md         # Project documentation
```

---

## How It Works (Logic Overview)

### Data Handling

* All tasks are stored in `localStorage` under the key:

  ```
  tasks_data
  ```
* Each task object looks like this:

  ```js
  {
    id: Number,
    text: String,
    completed: Boolean,
    submittedAt: String,
    completedAt: String | null
  }
  ```

### Core Functions

* `loadTasks()` – Fetches tasks from localStorage
* `saveTasks()` – Saves updated task list
* `addTask()` – Adds a new task
* `toggleTask(id)` – Marks task complete/incomplete
* `editTask(id)` – Updates task text
* `deleteTask(id)` – Deletes a single task
* `deleteAllTasks()` – Clears all tasks
* `displayTasks()` – Renders tasks based on filter
* `updateCountOfTasks()` – Updates task stats
* `showNotification()` – Displays toast messages

---

## How to Run

No setup. No dependencies.

1. Download or clone the project
2. Open `index.html` in any modern browser
3. Start adding tasks

That’s it.

---

## Screens & UI Behavior

* Tasks animate in using CSS keyframes
* Notifications auto-dismiss after 3 seconds
* Delete All button is disabled when there are no tasks
* Filters update the task list instantly
* Mobile-friendly layout using media queries

---

## Limitations (Be Honest)

This is **not** a full-stack app.

* No backend
* No user authentication
* Data is browser-specific
* `prompt()` is used for editing (not ideal UX)
* Inline styles exist inside JavaScript (bad practice)
* No modular JS structure
* No error handling for corrupted localStorage data

---

## Improvements You Should Make Next

If you want this to look serious on GitHub or in interviews, do these:

1. Replace `prompt()` with a modal
2. Move inline styles to CSS
3. Split JS into modules
4. Add keyboard navigation support
5. Add search functionality
6. Migrate to backend (Flask / Node) if learning full stack
7. Add unit tests (even basic ones)

---

## Who This Project Is For

* Beginners learning DOM manipulation
* Students practicing JavaScript logic
* Anyone learning localStorage usage
* Portfolio starter project

---

## License

Free to use. Modify it. Break it. Improve it.

---


