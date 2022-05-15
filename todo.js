const { range, filter, map, fromEvent, of } = rxjs;

let todoAddSubscription;

class Todo {
  tasks;
  constructor() {
    this.initTodo();
  }

  initTodo() {
    this.tasks = Array.from(JSON.parse(localStorage.getItem("tasks")) || []);
    this.tasks.forEach(({ id, message, tag, completed }) => {
      this.addTaskElement({ id, message, tag, completed });
    });
  }

  addTask({ message, tag }) {
    const id = `${Math.random()
      .toString(16)
      .slice(2)}-${new Date().getMilliseconds()}`;
    const task = { id, message, tag, completed: false };
    this.addTaskElement(task);
    this.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTaskElement({ id, message, tag, completed = false }) {
    const list = document.getElementById("todo-list");
    if (list) {
      const li = document.createElement("li");
      li.className = "todo-list__item";
      this.generateItem({
        id,
        message,
        tag,
        completed,
        nodeParent: li,
      });
      list.appendChild(li);
    }
  }

  generateItem({ id, message, tag, completed, nodeParent }) {
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.id = id;
    input.type = "checkbox";
    input.name = "todo";
    input.checked = completed;
    label.htmlFor = id;

    const p = document.createElement("p");
    const span = document.createElement("span");
    p.innerText = message;
    span.innerText = tag;
    label.appendChild(p);
    label.appendChild(span);
    nodeParent.appendChild(input);
    nodeParent.appendChild(label);
  }

  changeStatus(id) {
    console.log("Cambiar estado de la tarea con Id: " + id);
  }
}

const initTodo = () => {
  const todo = new Todo();

  todoAddSubscription = fromEvent(
    document.getElementById("todo-add"),
    "click"
  ).subscribe((_) => {
    todo.addTask({ message: "Test", tag: "Tag" });
  });
};

const finishTodo = () => {
  if (todoAddSubscription) {
    todoAddSubscription.unsubscribe();
  }
};

window.onload = initTodo();
