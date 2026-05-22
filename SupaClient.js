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
            if (tbody) tbody.innerHTML = `<tr><td colspan="3" class="text-error text-center">Error: Librería no cargada</td></tr>`;
        });
    } else {
        const supabaseClient = supabase.createClient(S_URL, S_KEY);

        // Función para obtener los datos
        async function cargarDatos() {
            const { data, error } = await supabaseClient // Corregido: antes decía 'supabase'
                .from('table_1')
                .select('*');

            if (error) {
                console.error('Error al obtener datos de Supabase:', error);
                const tbody = document.getElementById('supabase-table-body');
                if (tbody) tbody.innerHTML = `<tr><td colspan="3" class="text-error text-center">Error al cargar datos: ${error.message}</td></tr>`;
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
                tableBody.innerHTML = `<tr><td colspan="4" class="text-center">No hay datos disponibles</td></tr>`;
                return;
            }

            tableBody.innerHTML = data.map(item => {
                const values = Object.values(item);
                return `
                    <tr>
                        <td>${values[0] !== undefined ? values[0] : '-'}</td>
                        <td>${values[1] !== undefined ? values[1] : '-'}</td>
                        <td>${values[2] !== undefined ? values[2] : '-'}</td>
                        <td>${values[3] !== undefined ? values[3] : '-'}</td>
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
                    { event: '*', schema: 'public', table: 'table_1' },
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