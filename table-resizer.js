document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.table-zebra');
    if (!table) return;

    // Ensure table-layout is fixed for predictable column resizing
    table.style.tableLayout = 'fixed';

    const headers = table.querySelectorAll('th');
    let currentResizer;
    let startX;
    let startWidth;
    let currentColumn;

    headers.forEach((header, index) => {
        const resizer = document.createElement('div');
        resizer.classList.add('resizer');
        // Add a class for styling the resizer
        header.appendChild(resizer);

        resizer.addEventListener('mousedown', (e) => {
            currentResizer = resizer;
            startX = e.clientX;
            startWidth = header.offsetWidth;
            currentColumn = header;

            // Prevent text selection during drag
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'col-resize';

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });
    });

    function handleMouseMove(e) {
        if (!currentResizer) return;

        const deltaX = e.clientX - startX;
        const newWidth = startWidth + deltaX;

        // Optional: Set a minimum width
        if (newWidth > 50) { // Minimum width of 50px
            currentColumn.style.width = `${newWidth}px`;
        }
    }

    function handleMouseUp() {
        currentResizer = null;
        currentColumn = null;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    // Add some basic CSS for the resizer
    const style = document.createElement('style');
    style.textContent = `
        .resizer {
            position: absolute;
            right: 0;
            top: 0;
            width: 5px;
            height: 100%;
            background: transparent; /* Make it invisible */
            cursor: col-resize;
            user-select: none;
        }
        th {
            position: relative; /* Needed for absolute positioning of resizer */
            padding-right: 10px; /* Adjust padding to make space for resizer */
        }
        /* Optional: Add a visual indicator on hover */
        .resizer:hover, .resizer.active {
            background-color: rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
});