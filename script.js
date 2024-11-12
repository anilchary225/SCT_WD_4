// DOM elements
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Event listener to add a task
addTaskButton.addEventListener('click', addTask);

// Function to add a task
function addTask() {
  const taskText = taskInput.value;
  const taskDateValue = taskDate.value;
  const taskTimeValue = taskTime.value;

  if (taskText === '' || taskDateValue === '' || taskTimeValue === '') {
    alert('Please enter a task, select a date, and select a time!');
    return;
  }

  const deadline = new Date(`${taskDateValue}T${taskTimeValue}`);
  const countdownText = getTimeRemaining(deadline);

  // Create a new list item
  const listItem = document.createElement('li');

  // Task text and deadline
  const taskContent = document.createElement('span');
  taskContent.classList.add('task-text');
  taskContent.textContent = taskText;

  // Countdown
  const countdown = document.createElement('span');
  countdown.classList.add('countdown');
  countdown.textContent = `Time left: ${countdownText}`;
  updateCountdown(countdown, deadline);

  // Checkbox for completing the task
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('checkbox');
  checkbox.addEventListener('change', () => {
    listItem.classList.toggle('completed');
  });

  // Actions: Edit, Delete
  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    const newTaskText = prompt('Edit your task', taskText);
    const newTaskDate = prompt('Edit task date (YYYY-MM-DD)', taskDateValue);
    const newTaskTime = prompt('Edit task time (HH:MM)', taskTimeValue);
    if (newTaskText && newTaskDate && newTaskTime) {
      taskContent.textContent = newTaskText;
      const newDeadline = new Date(`${newTaskDate}T${newTaskTime}`);
      updateCountdown(countdown, newDeadline);
    }
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    taskList.removeChild(listItem);
  });

  taskActions.appendChild(editButton);
  taskActions.appendChild(deleteButton);

  // Add task content, checkbox, countdown, and actions to the list item
  listItem.appendChild(checkbox);
  listItem.appendChild(taskContent);
  listItem.appendChild(countdown);
  listItem.appendChild(taskActions);

  // Append the new task to the list
  taskList.appendChild(listItem);

  // Clear input fields
  taskInput.value = '';
  taskDate.value = '';
  taskTime.value = '';
}

// Countdown logic
function getTimeRemaining(deadline) {
  const now = new Date();
  const diff = deadline - now;

  if (diff <= 0) return 'Expired';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
}

function updateCountdown(element, deadline) {
  const countdownInterval = setInterval(() => {
    const remaining = getTimeRemaining(deadline);
    element.textContent = `Time left: ${remaining}`;
    if (remaining === 'Expired') clearInterval(countdownInterval);
  }, 1000);
}