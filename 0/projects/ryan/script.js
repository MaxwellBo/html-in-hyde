document.addEventListener('DOMContentLoaded', () => {
    // Create custom cursor
    const customCursor = document.createElement('img');
    customCursor.src = 'brain-cursor.png';
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.pageX - 100}px`; // Adjust for new cursor size
        customCursor.style.top = `${e.pageY - 100}px`; // Adjust for new cursor size

        const arms = document.querySelectorAll('.zombie-arm');
        arms.forEach(arm => {
            const armRect = arm.getBoundingClientRect();
            const armX = armRect.left + armRect.width / 2;
            const armY = armRect.bottom; // Use the bottom of the arm as the pivot point
            const angle = Math.atan2(e.pageY - armY, e.pageX - armX) * (180 / Math.PI);
            arm.style.transform = `rotate(${angle}deg)`;
        });
    });
});
