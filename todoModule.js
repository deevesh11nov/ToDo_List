var todolistApp=(function(){
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
    
    
    var a=10;
    // API calls
    async function fetchtodo(){
    
        // // GET request
        // fetch('https://jsonplaceholder.typicode.com/todos') // Here 'fetch' fn. return a promise.
        // // Use then on promise to get the response
        //    .then(function(response){
        //        // Convert the response int Json
        //        return response.json();
    
        //    }).then(function(data){
        //       tasks=data.slice(0,10);
        //       renderList();
        //    }).catch(function(error){
        //     console.log('error',error)
        //    })
    
        //async Await
    
        try {
            const response= await fetch('https://jsonplaceholder.typicode.com/todos') ;
            const data =await response.json();
            tasks=data.slice(0,10);
            renderList();
            
        } catch (error) {
            console.log('error');
        }
    
           
    }
    function addTaskToDoM(task){
        const li=document.createElement('li');
    
        li.innerHTML=`
                 <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' :''} class="custom-checkbox">
                 <label for="${task.id}">${task.title}</label>
                 <img src="trash-can-solid.svg" class="delete" data-id="${task.id}" />
                 
           `;
              tasksList.append(li);
    }
    
    function renderList () {
        tasksList.innerHTML='';
    
        for(let i=0;i<tasks.length;i++){
            addTaskToDoM(tasks[i]);
        }
        tasksCounter.innerHTML=tasks.length;
    }
    
    function toggleTask (taskId) {
        const task=tasks.filter(function(task){
             return task.id == Number(taskId);
         })
          if(task.length>0){
              const currentTask=task[0];
              currentTask.completed=!currentTask.completed;
              renderList();
              showNotification("Task is Toggled completed");
              return;
          }
          showNotification("Task toggled not completed");
    }
    
    function deleteTask (taskId) {
         const newTask=tasks.filter(function(task){
             return task.id !== Number(taskId);
         })
    
         tasks=newTask;
         renderList();
         showNotification("Task deleted Succesfully");
    }
    
    function addTask (task) {
        if(task){
        tasks.push(task);
        renderList();
        showNotification("Task has been added");
        return;
        }
        showNotification("Task cannot be added");
    }
    
    function showNotification(text) {
        alert(text);
    }
    
    function handelInputKeypress(e){
        if(e.key==='Enter'){
          const text= e.target.value;
                    // console.log(text);
          if(!text){
              showNotification("Task text cannot be empty");
              return;
          }
          const task={
              title:text,
              id:Date.now(),
              completed:false
          }
          e.target.value=''; // This line is to make text box empty.
          addTask(task);
        }
    
    
    }
    
    function handleClickListner(e){
        const target =e.target;
        // console.log(target);
    
        if(target.className == 'delete'){
            const taskId= target.dataset.id;
            deleteTask(taskId);
             return;
        }
        if(target.className =='custom-checkbox'){
            const taskId= target.id;
            toggleTask(taskId);
            return;
        }
    
    
    
    }
    
    function initializeApp(){
        fetchtodo();
        addTaskInput.addEventListener('keyup',handelInputKeypress);
        document.addEventListener('click',handleClickListner);  //This handles the click at any where in the webpage.
    }
    initializeApp();
    return{
        initialize :initializeApp,
        a:a
    }
    
    })()