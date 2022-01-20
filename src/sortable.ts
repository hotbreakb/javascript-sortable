const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

// (2)
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    });
});

// (3)
containers.forEach(container => {
    container.addEventListener('dragover', () => {
        const draggable = document.querySelector('.dragging');

        if (draggable !== null) container.appendChild(draggable);
    });
});