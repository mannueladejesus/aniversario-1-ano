/* Jardim de Código em Aquarela: primeira página emocional, segunda página informativa e leitura mobile-first. */
import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "5511944465965";
const RSVP_MESSAGE = "Olá! Quero confirmar presença no aniversário de 1 ano da Mannuella.";

export default function Home() {
  const [page, setPage] = useState<1 | 2>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [magicBurst, setMagicBurst] = useState(false);
  const whatsappUrl = useMemo(() => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RSVP_MESSAGE)}`, []);
  const handleConfirm = () => { setConfirmed(true); window.open(whatsappUrl, "_blank", "noopener,noreferrer"); };
  const openInformationPage = () => { if (magicBurst) return; setMagicBurst(true); window.setTimeout(() => setPage(2), 1250); };

  return (
    <main className={`invitation-shell ${page === 2 ? "detail-page" : ""}`}>
      <div className="floating-garden" aria-hidden="true"><span className="butterfly butterfly-one">🦋</span><span className="butterfly butterfly-two">🦋</span><span className="falling-flower flower-one">✿</span><span className="falling-flower flower-two">❀</span></div>

      {page === 1 ? (
        <>
          <section className="hero-panel first-page-panel">
            <div className="hero-art natural-scene" aria-label="Mannuella alcançando uma borboleta em um jardim encantado">
              <img className="natural-scene-image" src="/manus-storage/mannuella-primeira-pagina-outpainting_b79100ba.png" alt="Mannuella inteira como fadinha com asas completas alcançando uma borboleta no Jardim Encantado" />
              <span className="scene-glint glint-one">✦</span><span className="scene-glint glint-two">✧</span><span className="scene-glint glint-three">✦</span>
            </div>
            <div className="hero-copy"><span className="brand-seal" aria-label="1 aninho"><span className="seal-flower">✿</span><strong>1</strong><small>aninho</small></span>
              <img className="brand-mark" src="/manus-storage/mannuela-logo_17abc672.png" alt="" />
              <p className="kicker">O jardim da nossa vida floresceu</p>
              <h1>Mannuella<br /><em>de Jesus</em></h1>
              <p className="hero-description">Há um ano, um pequeno milagre chegou para colorir nossos dias. Entre risadas, descobertas e abraços apertados, nossa pequena Mannuella completa seu primeiro ano — e esta história fica ainda mais bonita quando você faz parte dela.</p>
            </div>
          </section>
          <div className={`page-link-wrap ${magicBurst ? "is-bursting" : ""}`}>
            {magicBurst && <span className="magic-burst" aria-hidden="true"><i>✦</i><i>✧</i><i>✿</i><i>✦</i><i>·</i><i>·</i></span>}
            <button className="page-two-link primary-page-link" type="button" onClick={openInformationPage} disabled={magicBurst}>abrir informações da celebração <span>→</span></button>
          </div>
          <footer className="footer-line"><span>feito com amor</span><span>✦</span><span>página 01 • convite</span></footer>
        </>
      ) : (
        <>
          <section className="address-card information-page">
            <button className="back-button" type="button" onClick={() => { setMagicBurst(false); setPage(1); }}>← voltar ao convite</button>
            <img className="information-photo" src="/manus-storage/mannuella-segunda-pagina-aproximada_3660299a.png" alt="Mannuella como fadinha em um Jardim Encantado" />
            <img className="address-mark" src="/manus-storage/mannuela-logo_17abc672.png" alt="" />
            <p className="kicker">O jardim da Mannuella espera por você</p>
            <h1>Informações<br /><em>da celebração</em></h1>
            <div className="address-divider">✦　✿　✦</div>
            <div className="detail-grid information-grid">
              <div className="detail-block"><span className="detail-icon">✿</span><div><span className="detail-label">data</span><strong>03/10/2026</strong></div></div>
              <div className="detail-block"><span className="detail-icon">☼</span><div><span className="detail-label">horário</span><strong>horário a confirmar</strong></div></div>
            </div>
            <div className="address-box"><span className="address-pin">⌂</span><div><span className="detail-label">local da celebração</span><strong>Rua Giuseppe Piermarini, 521</strong><span>Jardim Icaraí · São Paulo — SP</span><span>CEP 04844-190</span></div></div>
            <p className="address-note">Preparamos tudo com carinho para receber você e celebrar o primeiro ano da nossa pequena Mannuella.</p>
            <div className="rsvp-note information-status"><span className="code-brace">{`{`}</span><div><span className="detail-label">status</span><strong>{confirmed ? "presença_enviada: true" : "aguardando seu abraço"}</strong></div><span className="code-brace">{`}`}</span></div>
            <button className="next-button rsvp-button" type="button" onClick={handleConfirm}>{confirmed ? "Presença compilada ✓" : "Confirmar presença no WhatsApp ↗"}</button>
          </section>
        </>
      )}
    </main>
  );
}
