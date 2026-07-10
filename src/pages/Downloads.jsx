import { Link } from 'react-router-dom';
import { T } from '../context/LanguageContext';
import { useSupabaseReleases } from '../hooks/useSupabaseReleases';

function DownloadIcon() {
  return (
    <svg viewBox="0 0 256 256" height="28" width="28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12" fill="currentColor" />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4H6zM7 1v1h1V1zm2 0v1h1V1zM5.5 5a.5.5 0 0 0-.5.5v4.894a2 2 0 0 0 .336 1.11l.83 1.245c.544.816.834 1.774.834 2.754 0 .275.222.497.497.497h2.006a.497.497 0 0 0 .497-.497c0-.98.29-1.938.834-2.754l.83-1.245a2 2 0 0 0 .336-1.11V5.5a.5.5 0 0 0-.5-.5z" />
    </svg>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Downloads() {
  const { releases, loading, error } = useSupabaseReleases();

  return (
    <>
      {/* Header */}
      <section className="py-20 bg-base-300 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-primary mb-4">
            <T en="Downloads" es="Descargas" />
          </h1>
          <p className="text-xl opacity-70 max-w-xl mx-auto">
            <T
              en="Get the latest XOTLA firmware releases. Updates are reflected in real-time."
              es="Obtén las últimas versiones del firmware XOTLA. Las actualizaciones se reflejan en tiempo real."
            />
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4 overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th><T en="Version" es="Versión" /></th>
                <th><T en="Alias" es="Alias" /></th>
                <th><T en="Date" es="Fecha" /></th>
                <th><T en="Actions" es="Acciones" /></th>
              </tr>
            </thead>
            <tbody id="supabase-table-body">
              {loading && (
                <tr>
                  <td colSpan={4} className="text-center py-10">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={4} className="text-error text-center py-6">
                    <T en={`Error loading data: ${error}`} es={`Error al cargar datos: ${error}`} />
                  </td>
                </tr>
              )}
              {!loading && !error && releases.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6">
                    <T en="No data available" es="No hay datos disponibles" />
                  </td>
                </tr>
              )}
              {!loading && !error && releases.map((item) => (
                <tr key={item.id ?? item.Version}>
                  <td className="font-mono font-semibold text-primary">{item.Version ?? '-'}</td>
                  <td>{item.Alias ?? '-'}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td>
                    {item.Link ? (
                      <ul className="wrapper_btns">
                        <li className="icon download">
                          <a href={item.Link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
                            <span className="tooltip">
                              <T en="Download" es="Descargar" />
                            </span>
                            <DownloadIcon />
                          </a>
                        </li>
                        <li className="icon flash">
                          <Link to="/flashing" className="flex items-center justify-center w-full h-full">
                            <span className="tooltip">
                              <T en="Flash" es="Flashear" />
                            </span>
                            <FlashIcon />
                          </Link>
                        </li>
                      </ul>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>




    </>
  );
}
