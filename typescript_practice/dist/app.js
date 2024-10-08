"use strict";
// Todoアプリのクラス
class TodoApp {
    constructor() {
        this.todos = [];
        this.todoListElement = document.getElementById('todo-list');
        this.todoForm = document.getElementById('todo-form');
        this.todoInput = document.getElementById('todo-input');
        this.todoForm.addEventListener('submit', (e) => this.addTodo(e));
        this.render();
    }
    // Todoを追加するメソッド
    addTodo(event) {
        event.preventDefault();
        const text = this.todoInput.value.trim();
        if (text) {
            const newTodo = {
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
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.render();
    }
    // Todoの完了状態を切り替えるメソッド
    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo);
        this.render();
    }
    // Todoリストを描画するメソッド
    render() {
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
