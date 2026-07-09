{
    // Usamos un bloque para evitar errores de redeclaración en la línea 1
    const S_URL = 'https://bwqcnuucqbbyszxciadj.supabase.co';
    // ¡IMPORTANTE! Reemplaza esta clave con tu "anon public" o "publishable key" completa de Supabase.
    const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cWNudXVjcWJieXN6eGNpYWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDA2NzAsImV4cCI6MjA5NDg3NjY3MH0.coNt_sJDy1jvCertSu1bwycnnkmwP_RSCwJZqIy7b78'; // Ejemplo de clave JWT

    // Verificamos que la librería de Supabase esté cargada
    if (typeof supabase === 'undefined') {
        console.error('La librería de Supabase no se cargó correctamente.');
        document.addEventListener('DOMContentLoaded', () => {
            const tbody = document.getElementById('supabase-table-body');
            if (tbody) tbody.innerHTML = `
                <tr><td colspan="4" class="text-error text-center">
                    <span class="lang-en">Error: Library not loaded</span>
                    <span class="lang-es">Error: Librería no cargada</span>
                </td></tr>`;
        });
    } else {
        const supabaseClient = supabase.createClient(S_URL, S_KEY);

        // Función para obtener los datos
        async function cargarDatos() {
            const { data, error } = await supabaseClient // Corregido: antes decía 'supabase'
                .from('Releases')
                .select('*');

            if (error) {
                console.error('Error al obtener datos de Supabase:', error);
                const tbody = document.getElementById('supabase-table-body');
                if (tbody) tbody.innerHTML = `
                    <tr><td colspan="4" class="text-error text-center">
                        <span class="lang-en">Error loading data: ${error.message}</span>
                        <span class="lang-es">Error al cargar datos: ${error.message}</span>
                    </td></tr>`;
                return;
            } else {
                console.log('Datos obtenidos de Supabase:', data); // Para depuración
            }

            renderizarDatos(data);
        }

        // Función para renderizar los datos en la tabla de daisyUI
        function renderizarDatos(data) {
            const tableBody = document.getElementById('supabase-table-body');
            if (!tableBody) return;

            if (!data || data.length === 0 || Object.keys(data[0]).length === 0) {
                tableBody.innerHTML = `
                    <tr><td colspan="4" class="text-center">
                        <span class="lang-en">No data available</span>
                        <span class="lang-es">No hay datos disponibles</span>
                    </td></tr>`;
                return;
            }

            tableBody.innerHTML = data.map(item => {
                return `
                    <tr>
                        <td>${item.Version ?? '-'}</td>
                        <td>${item.Alias ?? '-'}</td>
                        <td>${item.created_at ?? '-'}</td>
                        <td>
                            ${item.Link
                        ? `<ul class="wrapper_btns">
                              <li class="icon download">
                                <a href="${item.Link}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-full h-full text-current">
                                  <span class="tooltip">
                                    <span class="lang-en">Download</span>
                                    <span class="lang-es">Descargar</span>
                                  </span>
                                  <svg
                                    viewBox="0 0 256 256"
                                    height="32"
                                    width="38"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </a>
                              </li>
                              <li class="icon flash">
                                <a href="Flashing.html" class="flex items-center justify-center w-full h-full text-current">
                                  <span class="tooltip">
                                    <span class="lang-en">Flash</span>
                                    <span class="lang-es">Flasher</span>
                                  </span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-usb-plug-fill" viewBox="0 0 16 16">
                                    <path d="M6 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4H6zM7 1v1h1V1zm2 0v1h1V1zM5.5 5a.5.5 0 0 0-.5.5v4.894a2 2 0 0 0 .336 1.11l.83 1.245c.544.816.834 1.774.834 2.754 0 .275.222.497.497.497h2.006a.497.497 0 0 0 .497-.497c0-.98.29-1.938.834-2.754l.83-1.245a2 2 0 0 0 .336-1.11V5.5a.5.5 0 0 0-.5-.5z"/>
                                  </svg>
                                </a>
                              </li>
                           </ul>`
                        : '-'}
                        </td>
                    </tr>
                `;
            }).join('');
        }

        // Función para escuchar cambios en tiempo real
        function suscribirRealtime() {
            supabaseClient
                .channel('cambios-tabla-1')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'Releases' },
                    (payload) => {
                        console.log('Cambio detectado en tiempo real:', payload);
                        cargarDatos(); // Refrescamos la tabla completa al detectar un cambio
                    }
                )
                .subscribe();
        }

        // Ejecutar al cargar la página
        document.addEventListener('DOMContentLoaded', () => {
            cargarDatos();
            suscribirRealtime();
        });
    }
}