import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { invite } from './data/inviteContent';

function buildMonthGrid(year, month) {
  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month, 0);
  const startPad = first.getDay();
  const daysInMonth = last.getDate();
  const cells = [];
  for (let i = 0; i < startPad; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function Countdown({ isoDate }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const target = useMemo(() => new Date(isoDate), [isoDate]);
  const diff = target - now;
  const done = diff <= 0;

  const pad2 = (n) => String(n).padStart(2, '0');
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const weddingLabel = `${target.getFullYear()}.${pad2(target.getMonth() + 1)}.${pad2(
    target.getDate()
  )} (${weekdays[target.getDay()]})`;

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.max(0, Math.ceil(diff / msPerDay));

  if (done) {
    return (
      <div className="d-day">
        <p className="d-day__main">D-DAY</p>
        <p className="d-day__sub">{weddingLabel}</p>
      </div>
    );
  }

  return (
    <div className="d-day">
      <p className="d-day__main">
        D-{daysRemaining}
      </p>
      <p className="d-day__sub">{weddingLabel}</p>
    </div>
  );
}

function App() {
  const { calendar, weddingDateTime } = invite;
  const grid = buildMonthGrid(calendar.year, calendar.month);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState('');

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.35;
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        setMusicError('');
        // 사용자가 파일을 바꿨거나 늦게 로드된 경우 대비
        audio.load();
        audio.volume = 0.35;
        await audio.play();
        setMusicPlaying(true);
      } else {
        audio.pause();
        setMusicPlaying(false);
      }
    } catch (e) {
      setMusicPlaying(false);
      setMusicError('음원을 찾지 못했거나 브라우저에서 재생이 차단됐어요. public/audio에 mp3를 넣고 경로를 맞춰주세요.');
    }
  };

  const copyAccount = (text) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  const leaves = useMemo(() => {
    const count = 26; // 잔잔한 느낌을 위해 너무 많지 않게
    const symbols = ['🍃', '🌿'];
    return Array.from({ length: count }, (_, i) => {
      const x = Math.random() * 100; // %
      const size = 10 + Math.random() * 18; // px
      const delay = -Math.random() * 30; // s (음수: 즉시 떠 있는 상태처럼 보이게)
      const dur = 22 + Math.random() * 18; // s
      const drift = (Math.random() * 2 - 1) * 14; // vw
      const opacity = 0.12 + Math.random() * 0.3;
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      return { i, x, size, delay, dur, drift, opacity, symbol };
    });
  }, []);

  return (
    <div className="invite">
      <div className="leaves-layer" aria-hidden="true">
        {leaves.map((leaf) => (
          <span
            key={leaf.i}
            className="leaf"
            style={{
              '--x': leaf.x,
              '--size': leaf.size,
              '--delay': `${leaf.delay}s`,
              '--dur': `${leaf.dur}s`,
              '--drift': leaf.drift,
              '--opacity': leaf.opacity,
            }}
          >
            {leaf.symbol}
          </span>
        ))}
      </div>

      <audio
        ref={audioRef}
        src={invite.music?.src || ''}
        loop
        preload="auto"
        playsInline
        onError={() => {
          setMusicPlaying(false);
          setMusicError('음원 파일을 찾을 수 없어요. public/audio에 mp3를 넣고 inviteContent.js의 music.src를 확인해 주세요.');
        }}
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />

      <div className="music-player music-player--top">
        <button
          type="button"
          className="music-btn"
          onClick={toggleMusic}
          aria-pressed={musicPlaying}
          disabled={!invite.music?.src}
        >
          {musicPlaying ? '배경음악 일시정지' : '배경음악 재생'}
        </button>
      </div>
      {musicError ? <p className="music-error">{musicError}</p> : null}

      <header className="invite__hero">
        <p className="invite__date-line">{invite.hero.dateLine}</p>
        <h1 className="invite__names">
          {invite.hero.groom} <span className="invite__heart">&amp;</span> {invite.hero.bride}
        </h1>
        <p className="invite__subtitle">결혼합니다</p>
      </header>

      <section className="section section--photo" aria-label="메인 사진">
        <div className="main-photo">
          {invite.mainPhoto.src ? (
            <img src={invite.mainPhoto.src} alt={invite.mainPhoto.alt} />
          ) : (
            <div className="main-photo__placeholder">
              <span>메인 사진</span>
              <small>inviteContent.js · mainPhoto.src 에 이미지 경로를 넣어 주세요</small>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <p className="ceremony-info">{invite.ceremony.line1}</p>
        <p className="ceremony-info">{invite.ceremony.line2}</p>
      </section>

      <section className="section section--divider">
        <h2 className="section__title">{invite.inviteText.heading}</h2>
        <div className="invite-text">
          {invite.inviteText.paragraphs.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section className="section section--calendar">
        <p>
          {calendar.year}년 {String(calendar.month).padStart(2, '0')}월{' '}
          {String(calendar.weddingDay).padStart(2, '0')}일(토)
        </p>
        <div className="calendar">
          <div className="calendar__weekdays">
            {weekdays.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <div className="calendar__grid">
            {grid.map((d, i) => (
              <span
                key={i}
                className={
                  d === calendar.weddingDay
                    ? 'calendar__day calendar__day--wedding'
                    : 'calendar__day'
                }
              >
                {d ?? ''}
              </span>
            ))}
          </div>
        </div>
        <Countdown isoDate={weddingDateTime} />
      </section>

      <section className="section">
        <h2 className="section__title">{invite.gallery.heading}</h2>
        <div className="gallery-placeholder">
          <p>갤러리 영역</p>
          <button type="button" className="btn-text">
            {invite.gallery.moreLabel}
          </button>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">{invite.accounts.heading}</h2>
        <div className="accounts">
          <div className="accounts__col">
            <h3 className="accounts__side">{invite.accounts.groomSide}</h3>
            <ul>
              {invite.accounts.groom.map((row) => (
                <li key={row.name}>
                  <div className="account-row">
                    <span>
                      {row.name} · {row.bank} {row.number}
                    </span>
                    <button
                      type="button"
                      className="btn-copy"
                      onClick={() => copyAccount(row.number)}
                    >
                      복사하기
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="accounts__col">
            <h3 className="accounts__side">{invite.accounts.brideSide}</h3>
            <ul>
              {invite.accounts.bride.map((row) => (
                <li key={row.name}>
                  <div className="account-row">
                    <span>
                      {row.name} · {row.bank} {row.number}
                    </span>
                    <button
                      type="button"
                      className="btn-copy"
                      onClick={() => copyAccount(row.number)}
                    >
                      복사하기
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--map">
        <h2 className="section__title">{invite.directions.heading}</h2>
        <div className="map-links">
          {invite.directions.mapLinks.map((m) => (
            <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer" className="map-links__btn">
              {m.label}
            </a>
          ))}
        </div>
        <div className="venue">
          <p className="venue__name">{invite.directions.venueName}</p>
          <p className="venue__addr">{invite.directions.address}</p>
        </div>
        <ul className="direction-bullets">
          {invite.directions.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <footer className="invite__footer">
        <button type="button" className="btn-kakao">
          {invite.footer.share}
        </button>
        <p className="invite__copy">{invite.footer.copy}</p>
        <p className="invite__copyright">Copyright {new Date().getFullYear()} · 모바일 청첩장</p>
      </footer>
    </div>
  );
}

export default App;
