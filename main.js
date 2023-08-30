let input = document.getElementById('input');
let btn = document.getElementById('add');
let txtcontainer = document.querySelector('.textcontainer');

btn.addEventListener('click', todolist);

function todolist () {
    if (input.value === ''){
        alert('Please enter a todo massage');
    }
    else{
    // creating a new output div
    let outputContainer = document.createElement('div');
    outputContainer.classList.add('outputContainer');
    txtcontainer.appendChild(outputContainer);
    // creating a list element
    let ul = document.createElement('li');
    ul.innerText = input.value;
    outputContainer.appendChild(ul);
    // creating new check button
    let check = document.createElement('button');
    check.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    check.classList.add('checkbtn');
    outputContainer.appendChild(check);
    // crearing new button 
    let delet = document.createElement('button');
    delet.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delet.classList.add('deletebtn');
    outputContainer.appendChild(delet);
    check.addEventListener('click', markItem);
    }
    input.value = '';
}

txtcontainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('deletebtn')) {
        deleteTodo(event.target.parentElement);
    }
});

function deleteTodo(outputContainer) {
    txtcontainer.removeChild(outputContainer);
}


function markItem(event) {
    const checkButton = event.target.closest('.checkbtn');
    if (checkButton) {
        const outputContainer = checkButton.parentElement;
        const listItem = outputContainer.querySelector('li');
        
        if (listItem.style.textDecoration === 'line-through') {
            listItem.style.textDecoration = 'none';
        } else {
            listItem.style.textDecoration = 'line-through';
        }
    }
}



