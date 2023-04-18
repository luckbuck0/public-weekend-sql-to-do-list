console.log('hello');

$(document).ready(onReady);

function onReady(){
    showToDos()
    $('.list').on('click','.completeButton', update)
    $('.list').on('click', '.deleteButton',deleteToDo)
    $('#submit-Button').on('click', submit)
}

function showToDos(){

    $.ajax({
      method: 'GET',
      url: '/toDoList'
    }).then(function(response) {
      
      $('.list').empty();
      for (let list of response) {
        console.log(list.is_Complete);
        if(list.is_Complete!='false'){
        
       $('.list').append(`
       <li class="toDoDone" data-id=${list.id}>
         ${list.date} ${list.todo}<br>
         <button class="deleteButton">Delete</button>
       </li>
       
       
       `)
        }
        else {$('.list').append(`
        <li class="needToDo" data-id=${list.id}>
          ${list.date} ${list.todo}<br>
          <button class="deleteButton">Delete</button> 
          <button class="completeButton">Complete</button>
        </li>
       
      `)
      }   
    }}
    )
}


function submit(event){
    event.preventDefault()
    let date=$('#date').val()
    let thingToDo=$('#thingToDo').val()
    let is_Complete='false'
    
    $.ajax({
        method: 'POST',
        url: '/toDoList',
        data:{
            date: date,
            todo:thingToDo,
            is_Complete:is_Complete
        }
    }).then(function(response){
        showToDos()
    })
    
    console.log(thingToDo,date);
}

    function update(){
      console.log('hi');
              let idToUpdate = $(this).parent().data('id');
            let data=true
              $.ajax({
                method: 'PUT',
                url: `/toDoList/${idToUpdate}`,
                data: {
                   data
                }
              }).then(function(response) {
                showToDos()
              }).catch(function(error) {
                console.log('uh oh. updateToDos fail:', error);
              })
             
    }
      

function deleteToDo(){
    
    console.log('hi');
    let idToDelete = $(this).parent().data('id');

      $.ajax({
        method: 'DELETE',
        url: `/toDoList/${idToDelete}`
      }).then(function(response) {
    
        showToDos();
      }).catch(function(error) {
        alert('something broke');
      })
}