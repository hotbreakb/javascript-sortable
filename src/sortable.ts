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
    container.addEventListener('dragover', (event) => {
        const mouseEvent = event as MouseEvent;
        const { closestElement, closestOffset } = getClosestElement(container, mouseEvent.clientY);
        const draggable = document.querySelector('.dragging');

        // (5)
        if (draggable != null) {
            if (closestOffset === Number.NEGATIVE_INFINITY) {
                container.appendChild(draggable);
            } else {
                container.insertBefore(draggable, closestElement);
            }
        }
    });
});

// (4)
let getClosestElement = (container: Element, clientY: number): { closestElement: Element, closestOffset: number } => {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging')];

    let closestOffset = Number.NEGATIVE_INFINITY;

    return {
        closestElement: draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = clientY - box.top - box.height / 2;

            // 가장 가까운 요소를 찾아서 갱신
            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                return child;
            } else {
                return closest;
            }
        }, draggableElements[0]), closestOffset: closestOffset
    };
};