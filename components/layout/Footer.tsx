import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-brand-black/50 backdrop-blur-sm py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-tr from-brand-blue-primary to-brand-blue-accent flex items-center justify-center text-white font-bold text-xs">
                            M
                        </div>
                        <span className="font-bold text-sm tracking-tight text-white">
                            Montserrat<span className="text-brand-blue-primary">AI</span>
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-brand-gray-400">
                        <Link href="/#services" className="hover:text-white transition-colors">Servicios</Link>
                        <Link href="/#benefits" className="hover:text-white transition-colors">Beneficios</Link>
                        <Link href="/#cta" className="hover:text-white transition-colors">Contacto</Link>
                        <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-1 text-xs text-brand-gray-400 text-center md:text-right">
                        <p>&copy; 2026 MONTSERRATAI. NIT. 1.011.083.308-1.</p>
                        <p>Calle 39 Sur 72 Q 22, Bogotá D.C., Colombia | jcardozor06@gmail.com | +57 3043906303</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
