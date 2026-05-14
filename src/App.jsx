import { useState } from "react";

const colors = {
  lavender: "#D8C7F0",
  sage: "#AFC4B0",
  blue: "#C9DDF2",
  blush: "#F4D7DD",
  ivory: "#F8F4EE",
  mauve: "#BDA8C7",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #F8F4EE;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    color: #5a4f5e;
    padding-top: 6.2rem;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes drift {
    0%   { transform: translateY(0) rotate(0deg); }
    33%  { transform: translateY(-12px) rotate(5deg); }
    66%  { transform: translateY(6px) rotate(-4deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }

  .fade-up { animation: fadeUp 0.9s ease forwards; }
  .fade-in { animation: fadeIn 1.2s ease forwards; }
  .delay-1 { animation-delay: 0.2s; opacity: 0; }
  .delay-2 { animation-delay: 0.45s; opacity: 0; }
  .delay-3 { animation-delay: 0.7s; opacity: 0; }
  .delay-4 { animation-delay: 0.95s; opacity: 0; }
  .drift { animation: drift 7s ease-in-out infinite; }
  .drift-slow { animation: drift 11s ease-in-out infinite; }
  .drift-fast { animation: drift 5s ease-in-out infinite; }

  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    padding: 1.1rem 2rem;
    background: rgba(248, 244, 238, 0.88);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(189, 168, 199, 0.25);
  }

  .nav-link {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #9080a0;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
    background: none;
    border: none;
    padding-bottom: 2px;
  }
  .nav-link:hover { color: #BDA8C7; }
  .nav-link.active { color: #7a6080; border-bottom: 1.5px solid #BDA8C7; }

  .nav-monogram {
    height: 4rem;
    width: auto;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    padding: 4rem 2rem 4rem;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 10% 20%, rgba(216,199,240,0.35) 0%, transparent 55%),
      radial-gradient(ellipse at 90% 80%, rgba(244,215,221,0.4) 0%, transparent 55%),
      radial-gradient(ellipse at 60% 10%, rgba(201,221,242,0.3) 0%, transparent 50%),
      #F8F4EE;
  }

  .hero-subtitle {
    font-size: 0.72rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #AFC4B0;
    margin-bottom: 1.4rem;
    font-weight: 500;
  }

  .hero-title {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(3.2rem, 9vw, 6.5rem);
    color: #7a5f90;
    line-height: 1.12;
    margin-bottom: 2rem;
    text-shadow: 0 2px 24px rgba(189,168,199,0.3);
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin: 1.8rem 0;
  }
  .divider-line {
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #BDA8C7, transparent);
  }
  .divider-flower { font-size: 1rem; color: #BDA8C7; opacity: 0.7; }

  .hero-blurb {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.08rem, 2.2vw, 1.28rem);
    font-style: italic;
    color: #7d6b80;
    max-width: 520px;
    line-height: 1.85;
    font-weight: 300;
  }

  .petal-svg {
    position: absolute;
    pointer-events: none;
    opacity: 0.13;
  }

  .section {
    padding: 5rem 2rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .section-label {
    font-size: 0.7rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #AFC4B0;
    font-weight: 500;
    margin-bottom: 0.6rem;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 3.5vw, 2.3rem);
    font-weight: 400;
    color: #6a5470;
    margin-bottom: 2.8rem;
    letter-spacing: 0.02em;
  }

  .choose-tag {
    display: inline-block;
    padding: 0.45rem 1.4rem;
    background: rgba(175,196,176,0.18);
    border: 1px solid rgba(175,196,176,0.5);
    border-radius: 50px;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #AFC4B0;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  .bride-cards {
    display: flex;
    gap: 2.2rem;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 820px;
  }

  .bride-card {
    cursor: pointer;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 280px;
    transition: transform 0.3s ease;
  }
  .bride-card:hover { transform: translateY(-6px); }
  .bride-card:hover .bride-img-wrap { box-shadow: 0 16px 48px rgba(189,168,199,0.45); }

  .bride-img-wrap {
    width: 100%;
    aspect-ratio: 3/4;
    border-radius: 180px 180px 8px 8px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(189,168,199,0.28);
    position: relative;
    transition: box-shadow 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bride-placeholder-text {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    font-weight: 500;
    position: absolute;
    bottom: 2rem;
  }

  .bride-emoji {
    font-size: 4.5rem;
    opacity: 0.4;
    position: absolute;
    top: 50%;
    transform: translateY(-65%);
  }

  .bride-card-label {
    font-family: 'Great Vibes', cursive;
    font-size: 1.8rem;
    color: #7a5f90;
  }

  .bride-card-hint {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #AFC4B0;
    font-weight: 500;
  }

  .faq-link-wrap {
    padding: 2rem 2rem 5rem;
    display: flex;
    justify-content: center;
  }

  .faq-link-btn {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-style: italic;
    color: #8a7090;
    cursor: pointer;
    background: none;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem 2rem;
    border: 1px solid rgba(189,168,199,0.45);
    border-radius: 50px;
    transition: all 0.25s ease;
    letter-spacing: 0.03em;
  }
  .faq-link-btn:hover {
    background: rgba(216,199,240,0.18);
    border-color: #BDA8C7;
    color: #6a5070;
    transform: translateY(-2px);
  }

  /* FAQ PAGE */
  .faq-hero {
    min-height: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem 2rem 1rem;
    text-align: center;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(201,221,242,0.4) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 100%, rgba(216,199,240,0.3) 0%, transparent 50%),
      #F8F4EE;
  }

  .faq-grid {
    max-width: 860px;
    margin: 0 auto;
    padding: 3rem 2rem 6rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1.6rem;
  }

  .faq-card {
    background: #fff;
    border-radius: 20px;
    padding: 2rem 1.8rem;
    border: 1px solid rgba(216,199,240,0.5);
    box-shadow: 0 4px 20px rgba(189,168,199,0.1);
    text-align: left;
    transition: transform 0.25s, box-shadow 0.25s;
    opacity: 0;
  }
  .faq-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 36px rgba(189,168,199,0.22);
  }

  .faq-card-accent {
    width: 28px;
    height: 3px;
    background: linear-gradient(90deg, #D8C7F0, #F4D7DD);
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .faq-q {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 500;
    color: #6a5070;
    margin-bottom: 0.8rem;
    line-height: 1.4;
  }

  .faq-a {
    font-size: 0.88rem;
    color: #8a7880;
    line-height: 1.75;
    font-weight: 300;
  }

  footer {
    text-align: center;
    padding: 2rem;
    font-family: 'Great Vibes', cursive;
    font-size: 1.4rem;
    color: #BDA8C7;
    opacity: 0.7;
    border-top: 1px solid rgba(189,168,199,0.2);
    position: relative;
  }

  .footer-luna {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    opacity: 0.7;
  }

  .footer-luna img { height: 3rem; }

  .footer-luna p {
    font-family: 'Great Vibes', cursive;
    font-size: 0.5rem;
    color: #BDA8C7;
    margin: 0;
  }
`;

const FloralPetals = () => (
  <>
    <svg className="petal-svg drift" style={{top:'8%',left:'4%',width:90}} viewBox="0 0 100 100">
      <ellipse cx="50" cy="50" rx="18" ry="38" fill="#F4D7DD" transform="rotate(30 50 50)"/>
      <ellipse cx="50" cy="50" rx="18" ry="38" fill="#D8C7F0" transform="rotate(90 50 50)" opacity="0.7"/>
      <ellipse cx="50" cy="50" rx="18" ry="38" fill="#C9DDF2" transform="rotate(150 50 50)" opacity="0.5"/>
    </svg>
    <svg className="petal-svg drift-slow" style={{top:'15%',right:'5%',width:70}} viewBox="0 0 100 100">
      <ellipse cx="50" cy="50" rx="16" ry="34" fill="#BDA8C7" transform="rotate(20 50 50)"/>
      <ellipse cx="50" cy="50" rx="16" ry="34" fill="#F4D7DD" transform="rotate(80 50 50)" opacity="0.7"/>
      <ellipse cx="50" cy="50" rx="16" ry="34" fill="#AFC4B0" transform="rotate(140 50 50)" opacity="0.5"/>
    </svg>
    <svg className="petal-svg drift-fast" style={{bottom:'12%',left:'7%',width:60}} viewBox="0 0 100 100">
      <ellipse cx="50" cy="50" rx="14" ry="32" fill="#D8C7F0" transform="rotate(10 50 50)"/>
      <ellipse cx="50" cy="50" rx="14" ry="32" fill="#AFC4B0" transform="rotate(70 50 50)" opacity="0.7"/>
    </svg>
    <svg className="petal-svg drift" style={{bottom:'20%',right:'8%',width:80}} viewBox="0 0 100 100">
      <ellipse cx="50" cy="50" rx="16" ry="36" fill="#F4D7DD" transform="rotate(55 50 50)"/>
      <ellipse cx="50" cy="50" rx="16" ry="36" fill="#C9DDF2" transform="rotate(115 50 50)" opacity="0.6"/>
    </svg>
  </>
);

const faqs = [
  { q: "You're getting MARRIED?! When?? Where???", a: "You mean to tell me you don't already have an event on your calendar for May 1st, 2027 at the Tampa Garden Club?" },
  { q: "What does being in the wedding party involve?", a: "We're low maintenance, the expectations aren't crazy. You'll be invited to a bachelorette party. On the big day we'd love to spend the morning getting ready with you, offer exclusive seating at the ceremony, etc. Think of it as the VIP experience at our wedding." },
  { q: "What should I wear?", a: "We're still thinking this over and will offer some guidance asap! You look your best when you feel your best, so it's important to us that everyone is comfortable in their attire." },
  { q: "Will there be a rehearsal?", a: "Yes! There will be a rehearsal dinner the evening before the ceremony. We'll share the details as soon as possible." },
  { q: "What if I'm busy/broke/baby?", a: "We understand that almost none of you live in the Tampa area and will have to travel. Don't overextend yourselves! If you can't be there for the wedding weekend at a minimum, please let us know asap!" },
  { q: "When do I need to respond?", a: "We'd love to hear from you within a few weeks of receiving this invitation. Fill out the form linked on the home page, or just reach out to us directly!" },
];

function Nav({ page, setPage }) {
  return (
    <nav className="nav">
      <button className={`nav-link${page === "home" ? " active" : ""}`} onClick={() => setPage("home")}>Home</button>
      <img src="/kelley-wedding-party/kelleys.png" alt="The Kelleys" className="nav-monogram" />
      <button className={`nav-link${page === "faq" ? " active" : ""}`} onClick={() => setPage("faq")}>FAQ</button>
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <div>
      <section className="hero">
        <FloralPetals />
        <p className="hero-subtitle fade-up delay-1">An Invitation</p>
        <h1 className="hero-title fade-up delay-2">Will you join our<br />wedding party?</h1>
        <div className="divider fade-up delay-3">
          <span className="divider-line"></span>
          <span className="divider-flower">✿</span>
          <span className="divider-line"></span>
        </div>
        <p className="hero-blurb fade-up delay-4">
          It would be the greatest honor of our hearts to have you beside us as we begin this beautiful new chapter. You've walked with us through so much — and now we'd love nothing more than to have you there when it all begins.
        </p>
        <br/><br/>
        <p className="hero-blurb fade-up delay-4">
          Keep this link handy, it may prove useful for future updates!
        </p>
      </section>

      <section className="section">
        <span className="section-label">Hope you said yes...</span>
        <h2 className="section-title">Now let's get started! Choose your bride:</h2>
        <span className="choose-tag">Select a photo below to fill out a quick questionnaire</span>
        <div className="bride-cards">
          {[
            { name: "Ashleigh", gradient: "linear-gradient(145deg, #F4D7DD, #D8C7F0)", image: "/kelley-wedding-party/Ash.jpg" },
            { name: "Sarah", gradient: "linear-gradient(145deg, #C9DDF2, #AFC4B0)", image: "/kelley-wedding-party/Sarah.jpg" },
          ].map((bride, i) => (
            <a
              key={i}
              href="https://forms.gle/6CG49DcpABydxT6f6"
              target="_blank"
              rel="noopener noreferrer"
              className="bride-card"
            >
              <div className="bride-img-wrap" style={{ backgroundImage: `url(${bride.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              </div>
              <span className="bride-card-label">{bride.name}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">That's all we need from you right now, thanks!</h2>
        <span className="section-label">In the meantime, have any questions for us?</span>

        <div className="faq-link-wrap">
          <button className="faq-link-btn" onClick={() => setPage("faq")}>
            <span>✦</span> Visit our info page <span>✦</span>
          </button>
        </div>
      </section>
      

      <footer>
        with love, Ashleigh + Sarah
        <div className="footer-luna">
          <p>(and Luna)</p>
          <img src="/kelley-wedding-party/Luna.png" alt="Luna" />
        </div>
      </footer>
    </div>
  );
}

function FAQPage() {
  return (
    <div>
      <div className="faq-hero">
        <p className="hero-subtitle fade-up" style={{marginBottom: '0.5rem'}}>Here's everything you need to know (so far)</p>
        <h1 className="hero-title fade-up delay-1" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", marginBottom: '0.8rem' }}>
          Info
        </h1>
        <div className="divider fade-up delay-2" style={{margin: '0.8rem 0'}}>
          <span className="divider-line"></span>
          <span className="divider-flower">✿</span>
          <span className="divider-line"></span>
        </div>
      </div>

      <div className="faq-grid">
        {faqs.map((item, i) => (
          <div
            className="faq-card fade-up"
            key={i}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="faq-card-accent" />
            <p className="faq-q">{item.q}</p>
            <p className="faq-a">{item.a}</p>
          </div>
        ))}
      </div>

      <footer>
        with love, Ashleigh + Sarah
        <div className="footer-luna">
          <p>(and Luna)</p>
          <img src="/kelley-wedding-party/Luna.png" alt="Luna" />
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <>
      <style>{globalStyles}</style>
      <Nav page={page} setPage={setPage} />
      {page === "home" ? <HomePage setPage={setPage} /> : <FAQPage />}
    </>
  );
}
