import { T } from '../context/LanguageContext';

const tutorials = [
  {
    titleEn: 'Getting Started with XOTLA',
    titleEs: 'Comenzando con XOTLA',
    descEn: 'A step-by-step guide to assembling your XOTLA kit and flashing it for the first time.',
    descEs: 'Una guía paso a paso para armar tu kit XOTLA y flashearlo por primera vez.',
    badge: 'Beginner',
    badgeEs: 'Principiante',
    color: 'badge-success',
  },
  {
    titleEn: 'Flashing Custom Firmware',
    titleEs: 'Flasheando firmware personalizado',
    descEn: 'Learn how to use the WebHID flasher to upload custom builds to your device.',
    descEs: 'Aprende a usar el flasher WebHID para subir builds personalizados a tu dispositivo.',
    badge: 'Intermediate',
    badgeEs: 'Intermedio',
    color: 'badge-warning',
  },
  {
    titleEn: 'Mapping Controls in your DAW',
    titleEs: 'Mapeando controles en tu DAW',
    descEn: 'How to assign XOTLA MIDI CC messages to parameters in Ableton, FL Studio and others.',
    descEs: 'Cómo asignar mensajes MIDI CC de XOTLA a parámetros en Ableton, FL Studio y otros.',
    badge: 'Intermediate',
    badgeEs: 'Intermedio',
    color: 'badge-warning',
  },
  {
    titleEn: 'Building from Source',
    titleEs: 'Compilar desde el código fuente',
    descEn: 'Set up the development environment and compile XOTLA firmware using PlatformIO.',
    descEs: 'Configura el entorno de desarrollo y compila el firmware XOTLA con PlatformIO.',
    badge: 'Advanced',
    badgeEs: 'Avanzado',
    color: 'badge-error',
  },
  
];

export default function Tutorials() {
  return (
    <>
      {/* Header */}
      <section className="py-20 bg-base-300 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-primary mb-4">
            <T en="Tutorials" es="Tutoriales" />
          </h1>
          <p className="text-xl opacity-70 max-w-xl mx-auto">
            <T
              en="Guides to help you build, flash, and create with XOTLA."
              es="Guías para ayudarte a construir, flashear y crear con XOTLA."
            />
          </p>
        </div>
      </section>

      {/* Tutorial cards */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {tutorials.map((t, i) => (
            <div key={i} className="card bg-base-100 shadow-xl hover:-translate-y-1 transform transition duration-300">
              <div className="card-body">
                <div className="flex items-center justify-between mb-2">
                  <span className={`badge ${t.color}`}>
                    <T en={t.badge} es={t.badgeEs} />
                  </span>
                  <span className="text-2xl opacity-50">#{i + 1}</span>
                </div>
                <h2 className="card-title text-primary">
                  <T en={t.titleEn} es={t.titleEs} />
                </h2>
                <p className="opacity-70">
                  <T en={t.descEn} es={t.descEs} />
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-primary btn-sm" disabled>
                    <T en="Coming Soon" es="Próximamente" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-16 bg-neutral text-neutral-content text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-accent mb-4">
            <T en="Need help? Ask the community." es="¿Necesitas ayuda? Pregunta a la comunidad." />
          </h2>
          <a href="https://discord.gg/2Ecx7sF5" target="_blank" rel="noopener noreferrer" className="btn bg-[#5865F2] text-white border-none">
            <T en="Join our Discord" es="Únete a nuestro Discord" />
          </a>
        </div>
      </section>
    </>
  );
}
