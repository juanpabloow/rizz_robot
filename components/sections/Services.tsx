import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Upload, MessageSquare, Phone, UserCog } from "lucide-react";

const services = [
    {
        title: "Atención al Cliente IA",
        description: "Respuestas instantáneas y precisas en WhatsApp, Chat y Email.",
        icon: <MessageSquare className="text-brand-blue-primary" />,
        features: ["Entrenamiento con tus datos", "Tono de marca personalizado", "Escalado infinito"],
    },
    {
        title: "Llamadas Inteligentes",
        description: "Agentes de voz para agendar citas y calificar leads.",
        icon: <Phone className="text-brand-blue-primary" />,
        features: ["Voz natural humana", "Manejo de objeciones", "Integración con Calendario"],
    },
    {
        title: "Handoff a Humanos",
        description: "Transferencia inteligente cuando la IA detecta complejidad.",
        icon: <UserCog className="text-brand-blue-primary" />,
        features: ["Contexto completo", "Detección de sentimiento", "Alertas en tiempo real"],
    },
];

export const Services = () => {
    return (
        <SectionWrapper id="services">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                    Nuestros Servicios
                </h2>
                <p className="text-brand-gray-400 max-w-2xl mx-auto">
                    Soluciones modulares de IA diseñadas para integrarse perfectamente en tu flujo de trabajo existente.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, idx) => (
                    <Card key={idx} gradient className="flex flex-col h-full">
                        <div className="mb-4 bg-brand-blue-primary/10 w-12 h-12 rounded-lg flex items-center justify-center border border-brand-blue-primary/20">
                            {service.icon}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-brand-gray-400 text-sm mb-6 flex-grow">{service.description}</p>

                        <ul className="space-y-2 mb-6">
                            {service.features.map((feature, fIdx) => (
                                <li key={fIdx} className="text-xs text-brand-gray-400 flex items-center gap-2">
                                    <div className="w-1 h-1 bg-brand-blue-primary rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* Demo Image Placeholder / Dropzone UI */}
                        <div className="mt-auto border md:border-2 border-dashed border-brand-gray-700 rounded-lg p-4 bg-brand-black/30 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-brand-gray-500 transition-colors h-40">
                            <Upload className="text-brand-gray-700 mb-2 group-hover:text-brand-gray-500 transition-colors" size={24} />
                            <p className="text-xs text-brand-gray-400 font-medium">Sube aquí una demo</p>
                            <p className="text-[10px] text-brand-gray-700 mt-1">Reemplazable por captura de tu flujo real (Imagen/Video)</p>
                        </div>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
};
