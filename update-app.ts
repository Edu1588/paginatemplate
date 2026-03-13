import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Imports
content = content.replace(
  "import React from 'react';",
  "import React, { useState, useEffect } from 'react';"
);
content = content.replace(
  "import { Dumbbell, Zap, Target, X, Check, CheckCircle2 } from 'lucide-react';",
  "import { Dumbbell, Zap, Target, X, Check, CheckCircle2, Type, Palette, ArrowUp, ArrowLeftRight } from 'lucide-react';"
);

// 2. RevealText color
content = content.replace(
  'className="absolute inset-0 bg-red-600 z-10"',
  'className="absolute inset-0 bg-primary z-10"'
);

// 3. App component state and menu
const appStart = `export default function App() {
  const [primaryColor, setPrimaryColor] = useState('#dc2626');
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
    return \`\${r} \${g} \${b}\`;
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
          <div className="absolute left-full top-0 ml-2 bg-black/90 border border-white/10 p-3 rounded-xl hidden group-hover:flex flex-col gap-2 w-48">
            <span className="text-xs text-gray-400 font-bold uppercase mb-1">Escolha a fonte</span>
            {fonts.map(f => (
              <button 
                key={f.name} 
                onClick={() => setFontFamily(f.value)} 
                className={\`text-left text-sm py-1 transition-colors \${fontFamily === f.value ? 'text-primary' : 'text-white hover:text-primary'}\`} 
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
          <div className="absolute left-full top-0 ml-2 bg-black/90 border border-white/10 p-3 rounded-xl hidden group-hover:flex flex-col gap-2 w-48">
            <span className="text-xs text-gray-400 font-bold uppercase mb-1">Cor Destaque</span>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={primaryColor} 
                onChange={e => setPrimaryColor(e.target.value)} 
                className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0" 
              />
              <span className="text-sm font-mono text-gray-300">{primaryColor.toUpperCase()}</span>
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
      )}`;

content = content.replace(
  `export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans">`,
  appStart
);

// 4. Replace colors globally
content = content.replace(/bg-red-600/g, 'bg-primary');
content = content.replace(/text-red-600/g, 'text-primary');
content = content.replace(/border-red-600/g, 'border-primary');

content = content.replace(/bg-red-500/g, 'bg-primary/80');
content = content.replace(/text-red-500/g, 'text-primary');
content = content.replace(/border-red-500/g, 'border-primary');

content = content.replace(/bg-red-400/g, 'bg-primary/60');
content = content.replace(/text-red-400/g, 'text-primary/80');
content = content.replace(/border-red-400/g, 'border-primary/50');

content = content.replace(/bg-red-200/g, 'bg-primary/30');
content = content.replace(/border-red-200/g, 'border-primary/30');

content = content.replace(/bg-red-100/g, 'bg-primary/10');

content = content.replace(/bg-red-900\/30/g, 'bg-primary/30');

content = content.replace(/rgba\(220,38,38,0\.8\)/g, 'rgba(var(--primary-rgb),0.8)');
content = content.replace(/rgba\(220,38,38,0\.6\)/g, 'rgba(var(--primary-rgb),0.6)');
content = content.replace(/rgba\(220,38,38,0\.9\)/g, 'rgba(var(--primary-rgb),0.9)');
content = content.replace(/rgba\(220,38,38,0\.15\)/g, 'rgba(var(--primary-rgb),0.15)');

// 5. Hero centering on mobile
content = content.replace(
  'className="absolute top-12 left-6 sm:left-12 lg:left-24 flex items-center gap-2"',
  'className="absolute top-12 left-0 w-full sm:w-auto sm:left-12 lg:left-24 flex items-center justify-center sm:justify-start gap-2"'
);

content = content.replace(
  'className="max-w-2xl mt-20 relative z-30"',
  'className="max-w-2xl mt-20 relative z-30 mx-auto sm:mx-0 text-center sm:text-left flex flex-col items-center sm:items-start"'
);

content = content.replace(
  'className="text-gray-300 text-lg sm:text-xl mb-10 max-w-md leading-relaxed font-medium"',
  'className="text-gray-300 text-lg sm:text-xl mb-10 max-w-md leading-relaxed font-medium mx-auto sm:mx-0"'
);

// 6. Sobre Nós reverse order
const sobreNosOriginal = `        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.div variants={fadeInUp} className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-sm text-sm mb-6 tracking-widest uppercase">Sobre Nós</motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black leading-tight mb-6 tracking-tight">
              <RevealText delay={0.1}>O ambiente moldado para o seu resultado.</RevealText>
            </motion.h2>
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
          <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
            <motion.img variants={fadeInUp} src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" alt="Gym interior" className="col-span-2 w-full h-64 object-cover rounded-lg shadow-lg" referrerPolicy="no-referrer" />
            <motion.img variants={fadeInUp} src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" alt="Workout" className="w-full h-48 object-cover rounded-lg shadow-lg" referrerPolicy="no-referrer" />
            <motion.img variants={fadeInUp} src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop" alt="Equipment" className="w-full h-48 object-cover rounded-lg shadow-lg" referrerPolicy="no-referrer" />
          </motion.div>
        </motion.div>`;

const sobreNosNew = `        <motion.div 
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
            <motion.button 
              variants={fadeInUp}
              onClick={() => setReverseAbout(!reverseAbout)} 
              className="hidden lg:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeftRight size={16} />
              Alterar Ordem
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={\`flex flex-col \${reverseAbout ? "order-last lg:order-2" : "order-first lg:order-1"}\`}>
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
            <motion.div variants={staggerContainer} className={\`grid grid-cols-2 gap-4 \${reverseAbout ? "order-first lg:order-1" : "order-last lg:order-2"}\`}>
              <motion.img variants={fadeInUp} src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" alt="Gym interior" className="col-span-2 w-full h-64 object-cover rounded-lg shadow-lg" referrerPolicy="no-referrer" />
              <motion.img variants={fadeInUp} src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" alt="Workout" className="w-full h-48 object-cover rounded-lg shadow-lg" referrerPolicy="no-referrer" />
              <motion.img variants={fadeInUp} src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop" alt="Equipment" className="w-full h-48 object-cover rounded-lg shadow-lg" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
          
          <motion.button 
            variants={fadeInUp}
            onClick={() => setReverseAbout(!reverseAbout)} 
            className="mt-8 lg:hidden w-full flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-md text-sm font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeftRight size={16} />
            Alterar Ordem
          </motion.button>
        </motion.div>`;

content = content.replace(sobreNosOriginal, sobreNosNew);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated successfully!');
