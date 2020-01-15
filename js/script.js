let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: []
};

// Remove and complete icons font-awesome
let removeIcon = '<i class="fa fa-trash fs-19 text-danger"></i>';
let completeIcon = '<i class="fa fa-check fs-19 text-success"></i>';

$('#add').on('click', function() {
  let value = $('#item').val();
  if ($.trim(value)) {
    addItem(value)
  }
});


$(document).on('click','.complete', function(event) {
  completeItem(this);
});


$(document).on('click','.remove', function(event) {
  removeItem(this);
});


let addItem = function(value) {
  $('#item').val('');
  data.todo.push(value);
  updateStorage();
  addItemToDOM(value, false)
}
// keydown listener
$('#item').on('keydown', function(e) {
  let value = $(this).val();
  if ((e.key === 'Enter' || e.keyCode === 13) && value) {
    addItem(value);
  }
})

let addItemToDOM = function(value, completed) {
  let list = completed ? $('#completed') : $('#todo');

  let item = $('<li></li>');
  item.text(value)


  let buttons = $('<div class="buttons"></div>');

  let removeButton = $('<button class="remove"></button>');
  removeButton.html(removeIcon);

  let completeButton = $('<button class="complete"></button>');
  completeButton.html(completeIcon);

  buttons.append(removeButton)
  buttons.append(completeButton)

  item.append(buttons)


  list.prepend(item) 
}

let removeItem = function(e) {
  let item = $(e).parent().parent();
  let parentId = item.parent().attr('id');
  let value = $(item).text();
  item.remove();

  if (parentId === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    updateStorage()
}

let completeItem = function(e) {
  let item = $(e).parent().parent();
  let parent = item.parent();
  let parentId = parent.attr('id');
  let value = $(item).text();

  let target = (parentId == 'todo') ? $('#completed') : $('#todo')

  item.prependTo(target)

  if (parentId === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    updateStorage();
}

let fetchSaved = function (){
    if (!data.todo.length && !data.completed.length) return;

    data.todo.forEach(function(value,index){
        addItemToDOM(value,false);
    });

    data.completed.forEach(function(value,index){
        addItemToDOM(value,true);
    });
}

let updateStorage = function () {
    localStorage.setItem('todoList', JSON.stringify(data));
}

$(document).ready(function() {
    fetchSaved();
});