import type { Metadata } from 'next';
import Link from 'next/link';
import InternalHero from '@/components/ui/InternalHero';

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Colonia Cloud',
  description:
    'Condiciones que regulan el uso del sitio colonia.cloud y la contratación de servicios de Colonia Cloud.',
  alternates: { canonical: '/terminos' },
};

const h2Class = 'font-display font-medium text-[1.125rem] text-cc-text mt-9 mb-3 first:mt-0';
const pClass = 'text-[15px] text-cc-text-body leading-relaxed mb-4';
const liClass = 'text-[15px] text-cc-text-body leading-relaxed';

export default function TerminosPage() {
  return (
    <>
      <InternalHero
        badge="Legal"
        title="Términos y Condiciones"
        description="Última actualización: 4 de agosto de 2026."
      />

      <section className="py-[64px] bg-cc-bg">
        <div className="max-w-[720px] mx-auto px-7">
          <p className={pClass}>
            Estos Términos y Condiciones regulan el uso del sitio <strong>colonia.cloud</strong> y la
            contratación de servicios ofrecidos por <strong>Garrido Hernández Juan Manuel</strong>,
            titular de Colonia Cloud (RUT 221002530010, domicilio en Baltasar Brum s/n Block F apto
            223, Colonia del Sacramento, Uruguay), en adelante &ldquo;Colonia Cloud&rdquo;. El acceso
            y uso del sitio implica la aceptación de estos términos.
          </p>

          <h2 className={h2Class}>1. Servicios ofrecidos</h2>
          <p className={pClass}>
            Colonia Cloud presta servicios de desarrollo web y de aplicaciones, software de gestión,
            infraestructura (VPS, dominios y bases de datos) y asesoría tecnológica, descritos en
            detalle en la sección{' '}
            <Link href="/servicios" className="text-cc-accent hover:underline">
              Servicios
            </Link>{' '}
            del sitio. El alcance, los plazos y el precio de cada proyecto se acuerdan por separado
            con cada cliente antes de iniciar el trabajo.
          </p>

          <h2 className={h2Class}>2. Presupuestos y contratación</h2>
          <p className={pClass}>
            Los presupuestos enviados a partir de una consulta por WhatsApp, formulario de contacto o
            email no constituyen una obligación de contratar para ninguna de las partes. La
            contratación de un servicio queda formalizada cuando ambas partes acuerdan el alcance, el
            precio y las condiciones de pago, ya sea por escrito o por los medios de comunicación
            habituales (email o WhatsApp).
          </p>

          <h2 className={h2Class}>3. Pagos</h2>
          <p className={pClass}>
            Las condiciones de pago (anticipos, cuotas y medios habilitados) se establecen para cada
            proyecto al momento de acordar el presupuesto. El incumplimiento de los pagos acordados
            puede resultar en la suspensión de los trabajos o servicios en curso.
          </p>

          <h2 className={h2Class}>4. Garantía</h2>
          <p className={pClass}>
            Los proyectos de desarrollo incluyen 30 días de garantía posteriores a la entrega para la
            corrección de errores o defectos atribuibles al trabajo realizado por Colonia Cloud. Esta
            garantía no cubre cambios de alcance, nuevas funcionalidades ni problemas originados por
            modificaciones realizadas por terceros después de la entrega.
          </p>

          <h2 className={h2Class}>5. Propiedad intelectual</h2>
          <p className={pClass}>
            Una vez abonado en su totalidad, el trabajo entregado (código, diseño y demás materiales
            desarrollados específicamente para el proyecto) pasa a ser propiedad del cliente, salvo
            que se acuerde lo contrario por escrito. Colonia Cloud conserva el derecho de mencionar el
            proyecto como parte de su portfolio, salvo pedido expreso en contrario del cliente.
          </p>
          <p className={pClass}>
            Herramientas, librerías, plantillas o componentes propios que Colonia Cloud reutiliza
            entre distintos proyectos no forman parte de esta cesión y siguen siendo propiedad de
            Colonia Cloud o de sus respectivos titulares (licencias de terceros, software libre,
            etc.).
          </p>

          <h2 className={h2Class}>6. Infraestructura y servicios de terceros</h2>
          <p className={pClass}>
            Los servicios de hosting, dominios, bases de datos y demás infraestructura contratada a
            proveedores externos (por ejemplo, registradores de dominio o proveedores de nube) se
            rigen adicionalmente por los términos de esos proveedores. Colonia Cloud no es
            responsable por interrupciones o fallas originadas exclusivamente en la infraestructura
            de terceros.
          </p>

          <h2 className={h2Class}>7. Limitación de responsabilidad</h2>
          <p className={pClass}>
            Colonia Cloud pone a disposición sus conocimientos y mejores prácticas para la
            realización de cada proyecto, pero no garantiza resultados de negocio específicos (por
            ejemplo, volumen de ventas o posicionamiento en buscadores), ya que estos dependen de
            factores externos al trabajo técnico entregado.
          </p>

          <h2 className={h2Class}>8. Uso del sitio</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 mb-4">
            <li className={liClass}>
              El contenido del sitio (textos, diseño, marca) es propiedad de Colonia Cloud y no puede
              reproducirse sin autorización.
            </li>
            <li className={liClass}>
              El uso del formulario de contacto para fines distintos a una consulta legítima (spam,
              intentos de intrusión, etc.) está prohibido.
            </li>
          </ul>

          <h2 className={h2Class}>9. Ley aplicable</h2>
          <p className={pClass}>
            Estos términos se rigen por las leyes de la República Oriental del Uruguay. Cualquier
            controversia se someterá a los tribunales competentes de Uruguay.
          </p>

          <h2 className={h2Class}>10. Modificaciones</h2>
          <p className={pClass}>
            Colonia Cloud puede actualizar estos Términos y Condiciones en cualquier momento. La
            fecha de la última actualización figura al comienzo de esta página.
          </p>

          <h2 className={h2Class}>11. Contacto</h2>
          <p className={pClass}>
            Ante cualquier consulta sobre estos términos, escribinos a{' '}
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
