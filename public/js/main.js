// Asegúrate de que currentSlide esté declarada globalmente
let currentSlide = 0;

// Función para actualizar el contador de caracteres
function updateCharCount() {
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const maxLength = textarea.getAttribute('maxlength');
    const currentLength = textarea.value.length;
    const remaining = maxLength - currentLength;
    charCount.textContent = `${remaining} caracteres restantes`;

    // Habilitar o deshabilitar el botón de enviar
    toggleSubmitButton();
}

// Función para habilitar o deshabilitar el botón de enviar
function toggleSubmitButton() {
    const nombre = document.getElementById('name').value.trim();
    const correo = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('message').value.trim();
    const btn = document.querySelector('button[type="submit"]');

    if (nombre === '' || correo === '' || mensaje === '') {
        btn.disabled = true;
        btn.style.backgroundColor = '#555'; // Color de botón deshabilitado
    } else {
        btn.disabled = false;
        btn.style.backgroundColor = 'black'; // Color de botón habilitado
    }
}

// Función para enviar el mensaje (cambiar el texto del botón)
function sendMessage(event) {
    event.preventDefault(); // Evitar el envío automático del formulario

    const btn = document.querySelector('button[type="submit"]');
    btn.textContent = 'Enviado';
    setTimeout(() => {
        btn.textContent = 'Enviar'; // Cambiar de vuelta después de un tiempo
    }, 2000); // 2 segundos antes de restaurar el texto

    // Aquí puedes agregar una acción para enviar el mensaje, por ejemplo, a un servidor
    alert("¡Mensaje enviado correctamente!");
}

// Función para mover el carrusel
function moveSlide(step) {
    // Obtén todos los elementos de imagen en el carrusel
    const slides = document.querySelectorAll('.carousel-inner img');
    const totalSlides = slides.length;

    // Actualiza el índice de la diapositiva actual
    currentSlide = (currentSlide + step + totalSlides) % totalSlides;

    // Calcula el desplazamiento en porcentaje
    const offset = -currentSlide * 100;

    // Aplica el desplazamiento al carrusel
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

// Asegúrate de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa el contador de caracteres al cargar la página
    updateCharCount();

    // Añadir event listeners para habilitar/deshabilitar el botón y actualizar el contador de caracteres
    document.getElementById('name').addEventListener('input', updateCharCount);
    document.getElementById('email').addEventListener('input', updateCharCount);
    document.getElementById('message').addEventListener('input', updateCharCount);

    // Añadir event listener para el formulario de contacto
    const form = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const nameError = document.getElementById('name-error');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Obtener el valor del campo de nombre
        const nameValue = nameField.value.trim();

        // Validar longitud del nombre
        if (nameValue.length < 7) {
            nameError.textContent = 'El nombre completo debe tener al menos 7 caracteres.';
            nameError.style.display = 'inline'; // Mostrar el mensaje de error
            isValid = false;
        } else {
            nameError.textContent = ''; // Limpiar el mensaje de error
            nameError.style.display = 'none'; // Ocultar el mensaje de error
        }

        // Si la validación falla, prevenir el envío del formulario
        if (!isValid) {
            event.preventDefault();
        }
    });

    // Añadir event listener para el botón de enviar
    document.querySelector('button[type="submit"]').addEventListener('click', sendMessage);
});
