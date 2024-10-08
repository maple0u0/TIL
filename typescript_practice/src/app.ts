// Todoインターフェースの定義
interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  // Todoアプリのクラス
  class TodoApp {
    private todos: Todo[] = [];
    private todoListElement: HTMLElement;
    private todoForm: HTMLFormElement;
    private todoInput: HTMLInputElement;
  
    constructor() {
      this.todoListElement = document.getElementById('todo-list')!;
      this.todoForm = document.getElementById('todo-form') as HTMLFormElement;
      this.todoInput = document.getElementById('todo-input') as HTMLInputElement;
  
      this.todoForm.addEventListener('submit', (e) => this.addTodo(e));
      this.render();
    }
  
    // Todoを追加するメソッド
    private addTodo(event: Event): void {
      event.preventDefault();
      const text = this.todoInput.value.trim();
      if (text) {
        const newTodo: Todo = {
          id: Date.now(),
          text,
          completed: false,
        };
        this.todos.push(newTodo);
        this.todoInput.value = '';
        this.render();
      }
    }
  
    // Todoを削除するメソッド
    private deleteTodo(id: number): void {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.render();
    }
  
    // Todoの完了状態を切り替えるメソッド
    private toggleTodo(id: number): void {
      this.todos = this.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.render();
    }
  
    // Todoリストを描画するメソッド
    private render(): void {
      // 既存のリストをクリア
      this.todoListElement.innerHTML = '';
  
      // 各Todoをリストに追加
      this.todos.forEach((todo) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.className = todo.completed ? 'completed' : '';
  
        // 完了状態を切り替えるためのクリックイベント
        li.addEventListener('click', () => this.toggleTodo(todo.id));
  
        // 削除ボタンの作成
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', (e) => {
          e.stopPropagation(); // 親要素のクリックイベントを停止
          this.deleteTodo(todo.id);
        });
  
        li.appendChild(deleteButton);
        this.todoListElement.appendChild(li);
      });
    }
  }
  
  // アプリケーションの初期化
  window.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
  });