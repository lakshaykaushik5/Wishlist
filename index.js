let userinput = document.querySelector(".input");
let addbtn = document.querySelector(".button");
let showtodo = document.querySelector(".todos-container");
let todo = "";
// let todo_arr = [];

let localData = JSON.parse(localStorage.getItem("todos"))
let todo_arr=localData||[];
// console.log(userinput);

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

addbtn.addEventListener("click", (e) => {
  e.preventDefault();
  todo = userinput.value;
  if (todo.length > 0) {
    todo_arr.push({ todo, id: uuid(), isCompleted: false });
  }
  render(todo_arr);
  localStorage.setItem("todos", JSON.stringify(todo_arr));
  userinput.value="";
  
});

showtodo.addEventListener("click", (e) => {
  let key = e.target.dataset.key;
  let deletekey = e.target.dataset.todokey;
  todo_arr = todo_arr.map(todo =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  todo_arr = todo_arr.filter(todo => todo.id !== deletekey);
  
  localStorage.setItem("todo",JSON.stringify(todo_arr));
  userinput.value="";
  console.log(todo_arr);
  render(todo_arr);
});

function render(todo_arr) {
  showtodo.innerHTML = todo_arr.map(
    ({
      todo,
      id,
      isCompleted,
    }) => `<div class="relative"><input id="item-${id}" type="checkbox" class="t-pointer t-checkbox" data-key=${id} ${
      isCompleted ? "checked" : ""
    }>
    <label for="item-${id}" data-key=${id} class="todo t-pointer todo-text ${
      isCompleted ? "checked-todo" : ""
    }">${todo}
    </label><button class="absolute right-0 button cursor" data-todokey=${id}><span class=" del-btn material-icons-outlined" data-todokey=${id}>
    delete_outline
    </span></button></div>`
  );
}

render(todo_arr);
