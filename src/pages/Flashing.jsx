import { useEffect, useRef, useState } from 'react';
import { T, useLang } from '../context/LanguageContext';
import { FirmwareFile, TeensyFlasher, SerialPortManager, TEENSY_DEVICE_FILTERS } from '../utils/TeensyLoader';

/**
 * Flashing.jsx
 * Página de flasheo. Importa la lógica de TeensyLoader como módulo independiente
 * y la controla a través del estado y hooks de React.
 */
export default function Flashing() {
  const { lang } = useLang();

  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [logOutput, setLogOutput] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [firmwareData, setFirmwareData] = useState(null);
  const [firmwareName, setFirmwareName] = useState(null);

  const flasherRef = useRef(new TeensyFlasher());
  const serialManagerRef = useRef(new SerialPortManager());

  useEffect(() => {
    const mgr = serialManagerRef.current;
    mgr.onData = (line) => {
      setLogOutput(prev => prev ? prev + '\n' + line : line);
    };
    return () => {
      mgr.onData = null;
    };
  }, []);

  // 1. Leer archivo de firmware
  function handleFirmwareChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFirmwareData(new Uint8Array(reader.result));
      setFirmwareName(file.name);
      setStatus(lang === 'en' ? `Firmware loaded: ${file.name}` : `Firmware cargado: ${file.name}`);
    };
    reader.readAsArrayBuffer(file);
  }

  // 2. Seleccionar dispositivo Teensy
  async function handleSelectDevice() {
    try {
      const devices = await navigator.hid.requestDevice({ filters: TEENSY_DEVICE_FILTERS });
      if (devices && devices.length > 0) {
        const dev = devices[0];
        setSelectedDevice(dev);
        const devName = dev.productName || 'Unknown Teensy';
        setStatus(lang === 'en' ? `Device selected: ${devName}` : `Dispositivo seleccionado: ${devName}`);
      } else {
        setStatus(lang === 'en' ? 'No device selected.' : 'No se seleccionó ningún dispositivo.');
      }
    } catch (err) {
      setStatus(lang === 'en' ? `Device error: ${err}` : `Error de dispositivo: ${err}`);
    }
  }

  // 3. Flashear firmware
  async function handleFlash() {
    if (!selectedDevice || !firmwareData) {
      setStatus(lang === 'en' ? 'No device or firmware selected.' : 'No hay dispositivo o firmware seleccionado.');
      return;
    }
    let offset = 0x00000000;
    if (selectedDevice.productId === 0x0478 || selectedDevice.productId === 0x0479) {
      offset = 0x60000000;
    }
    try {
      const fw = new FirmwareFile(firmwareData, firmwareName);
      const blocks = await fw.buildBlocks(offset);
      setProgress(0);
      setStatus(lang === 'en' ? 'Flashing firmware...' : 'Flasheando firmware...');
      await flasherRef.current.flashFirmware(blocks, selectedDevice, (p) => setProgress(p));
      setStatus(lang === 'en' ? 'Flash complete! ✅' : '¡Flash completado! ✅');
    } catch (err) {
      setStatus(lang === 'en' ? `Flashing error: ${err}` : `Error de flasheo: ${err}`);
    }
  }

  // 4. Abrir puerto serial
  async function handleOpenSerial() {
    try {
      await serialManagerRef.current.openSerialPort({ baudRate: 115200 });
      setStatus(lang === 'en' ? 'Serial opened.' : 'Puerto Serial abierto.');
    } catch (err) {
      setStatus(lang === 'en' ? `Serial open error: ${err}` : `Error al abrir Serial: ${err}`);
    }
  }

  // 5. Cerrar puerto serial
  async function handleCloseSerial() {
    try {
      await serialManagerRef.current.closeSerialPort();
      setStatus(lang === 'en' ? 'Serial closed.' : 'Puerto Serial cerrado.');
    } catch (err) {
      setStatus(lang === 'en' ? `Serial close error: ${err}` : `Error al cerrar Serial: ${err}`);
    }
  }

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-base-300 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-primary mb-4">
            <T en="XOTLA Flasher" es="Flasher XOTLA" />
          </h1>
          <p className="text-lg opacity-70 max-w-xl mx-auto">
            <T
              en="Upload firmware to your XOTLA device directly from your browser using WebHID."
              es="Sube el firmware a tu dispositivo XOTLA directamente desde tu navegador usando WebHID."
            />
          </p>
        </div>
      </section>

      {/* Main Flasher UI */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4 max-w-2xl space-y-6">

          {/* 1. Firmware File */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">
                1. <T en="Select Firmware File" es="Seleccionar archivo de firmware" />
              </h2>
              <input
                id="firmwareInput"
                type="file"
                accept=".hex,.bin"
                className="file-input file-input-bordered w-full"
                onChange={handleFirmwareChange}
              />
              {firmwareName && (
                <p className="text-success text-sm mt-1">
                  ✅ {firmwareName}
                </p>
              )}
            </div>
          </div>

          {/* 2. Device Selection & Flash */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">
                2. <T en="Connect & Flash Device" es="Conectar y Flashear Dispositivo" />
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  id="selectDeviceBtn"
                  className="btn btn-outline btn-primary"
                  onClick={handleSelectDevice}
                >
                  <T en="Select Teensy" es="Seleccionar Teensy" />
                </button>
                <button
                  id="uploadFirmwareBtn"
                  className="btn btn-primary"
                  onClick={handleFlash}
                  disabled={!selectedDevice || !firmwareData}
                >
                  <T en="Upload Firmware" es="Subir Firmware" />
                </button>
              </div>
              {selectedDevice && (
                <p className="text-success text-sm">
                  🔌 {selectedDevice.productName || 'Teensy'}
                </p>
              )}
              <progress id="flashProgress" className="progress progress-primary w-full" value={progress} max={100}></progress>
            </div>
          </div>

          {/* Status */}
          {status && (
            <div id="status" className="alert shadow-lg whitespace-pre-wrap font-mono text-xs">
              <span>{status}</span>
            </div>
          )}

          {/* 3. Serial Port */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">
                3. <T en="Serial Port" es="Puerto Serial" />
              </h2>
              <div className="flex gap-2 mb-4 flex-wrap">
                <button id="openSerialBtn" className="btn btn-outline btn-success btn-sm" onClick={handleOpenSerial}>
                  <T en="Open Serial" es="Abrir Serial" />
                </button>
                <button id="closeSerialBtn" className="btn btn-outline btn-error btn-sm" onClick={handleCloseSerial}>
                  <T en="Close Serial" es="Cerrar Serial" />
                </button>
              </div>
              <textarea
                id="log"
                className="textarea textarea-bordered h-40 font-mono text-sm"
                readOnly
                placeholder={lang === 'en' ? 'Serial output will appear here...' : 'La salida serial aparecerá aquí...'}
                value={logOutput}
              ></textarea>
            </div>
          </div>

          {/* Credits */}
          <p className="text-sm opacity-60">
            <T en="Based on the amazing work by" es="Basado en el increíble trabajo de" />{' '}
            <a href="https://github.com/coelacanter1" className="link link-primary" target="_blank" rel="noopener noreferrer">Coela Can't!</a>
            {' '}&mdash; <T en="Modifications by" es="Modificaciones por" />{' '}
            <a href="https://github.com/Alexander-Cidbal" className="link link-primary" target="_blank" rel="noopener noreferrer">RZK</a>
          </p>
        </div>
      </section>
    </>
  );
}
