/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Dumbbell, Zap, Target, X, Check, CheckCircle2, Type, Palette, ArrowUp, ArrowLeftRight } from 'lucide-react';
import { motion } from 'motion/react';
import Wheel from '@uiw/react-color-wheel';
import { hexToHsva } from '@uiw/color-convert';

const RevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <motion.span
        initial={{ x: "-100%" }}
        whileInView={{ x: ["-100%", "0%", "100%"] }}
        viewport={{ once: true }}
        transition={{ duration: 1, times: [0, 0.5, 1], ease: [0.77, 0, 0.175, 1], delay }}
        className="absolute inset-0 bg-primary z-10"
      />
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.01, delay: delay + 0.5 }}
        className="relative z-0"
      >
        {children}
      </motion.span>
    </span>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function App() {
  const [primaryColor, setPrimaryColor] = useState('#dc2626');
  const [hsva, setHsva] = useState(hexToHsva('#dc2626'));
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
  const [reverseAbout, setReverseAbout] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) || 220;
    const g = parseInt(hex.slice(3, 5), 16) || 38;
    const b = parseInt(hex.slice(5, 7), 16) || 38;
    return `${r}, ${g}, ${b}`;
  };

  const fonts = [
    { name: 'Inter (Moderno)', value: "'Inter', sans-serif" },
    { name: 'Oswald (Impacto)', value: "'Oswald', sans-serif" },
    { name: 'Poppins (Arredondado)', value: "'Poppins', sans-serif" },
    { name: 'Playfair (Clássico)', value: "'Playfair Display', serif" },
  ];

  return (
    <div 
      className="min-h-screen bg-[#050505] text-white relative overflow-hidden transition-colors duration-500"
      style={{ 
        '--color-primary': primaryColor,
        '--primary-color': primaryColor,
        '--primary-rgb': hexToRgb(primaryColor),
        fontFamily: fontFamily
      } as React.CSSProperties}
    >
      {/* FIXED LEFT MENU */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-r-xl">
        {/* Mudar Fonte */}
        <div className="relative group">
          <button className="p-3 text-white hover:text-primary transition-colors flex flex-col items-center gap-1" title="Mudar Fonte">
            <Type size={20} />
            <span className="text-[10px] uppercase font-bold">Fonte</span>
          </button>
          <div className="absolute left-full top-0 ml-2 bg-black/90 border border-white/10 p-3 rounded-xl flex flex-col gap-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-1000 group-hover:delay-0">
            <span className="text-xs text-gray-400 font-bold uppercase mb-1">Escolha a fonte</span>
            {fonts.map(f => (
              <button 
                key={f.name} 
                onClick={() => setFontFamily(f.value)} 
                className={`text-left text-sm py-1 transition-colors ${fontFamily === f.value ? 'text-primary' : 'text-white hover:text-primary'}`} 
                style={{ fontFamily: f.value }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mudar Cor */}
        <div className="relative group">
          <button className="p-3 text-white hover:text-primary transition-colors flex flex-col items-center gap-1" title="Mudar Cor">
            <Palette size={20} />
            <span className="text-[10px] uppercase font-bold">Cor</span>
          </button>
          <div className="absolute left-full top-0 ml-2 bg-black/90 border border-white/10 p-4 rounded-xl flex flex-col gap-3 w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-1000 group-hover:delay-0">
            <span className="text-xs text-gray-400 font-bold uppercase mb-1 text-center">Cor Destaque</span>
            <div className="flex justify-center">
              <Wheel
                color={hsva}
                onChange={(color) => {
                  setHsva(color.hsva);
                  setPrimaryColor(color.hex);
                }}
                width={160}
                height={160}
              />
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-sm font-mono text-gray-300 bg-white/5 px-3 py-1 rounded-md">{primaryColor.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BACK TO TOP BUTTON */}
      {showTopBtn && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="fixed bottom-8 right-8 z-50 bg-primary text-black p-3 rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] hover:-translate-y-1 transition-all"
        >
          <ArrowUp size={24} />
        </button>
      )}
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center">
        {/* Neon Triangle Background Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[800px] h-[800px] z-0 pointer-events-none animate-[pulse_4s_ease-in-out_infinite]"
        >
          <div className="absolute inset-0 border-[15px] border-primary rounded-lg transform rotate-45 shadow-[0_0_100px_rgba(var(--primary-rgb),0.8),inset_0_0_100px_rgba(var(--primary-rgb),0.8)]"></div>
          <div className="absolute inset-10 border-[8px] border-primary/50 rounded-lg transform rotate-45 blur-sm"></div>
        </motion.div>

        {/* Background Image with Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym background" 
            className="w-full h-full object-cover object-right opacity-50 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 pt-12 pb-32 w-full">
          
          {/* Header / Logo */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-12 left-0 w-full sm:w-auto sm:left-12 lg:left-24 flex items-center justify-center sm:justify-start gap-2"
          >
            <div className="bg-primary text-black p-1.5 rounded-sm">
              <Dumbbell size={20} strokeWidth={3} />
            </div>
            <span className="text-2xl font-extrabold tracking-tighter">
              academia.<span className="text-primary">ESCOM</span>
            </span>
          </motion.header>

          {/* Main Hero Content */}
          <motion.main 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mt-20 relative z-30 mx-auto sm:mx-0 text-center sm:text-left flex flex-col items-center sm:items-start"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight mb-6 text-white drop-shadow-lg">
              <RevealText delay={0.2}>Construa a sua</RevealText><br />
              <RevealText delay={0.4}>melhor versão.</RevealText>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-gray-300 text-lg sm:text-xl mb-10 max-w-md leading-relaxed font-medium mx-auto sm:mx-0">
              A estrutura mais completa da região para você superar seus limites. Treino, foco e performance em um só lugar.
            </motion.p>
            
            <motion.button variants={fadeInUp} className="relative overflow-hidden bg-primary hover:bg-primary/80 text-white font-black py-4 px-10 rounded-sm text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_40px_rgba(var(--primary-rgb),0.6)] hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.9)] hover:-translate-y-1 border border-primary/50 group">
              <span className="relative z-10">Quero me inscrever</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine" />
            </motion.button>
          </motion.main>
        </div>

        {/* Bottom Angled Shape (Trapezoid) */}
        <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 z-40 overflow-hidden">
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-full bg-white" 
            style={{ clipPath: 'polygon(0% 100%, 35% 20%, 65% 20%, 100% 100%)' }}
          ></div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-white"></div>
        </div>
      </section>

      {/* SOBRE NÓS SECTION */}
      <section className="bg-white text-black py-24 px-6 sm:px-12 lg:px-24 relative z-40">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex justify-between items-end mb-12">
            <div>
              <motion.div variants={fadeInUp} className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-sm text-sm mb-6 tracking-widest uppercase">Sobre Nós</motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                <RevealText delay={0.1}>O ambiente moldado para o seu resultado.</RevealText>
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`flex flex-col ${reverseAbout ? "order-last lg:order-2" : "order-first lg:order-1"}`}>
              <motion.p variants={fadeInUp} className="text-gray-600 text-lg mb-10 leading-relaxed">
                Chega de se sentir deslocado em academias comuns. Na academia ESCOM você encontra um ambiente focado no seu desenvolvimento, com equipamentos de ponta e profissionais qualificados para te ajudar a alcançar seus objetivos.
              </motion.p>
              <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-primary/30 transition-colors">
                  <Zap className="text-primary mb-4" size={32} />
                  <h3 className="font-bold text-xl mb-2">Equipamentos importados</h3>
                  <p className="text-gray-500 text-sm">Maquinário de última geração para biomecânica perfeita.</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-primary/30 transition-colors">
                  <Target className="text-primary mb-4" size={32} />
                  <h3 className="font-bold text-xl mb-2">Atendimento Premium</h3>
                  <p className="text-gray-500 text-sm">Profissionais focados em corrigir e otimizar seu treino.</p>
                </motion.div>
              </motion.div>
            </div>
            <motion.div variants={staggerContainer} className={`grid grid-cols-2 gap-4 ${reverseAbout ? "order-first lg:order-1" : "order-last lg:order-2"}`}>
              <motion.img variants={fadeInUp} src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" alt="Gym interior" className="col-span-2 w-full h-64 object-cover rounded-lg shadow-lg" referrerPolicy="no-referrer" />
              <motion.img variants={fadeInUp} src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" alt="Workout" className="w-full h-48 object-cover rounded-lg shadow-lg" referrerPolicy="no-referrer" />
              <motion.img variants={fadeInUp} src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop" alt="Equipment" className="w-full h-48 object-cover rounded-lg shadow-lg" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-16">
            <motion.button 
              variants={fadeInUp}
              onClick={() => setReverseAbout(!reverseAbout)} 
              className="flex items-center gap-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all animate-[pulse_3s_ease-in-out_infinite] hover:scale-105"
            >
              <ArrowLeftRight size={18} />
              Alterar Ordem do Layout
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* CONTRA FATOS SECTION */}
      <section className="bg-[#050505] text-white py-24 px-6 sm:px-12 lg:px-24 border-t border-white/5">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="inline-block bg-primary/30 text-primary font-bold px-3 py-1 rounded-sm text-sm mb-6 tracking-widest uppercase">Casos de Sucesso</motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            <RevealText delay={0.1}>Contra fatos não há argumentos</RevealText>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">Eles já passaram do zero aos resultados que sempre sonharam. Veja a evolução de quem confiou no nosso método.</motion.p>
          
          <div className="overflow-hidden relative w-full mt-16">
            <div className="flex gap-4 animate-marquee w-max">
              {[
                "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1526506114805-4e3158d181ce?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1526506114805-4e3158d181ce?q=80&w=800&auto=format&fit=crop"
              ].map((src, i) => (
                <img key={i} src={src} alt={`Result ${i}`} className="w-72 h-96 object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer shrink-0" referrerPolicy="no-referrer" />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* PARA QUEM É SECTION */}
      <section className="bg-primary py-24 px-6 sm:px-12 lg:px-24 overflow-hidden">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp} className="inline-block bg-black/20 text-white font-bold px-3 py-1 rounded-sm text-sm mb-6 tracking-widest uppercase">Para quem é</motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              <RevealText delay={0.1}>O método é para você?</RevealText>
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={fadeInLeft} className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl">
              <h3 className="text-3xl font-black text-black mb-8">Para quem <span className="text-primary">não é</span></h3>
              <ul className="space-y-6">
                {[
                  'Quem busca resultados milagrosos sem esforço',
                  'Quem não está disposto a seguir um planejamento',
                  'Quem prefere treinar sem orientação profissional',
                  'Quem não tem compromisso com a própria saúde'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-1.5 rounded-full mt-0.5 shrink-0">
                      <X size={20} className="text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium text-lg">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={fadeInRight} className="bg-[#0a0a0a] p-8 sm:p-12 rounded-xl shadow-2xl border border-primary/30">
              <h3 className="text-3xl font-black text-white mb-8">Para quem <span className="text-primary">é</span></h3>
              <ul className="space-y-6">
                {[
                  'Quem quer construir massa muscular de forma sólida',
                  'Quem busca emagrecimento definitivo e saudável',
                  'Quem precisa de acompanhamento técnico de verdade',
                  'Quem valoriza um ambiente focado em resultados'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="bg-primary/80/20 p-1.5 rounded-full mt-0.5 shrink-0">
                      <Check size={20} className="text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-gray-300 font-medium text-lg">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* JORNADA SECTION */}
      <section className="bg-[#050505] text-white py-24 px-6 sm:px-12 lg:px-24 border-t border-white/5">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInLeft}>
            <div className="inline-block bg-primary/30 text-primary font-bold px-3 py-1 rounded-sm text-sm mb-6 tracking-widest uppercase">A Jornada</div>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-6 tracking-tight">
              <RevealText delay={0.1}>Do zero ao resultado:</RevealText><br />
              <RevealText delay={0.3}>sua jornada aqui dentro.</RevealText>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">Um passo a passo claro e definido para garantir que você não perca tempo e alcance sua melhor versão.</p>
            <img src="https://images.unsplash.com/photo-1558694440-03deef273153?q=80&w=800&auto=format&fit=crop" alt="Journey" className="w-full h-80 object-cover rounded-lg opacity-80" referrerPolicy="no-referrer" />
          </motion.div>
          
          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              { step: '1', title: 'A decisão', desc: 'O primeiro passo é seu. Escolher mudar e se comprometer com o processo.' },
              { step: '2', title: 'O diagnóstico', desc: 'Avaliamos seu nível atual, limitações e objetivos para traçar a rota.' },
              { step: '3', title: 'A estratégia', desc: 'Montamos seu plano de treino periodizado e focado na sua meta.' },
              { step: '4', title: 'A execução', desc: 'Treino intenso com supervisão técnica para garantir a biomecânica correta.' },
              { step: '5', title: 'A evolução', desc: 'Acompanhamento de métricas e ajustes constantes para não estagnar.' },
            ].map((item, i) => (
              <motion.div variants={fadeInUp} key={i} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 flex gap-6 items-start hover:border-primary/50 transition-colors group">
                <div className="text-5xl font-black text-primary italic group-hover:text-primary transition-colors duration-300">{item.step}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* TRIPÉ SECTION */}
      <section className="bg-[#0a0a0a] text-white py-24 px-6 sm:px-12 lg:px-24">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp} className="inline-block bg-primary/30 text-primary font-bold px-3 py-1 rounded-sm text-sm mb-6 tracking-widest uppercase">Metodologia</motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
              <RevealText delay={0.1}>O tripé da sua evolução</RevealText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">Nossa base metodológica para garantir que você tenha o melhor ambiente e suporte.</motion.p>
          </div>
          
          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              { title: 'Biomecânica de ponta', desc: 'Equipamentos selecionados a dedo para proporcionar a melhor contração muscular sem sobrecarregar articulações.', img: 'https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=800&auto=format&fit=crop' },
              { title: 'Supervisão técnica', desc: 'Profissionais que realmente corrigem seu movimento e ajustam a carga para a máxima hipertrofia.', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop' },
              { title: 'Ambiente de elite', desc: 'Uma comunidade de pessoas focadas no mesmo objetivo. Sem distrações, apenas treino sério.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop' },
            ].map((item, i) => (
              <motion.div variants={fadeInUp} key={i} className="bg-primary border border-primary rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center hover:border-primary/50 transition-colors group">
                <div className="w-full md:w-72 h-48 shrink-0 overflow-hidden rounded-lg">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-gray-200 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* DIFERENCIAIS SECTION */}
      <section className="bg-[#050505] text-white py-24 px-6 sm:px-12 lg:px-24 border-t border-white/5">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="inline-block bg-primary/30 text-primary font-bold px-3 py-1 rounded-sm text-sm mb-6 tracking-widest uppercase">Diferencial</motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black mb-16 tracking-tight">
            <RevealText delay={0.1}>Não é sorte, é método.</RevealText>
          </motion.h2>
          
          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Biomecânica de elite', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.', style: 'red' },
              { title: 'Periodização inteligente', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.', style: 'dark' },
              { title: 'Suporte técnico real', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.', style: 'red' },
              { title: 'Estrutura premium', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.', style: 'dark' },
              { title: 'Mentalidade forte', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.', style: 'red' },
              { title: 'Foco total', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.', style: 'dark' }
            ].map((item, i) => (
              <motion.div variants={fadeInUp} key={i} className={`p-8 rounded-xl text-left transition-all duration-300 flex items-start gap-4 hover:-translate-y-1 ${item.style === 'red' ? 'bg-primary text-black' : 'bg-[#0a0a0a] border border-white/5 text-white'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${item.style === 'red' ? 'bg-black text-primary' : 'bg-primary text-black'}`}>
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2">{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${item.style === 'red' ? 'text-black/80' : 'text-gray-400'}`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#050505] py-32 px-6 relative overflow-hidden flex items-center justify-center min-h-[60vh] border-t border-white/5">
        {/* Marquee Background */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-8 opacity-20 pointer-events-none overflow-hidden">
          <div className="flex whitespace-nowrap gap-4 animate-marquee w-max">
            {Array(20).fill(["DISCIPLINA", "RESULTADO", "CONSTÂNCIA", "INTENSIDADE"]).flat().map((tag, i) => (
              <div key={i} className="border-2 border-white/20 rounded-full px-8 py-3 text-white/40 font-bold text-lg tracking-wider uppercase shrink-0">
                {tag}
              </div>
            ))}
          </div>
          <div className="flex whitespace-nowrap gap-4 animate-marquee-reverse w-max">
            {Array(20).fill(["FOCO", "SUPERAÇÃO", "SAÚDE", "METAS", "EVOLUÇÃO"]).flat().map((tag, i) => (
              <div key={i} className="border-2 border-white/20 rounded-full px-8 py-3 text-white/40 font-bold text-lg tracking-wider uppercase shrink-0">
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Central Card */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 bg-[#0a0a0a] border border-white/10 p-12 md:p-16 rounded-3xl max-w-3xl w-full text-center shadow-2xl"
        >
          <motion.div variants={fadeInUp} className="inline-block bg-primary text-white font-bold px-4 py-1 rounded-sm text-sm mb-6 tracking-widest uppercase">A Decisão</motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">
            <RevealText delay={0.1}>Transforme</RevealText><br/>
            <RevealText delay={0.3}>intenção em ação.</RevealText>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">Você já viu que o método funciona e que a estrutura é de elite. A única coisa que separa você do corpo que deseja é um clique. Pare de adiar.</motion.p>
          <motion.button variants={fadeInUp} className="relative overflow-hidden bg-primary hover:bg-primary/80 text-white font-black py-5 px-12 rounded-sm text-lg tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_40px_rgba(var(--primary-rgb),0.6)] hover:-translate-y-1 border border-primary/50 group">
            <span className="relative z-10">QUERO COMEÇAR AGORA</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine" />
          </motion.button>
        </motion.div>
      </section>

      {/* PLANOS SECTION */}
      <section className="bg-[#050505] text-white py-24 px-6 sm:px-12 lg:px-24">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp} className="inline-block bg-primary/30 text-primary font-bold px-3 py-1 rounded-sm text-sm mb-6 tracking-widest uppercase">Investimento</motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
              <RevealText delay={0.1}>Quanto vale a sua</RevealText><br/>
              <RevealText delay={0.3}>melhor versão?</RevealText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg">Escolha o plano que melhor se adapta à sua jornada.</motion.p>
          </div>
          
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Plano Mensal', price: '197', period: '/mês', features: ['Acesso total à estrutura', 'Avaliação inicial', 'Suporte de professores'] },
              { name: 'Plano Semestral', price: '147', period: '/mês', features: ['Acesso total à estrutura', 'Avaliação bimestral', 'Suporte de professores', 'App de treinos'], highlight: true },
              { name: 'Plano Anual', price: '97', period: '/mês', features: ['Acesso total à estrutura', 'Avaliação mensal', 'Personal trainer 1x/mês', 'App de treinos', 'Camiseta exclusiva'] },
            ].map((plan, i) => (
              <motion.div variants={fadeInUp} key={i} className={`bg-[#0a0a0a] rounded-xl p-8 border transition-transform duration-300 hover:-translate-y-2 ${plan.highlight ? 'border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] relative scale-105 md:scale-110 z-10' : 'border-white/10'}`}>
                {plan.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white font-bold px-4 py-1 rounded-full text-xs tracking-wider">MAIS ESCOLHIDO</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-gray-400 font-bold">R$</span>
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-primary shrink-0" />
                      <span className="text-gray-300 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-sm font-bold tracking-wider uppercase transition-colors ${plan.highlight ? 'bg-primary hover:bg-primary/80 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                  Assinar Plano
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-12 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-primary text-black p-1.5 rounded-sm">
            <Dumbbell size={18} strokeWidth={3} />
          </div>
          <span className="text-xl font-extrabold tracking-tighter text-white">
            academia.<span className="text-primary">ESCOM</span>
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-2">© {new Date().getFullYear()} Academia ESCOM. Todos os direitos reservados.</p>
        <p className="text-gray-600 text-xs">Desenvolvido por <span className="text-primary font-bold">Agência ESCOM</span></p>
      </footer>
    </div>
  );
}
