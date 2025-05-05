(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // Función para mostrar/ocultar contenido dinámico en las tarjetas
    function toggleContent(id) {
        const content = document.getElementById(id);
        if (content.classList.contains('d-none')) {
            content.classList.remove('d-none');
        } else {
            content.classList.add('d-none');
        }
    }

    // Exponer la función para ser llamada desde el HTML
    window.toggleContent = toggleContent;


    
    document.querySelectorAll('a[href="#servicios"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Ajusta el desplazamiento según la posición exacta del elemento
            const target = document.querySelector(this.getAttribute('href'));
            const offset = -100; // Ajusta este valor según lo que necesites (en píxeles)

            // Realiza un desplazamiento suave
            window.scrollTo({
                top: target.offsetTop + offset,
                behavior: 'smooth'
            });
        });
    });

    // Función para mostrar/ocultar el contenido
    function toggleInfo(card) {
        const info = card.querySelector('.info');
        const content = card.querySelector('.p-4'); // Seleccionamos el área que queremos expandir

        // Comprobamos si la sección de información está visible
        if (info.style.display === 'none' || info.style.display === '') {
            // Mostrar la información
            info.style.display = 'block';
            // Expande el contenedor de la tarjeta para ajustarse al contenido
            content.style.maxHeight = content.scrollHeight + "px"; // Ajustamos la altura del contenedor
        } else {
            // Ocultar la información
            info.style.display = 'none';
            // Reducimos la altura del contenedor
            content.style.maxHeight = null;
        }
    }

    // Listener de clic para las tarjetas
    document.querySelectorAll('.uniform-card').forEach(function(card) {
        card.addEventListener('click', function() {
            toggleInfo(card);
        });
    });



})(jQuery);

