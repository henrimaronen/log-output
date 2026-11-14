export const renderPage = (src: string, todos: string[]): string => `<!DOCTYPE html>
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
      <img src="${src}" alt="Random picture" width="600" style="max-width: 600px; max-height: 600px;" />
      <input placeholder="Enter a new todo (max 140 characters)" type="text" />
      <button>Send</button>
    </div>
  <div style="width: 600px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <h3>Todos</h3>
      <ul style="width: 100%;">
        ${todos.map((todo: string): string => `<li>${todo}</li>`).join("")}
      </ul>
    </div>
  </body>
</html>`;
