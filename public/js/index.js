var todos = ["clean room", "make bed", "wash car"];

function submitTodo() {
  for (var i = 0; i < todos.length; i++) {
    document.getElementById("todos").innerHTML += '<li>' + todos[i] + '</li>';
  };
};
