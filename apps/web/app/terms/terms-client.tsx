"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lang = "es" | "en";

export default function TermsClient() {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const stored = localStorage.getItem("bv_lang");
    if (stored === "en" || stored === "es") {
      setLang(stored);
    } else if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("en")) {
      setLang("en");
    }
  }, []);

  const toggleLang = (next: Lang) => {
    setLang(next);
    localStorage.setItem("bv_lang", next);
  };

  return (
    <div className="min-h-screen bg-[#120c09] text-[#f7e9cc] font-sans antialiased selection:bg-amber-500 selection:text-stone-950 p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-6">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/api/assets/brand/logo-icon.webp"
              alt="BoliVibes"
              className="w-8 h-8 object-contain rounded-lg"
              onError={(e) => { (e.target as HTMLImageElement).src = "/imgs/logo-icon.webp"; }}
            />
            <span className="font-bold text-stone-100 group-hover:text-amber-300 transition-colors">BoliVibes</span>
          </Link>

          <div className="bg-stone-900 border border-stone-800 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              onClick={() => toggleLang("es")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                lang === "es" ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              ES
            </button>
            <button
              onClick={() => toggleLang("en")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                lang === "en" ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Content */}
        {lang === "es" ? (
          <div className="space-y-6 leading-relaxed text-stone-300 text-sm">
            <h1 className="text-3xl font-extrabold text-stone-100 tracking-tight">Términos y Condiciones de Servicio</h1>
            <p className="text-xs text-stone-400">Última actualización: 16 de septiembre de 2026</p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar la plataforma <strong>BoliVibes</strong> (disponible en bolivibes.clubemkt.digital y aplicaciones móviles asociadas), usted acepta cumplir y estar sujeto a los presentes Términos y Condiciones de Servicio. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">2. Descripción del Servicio</h2>
              <p>
                BoliVibes es una plataforma digital de Smart Tourism, cultura, eventos, gastronomía y comunidad urbana para Santa Cruz de la Sierra, Bolivia. Incluye servicios como mapas 3D interactivos, agendas en tiempo real, el asistente de inteligencia artificial bolivIA y el club de beneficios BoliPass.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">3. Cuentas de Usuario y Autenticación</h2>
              <p>
                Los usuarios pueden registrarse mediante correo electrónico o a través de proveedores externos autorizados como **Google OAuth**. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, así como de todas las actividades que ocurran bajo su cuenta.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">4. Suscripciones y BoliPass</h2>
              <p>
                El acceso a ciertos beneficios exclusivos, vales 2x1 y funciones avanzadas de bolivIA puede requerir una suscripción activa a BoliPass. Las tarifas, condiciones y métodos de pago aceptados (incluyendo tarjetas, QR Bolivia, PIX y cripto) se especifican claramente en el proceso de pago.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">5. Conducta del Usuario</h2>
              <p>
                Los usuarios se comprometen a no utilizar la plataforma para publicar contenido ilegal, fraudulento, difamatorio, acosador o que infrinja derechos de terceros. BoliVibes se reserva el derecho de suspender o cancelar cuentas que violen estas normas.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">6. Contacto</h2>
              <p>
                Para cualquier consulta sobre estos Términos, puede contactarnos a través de nuestra plataforma o al correo oficial de soporte en la red ClubeMkt.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-6 leading-relaxed text-stone-300 text-sm">
            <h1 className="text-3xl font-extrabold text-stone-100 tracking-tight">Terms of Service</h1>
            <p className="text-xs text-stone-400">Last updated: September 16, 2026</p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the <strong>BoliVibes</strong> platform (available at bolivibes.clubemkt.digital and associated mobile applications), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">2. Description of Service</h2>
              <p>
                BoliVibes is a digital Smart Tourism, culture, events, gastronomy, and urban community platform for Santa Cruz de la Sierra, Bolivia. It includes interactive 3D maps, real-time event schedules, the bolivIA AI assistant, and the BoliPass perks club.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">3. User Accounts &amp; Authentication</h2>
              <p>
                Users may register via email or through authorized third-party identity providers such as **Google OAuth**. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">4. Subscriptions &amp; BoliPass</h2>
              <p>
                Access to certain exclusive benefits, 2-for-1 vouchers, and advanced bolivIA features may require an active BoliPass subscription. Pricing, terms, and accepted payment methods (including credit cards, QR Bolivia, PIX, and crypto) are clearly outlined during checkout.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">5. User Conduct</h2>
              <p>
                Users agree not to use the platform to post illegal, fraudulent, defamatory, harassing content or content infringing on third-party rights. BoliVibes reserves the right to suspend or terminate accounts violating these standards.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">6. Contact</h2>
              <p>
                For any questions regarding these Terms, you may reach out through our platform or official support channels within the ClubeMkt network.
              </p>
            </section>
          </div>
        )}

        <div className="pt-8 border-t border-stone-800 text-center">
          <Link href="/" className="text-xs text-amber-400 hover:underline font-bold">
            ← {lang === "es" ? "Volver al inicio" : "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
