import type { Todo } from "../types/todo.ts";

const TODOS_FORM_ACTION: string =
  process.env.TODOS_FORM_ACTION ?? "http://localhost:3000/todos";

export const renderPage = (todos: Todo[]): string => /* html */ `<!DOCTYPE html>
<html>
  <head>
    <title>The Project</title>
    <style>
      input {
        flex: 1;
        padding: 8px 12px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        padding: 8px 16px;
        font-size: 14px;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      li {
        padding: 10px 12px;
        margin-bottom: 8px;
        background-color: #f5f5f5;
        border-left: 4px solid #007bff;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
  <div style="width: 600px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
    <h1>The Project</h1>
      <img src="/image" alt="Random picture" width="600" style="max-width: 600px; max-height: 600px;" />
      <form action="${TODOS_FORM_ACTION}" method="post" style="width: 100%; display: flex; gap: 10px;">
        <input name="title" placeholder="Enter a new todo (max 140 characters)" type="text" />
        <button type="submit">Send</button>
      </form>
    </div>
  <div style="width: 600px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <h3>Todos</h3>
      <ul style="width: 100%;">
        ${todos.map((todo: Todo): string => `<li>${todo.title}</li>`).join("")}
      </ul>
    </div>
  </body>
</html>`;
