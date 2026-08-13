/* Jardim de Código em Aquarela: convite editorial infantil, assimétrico e responsivo. */
import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "5500000000000"; // Troque pelo número com DDI e DDD, sem espaços.
const RSVP_MESSAGE = "Olá! Quero confirmar presença no aniversário de 1 ano da Mannuela.";

export default function Home() {
  const [confirmed, setConfirmed] = useState(false);
  const [page, setPage] = useState<1 | 2>(1);
  const whatsappUrl = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RSVP_MESSAGE)}`,
    [],
  );

  const handleConfirm = () => {
    setConfirmed(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (page === 2) {
    return (
      <main className="invitation-shell detail-page">
        <div className="floating-garden" aria-hidden="true"><span className="butterfly butterfly-one">🦋</span><span className="falling-flower flower-one">✿</span><span className="falling-flower flower-two">❀</span></div>
        <section className="address-card">
          <button className="back-button" type="button" onClick={() => setPage(1)}>← voltar ao convite</button>
          <img className="address-mark" src="/manus-storage/mannuela-logo_17abc672.png" alt="" />
          <p className="eyebrow">// localização.config</p>
          <p className="kicker">O jardim da Mannuela espera por você</p>
          <h1>Onde a nossa<br /><em>história floresce</em></h1>
          <div className="address-divider">✦　✿　✦</div>
          <div className="address-box"><span className="address-pin">⌂</span><div><span className="detail-label">local da celebração</span><strong>Rua Giuseppe Piermarini, 521</strong><span>Jardim Icaraí · São Paulo — SP</span><span>CEP 04844-190</span></div></div>
          <p className="address-note">Preparamos tudo com carinho para receber você e celebrar o primeiro ano da nossa pequena Mannuela.</p>
          <button className="next-button" type="button" onClick={() => setPage(1)}>voltar à página principal <span>✦</span></button>
        </section>
        <footer className="footer-line"><span>feito com amor</span><span>✦</span><span>página 02 • localização</span></footer>
      </main>
    );
  }

  return (
    <main className="invitation-shell">
      <div className="floating-garden" aria-hidden="true">
        <span className="butterfly butterfly-one">🦋</span>
        <span className="butterfly butterfly-two">🦋</span>
        <span className="falling-flower flower-one">✿</span>
        <span className="falling-flower flower-two">❀</span>
        <span className="falling-flower flower-three">✽</span>
      </div>

      <section className="hero-panel">
        <div className="hero-art natural-scene" aria-label="Mannuela alcançando uma borboleta em um jardim encantado">
          <img className="natural-scene-image" src="/manus-storage/mannuela-jardim-borboleta_bb6121b5.png" alt="Mannuela com asas de fada alcançando uma borboleta em um jardim florido" />
          <span className="scene-glint glint-one">✦</span><span className="scene-glint glint-two">✧</span><span className="scene-glint glint-three">✦</span>
        </div>
        <div className="hero-copy"><span className="brand-seal">M<span>01</span></span>
          <div className="eyebrow"><span className="status-dot" /> build 01.0.0 • jardim encantado</div>
          <img className="brand-mark" src="/manus-storage/mannuela-logo_17abc672.png" alt="" />
          <p className="kicker">O jardim da nossa vida floresceu</p>
          <h1>Mannuela<br /><em>de Jesus</em></h1>
          <p className="hero-description">Há um ano, um pequeno milagre chegou para colorir nossos dias. Entre risadas, descobertas e abraços apertados, nossa pequena Mannuela completa seu primeiro ano — e esta história fica ainda mais bonita quando você faz parte dela.</p>
          <div className="code-chip">versão 1.0 • coração cheio</div>
        </div>
      </section>

      <section className="details-panel" aria-label="Detalhes do evento">
        <div className="section-label">// evento.config</div>
        <div className="detail-grid">
          <div className="detail-block"><span className="detail-icon">✿</span><div><span className="detail-label">data</span><strong>03/10/2026</strong></div></div>
          <div className="detail-block"><span className="detail-icon">☼</span><div><span className="detail-label">horário</span><strong>horário a confirmar</strong></div></div>
          <div className="detail-block"><span className="detail-icon">⌂</span><div><span className="detail-label">local</span><strong>endereço a confirmar</strong></div></div>
        </div>
      </section>

      <section className="rsvp-panel">
        <div className="rsvp-note"><span className="code-brace">{`{`}</span><div><span className="detail-label">status</span><strong>{confirmed ? "presença_enviada: true" : "aguardando seu abraço"}</strong></div><span className="code-brace">{`}`}</span></div>
        <div className="rsvp-content"><div className="garden-tag">{`<rsvp />`} <span>semente de carinho</span></div><p className="kicker">A festa só fica completa com você</p><h2>Vamos florescer<br /><em>essa memória?</em></h2><p>Confirme sua presença e deixe um recadinho no jardim.</p><button className="rsvp-button" type="button" onClick={handleConfirm}>{confirmed ? "Presença compilada ✓" : "Confirmar presença ↗"}</button></div>
        <img className="pattern-stamp" src="/manus-storage/mannuela-botanical-pattern_78176cab.png" alt="" />
      </section>

      <button className="page-two-link" type="button" onClick={() => setPage(2)}>ver localização da festa <span>→</span></button>
      <footer className="footer-line"><span>feito com amor</span><span>✦</span><span>página 01 • convite</span></footer>
    </main>
  );
}
