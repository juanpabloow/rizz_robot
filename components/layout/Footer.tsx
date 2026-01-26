import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-brand-black/50 backdrop-blur-sm py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-tr from-brand-blue-primary to-brand-blue-accent flex items-center justify-center text-white font-bold text-xs">
                            R
                        </div>
                        <span className="font-bold text-sm tracking-tight text-white">
                            Respond<span className="text-brand-blue-primary">Ai</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-8 text-sm text-brand-gray-400">
                        <Link href="#services" className="hover:text-white transition-colors">Servicios</Link>
                        <Link href="#benefits" className="hover:text-white transition-colors">Beneficios</Link>
                        <Link href="#cta" className="hover:text-white transition-colors">Contacto</Link>
                    </div>

                    <div className="text-xs text-brand-gray-400">
                        &copy; {new Date().getFullYear()} RespondAi. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
};
