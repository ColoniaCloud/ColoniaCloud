import type { Metadata } from 'next';
import InternalHero from '@/components/ui/InternalHero';

export const metadata: Metadata = {
  title: 'Política de Privacidad — Colonia Cloud',
  description:
    'Cómo Colonia Cloud recopila, usa y protege los datos personales de quienes visitan el sitio o se ponen en contacto.',
  alternates: { canonical: '/privacidad' },
};

const h2Class = 'font-display font-medium text-[1.125rem] text-cc-text mt-9 mb-3 first:mt-0';
const pClass = 'text-[15px] text-cc-text-body leading-relaxed mb-4';
const liClass = 'text-[15px] text-cc-text-body leading-relaxed';

export default function PrivacidadPage() {
  return (
    <>
      <InternalHero
        badge="Legal"
        title="Política de Privacidad"
        description="Última actualización: 4 de agosto de 2026."
      />

      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[720px] mx-auto px-7">
          <p className={pClass}>
            Esta Política de Privacidad describe cómo <strong>Garrido Hernández Juan Manuel</strong>,
            titular de Colonia Cloud (RUT 221002530010, domicilio en Baltasar Brum s/n Block F apto
            223, Colonia del Sacramento, Uruguay), en adelante &ldquo;Colonia Cloud&rdquo;, recopila,
            utiliza y protege los datos personales de las personas que visitan{' '}
            <strong>colonia.cloud</strong> o se ponen en contacto por sus distintos canales.
          </p>
          <p className={pClass}>
            El tratamiento de datos se realiza conforme a la Ley N.º 18.331 de Protección de Datos
            Personales de Uruguay y su normativa reglamentaria, bajo control de la Unidad Reguladora
            y de Control de Datos Personales (URCDP).
          </p>

          <h2 className={h2Class}>1. Datos que recopilamos</h2>
          <p className={pClass}>
            Recopilamos únicamente los datos que la persona usuaria decide compartir de forma
            voluntaria:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 mb-4">
            <li className={liClass}>
              <strong>Formulario de contacto:</strong> nombre, dirección de email y el contenido del
              mensaje enviado.
            </li>
            <li className={liClass}>
              <strong>WhatsApp:</strong> número de teléfono y el contenido de la conversación, cuando
              el contacto se inicia por ese canal.
            </li>
          </ul>
          <p className={pClass}>
            No utilizamos cookies de seguimiento ni herramientas de analítica de terceros en el
            sitio. Solo se emplean las cookies técnicas estrictamente necesarias para el
            funcionamiento del sitio, si las hubiera.
          </p>

          <h2 className={h2Class}>2. Finalidad del tratamiento</h2>
          <p className={pClass}>Los datos recopilados se utilizan exclusivamente para:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 mb-4">
            <li className={liClass}>Responder consultas y solicitudes de presupuesto.</li>
            <li className={liClass}>Coordinar y prestar los servicios contratados.</li>
            <li className={liClass}>Enviar comunicaciones vinculadas a un proyecto en curso.</li>
          </ul>
          <p className={pClass}>
            No usamos los datos con fines publicitarios ni los cedemos a terceros para ese fin.
          </p>

          <h2 className={h2Class}>3. Con quién compartimos los datos</h2>
          <p className={pClass}>
            Los mensajes enviados a través del formulario de contacto se procesan mediante{' '}
            <strong>Resend</strong>, un proveedor de envío de emails transaccionales, únicamente para
            hacer llegar el mensaje a nuestra casilla de correo. El sitio está alojado en{' '}
            <strong>Vercel</strong>. Ninguno de estos proveedores utiliza los datos con fines propios
            distintos a la prestación técnica del servicio.
          </p>
          <p className={pClass}>
            No vendemos, alquilamos ni compartimos datos personales con terceros para fines
            comerciales.
          </p>

          <h2 className={h2Class}>4. Conservación de los datos</h2>
          <p className={pClass}>
            Conservamos los datos de contacto mientras exista una relación comercial activa o
            potencial, y por el plazo adicional necesario para cumplir obligaciones legales o
            contables. Podés solicitar la eliminación de tus datos en cualquier momento por los
            medios indicados más abajo.
          </p>

          <h2 className={h2Class}>5. Tus derechos</h2>
          <p className={pClass}>
            De acuerdo con la Ley N.º 18.331, tenés derecho a acceder, rectificar, actualizar y
            solicitar la eliminación de tus datos personales, así como a oponerte a su tratamiento.
            Para ejercer estos derechos, escribinos a{' '}
            <a href="mailto:comunicacion@colonia.cloud" className="text-cc-accent hover:underline">
              comunicacion@colonia.cloud
            </a>
            .
          </p>

          <h2 className={h2Class}>6. Cambios a esta política</h2>
          <p className={pClass}>
            Podemos actualizar esta Política de Privacidad para reflejar cambios en el sitio o en la
            normativa aplicable. La fecha de la última actualización figura al comienzo de esta
            página.
          </p>

          <h2 className={h2Class}>7. Contacto</h2>
          <p className={pClass}>
            Ante cualquier consulta sobre esta política o sobre el tratamiento de tus datos,
            escribinos a{' '}
            <a href="mailto:comunicacion@colonia.cloud" className="text-cc-accent hover:underline">
              comunicacion@colonia.cloud
            </a>{' '}
            o por WhatsApp al{' '}
            <a
              href="https://wa.me/59896082266"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cc-accent hover:underline"
            >
              +598 96 082 266
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
