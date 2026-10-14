// Temporarry storage for todo items
let todos = [];
let activeStatusFilter = "all";

// Global references to DOM elements
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const statusFilter = document.getElementById("status-filter");
const filterToggle = document.getElementById("filter-toggle");
const todoList = document.getElementById("todo-list");


function addTodo() {
    if (todoInput.value === '' || todoDate.value === '') {
        alert("Please fill in both fields.");
        return;
    }

    todos.push({
        text: todoInput.value,
        date: todoDate.value,
        status: "todo"
    });

    todoInput.value = '';
    todoDate.value = '';

    renderTodos();
}

// Function to render todo items to the DOM
function renderTodos() {
    todoList.innerHTML = '';

    const visibleTodos = todos
        .map((todo, index) => ({ todo, index }))
        .filter(({ todo }) => activeStatusFilter === "all" || (todo.status || "todo") === activeStatusFilter);

    if (visibleTodos.length === 0) {
        const emptyMessage = todos.length === 0 ? "No todos available" : "Tidak ada todo dengan status ini.";
        todoList.innerHTML = `<li class="sigma">${emptyMessage}</li>`;
        return;
    }

    visibleTodos.forEach(({ todo, index }) => {
        const status = todo.status || "todo";
        todoList.innerHTML += `
        <li>
            <div class="todo-row">
                <p>${todo.text}</p>
                <div class="todo-meta">
                    <select class="todo-status status-${status}" aria-label="Todo status" onchange="updateTodoStatus(${index}, this.value)">
                        <option value="todo" ${status === "todo" ? "selected" : ""}>Todo</option>
                        <option value="doing" ${status === "doing" ? "selected" : ""}>Doing</option>
                        <option value="done" ${status === "done" ? "selected" : ""}>Done</option>
                    </select>
                    <span>${todo.date}</span>
                </div>
            </div>
        </li>`;
    });
}

function updateTodoStatus(index, status) {
    todos[index].status = status;
    renderTodos();
}

// FUnction to clear all todo items
function clearTodo() {
    todos = [];
    renderTodos();
    
    if (confirm("Yakin mau hapus semua daftar tugas?")) {
        todos = [];
        todoInput.value = "";
        todoDate.value = "";
        renderTodos();
        alert("Daftar tugas berhasil di-reset!");
    }
}


function toggleFilter() {
    statusFilter.hidden = !statusFilter.hidden;
    filterToggle.setAttribute("aria-expanded", String(!statusFilter.hidden));

    if (!statusFilter.hidden) {
        statusFilter.focus();
    }
}

function filterTodos() {
    activeStatusFilter = statusFilter.value;
    renderTodos();
}