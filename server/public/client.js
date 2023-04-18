
// log to see if everything is connected properly
console.log('hello');

// telling js that when document is ready to run onReady function
$(document).ready(onReady);

//-------------------------ONREADY FUNCTION---------------------------------
//Onready function to serve as staging point for other functions
function onReady(){
    // telling onReady to run showToDos functions when its called
    showToDos()
    // telling js to run the update function when the complete button is clicked
    $('.list').on('click','.completeButton', update)
    // telling js to run the delete function when the delete button is clicked
    $('.list').on('click', '.deleteButton',deleteToDo)
    // telling js to run the submit function when the submit button is clicked
    $('#submit-Button').on('click', submit)
}

//-------------------------SHOW FUNCTION---------------------------------

// the show to do function which takes everything from database and displays it on the dom
function showToDos(){
    // setting the values of input params on dom to '' as to empty it
    let date=$('#date').val('')
    let thingToDo=$('#thingToDo').val('')
// sending a get request to server to get the /toDoList
    $.ajax({
      method: 'GET',
      url: '/toDoList'
    }).then(function(response) {
      // emptying out the .list area to make room for updates
      $('.list').empty();
      // running a for loop on the database info retrieved from response
      for (let list of response) {
        console.log(list.is_Complete);
        // a if statement to identify if is_complete param on database is not false
        if(list.is_Complete!='false'){
        // if the conditional above is true then js is to append a list item with
        // the different properties retrieved from the looping of response plus 
        // to append a delete button
       $('.list').append(`
       <li class="toDoDone" data-id=${list.id}>
         ${list.date} ${list.todo}<br>
         <button class="deleteButton">Delete</button>
       </li>
       `)
        }
        // else if it is not true to append a list item with a different class name
        // with the properties retrieved from response plus a delete button and a complete button
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

//-------------------------SUBMIT FUNCTION---------------------------------

// a function for the submit button to send things to database
function submit(event){
    // to stop the default of form html
    event.preventDefault()
    // setting variables for the html inputs taken 
    let date=$('#date').val()
    let thingToDo=$('#thingToDo').val()
    let is_Complete='false'
    // sending a post route to the todolist which takes in the 
    // info from the inputs above and sends them to database
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

//-------------------------UPDATE FUNCTION---------------------------------
// function to update the is_complete param on database
    function update(){
      console.log('hi');
      // identifying what we want to delete
              let idToUpdate = $(this).parent().data('id');
              // making a variable for what we want to delete 
            let data=true
            // sending a put request which just updates a specific param 
            // in the database
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

//-------------------------DELETE FUNCTION---------------------------------
// function to delete the todo item
function deleteToDo(){
    
    console.log('hi');
    // identifying the thing we want to delete
    let idToDelete = $(this).parent().data('id');
    // sending a delete request with id
      $.ajax({
        method: 'DELETE',
        url: `/toDoList/${idToDelete}`
      }).then(function(response) {
    // running the showtodo to refresh 
        showToDos();
      }).catch(function(error) {
        alert('something broke');
      })
}