import Todo from "./todo.js";

const { range, filter, fromEvent, of } = rxjs;

const todoForm = document.getElementById("todo-form");
const taskMessageInput = document.getElementById("task-message");
const taskTagInput = document.getElementById("task-tag");

const currentDate = new Date();
const [month, weekday] = currentDate
  .toLocaleDateString(undefined, { month: "short", weekday: "long" })
  .split(" ");
const year = currentDate.getFullYear();
const day = currentDate.getDate();

const setCurrentDate = () => {
  document.getElementById("todo-day").innerText = day;
  document.getElementById("todo-year").innerText = year;
  document.getElementById("todo-month").innerText = month;
  document.getElementById("todo-weekday").innerText = weekday;
};

const initTodo = () => {
  const todo = new Todo();
  setCurrentDate();

  let todoModalToggle = fromEvent(
    document.getElementById("todo-add"),
    "click"
  ).subscribe((_) => {
    todoForm.classList.toggle("open");
  });

  let todoAddSubscription = fromEvent(
    document.getElementById("todo-form"),
    "submit"
  ).subscribe((e) => {
    e.preventDefault();
    const message = taskMessageInput.value;
    const tag = taskTagInput.value;
    if (message && tag) {
      todo.addTask({ message, tag });
      todoForm.classList.toggle("open");
    }
  });

  let sendMessageToParent = fromEvent(
    document.getElementById("send-message-btn"),
    "click"
  ).subscribe((_) => {
    console.log("Enviando mensaje");
    window.parent.postMessage("Hello World from iframe", "*");
  });
};

window.onload = initTodo();
