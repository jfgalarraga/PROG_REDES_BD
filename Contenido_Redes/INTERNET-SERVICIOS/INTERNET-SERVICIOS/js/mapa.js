$(document).ready(function () {
    const map = $('#map');
    const container = $('#map-container');
    let scale = 1;
    const scaleStep = 0.2;
    const maxScale = 3;
    const minScale = 1;
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;

    // Zoom functionality
    $('#zoom-in').on('click', function () {
        if (scale < maxScale) {
            scale += scaleStep;
            updateTransform();
        }
    });

    $('#zoom-out').on('click', function () {
        if (scale > minScale) {
            scale -= scaleStep;
            updateTransform();
        }
    });

    $('#reset').on('click', function () {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    });

    // Pan functionality
    container.on('mousedown', function (e) {
        isPanning = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        container.css('cursor', 'grabbing');
    });

    container.on('mousemove', function (e) {
        if (isPanning) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        }
    });

    container.on('mouseup mouseleave', function () {
        isPanning = false;
        container.css('cursor', 'grab');
    });

    // Update the transform property
    function updateTransform() {
        map.css('transform', `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`);
    }
});