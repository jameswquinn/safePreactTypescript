import { render, h } from 'preact';
import TodoList from './components/todo-list';
import "milligram"

render(
  <TodoList />,
  document.querySelector('#root')
);
