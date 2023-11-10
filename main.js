let input = document.getElementById('input');
let btn = document.getElementById('add');
let txtcontainer = document.querySelector('.textcontainer');

// Retrieve existing items from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedItems = JSON.parse(localStorage.getItem('todos')) || [];
    storedItems.forEach((todoText) => {
        addTodoItem(todoText);
    });
});

btn.addEventListener('click', function () {
    if (input.value === '') {
        alert('Please enter a todo message');
    } else {
        addTodoItem(input.value);

        // Add the new item to localStorage
        updateLocalStorage();
    }
    input.value = '';
});

txtcontainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('deletebtn')) {
        deleteTodo(event.target.parentElement);

        // Update localStorage after deletion
        updateLocalStorage();
    }
});

function addTodoItem(text) {
    // creating a new output div
    let outputContainer = document.createElement('div');
    outputContainer.classList.add('outputContainer');
    txtcontainer.appendChild(outputContainer);
    // creating a list element
    let ul = document.createElement('li');
    ul.innerText = text;
    outputContainer.appendChild(ul);
    // creating new check button
    let check = document.createElement('button');
    check.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    check.classList.add('checkbtn');
    outputContainer.appendChild(check);
    // creating new button
    let delet = document.createElement('button');
    delet.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delet.classList.add('deletebtn');
    outputContainer.appendChild(delet);
    check.addEventListener('click', markItem);
}

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

        // Update localStorage after marking/unmarking
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const todos = Array.from(txtcontainer.children).map((outputContainer) => {
        return outputContainer.querySelector('li').innerText;
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}
