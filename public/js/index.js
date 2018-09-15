var todos = ["clean room", "make bed", "wash car"];

function submitTodo() {
  var getElement = document.getElementById("todos");
  for (var i = 0; i < todos.length; i++) {
    getElement.innerHTML += '<li>' + todos[i] + '</li>';
  };
};
