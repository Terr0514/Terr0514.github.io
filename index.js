document.addEventListener('DOMContentLoaded', () => {

    // ─── Mapa de botón distribuidor → modal de marca ───────────────────────
    const modalMap = {
        '1,1': 'patliteContainer',
        '2,1': 'dobotContainer',
        '3,1': 'optexContainer',
        '1,2': 'finderContainer',
        '2,2': 'contrinexContainer',
        '3,2': 'pilzContainer',
        '1,3': 'phoenixContainer',
        '2,3': 'parkerContainer',
        '3,3': 'moellerContainer',
    };

    // Mapa de imagen para cada botón distribuidor
    const imageMap = {
        '1,1': '/img/patliteButton.png',
        '2,1': '/img/dobotButton.png',
        '3,1': '/img/optexButton.png',
        '1,2': '/img/finderButton.png',
        '2,2': '/img/cortinexButton.png',
        '3,2': '/img/pilzButton.png',
        '1,3': '/img/phoenixButton.png',
        '2,3': '/img/parkerButton.png',
        '3,3': '/img/muellerButton.png',
    };

    // ─── Crear botones distribuidores ──────────────────────────────────────
    // f = fila (1-3), i = columna (1-3) → 1 botón por combinación = 9 total
    for (let f = 1; f <= 3; f++) {
        const container = document.getElementById('divButtons' + f);
        if (!container) continue;

        for (let i = 1; i <= 3; i++) {
            const boton = document.createElement('button');
            const key = i + ',' + f;
            boton.id = key;
            boton.className = 'button distButton';

            if (imageMap[key]) {
                boton.style.backgroundImage = `url(${imageMap[key]})`;
                boton.style.backgroundSize = 'cover';
                boton.style.backgroundPosition = 'center';
            }

            const modalTarget = modalMap[key] || null;
            boton.addEventListener('click', () => {
                if (modalTarget) abrirModal(modalTarget);
            });

            container.appendChild(boton);
        }
    }

    // ─── Botones "Regresar al inicio" en modales de marca ─────────────────
    document.querySelectorAll('.marcContainer-back:not(#productModal-back)').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modalBackground.active').forEach(modal => {
                // No cerrar el productModal desde aquí
                if (modal.id !== 'productModal') {
                    cerrarModal(modal.id);
                }
            });
        });
    });

    // ─── Botón "Regresar" del modal de producto ────────────────────────────
    document.getElementById('productModal-back').addEventListener('click', () => {
        cerrarModal('productModal');
        // El modal de marca sigue abierto debajo
    });

    // ─── Delegación de clicks en modales de marca → abre productModal ──────
    const brandModalIds = [
        'patliteContainer', 'dobotContainer', 'optexContainer',
        'finderContainer', 'contrinexContainer', 'pilzContainer',
        'phoenixContainer', 'parkerContainer', 'moellerContainer'
    ];

    brandModalIds.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            // Ignorar el botón de regresar
            if (btn.classList.contains('marcContainer-back')) return;

            // Ignorar clicks que burbujean desde fuera del marcContainer
            if (!btn.closest('.marcContainer')) return;

            // Leer datos del botón
            const productName = btn.dataset.product || 'Producto';
            const brandName   = btn.dataset.brand   || '';

            // Inyectar info en el productModal
            document.getElementById('productModal-title').textContent = productName;
            switch(brandName){
                case 'Patlite':
                    img =  document.getElementById('productModal-brand')
                    img.src = 'img/Patlite.png'
                    break;
                case 'Dobot':
                    img =  document.getElementById('productModal-brand')
                    img.src = 'img/Dobot-logo.png'
                    img.style.width = '200px'
                    
                case 'Optex FA':
                    img =  document.getElementById('productModal-brand')
                    img.src = 'img/Opex FA.png'
                    
                    break;
                case 'Finder':
                    img =  document.getElementById('productModal-brand')
                    img.src = 'img/Finder-logo.png'
                    
                    break;
                case 'Contrinex':
                    img =  document.getElementById('productModal-brand')
                    img.src = 'img/Contrinex-logo.png'
                    
                    break;
                case 'Pilz':
                    img =  document.getElementById('productModal-brand')
                    img.src = 'img/Pilz_logo.png'
                    
                    break;
                case 'Phoenix Contact':
                    img =  document.getElementById('productModal-brand')
                    img.src = 'img/Phoenix-logo.png'
                    img.className += ' phoenix'
                    break;
                case 'Parker':
                    img =  document.getElementById('productModal-brand')
                    img.src = 'img/Parker-logo.png'
                    
                    break;
                case 'Moeller':
                    img =  document.getElementById('productModal-brand')
                    img.src = 'img/Moeller-logo.png'
                    
                    break;
                
            }
            
            // Abrir el productModal encima del modal actual
            abrirModal('productModal');
        });
    });
});

// ─── Funciones globales de modal ──────────────────────────────────────────
function abrirModal(modalName) {
    const modal = document.getElementById(modalName);
    if (!modal) return;
    modal.classList.add('active');
}

function cerrarModal(modalName) {
    const modal = document.getElementById(modalName);
    if (!modal) return;
    modal.classList.remove('active');
}
 