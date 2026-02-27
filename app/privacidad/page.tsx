import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacidadInfo() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-black text-brand-gray-400">
            <Navbar />
            <main className="grow pt-24 pb-16 relative">
                {/* Subtle background tech lines to reinforce engineering aesthetic across page */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                        backgroundSize: `4rem 4rem`
                    }}
                />
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Política de Tratamiento de Datos Personales</h1>
                    <p className="text-sm mb-8 italic">Última actualización: 26 de febrero de 2026</p>

                    <div className="space-y-8 text-base/relaxed">
                        <section>
                            <p>
                                En <strong className="text-brand-blue-primary font-medium">MONTSERRATAI</strong>, establecimiento de comercio legalmente constituido en la ciudad de <strong>Bogotá D.C.</strong>, con Matrícula Mercantil No. 04062675, nos tomamos muy en serio la privacidad y protección de los datos personales de nuestros usuarios, clientes y aliados.
                            </p>
                            <p className="mt-4">
                                La presente política establece los términos en que MONTSERRATAI trata la información recolectada a través de nuestro sitio web, nuestros agentes inteligentes de automatización y la integración con servicios de terceros como la WhatsApp Graph API de Meta.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">1. Responsable del Tratamiento de Datos</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong className="text-white">Nombre Comercial:</strong> MONTSERRATAI</li>
                                <li><strong className="text-white">Propietario:</strong> Cardozo Rivera Juan Pablo</li>
                                <li><strong className="text-white">NIT:</strong> 1.011.083.308-1</li>
                                <li><strong className="text-white">Domicilio:</strong> Calle 39 Sur 72 Q 22 Apartamento 201 Torre 3, Bogotá D.C.</li>
                                <li><strong className="text-white">Correo Electrónico:</strong> jcardozor06@gmail.com</li>
                                <li><strong className="text-white">Teléfono:</strong> 3043906303</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">2. Finalidad del Tratamiento de los Datos</h2>
                            <p className="mb-2">Los datos personales recolectados serán utilizados para las siguientes finalidades relacionadas con nuestra actividad de programación informática (Código CIIU 6201):</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Diseño y despliegue de agentes inteligentes capaces de ejecutar tareas operativas autónomas.</li>
                                <li>Integración de flujos de trabajo con sistemas externos como CRMs, bases de datos y correos electrónicos.</li>
                                <li>Gestión de la atención al cliente y optimización de la toma de decisiones empresariales.</li>
                                <li>Medición de KPIs y escalabilidad operativa de los servicios de automatización contratados.</li>
                                <li>Envío de notificaciones y comunicaciones operativas a través de la WhatsApp Graph API.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">3. Datos Recolectados</h2>
                            <p className="mb-2">MONTSERRATAI podrá recolectar y tratar los siguientes datos:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Datos de contacto:</strong> Nombre, número de teléfono (WhatsApp), dirección de correo electrónico.</li>
                                <li><strong>Datos operativos:</strong> Información contenida en las bases de datos o CRMs que el usuario decida conectar a nuestros flujos de trabajo.</li>
                                <li><strong>Datos técnicos:</strong> Información sobre la interacción con nuestros agentes inteligentes para procesos de testeo y prototipado.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">4. Uso de la WhatsApp Graph API (Meta)</h2>
                            <p className="mb-2">Al utilizar nuestros servicios de automatización vía WhatsApp, usted reconoce que:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Los mensajes enviados y recibidos son procesados a través de la infraestructura de Meta Platforms, Inc.</li>
                                <li>MONTSERRATAI utiliza estos datos únicamente para ejecutar las tareas automáticas y servicios de atención al cliente solicitados, garantizando que no se compartirán con terceros ajenos a la operación técnica sin consentimiento previo.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">5. Derechos de los Titulares (Derechos ARCO)</h2>
                            <p className="mb-2">De acuerdo con la legislación colombiana, los titulares de los datos tienen derecho a:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Acceder y conocer los datos personales que están siendo tratados.</li>
                                <li>Rectificar o actualizar información parcial, inexacta o incompleta.</li>
                                <li>Cancelar o suprimir sus datos cuando no se respeten los principios, derechos y garantías constitucionales y legales.</li>
                                <li>Oponerse al tratamiento de sus datos para fines específicos.</li>
                            </ul>
                            <p className="mt-4">Para ejercer estos derechos, puede enviar una solicitud formal al correo: <a href="mailto:jcardozor06@gmail.com" className="text-brand-blue-primary hover:text-white transition-colors">jcardozor06@gmail.com</a>.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">6. Seguridad de la Información</h2>
                            <p>
                                Implementamos medidas técnicas de seguridad de alto nivel para proteger sus datos contra el acceso no autorizado, pérdida o alteración. Nuestra infraestructura se enfoca en la extracción precisa de información y el procesamiento seguro de datos reales para garantizar la integridad de su operación empresarial.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">7. Transferencia Internacional de Datos</h2>
                            <p>
                                Para la prestación de nuestros servicios de IA y automatización, los datos pueden ser tratados en servidores de terceros (como servicios de nube o infraestructura de Meta) localizados fuera del territorio nacional, siempre garantizando estándares de protección adecuados.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">8. Vigencia</h2>
                            <p>
                                Esta política entra en vigor a partir de su publicación y se mantendrá vigente mientras MONTSERRATAI realice actividades de tratamiento de datos en el desarrollo de su objeto social.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
