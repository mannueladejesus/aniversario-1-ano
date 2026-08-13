/* Jardim Encantado: composição editorial suave, detalhes de código afetivos e áudio contínuo liberado por interação. */
import { useEffect, useMemo, useRef, useState } from "react";

const WHATSAPP_NUMBER = "5511944465965";
const RSVP_MESSAGE = "Olá! Quero confirmar presença no aniversário de 1 ano da Mannuella.";
const MUSIC_SRC = "/manus-storage/trilha-narracao-jardim-encantado-mannuella_301a9798.mp3";
const NARRATION_SRC = "/manus-storage/narracao-jardim-encantado-mannuella_25637e2c.wav";

export default function Home() {
  const [page, setPage] = useState<1 | 2>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [magicBurst, setMagicBurst] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const narrationRef = useRef<HTMLAudioElement | null>(null);
  const whatsappUrl = useMemo(() => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RSVP_MESSAGE)}`, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.2;
    audio.loop = true;
    const narration = narrationRef.current;
    if (narration) {
      narration.volume = 1;
      const handleNarrationEnded = () => { audio.volume = 0.2; };
      narration.addEventListener("ended", handleNarrationEnded);
      return () => narration.removeEventListener("ended", handleNarrationEnded);
    }
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const startExperience = async () => {
    const audio = audioRef.current;
    setIsOpening(false);
    if (!audio) return;
    try {
      const narration = narrationRef.current;
      audio.volume = 0.08;
      if (narration) {
        narration.currentTime = 0;
        await Promise.all([audio.play(), narration.play()]);
      } else {
        await audio.play();
      }
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        const narration = narrationRef.current;
        await audio.play();
        if (narration && !narration.ended) await narration.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      narrationRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleConfirm = () => { setConfirmed(true); window.open(whatsappUrl, "_blank", "noopener,noreferrer"); };
  const openInformationPage = () => { if (magicBurst) return; setMagicBurst(true); window.setTimeout(() => setPage(2), 1250); };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} preload="none" aria-hidden="true" />
      <audio ref={narrationRef} src={NARRATION_SRC} preload="none" aria-hidden="true" />
      {isOpening && (
        <div className="garden-splash" role="dialog" aria-modal="true" aria-label="Abrir convite">
          <div className="splash-petal petal-a">✿</div>
          <div className="splash-petal petal-b">❀</div>
          <div className="splash-cover-wrap">
            <img className="splash-cover-image" src="/manus-storage/capa-abertura-mannuella-preenchida_9225b95f.webp" alt="Capa do convite: Um jardim encantado espera por você, com Mannuella como fadinha em um jardim florido." />
            <button className="splash-cover-button" type="button" onClick={startExperience} aria-label="Toque para abrir o convite e iniciar a música" />
          </div>
        </div>
      )}
      <main className={`invitation-shell ${page === 2 ? "detail-page" : ""} ${isOpening ? "is-covered" : ""}`}>
        <div className="floating-garden" aria-hidden="true"><span className="butterfly butterfly-one">🦋</span><span className="butterfly butterfly-two">🦋</span><span className="falling-flower flower-one">✿</span><span className="falling-flower flower-two">❀</span></div>
        {page === 1 ? (
          <>
            <section className="hero-panel first-page-panel">
              <div className="hero-art natural-scene" aria-label="Mannuella alcançando uma borboleta em um jardim encantado">
                <img className="natural-scene-image" src="/manus-storage/mannuella-primeira-pagina-outpainting_285e2cb1.webp" alt="Mannuella inteira como fadinha com asas completas alcançando uma borboleta no Jardim Encantado" />
                <span className="scene-glint glint-one">✦</span><span className="scene-glint glint-two">✧</span><span className="scene-glint glint-three">✦</span>
              </div>
              <div className="hero-copy"><span className="brand-seal" aria-label="1 aninho"><span className="seal-flower">✿</span><strong>1</strong><small>aninho</small></span>
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
          <section className="address-card information-page">
            <button className="back-button" type="button" onClick={() => { setMagicBurst(false); setPage(1); }}><span className="return-garden-mark" aria-hidden="true">✿</span><span>← voltar ao convite</span></button>
            <p className="kicker">✦ um dia para florescer juntos ✦</p>
            <h1>Informações<br /><em>da celebração</em></h1>
            <div className="address-divider">✦　✿　✦</div>
            <div className="address-box"><div><span className="detail-label">data da celebração</span><strong>03/10/2026</strong><span className="detail-label address-location-label">local da celebração</span><strong>Rua Giuseppe Piermarini, 521</strong><span>Jardim Icaraí · São Paulo — SP</span><span>CEP 04844-190</span></div></div>
            <p className="address-note">Entre flores, abraços e muita magia, vamos celebrar o primeiro aninho da nossa pequena Mannuella.</p>
            <div className="rsvp-note information-status"><span className="code-brace">{`{`}</span><div><span className="detail-label">status</span><strong>{confirmed ? "presença_enviada: true" : "aguardando seu abraço"}</strong></div><span className="code-brace">{`}`}</span></div>
            <button className="next-button rsvp-button" type="button" onClick={handleConfirm}>{confirmed ? "Presença compilada ✓" : "Confirmar presença no WhatsApp ↗"}</button>
          </section>
        )}
      </main>
      {!isOpening && <button className={`music-toggle ${isPlaying ? "is-playing" : ""}`} type="button" onClick={toggleMusic} aria-label={isPlaying ? "Pausar música" : "Tocar música"} aria-pressed={isPlaying}><span aria-hidden="true">{isPlaying ? "♫" : "♪"}</span><small>{isPlaying ? "música" : "pausada"}</small></button>}
    </>
  );
}
