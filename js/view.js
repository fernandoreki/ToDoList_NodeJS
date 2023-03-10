import AddTodo from "./components/addTodo.js";

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById('table');
    this.save = document.getElementById('save');
    this.add = document.getElementById('Add');

    this.addTodoForm = new AddTodo();

    this.addTodoForm.onClick((title, description) => this.addTodo(title, description));

    this.addTodoForm.onClickEdit((id, title, description) => this.updateTodo(id, title, description));
    this.save.style.visibility = 'collapse';
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  addTodo(title, description) {
    const todo = this.model.addTodo(title, description);
    this.createRow(todo);
  }

  createRow(todo) {
    const row = this.table.insertRow();
    row.setAttribute('id', todo.id);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center"></td>
      <td class="text-right"></td>
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo.id);
    row.children[2].appendChild(checkbox);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = ` <i class="fa fa-trash"></i>`;
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[3].appendChild(removeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-warning', 'mb-1', 'ml-1');
    editBtn.innerHTML = ` <i class="fa fa-edit"></i>`;

    editBtn.onclick = () => {
      add.style.visibility = 'collapse';
      save.style.visibility = 'visible';
      const title = row.children[0].innerText;
      const description = row.children[1].innerText;
      this.editTodo(todo.id, title, description);
    }
    row.children[3].appendChild(editBtn);
  }

  updateTodo(id, title, description) {
    this.model.updateTodo(id, title, description);
    const row = document.getElementById(id);
    row.children[0].innerText = title;
    row.children[1].innerText = description;
  }
  
  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  editTodo(id, title, description) {
    this.addTodoForm.getValues(id, title, description);
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

}