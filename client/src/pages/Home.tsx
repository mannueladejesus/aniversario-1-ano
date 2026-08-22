/* Jardim Encantado: composição editorial suave, detalhes de código afetivos e áudio contínuo liberado por interação. */
import { useEffect, useMemo, useRef, useState } from "react";
import { PinchZoomImage } from "@/components/PinchZoomImage";

const WHATSAPP_NUMBER = "5511944465965";
const RSVP_MESSAGE = "Olá! Quero confirmar presença no aniversário de 1 ano da Manuella.";
const MUSIC_SRC = "/assets/trilha-narracao-jardim-encantado-mannuella.mp3";
const NARRATION_SRC = "/assets/narracao-jardim-encantado-mannuella.mp3";

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
            <PinchZoomImage surfaceClassName="splash-cover-zoom" className="splash-cover-image" src="/assets/capa-abertura-mannuella-preenchida.webp" alt="Capa do convite: Um jardim encantado espera por você, com Manuella como fadinha em um jardim florido." ariaLabel="Capa do convite. Use pinça para ampliar a imagem." />
            <button className="splash-cover-button" type="button" onClick={startExperience} aria-label="Toque para abrir o convite e iniciar a música" />
          </div>
        </div>
      )}
      <main className={`invitation-shell ${page === 2 ? "detail-page" : ""} ${isOpening ? "is-covered" : ""}`}>
        <div className="floating-garden" aria-hidden="true"><span className="butterfly butterfly-one">🦋</span><span className="butterfly butterfly-two">🦋</span><span className="falling-flower flower-one">✿</span><span className="falling-flower flower-two">❀</span></div>
        {page === 1 ? (
          <>
            <section className="hero-panel first-page-panel">
              <div className="hero-art natural-scene" aria-label="Manuella alcançando uma borboleta em um jardim encantado">
                <PinchZoomImage surfaceClassName="natural-scene-zoom" className="natural-scene-image" src="/assets/mannuella-primeira-pagina-outpainting.webp" alt="Manuella inteira como fadinha com asas completas alcançando uma borboleta no Jardim Encantado" ariaLabel="Imagem principal do Jardim Encantado. Use pinça para ampliar." />
                <span className="scene-glint glint-one">✦</span><span className="scene-glint glint-two">✧</span><span className="scene-glint glint-three">✦</span>
              </div>
              <div className="hero-copy"><span className="brand-seal" aria-label="1 aninho"><span className="seal-flower">✿</span><strong>1</strong><small>aninho</small></span>
                <p className="kicker">O jardim da nossa vida floresceu</p>
                <h1>Manuella</h1>
                <p className="hero-description">Há um ano, um pequeno milagre chegou para colorir nossos dias. Entre risadas, descobertas e abraços apertados, nossa pequena Manuella completa seu primeiro ano — e esta história fica ainda mais bonita quando você faz parte dela.</p>
              </div>
            </section>
            <div className={`page-link-wrap ${magicBurst ? "is-bursting" : ""}`}>
              {magicBurst && <span className="magic-burst" aria-hidden="true"><i>✦</i><i>✧</i><i>✿</i><i>✦</i><i>·</i><i>·</i></span>}
              <button className="page-two-link primary-page-link" type="button" onClick={openInformationPage} disabled={magicBurst}>abrir informações da celebração <span>→</span></button>
            </div>
            <footer className="footer-line"><span>feito com amor</span><span>✦</span><span>página 01 • convite</span></footer>
          </>
        ) : (
          <section className="information-page image-only-page" aria-label="Informações da celebração em imagem">
            <PinchZoomImage surfaceClassName="second-page-art-zoom" className="second-page-full-art" src="/assets/segunda-pagina-mannuella-completa.webp" alt="Manuella em um Jardim Encantado com a data, endereço e mensagem da celebração" ariaLabel="Informações da celebração. Use pinça para ampliar a imagem." />
            <button className="back-button image-overlay-button image-back-button" type="button" onClick={() => { setMagicBurst(false); setPage(1); }}><span className="return-garden-mark" aria-hidden="true">✿</span><span>← voltar ao convite</span></button>
            <button className="next-button rsvp-button image-overlay-button image-rsvp-button" type="button" onClick={handleConfirm}>{confirmed ? "Presença compilada ✓" : "Confirmar presença no WhatsApp ↗"}</button>
          </section>
        )}
      </main>
      {!isOpening && <button className={`music-toggle ${isPlaying ? "is-playing" : ""}`} type="button" onClick={toggleMusic} aria-label={isPlaying ? "Pausar música" : "Tocar música"} aria-pressed={isPlaying}><span aria-hidden="true">{isPlaying ? "♫" : "♪"}</span><small>{isPlaying ? "música" : "pausada"}</small></button>}
    </>
  );
}
