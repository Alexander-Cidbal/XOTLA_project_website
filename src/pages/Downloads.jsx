import { Link } from "react-router-dom";
import { T } from "../context/LanguageContext";
import { useSupabaseReleases } from "../hooks/useSupabaseReleases";
import { useState } from "react";

// Mini_Flasher component - reusable modal for flashing firmware
function Mini_Flasher({ item, isOpen, onClose }) {
  if (!isOpen || !item) return null;

  return (
    <dialog id={`modal-flash-${item.id ?? item.Version}`} className="modal" open>
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4">
          <T en="Flashing Tool" es="Herramienta de Flasheo" />
        </h3>
        <div className="space-y-3 text-sm bg-base-200 p-4 rounded-lg">
          <div className="flex justify-between">
            <span className="opacity-70">
              <T en="Version" es="Versión" />:
            </span>
            <span className="font-mono font-semibold">{item.Version ?? "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">
              <T en="Alias" es="Alias" />:
            </span>
            <span>{item.Alias ?? "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">
              <T en="Date" es="Fecha" />:
            </span>
            <span>{formatDate(item.created_at)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">
              <T en="Link" es="Enlace" />:
            </span>
            <a
              href={item.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline break-all max-w-[200px]"
            >
              {item.Link}
            </a>
          </div>
        </div>
        <div className="modal-action mt-4">
          <form method="dialog" className="w-full">
            <button
              className="btn btn-primary w-full"
              onClick={onClose}
            >
              <T en="Close" es="Cerrar" />
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 256 256"
      height="28"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
        fill="currentColor"
      />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M6 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4H6zM7 1v1h1V1zm2 0v1h1V1zM5.5 5a.5.5 0 0 0-.5.5v4.894a2 2 0 0 0 .336 1.11l.83 1.245c.544.816.834 1.774.834 2.754 0 .275.222.497.497.497h2.006a.497.497 0 0 0 .497-.497c0-.98.29-1.938.834-2.754l.83-1.245a2 2 0 0 0 .336-1.11V5.5a.5.5 0 0 0-.5-.5z" />
    </svg>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Downloads() {
  const { releases, loading, error } = useSupabaseReleases();
  const [openFlashItem, setOpenFlashItem] = useState(null);

  const handleFlashClick = (item) => {
    setOpenFlashItem(item);
  };

  const handleCloseFlash = () => {
    setOpenFlashItem(null);
  };

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
              en="Find the latest firmware releases, documentation, and tools for your XOTLA DIY sampler."
              es="Encuentra las últimas versiones de firmware, documentación y herramientas para tu sampler DIY XOTLA."
            />
          </p>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 bg-base-300">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-3xl mb-6 text-primary text-center">
                <T en="Bloomcore Firmware" es="Firmware Bloomcore" />
              </h2>
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>
                      <T en="Version" es="Versión" />
                    </th>
                    <th>
                      <T en="Alias" es="Alias" />
                    </th>
                    <th>
                      <T en="Date" es="Fecha" />
                    </th>
                    <th>
                      <T en="Actions" es="Acciones" />
                    </th>
                  </tr>
                </thead>
                <tbody id="supabase-table-body">
                  {/* Los datos se cargarán aquí */}
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
                        <T
                          en={`Error loading data: ${error}`}
                          es={`Error al cargar datos: ${error}`}
                        />
                      </td>
                    </tr>
                  )}
                  {!loading && !error && releases.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-6">
                        <T
                          en="No data available"
                          es="No hay datos disponibles"
                        />
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    !error &&
                    releases.map((item) => (
                      <tr key={item.id ?? item.Version}>
                        <td className="font-mono font-semibold text-primary">
                          {item.Version ?? "-"}
                        </td>
                        <td>{item.Alias ?? "-"}</td>
                        <td>{formatDate(item.created_at)}</td>
                        <td>
                          {item.Link ? (
                            <ul className="wrapper_btns">
                              <li className="icon download">
                                <a
                                  href={item.Link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center w-full h-full"
                                >
                                  <span className="tooltip">
                                    <T en="Download" es="Descargar" />
                                  </span>
                                  <DownloadIcon />
                                </a>
                              </li>
                              <li className="icon flash">
                                <button
                                  className="flex items-center justify-center w-full h-full cursor-pointer"
                                  onClick={() => handleFlashClick(item)}
                                >
                                  <span className="tooltip">
                                    <T en="Flash" es="Flashear" />
                                  </span>
                                  <FlashIcon />
                                </button>
                              </li>
                            </ul>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Mini_Flasher Modal */}
      <Mini_Flasher
        item={openFlashItem}
        isOpen={!!openFlashItem}
        onClose={handleCloseFlash}
      />
    </>
  );
}
