export default class Todo {
  tasks;
  circleMaskElement;
  circlesFillElement;
  taskListElement;
  todoCountElement;
  constructor() {
    this.initTodo();
  }

  initTodo() {
    this.circleMaskElement = document.querySelector(".circle-mask.full");
    this.circlesFillElement = document.querySelectorAll(".circle .fill");
    this.taskListElement = document.getElementById("todo-list");
    this.todoCountElement = document.getElementById("todo-count");
    this.tasks = Array.from(JSON.parse(localStorage.getItem("tasks")) || []);
    this.tasks.forEach(({ id, message, tag, completed }) => {
      this.addTaskElement({ id, message, tag, completed });
    });
    this.recalculateTotalCount();
  }

  addTask({ message, tag }) {
    const id = `${Math.random()
      .toString(16)
      .slice(2)}-${new Date().getMilliseconds()}`;
    const task = { id, message, tag, completed: false };
    this.addTaskElement(task);
    this.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.recalculateTotalCount();
  }

  addTaskElement({ id, message, tag, completed = false }) {
    const li = document.createElement("li");
    li.className = "todo-list__item";
    li.id = `task-li-${id}`;
    this.generateItem({
      id,
      message,
      tag,
      completed,
      nodeParent: li,
    });
    this.taskListElement.appendChild(li);
  }

  generateItem({ id, message, tag, completed, nodeParent }) {
    const input = document.createElement("input");
    const label = document.createElement("label");
    const p = document.createElement("p");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    input.id = id;
    input.type = "checkbox";
    input.name = "todo";
    input.checked = completed;
    label.htmlFor = id;
    input.onchange = () => this.changeStatus(id);
    p.innerText = message;
    span.innerText = tag;
    deleteBtn.title = "Delete task";
    deleteBtn.type = "button";
    deleteBtn.onclick = () => this.deleteTask(id);
    label.appendChild(p);
    label.appendChild(span);
    nodeParent.appendChild(input);
    nodeParent.appendChild(label);
    nodeParent.appendChild(deleteBtn);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((el) => el.id !== id);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.recalculateTotalCount();
    const li = document.getElementById(`task-li-${id}`);
    li.remove();
  }

  changeStatus(id) {
    const task = this.tasks.find((el) => el.id === id);
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.recalculateTotalCount();
  }

  recalculateTotalCount() {
    const completedTasks = this.tasks.filter((el) => el.completed).length;
    this.todoCountElement.innerText = `${completedTasks} of ${this.tasks.length}`;
    const total = (180 / this.tasks.length) * completedTasks;
    this.circleMaskElement.style.transform = `rotate(${total}deg)`;
    this.circlesFillElement.forEach((el) => {
      el.style.transform = `rotate(${total}deg)`;
    });
  }
}
