'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import * as THREE from 'three';
import { gsap } from 'gsap';

const rotatingTexts = ['Success', 'Essays', 'Feedback'];

export default function HomePage() {
  /* -------------------- ROTATING HEADLINE -------------------- */
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % rotatingTexts.length), 3000);
    return () => clearInterval(iv);
  }, []);

  /* -------------------- FLOATING DISC ANIMATION --------------- */
  useEffect(() => {
    const canvas = document.getElementById('c');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0xaaaaff, 0.4);
    dirLight2.position.set(-5, -3, 5);
    scene.add(dirLight2);

    /* gradient texture */
    const size = 256;
    const gradCanvas = document.createElement('canvas');
    gradCanvas.width = gradCanvas.height = size;
    const ctx = gradCanvas.getContext('2d');
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#60a5fa');
    gradient.addColorStop(1, '#93c5fd');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(gradCanvas);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.2,
      roughness: 0.4,
      flatShading: true,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });
    const geometry = new THREE.CylinderGeometry(0.8, 0.8, 0.3, 32);

    const group = new THREE.Group();
    group.scale.set(0.8, 0.8, 0.8);
    scene.add(group);

    const makeDisc = (
      x: number,
      y: number
    ): THREE.Mesh<THREE.CylinderGeometry, THREE.MeshStandardMaterial> => {
      const mesh = new THREE.Mesh<
        THREE.CylinderGeometry,
        THREE.MeshStandardMaterial
      >(geometry, material.clone() as THREE.MeshStandardMaterial);
    
      mesh.position.set(x, y, 0);
      mesh.rotation.x = 0.4;
      group.add(mesh);
      return mesh;
    };
    

    const discs = [
      makeDisc(-2, 2),
      makeDisc(2, 0.5),
      makeDisc(-2.5, -1),
    ];

    discs.forEach((m, i) => {
      m.scale.set(0.3, 0.3, 0.3);
      m.material.opacity = 0;
      gsap.to(m.scale, {
        x: 1,
        y: 1,
        z: 1,
        ease: 'back.out(1.7)',
        duration: 1.2,
        delay: i * 0.2,
      });
      gsap.to(m.material, {
        opacity: 1,
        ease: 'power1.out',
        duration: 1,
        delay: i * 0.2,
      });
    });

    /* subtle rotations */
    gsap.to(discs[0].rotation, {
      x: discs[0].rotation.x + 0.15,
      z: discs[0].rotation.z + 0.1,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.2,
    });
    gsap.to(discs[1].rotation, {
      y: discs[1].rotation.y - 0.15,
      z: discs[1].rotation.z - 0.12,
      duration: 4.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.4,
    });
    gsap.to(discs[2].rotation, {
      x: discs[2].rotation.x - 0.1,
      y: discs[2].rotation.y + 0.15,
      duration: 3.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.6,
    });

    const fadeTimeout = setTimeout(() => {
      discs.forEach((m, i) => {
        gsap.to(m.material, {
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
          delay: i * 0.1,
        });
        gsap.to(m.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: 'back.in(1.7)',
          delay: i * 0.1,
        });
      });
    }, 2000);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(fadeTimeout);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      texture.dispose();
      discs.forEach((m) => m.geometry.dispose());
    };
  }, []);

  /* -------------------- SCROLL REVEAL FOR PROMO SECTION ------- */
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );

    const sections = Array.from(document.querySelectorAll('.scroll-section'));
    const logos = Array.from(document.querySelectorAll('.ivy-crests img'));

    sections.forEach((s) => revealObserver.observe(s));
    logos.forEach((l) => revealObserver.observe(l));

    return () => {
      sections.forEach((s) => revealObserver.unobserve(s));
      logos.forEach((l) => revealObserver.unobserve(l));
    };
  }, []);

  /* -------------------- JSX -------------------- */
  return (
    <>
      <Head>
        {/* Font for promo section */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* GLOBAL STYLES (existing + promo) */}
      <style jsx global>{`
        :root {
          --header-height: 40px;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Poppins', sans-serif;
          background: #000;
          color: #fff;
        }

        /* ============== HERO (unchanged) ============== */
        .hero {
          height: calc(85vh - var(--header-height));
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 1rem;
          position: relative;
          z-index: 1;
        }
        .rotating-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        .rotating-text,
        .mapped-out {
          font-size: 4.5rem;
          line-height: 1.1;
          font-weight: 800;
          white-space: nowrap;
        }
        .rotating-text {
          background: linear-gradient(90deg, #93c5fd, #e0f2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .description {
          margin-top: 1rem;
          font-size: 1.5rem;
          max-width: 640px;
          color: #cbd5e1;
        }
        .review-btn {
          margin-top: 2.5rem;
          padding: 16px 32px;
          font-size: 1.25rem;
          font-weight: 600;
          background: #b3d9ff;
          color: #000;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.25s, transform 0.15s, box-shadow 0.15s;
        }
        .review-btn:hover {
          background: #93c5fd;
          transform: translateY(-3px);
          box-shadow: 0 14px 24px rgba(59, 130, 246, 0.2);
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 768px) {
          .rotating-text,
          .mapped-out {
            font-size: 3rem;
          }
          .description {
            font-size: 1.125rem;
          }
        }

        /* ============== PROMO SECTION (from HTML) ============== */
        .promo {
          background: linear-gradient(180deg,rgb(0, 0, 0),rgb(0, 0, 0));
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 120px 20px;
          font-family: 'Inter', sans-serif;
        }
        .promo h1 {
          font-size: 5.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 40px;
        }
        .gradient-word {
          background: linear-gradient(90deg, #93c5fd, #dbeafe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .promo-description {
          font-size: 2.25rem;
          max-width: 1000px;
          margin-bottom: 60px;
          color: #cbd5e1;
          line-height: 1.7;
        }
        .ivy-crests {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 40px;
          margin: 60px 0 120px 0;
        }
        .ivy-crests img {
          height: 90px;
          width: auto;
          opacity: 0;
          transform: scale(0.85);
          filter: grayscale(100%) brightness(1.1);
          transition: all 0.8s ease;
        }
        .ivy-crests img.visible {
          opacity: 1;
          transform: scale(1);
          filter: none;
        }
        .scroll-section {
          font-size: 2.75rem;
          font-weight: 600;
          line-height: 1.4;
          max-width: 1000px;
          margin: 0 auto 100px auto;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .scroll-section .subtext {
          display: block;
          font-size: 1.75rem;
          font-weight: 400;
          color: #cbd5e1;
          margin-top: 14px;
          line-height: 1.6;
        }
        .scroll-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .final-cta {
          font-size: 4.5rem;
          margin-top: 100px;
          margin-bottom: 50px;
          color: #ffffff;
        }
        .cta-button {
          display: inline-block;
          padding: 24px 48px;
          font-size: 2rem;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          color: white;
          text-decoration: none;
          border-radius: 14px;
          font-weight: 600;
          transition: background 0.3s ease;
        }
        @media (max-width: 768px) {
          .promo h1 {
            font-size: 3.5rem;
          }
          .promo-description {
            font-size: 1.6rem;
          }
          .scroll-section {
            font-size: 1.8rem;
          }
          .scroll-section .subtext {
            font-size: 1.3rem;
          }
          .final-cta {
            font-size: 2.5rem;
          }
          .cta-button {
            font-size: 1.3rem;
            padding: 16px 32px;
          }
        }

        /* ============== EXISTING SECONDARY PAGES ============== */
        .page {
          min-height: calc(100vh - var(--header-height));
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 1rem;
          text-align: center;
        }
        .page h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .page .desc {
          font-size: 1.25rem;
          color: #cbd5e1;
          max-width: 640px;
        }
        .btn {
          margin-top: 2.5rem;
          padding: 16px 32px;
          font-size: 1.125rem;
          font-weight: 600;
          background: #b3d9ff;
          color: #000;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.25s, transform 0.15s, box-shadow 0.15s;
        }
        .btn:hover {
          background: #93c5fd;
          transform: translateY(-3px);
          box-shadow: 0 14px 24px rgba(59, 130, 246, 0.2);
        }
      `}</style>

      {/* canvas background */}
      <canvas id="c" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* HERO (original) */}
      <section className="hero">
        <div className="rotating-wrapper">
          <span key={rotatingTexts[idx]} className="rotating-text fade-in-up">
            {rotatingTexts[idx]}
          </span>
          <span className="mapped-out">Mapped&nbsp;Out</span>
        </div>

        <p className="description">Admit smarter. The most strategic AI for getting in.</p>

        <Link href="/review" passHref legacyBehavior>
          <button className="review-btn">Review your essay →</button>
        </Link>
      </section>

      {/* PROMO SECTION (imported HTML) */}
      <section className="promo">
        <h1>
          <span>Made by</span> <span className="gradient-word">Ivy</span>{' '}
          <span className="gradient-word">League</span>{' '}
          <span>for</span> <span className="gradient-word">Ivy</span>{' '}
          <span className="gradient-word">League</span>
        </h1>

        <p className="promo-description">
          IvyAdmit is built by students who’ve been accepted into the top Ivies — now here to help you do the same.
        </p>

        <div className="ivy-crests">
          <img src="https://upload.wikimedia.org/wikipedia/en/4/4a/Harvard_Wreath_Logo_1.svg" alt="Harvard" />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Yale_University_Shield_1.svg/800px-Yale_University_Shield_1.svg.png"
            alt="Yale"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Princeton_University_shield.svg/800px-Princeton_University_shield.svg.png"
            alt="Princeton"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Columbia_University_shield.svg/800px-Columbia_University_shield.svg.png"
            alt="Columbia"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/University_of_Pennsylvania_shield.svg/800px-University_of_Pennsylvania_shield.svg.png"
            alt="Penn"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Brown_University_shield.svg/800px-Brown_University_shield.svg.png"
            alt="Brown"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Dartmouth_College_shield.svg/800px-Dartmouth_College_shield.svg.png"
            alt="Dartmouth"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Cornell_University_seal.svg/800px-Cornell_University_seal.svg.png"
            alt="Cornell"
          />
        </div>

        <section className="scroll-section">
          <strong>Regional Admissions Preference:</strong>
          <span className="subtext">
            We tailor your essays to your regional admission officers—don’t speak Midwest when your reader’s from Manhattan.
          </span>
        </section>

        <section className="scroll-section">
          <strong>Successful Application Data:</strong>
          <span className="subtext">
            We analyze real, accepted apps—don’t take advice from people who’ve never made it past the gates.
          </span>
        </section>

        <section className="scroll-section">
          <strong>Proven Essay Strategies:</strong>
          <span className="subtext">
            From plot twists to prestige signals, we reverse-engineer the Ivy League’s favorite essays—straight from those who cracked the code.
            Trust us, we speak fluent admissions.
          </span>
        </section>

        <h2 className="final-cta">The rules are rigged. Good thing we wrote our own.</h2>
        <Link href="/review" passHref legacyBehavior>
          <a className="cta-button">Start Here</a>
        </Link>
      </section>

 </>
  );
}
