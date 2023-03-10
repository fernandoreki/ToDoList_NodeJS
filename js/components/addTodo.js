import Alert from "./alert.js";

export default class AddTodo {
  constructor() {
    this.btn = document.getElementById('add');
    this.idH = document.getElementById('id');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    this.editBtn = document.getElementById('save');
    this.id = null;
    this.alert = new Alert();
  }

  getValues(id, title, description) {
    this.title.value = title;
    this.description.value = description;
    this.id = id;
  }

  onClick(callback) {
    this.btn.onclick = () => {
      if (this.title.value === '' || this.description.value === '') {
        this.alert.show('Title and description are required')
      } else {
        this.alert.hide();
        callback(this.title.value, this.description.value);
        this.title.value = '';
        this.description.value = '';
      }
    }
  }

  onClickEdit(callback) {
    this.editBtn.onclick = () => {
      if (this.title.value === '') {
        this.alert.show('Title is required')
      } else if (this.description.value === '') {
        this.alert.show('Description is required')
      } else {
        this.alert.hide();
        callback(this.id, this.title.value, this.description.value);
        this.title.value = '';
        this.description.value = '';
      }

    }
  }

}