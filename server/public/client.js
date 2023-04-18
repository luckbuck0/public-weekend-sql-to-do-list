console.log('hello');

$(document).ready(onReady);

function onReady(){
    showToDos()
    $('.list').on('click','.completeButton', update)
    $('.list').on('click', '.deleteButton',update)
}

function showToDos(){

    $.ajax({
      method: 'GET',
      url: '/toDoList'
    }).then(function(response) {
      
      $('.list').empty();
      for (let list of response) {
        if(list.is_Complete=='true'){
            console.log(list.is_Complete);
        
       $('.list').append(`
       <li class="toDoDone" data-id=${list.id}>
         ${list.date} ${list.todo}
       </li>
       <button class="deleteButton">Delete</button>
       <button class="completeButton">Complete</button>
       `)
        }
        else {$('.list').append(`
        <li class="needToDo" data-id=${list.id}>
          ${list.date} ${list.todo}
        </li>
        <button class="deleteButton">Delete</button>
        <button class="completeButton">Complete</button>
      `)
      }   
    }}
    )
}

    function update(){
      console.log('hi');
              let idToUpdate = $(this).parent().data('id');
            console.log(idToUpdate);
            //   $.ajax({
            //     method: 'PUT',
            //     url: `/toDoList/${idToUpdate}`,
            //     data: {
            //       is_Complete: 'True'
            //     }
            //   }).then(function(response) {
            //     showToDos()
            //   }).catch(function(error) {
            //     console.log('uh oh. updateToDos fail:', error);
            //   })
    }
      