// app.ts

interface Todo {
  id: number;
  text: string;
}

class TodoApp {
  private todos: Todo[] = [];
  private todoListElement: HTMLElement;
  private addTodoBtn: HTMLElement;
  private modal: HTMLElement;
  private closeButton: HTMLElement;
  private modalForm: HTMLFormElement;
  private modalInput: HTMLInputElement;

  constructor() {
      this.todoListElement = document.getElementById('todo-list')!;
      this.addTodoBtn = document.getElementById('add-todo-btn')!;
      this.modal = document.getElementById('modal')!;
      this.closeButton = this.modal.querySelector('.close-button')!;
      this.modalForm = document.getElementById('modal-todo-form') as HTMLFormElement;
      this.modalInput = document.getElementById('modal-todo-input') as HTMLInputElement;

      this.addTodoBtn.addEventListener('click', () => this.openModal());
      this.closeButton.addEventListener('click', () => this.closeModal());
      window.addEventListener('click', (e) => {
          if (e.target === this.modal) {
              this.closeModal();
          }
      });
      this.modalForm.addEventListener('submit', (e) => this.handleAddTodo(e));

      // もし既存のフォームがある場合は、以下のようにリスナーを追加
      /*
      const existingForm = document.getElementById('todo-form') as HTMLFormElement;
      const existingInput = document.getElementById('todo-input') as HTMLInputElement;
      existingForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.addTodo(existingInput.value);
          existingInput.value = '';
      });
      */
  }

  private openModal() {
      this.modal.style.display = 'block';
      this.modalInput.focus();
  }

  private closeModal() {
      this.modal.style.display = 'none';
      this.modalForm.reset();
  }

  private handleAddTodo(event: Event) {
      event.preventDefault();
      const todoText = this.modalInput.value.trim();
      if (todoText !== '') {
          this.addTodo(todoText);
          this.closeModal();
      }
  }

  private addTodo(text: string) {
      const newTodo: Todo = {
          id: Date.now(),
          text
      };
      this.todos.push(newTodo);
      this.renderTodo(newTodo);
  }

  private renderTodo(todo: Todo) {
      const li = document.createElement('li');
      li.textContent = todo.text;
      li.id = `todo-${todo.id}`;
      this.todoListElement.appendChild(li);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});