const todoList = document.querySelector("#todo-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

todoForm.addEventListener("submit", formHandler);

function formHandler(event) {
  event.preventDefault(); //отменяет обновление страницы при отправке формы

  //получаем задачу из инпута в консоль
  const taskText = todoInput.value.trim(); // удаляем пробелы в начале и конце строки
  if (taskText === "") {
    alert("Please enter a task.");
    return; // если строка пустая, выходим из функции
  }
  console.log(taskText); //выводим в консоль

  //создаем элемент li c помощью createElement
  const newTask = document.createElement("li");
  newTask.innerText = taskText; //добавляем текст внутрь элемента

  //создаем кнопку удалить
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("role", "button");
  deleteBtn.innerText = "Delete";
  deleteBtn.style["margin-left"] = "15px";
  newTask.append(deleteBtn);

  //добавляем слушателя событий на кнопку удалить
  deleteBtn.addEventListener("click", function () {
    console.log(this);
    this.closest("li").remove();
  });

  //добавляем элемент на страницу
  todoList.append(newTask);

  //очищаем инпут
  todoInput.value = "";

  //фокус на поле ввода
  todoInput.focus();
}
