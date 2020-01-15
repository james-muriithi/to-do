let data = {
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
  item.remove();
}

let completeItem = function(e) {
  let item = $(e).parent().parent();
  let parent = item.parent();
  let parentId = parent.attr('id');

  let target = (parentId == 'todo') ? $('#completed') : $('#todo')

  item.prependTo(target)
}
