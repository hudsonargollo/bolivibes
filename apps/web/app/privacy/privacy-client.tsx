"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lang = "es" | "en";

export default function PrivacyClient() {
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
            <h1 className="text-3xl font-extrabold text-stone-100 tracking-tight">Política de Privacidad</h1>
            <p className="text-xs text-stone-400">Última actualización: 16 de septiembre de 2026</p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">1. Información que Recopilamos</h2>
              <p>
                En <strong>BoliVibes</strong> valoramos su privacidad. Recopilamos información personal que usted nos proporciona directamente al registrarse (nombre, correo electrónico), al iniciar sesión mediante proveedores externos como **Google OAuth** (correo y foto de perfil asociada), o al interactuar con nuestra plataforma, eventos, mapas y el asistente bolivIA.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">2. Uso de la Información de Google API</h2>
              <p>
                Cuando utiliza Google para iniciar sesión en BoliVibes, accedemos únicamente a su información básica de perfil (dirección de correo electrónico y nombre) conforme a los alcances solicitados (`openid email profile`). <strong>BoliVibes no vende, alquila ni comparte sus datos de perfil de Google con terceros con fines publicitarios.</strong> La información se utiliza exclusivamente para autenticar su cuenta, mantener su sesión activa y personalizar su experiencia en la plataforma.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">3. Uso de los Datos</h2>
              <p>
                Utilizamos los datos recopilados para:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Gestionar y asegurar su cuenta de usuario o perfil de negocio (anfitrión).</li>
                <li>Procesar suscripciones a BoliPass y transacciones de marketplace.</li>
                <li>Mejorar las recomendaciones del mapa 3D y del asistente de IA bolivIA.</li>
                <li>Enviar notificaciones relevantes sobre eventos, reservas y actualizaciones de la ciudad.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">4. Almacenamiento y Seguridad</h2>
              <p>
                Sus datos se almacenan de forma segura utilizando bases de datos en la nube cifradas (Cloudflare D1 y KV con cifrado en tránsito y en reposo). Aplicamos estrictos controles de acceso técnico y organizativo para proteger su información contra accesos no autorizados.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">5. Sus Derechos</h2>
              <p>
                Usted tiene derecho a acceder, corregir o solicitar la eliminación de su información personal y datos de cuenta en cualquier momento a través de la configuración de su perfil o contactando a nuestro equipo de soporte.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">6. Contacto</h2>
              <p>
                Si tiene preguntas acerca de esta Política de Privacidad, puede comunicarse con nosotros en la red ClubeMkt o a través de los canales oficiales de soporte de BoliVibes.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-6 leading-relaxed text-stone-300 text-sm">
            <h1 className="text-3xl font-extrabold text-stone-100 tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-stone-400">Last updated: September 16, 2026</p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">1. Information We Collect</h2>
              <p>
                At <strong>BoliVibes</strong>, we value your privacy. We collect personal information you provide directly when registering (name, email), signing in via third-party providers like **Google OAuth** (email and profile name), or interacting with our platform, events, maps, and the bolivIA assistant.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">2. Use of Google API Information</h2>
              <p>
                When you sign in using Google, we access only your basic profile information (email address and name) in accordance with requested scopes (`openid email profile`). <strong>BoliVibes does not sell, rent, or share your Google profile data with third parties for advertising purposes.</strong> This information is used exclusively to authenticate your account, maintain active sessions, and personalize your platform experience.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">3. How We Use Data</h2>
              <p>
                We use collected data to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Manage and secure your user account or business host profile.</li>
                <li>Process BoliPass subscriptions and marketplace transactions.</li>
                <li>Improve 3D map recommendations and bolivIA AI assistant interactions.</li>
                <li>Send relevant notifications regarding events, bookings, and city updates.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">4. Storage &amp; Security</h2>
              <p>
                Your data is securely stored using encrypted cloud databases (Cloudflare D1 and KV with encryption in transit and at rest). We apply rigorous technical and organizational security controls to protect your information against unauthorized access.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">5. Your Rights</h2>
              <p>
                You have the right to access, correct, or request the deletion of your personal information and account data at any time via your profile settings or by contacting our support team.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-stone-100">6. Contact</h2>
              <p>
                If you have questions regarding this Privacy Policy, please contact us via the ClubeMkt network or official BoliVibes support channels.
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
