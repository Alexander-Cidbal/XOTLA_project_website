import { Link } from 'react-router-dom';
import { T } from '../context/LanguageContext';

// Fire icon SVG reutilizable
function FireIcon() {
  return (
    <svg className="svgIcon" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
    </svg>
  );
}

// Sección reutilizable: texto a la izquierda, imagen a la derecha
function SectionLR({ bgClass = 'bg-base-300', textColorClass = '', headingColorClass = 'text-primary', heading, body, cta, imageSrc, imageAlt, reverse = false }) {
  const content = (
    <>
      <div className="lg:w-1/2 text-center lg:text-left">
        <h2 className={`text-5xl font-bold mb-6 ${headingColorClass}`}>{heading}</h2>
        <p className={`text-xl opacity-80 mb-6 ${textColorClass}`}>{body}</p>
        {cta}
      </div>
      <div className="lg:w-1/2">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <img
            src={imageSrc}
            className="relative rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105 border-4 border-base-100"
            alt={imageAlt}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className={`container mx-auto px-6 flex ${reverse ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row'} items-center gap-12`}>
        {reverse ? <>{content}</> : content}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="hero min-h-[calc(100vh-64px)]"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Files/Bloom_Back2.jpg')` }}
      >
        <div className="hero-overlay bg-opacity-60 backdrop-blur-md"></div>
        <div className="hero-content flex-col lg:flex-row gap-2 text-neutral-content">

          <img
            src={`${import.meta.env.BASE_URL}Files/Xotla_1.png`}
            className="max-w-xs md:max-w-3xl drop-shadow-2xl transition-all duration-500 ease-in-out hover:scale-110 hover:translate-y-5 hover:-rotate-3"
            alt="Xotla Icon"
          />
          <div className="max-w-md text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-primary">
              <T en="Welcome to" es="Bienvenido a" />
            </h1>
            <h1 className="text-6xl lg:text-7xl font-bold">XOTLA</h1>
            <p className="py-6 text-2xl">
              <T
                en="The ultimate DIY beatmaking machine. Make your own sampler!"
                es="La máquina definitiva de beatmaking DIY. ¡Crea tu propio sampler!"
              />
            </p>
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
              <Link to="/flashing" className="buttonglow">
                <T en="Go to Flasher" es="Ir al Flasher" />
              </Link>
              <Link to="/details" className="btn btn-outline">
                <T en="Learn More →" es="Saber más →" />
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* ── Sección 2: Hardware expresivo ── */}
      <SectionLR
        bgClass="bg-base-300"
        headingColorClass="text-primary"
        heading={<T en="Expressive hardware 🕹️" es="Hardware expresivo 🕹️" />}
        body={
          <T
            en="Pots, keys, joysticks, encoders, visual effects... variety of controls that feel natural and playful."
            es="Pots, teclas, joysticks, encoders, efectos visuales... variedad de controles que se sienten naturales y divertidos."
          />
        }
        cta={
          <Link to="/details" className="buttonglow">
            <FireIcon />
            <T en="Discover Features" es="Descubrir funciones" />
          </Link>
        }
        imageSrc={`${import.meta.env.BASE_URL}Files/Bloom_Back1.jpg`}
        imageAlt="Hardware Preview"
      />

      {/* ── Sección 3: MIDI USB ── */}
      <section className="py-24 bg-neutral text-neutral-content">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={`${import.meta.env.BASE_URL}Files/Bloom_Back1.jpg`}
                className="relative rounded-2xl shadow-2xl transform transition duration-500 hover:-rotate-2 hover:scale-105 border-4 border-neutral-focus"
                alt="MIDI USB Support"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-5xl font-bold text-accent mb-6">
              <T en="Native USB MIDI 🔌💻" es="Soporte MIDI USB 🔌💻" />
            </h2>
            <p className="text-xl opacity-80 mb-6">
              <T
                en="Connect and control your favorite DAW, mobile apps, and samplers with ease. XOTLA is designed to integrate seamlessly into your existing setup."
                es="Conecta y controla tus DAW, apps móviles y samplers favoritos con facilidad. XOTLA está diseñado para integrarse perfectamente en tu configuración actual."
              />
            </p>
          </div>
        </div>
      </section>

      {/* ── Sección 4: Potencial ── */}
      <SectionLR
        bgClass="bg-base-300"
        headingColorClass="text-primary"
        heading={<T en="Explore the Potential" es="Explora el potencial" />}
        body={
          <T
            en="Create intricate rhythms and unique sounds with our intuitive interface. XOTLA gives you the tools to express your musical vision without limits."
            es="Crea ritmos intrincados y sonidos únicos con nuestra interfaz intuitiva. XOTLA te da las herramientas para expresar tu visión musical sin límites."
          />
        }
        cta={
          <Link to="/details" className="buttonglow">
            <FireIcon />
            <T en="Discover Features" es="Descubrir funciones" />
          </Link>
        }
        imageSrc={`${import.meta.env.BASE_URL}Files/Bloom_Back1.jpg`}
        imageAlt="Features Preview"
      />

      {/* ── Sección 5: Comunidad ── */}
      <section className="py-24 bg-neutral text-neutral-content">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={`${import.meta.env.BASE_URL}Files/Bloom_Back1.jpg`}
                className="relative rounded-2xl shadow-2xl transform transition duration-500 hover:-rotate-2 hover:scale-105 border-4 border-neutral-focus"
                alt="Community"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-5xl font-bold text-accent mb-6">
              <T en="Join the Community" es="Únete a la comunidad" />
            </h2>
            <p className="text-xl opacity-80 mb-6">
              <T
                en="Connect with other creators, share your beats, and get help from the experts. Our community is growing every day."
                es="Conecta con otros creadores, comparte tus beats y recibe ayuda de expertos. Nuestra comunidad crece cada día."
              />
            </p>
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap">

              <a href="https://discord.gg/2Ecx7sF5" target="_blank" rel="noopener noreferrer" className="btn bg-[#5865F2] text-[#E0E3FF] border-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                </svg>
                <T en="Join Discord" es="Unirse a Discord" />
              </a>
              <a href="https://github.com/Alexander-Cidbal/RZK-Flame-Spark-Bloom" target="_blank" rel="noopener noreferrer" className="btn bg-black text-white border-black">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                <T en="View GitHub" es="Ver GitHub" />
              </a>
            </div>
          </div>
        </div>
      </section>

<section className="py-12 bg-base-300">
        <div className="container mx-auto px-6 md:px-10">
          <div className="card w-full bg-base-100 shadow-xl overflow-hidden">
            {/* Contenedor principal en grid/flex con padding equidistante */}
            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-8 gap-8">
              {/* Columna Izquierda: Texto amistoso e invitación */}
              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 text-left">
                <h2 className="text-7xl font-bold tracking-tight">
                  ¡Apoya el <span className="text-primary">Proyecto Xotla</span>
                  ! ☕✨
                </h2>
                <p className="text-base-content/80 text-xl leading-relaxed">
                  Xotla es un sampler y cyberdeck musical de código abierto
                  diseñado con muchísimo amor. Todo el hardware, los planos y el
                  firmware están disponibles de manera gratuita.
                </p>
                <p className="text-base-content/80 text-xl leading-relaxed">
                  Si te encanta este proyecto maker y quieres ayudar a seguir
                  mejorando las iteraciones físicas, ¡invítanos un café!
                  Cualquier granito de arena hace latir más fuerte este
                  corazoncito musical. ¡Wiiii! 🚀
                </p>
              </div>

              {/* Columna Derecha: Iframe de Ko-fi con padding y diseño integrado */}
              <div className="w-full md:w-1/2 flex justify-center bg-base-200/50 p-4 rounded-box">
                <iframe
                  id="kofiframe"
                  src="https://ko-fi.com/alexandercidbal/?hidefeed=true&widget=true&embed=true&preview=true"
                  style={{
                    border: "none",
                    width: "100%",
                    maxWidth: "450px",
                    background: "transparent",
                  }}
                  height="650"
                  title="alexandercidbal"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
