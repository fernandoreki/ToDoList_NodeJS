
export default class Model {
  constructor() {
    this.bntAd = document.getElementById('add');
    this.bntSa = document.getElementById('save');

    this.view = null;
    this.todos = JSON.parse(localStorage.getItem('todos'));
    if (!this.todos || this.todos.length < 1) {
      this.todos = [];
      this.currentId = 0;
    } else {
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  setView(view) {
    this.view = view;
  }

  getTodos() {
    return this.todos.map((todo) => ({ ...todo }));
  }

  findTodo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  addTodo(title, description) {
      const todo = {
        id: this.currentId++,
        title,
        description,
        completed: false
      }
      this.todos.push(todo);
      this.save();
      return { ...todo };
  }


  removeTodo(id) {
    const index = this.findTodo(id);
    this.todos.splice(index, 1);
    this.save();
  }

  toggleCompleted(id) {
    const index = this.findTodo(id);
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    this.save();
  }

  updateTodo(id, title, description){
    const index = this.findTodo(id);
    this.todos[index].title = title;
    this.todos[index].description = description;
    this.save();
    this.bntAd.style.visibility = 'visible';
    this.bntSa.style.visibility = 'collapse';
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}