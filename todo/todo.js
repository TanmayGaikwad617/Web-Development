document.addEventListener('DOMContentLoaded', () => {
    const addbtn = document.getElementById('add-button');
    const todoinput = document.getElementById('todo-input');
    const todolist = document.getElementById('to-do-Container');

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.forEach((task) => rendertask(task)); // Changed parameter name here too

    addbtn.addEventListener('click', () => {
        const tasktext = todoinput.value.trim();
        if (tasktext == "") return;

        const newtask = {
            id: Date.now(),
            text: tasktext,
            completed: false,
        };

        tasks.push(newtask);
        rendertask(newtask);
        save();
        todoinput.value = "";
        console.log(newtask);
    });

    function rendertask(task) { // Changed from 'tasks' to 'task'
        const li = document.createElement("li");
        li.setAttribute('data-id', task.id); // Now using 'task' consistently
        if (task.completed) li.classList.add("completed");
        
        li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
        `;
        
        li.addEventListener("click", (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed; // Using 'task' instead of 'tasks'
            li.classList.toggle('completed');
            save();
        });
        
        li.querySelector("button").addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id); // Now 'task.id' is correctly defined
            li.remove();
            save();
        });

        todolist.appendChild(li);
    }
    
    function save() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /*
    addbtn.addEventListener('click', function() {
        const value = todoinput.value;
        
        const li=document.createElement('li'); 
        li.textContent=value; 

        const delbtn =document.createElement('button');
        delbtn.innerText='X';
        delbtn.addEventListener('click',function(){
            li.remove();
        })
        

        todolist.appendChild(li);
        li.appendChild(delbtn);
        todoinput.value='';
    })
    */
})