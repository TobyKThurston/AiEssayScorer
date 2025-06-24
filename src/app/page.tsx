'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { gsap } from 'gsap';

const texts = ['Success', 'Essays', 'Feedback'];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  /* rotate headline */
  useEffect(() => {
    const iv = setInterval(() => setIndex(i => (i + 1) % texts.length), 3000);
    return () => clearInterval(iv);
  }, []);

  /* floating-disc animation */
  useEffect(() => {
    /* canvas might be null the very first render -- bail out early */
    const canvas = document.getElementById('c') as HTMLCanvasElement | null;
    if (!canvas) return;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    /* scene + camera */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    /* lighting */
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xaaaaff, 0.4);
    dirLight2.position.set(-5, -3, 5);
    scene.add(dirLight2);

    /* icy-blue gradient texture */
    const size = 256;
    const gradCanvas = document.createElement('canvas');
    gradCanvas.width = gradCanvas.height = size;

    const ctx = gradCanvas.getContext('2d');
    if (!ctx) {
      /* Browser doesn’t support 2D canvas – abort animation gracefully */
      console.warn('2-D canvas not supported; skipping background animation.');
      return;
    }
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#60a5fa');
    gradient.addColorStop(1, '#93c5fd');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(gradCanvas);

    /* material + geometry */
    const material = new THREE.MeshStandardMaterial({
      map: texture, metalness: 0.2, roughness: 0.4,
      flatShading: true, transparent: true, opacity: 1, side: THREE.DoubleSide,
    });
    const geometry = new THREE.CylinderGeometry(0.8, 0.8, 0.3, 32);

    /* group + discs */
    const group = new THREE.Group();
    group.scale.set(0.8, 0.8, 0.8);
    scene.add(group);

    const mesh1 = new THREE.Mesh(geometry, material.clone());
    mesh1.position.set(-2, 2, 0);
    mesh1.rotation.x = 0.4;
    group.add(mesh1);

    const mesh2 = new THREE.Mesh(geometry, material.clone());
    mesh2.position.set(2, 0.5, 0);
    mesh2.rotation.x = 0.4;
    group.add(mesh2);

    const mesh3 = new THREE.Mesh(geometry, material.clone());
    mesh3.position.set(-2.5, -1, 0);
    mesh3.rotation.x = 0.4;
    group.add(mesh3);

    /* entrance animation */
    [mesh1, mesh2, mesh3].forEach((m, i) => {
      m.scale.set(0.3, 0.3, 0.3);
      m.material.opacity = 0;
      gsap.to(m.scale, { x: 1, y: 1, z: 1, ease: 'back.out(1.7)', duration: 1.2, delay: i * 0.2 });
      gsap.to(m.material, { opacity: 1, ease: 'power1.out', duration: 1, delay: i * 0.2 });
    });

    /* subtle wiggles */
    gsap.to(mesh1.rotation, { x: mesh1.rotation.x + 0.15, z: mesh1.rotation.z + 0.10,
      duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.2 });
    gsap.to(mesh2.rotation, { y: mesh2.rotation.y - 0.15, z: mesh2.rotation.z - 0.12,
      duration: 4.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.4 });
    gsap.to(mesh3.rotation, { x: mesh3.rotation.x - 0.10, y: mesh3.rotation.y + 0.15,
      duration: 3.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.6 });

    /* fade-out after two seconds */
    const fadeTimeout = setTimeout(() => {
      [mesh1, mesh2, mesh3].forEach((m, i) => {
        gsap.to(m.material, { opacity: 0, duration: 1, ease: 'power1.inOut', delay: i * 0.1 });
        gsap.to(m.scale, { x: 0, y: 0, z: 0, duration: 1, ease: 'back.in(1.7)', delay: i * 0.1 });
      });
    }, 2000);

    /* render loop */
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    /* resize listener */
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* clean-up */
    return () => {
      clearTimeout(fadeTimeout);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      texture.dispose();
      [mesh1, mesh2, mesh3].forEach(m => m.geometry.dispose());
    };
  }, []);  // ← run once

  return (
    <>
      {/* global styles */}
      <style jsx global>{`
        :root { --header-height: 40px; }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Poppins',sans-serif; background:#000; color:#fff; }
        .hero {
          height:calc(85vh - var(--header-height));
          display:flex; flex-direction:column; justify-content:center; align-items:center;
          text-align:center; padding:0 1rem; position:relative; z-index:1;
        }
        .rotating-wrapper { display:flex; flex-direction:column; align-items:center; gap:.25rem; }
        .rotating-text,.mapped-out { font-size:4.5rem; line-height:1.1; font-weight:800; white-space:nowrap; }
        .rotating-text {
          background:linear-gradient(90deg,#93c5fd,#e0f2fe);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .description { margin-top:1rem; font-size:1.5rem; max-width:640px; color:#cbd5e1; }
        .review-btn {
          margin-top:2.5rem; padding:16px 32px; font-size:1.25rem; font-weight:600;
          background:#b3d9ff; color:#000; border:none; border-radius:10px; cursor:pointer;
          transition:background .25s, transform .15s, box-shadow .15s;
        }
        .review-btn:hover { background:#93c5fd; transform:translateY(-3px); box-shadow:0 14px 24px rgba(59,130,246,.2); }
        .fade-in-up { animation:fadeInUp .6s ease forwards; }
        @keyframes fadeInUp { from {opacity:0; transform:translateY(10px);} to {opacity:1; transform:translateY(0);} }
        @media (max-width:768px){
          .rotating-text,.mapped-out{font-size:3rem;}
          .description{font-size:1.125rem;}
        }
      `}</style>

      {/* background canvas */}
      <canvas
        id="c"
        style={{ position:'fixed', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
      />

      <section className="hero">
        <div className="rotating-wrapper">
          <span key={texts[index]} className="rotating-text fade-in-up">{texts[index]}</span>
          <span className="mapped-out">Mapped&nbsp;Out</span>
        </div>

        <p className="description">
          Admit smarter. The most strategic AI for getting in.
        </p>

        <Link href="/review">
          <button className="review-btn">Review your essay →</button>
        </Link>
      </section>
    </>
  );
}
