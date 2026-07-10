import { T } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🎹',
    titleEn: 'Keys & Pads',
    titleEs: 'Teclas y Pads',
    descEn: 'Velocity-sensitive keys and drum pads for expressive performance.',
    descEs: 'Teclas y pads sensitivos a la velocidad para una interpretación expresiva.',
  },
  {
    icon: '🕹️',
    titleEn: 'Joystick & Encoders',
    titleEs: 'Joystick y Encoders',
    descEn: 'Dual joystick and rotary encoders for pitch bend, modulation and CC control.',
    descEs: 'Joystick dual y encoders rotativos para pitch bend, modulación y control CC.',
  },
  {
    icon: '🌡️',
    titleEn: 'Potentiometers',
    titleEs: 'Potenciómetros',
    descEn: 'Multiple analog pots for real-time parameter control of any parameter.',
    descEs: 'Múltiples pots analógicos para control en tiempo real de cualquier parámetro.',
  },
  {
    icon: '💡',
    titleEn: 'Visual Effects',
    titleEs: 'Efectos visuales',
    descEn: 'RGB LEDs and display for visual feedback on every action.',
    descEs: 'LEDs RGB y pantalla para retroalimentación visual en cada acción.',
  },
  {
    icon: '🔌',
    titleEn: 'Native USB MIDI',
    titleEs: 'MIDI USB Nativo',
    descEn: 'Plug and play USB MIDI — no drivers, no hassle. Works with any DAW.',
    descEs: 'MIDI USB plug and play — sin drivers, sin complicaciones. Funciona con cualquier DAW.',
  },
  {
    icon: '⚡',
    titleEn: 'Open Source',
    titleEs: 'Código Abierto',
    descEn: 'Fully open-source hardware and firmware. Build your own, modify at will.',
    descEs: 'Hardware y firmware completamente abiertos. Constrúyelo tú mismo, modifícalo a tu gusto.',
  },
];

export default function Details() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-base-300 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl font-bold text-primary mb-4">
            <T en="XOTLA Features" es="Características XOTLA" />
          </h1>
          <p className="text-xl opacity-70 max-w-2xl mx-auto">
            <T
              en="Everything you need to build and play the ultimate DIY beatmaking machine."
              es="Todo lo que necesitas para construir y tocar la máquina DIY de beatmaking definitiva."
            />
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1 transform"
              >
                <div className="card-body items-center text-center">
                  <span className="text-5xl mb-2">{f.icon}</span>
                  <h2 className="card-title text-primary">
                    <T en={f.titleEn} es={f.titleEs} />
                  </h2>
                  <p className="opacity-70">
                    <T en={f.descEn} es={f.descEs} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral text-neutral-content text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-accent mb-4">
            <T en="Ready to build yours?" es="¿Listo para construir el tuyo?" />
          </h2>
          <p className="text-lg opacity-70 mb-8">
            <T
              en="Flash the firmware and start creating in minutes."
              es="Flashea el firmware y empieza a crear en minutos."
            />
          </p>
          <Link to="/flashing" className="buttonglow text-lg">
            <T en="Go to Flasher →" es="Ir al Flasher →" />
          </Link>
        </div>
      </section>
    </>
  );
}
