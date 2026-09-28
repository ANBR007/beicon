"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Curva de easing usada em (quase) todas as animações deste componente
const ease = [0.22, 1, 0.36, 1] as const;

interface MenuItem {
  label: string;
  onClick?: () => void;
}

interface FloatingMenuProps {
  items?: MenuItem[];
}

// Um item do menu (ex: "Serviços"). Faz o efeito de "rolar as letras para cima" no hover:
// cada letra é uma coluna com o mesmo caractere duplicado embaixo, e a coluna desliza
// para cima revelando a cópia de baixo — dá a sensação de troca suave, letra por letra.
function MenuButton({
  label,
  onClick,
  isOpen,
  index,
}: {
  label: string;
  onClick?: () => void;
  isOpen: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  // Controla se a animação de hover ainda está rodando (usado para não cortar ela no meio)
  const animatingRef = useRef(false);
  // Se o mouse sair ENQUANTO a animação ainda roda, guarda esse pedido para aplicar depois
  const pendingLeaveRef = useRef(false);
  const chars = label.split("");
  // Tempo total da animação: um pouco por letra + margem de segurança
  const lockDuration = 30 * chars.length + 300;

  const handleEnter = useCallback(() => {
    pendingLeaveRef.current = false;
    if (hovered) return;
    setHovered(true);
    animatingRef.current = true;
    // Depois que a animação de entrada termina, libera o "travamento"; se o mouse já tinha
    // saído nesse meio tempo, só agora desfaz o hover (evita a animação "engasgar")
    setTimeout(() => {
      animatingRef.current = false;
      if (pendingLeaveRef.current) {
        pendingLeaveRef.current = false;
        setHovered(false);
      }
    }, lockDuration);
  }, [hovered, lockDuration]);

  const handleLeave = useCallback(() => {
    if (animatingRef.current) {
      // Animação ainda rodando — adia o "mouse saiu" para não interromper no meio
      pendingLeaveRef.current = true;
    } else {
      setHovered(false);
    }
  }, []);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="text-[#f7f1ed] text-[20px] uppercase leading-none overflow-hidden"
      style={{
        fontFamily: "var(--font-neue-montreal), sans-serif",
        letterSpacing: "-0.03em",
        height: "1em",
      }}
      // Só fica visível quando o menu está aberto; cada item aparece com um pequeno atraso
      // (0.1s * index) para dar o efeito de entrada em cascata
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{
        duration: 0.0,
        delay: isOpen ? 0.4 + 0.1 * index :0,
        ease,
      }}
    >
      <div className="flex justify-center">
        {/* Uma coluna por letra — cada uma esconde a letra duplicada logo abaixo */}
        {chars.map((char, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ height: "1em" }}
          >
            <span
              className="flex flex-col"
              style={{
                transitionProperty: "transform",
                // No hover, cada letra desliza pra cima com um atraso crescente (30ms * índice),
                // criando o efeito de onda passando pela palavra
                transitionDuration: hovered ? "500ms" : "0ms",
                transitionDelay: hovered ? `${30 * i}ms` : "0ms",
                transform: hovered ? "translateY(-50%)" : "translateY(0%)",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Letra visível normalmente */}
              <span
                className="block"
                style={{ height: "1em", lineHeight: "1em" }}
              >
                {char}
              </span>
              {/* Cópia da letra, escondida embaixo — aparece quando a de cima desliza pra cima */}
              <span
                className="block"
                style={{ height: "1em", lineHeight: "1em" }}
                aria-hidden
              >
                {char}
              </span>
            </span>
          </span>
        ))}
      </div>
    </motion.button>
  );
}

// Menu flutuante no canto superior direito. Fechado, é só uma pílula com "Menu" + ícone;
// ao clicar, ele se expande (efeito "líquido") revelando a lista de itens de navegação.
export default function FloatingMenu({ items }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Se nenhum item for passado por prop, usa esta lista de exemplo
  const menuItems: MenuItem[] = items ?? [
    { label: "Home" },
    { label: "Works" },
    { label: "Contact" },
  ];

  // Altura do menu aberto cresce conforme a quantidade de itens (40px de folga + 40px por item)
  const openHeight = 40 + menuItems.length * 40;

  // Fecha o menu automaticamente se o usuário clicar em qualquer lugar fora dele
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    // Container fixo no canto superior direito da tela, acima de todo o resto (z-[100])
    <motion.div
      ref={containerRef}
      className="fixed top-8 right-8 z-[100]"
      style={{ pointerEvents: "auto" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      {/* A "pílula": anima largura/altura/raio da borda ao abrir e fechar (o efeito "líquido") */}
      <motion.div
        className="relative overflow-hidden flex flex-col"
        onClick={() => {
          if (!isOpen) setIsOpen(true);
        }}
        style={{
          fontFamily: "var(--font-neue-montreal), sans-serif",
          letterSpacing: "-0.02em",
          cursor: isOpen ? "default" : "pointer",
        }}
        animate={{
          width: isOpen ? 280 : 150,
          height: isOpen ? openHeight : 48,
          borderRadius: isOpen ? 32 : 72,
          scale: 1,
        }}
        whileHover={isOpen ? undefined : { scale: 1.05 }}
        transition={{
          duration: 0.8,
          ease,
          height: { duration: isOpen ? 0.8 : 0.15 },
          scale: { duration: 0.25, ease },
        }}
      >
        {/* Fundo com o degradê da marca (rosa/mauve) — mesma cor aberto ou fechado */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isOpen
              ? "linear-gradient(135deg,#B881A3 0%, #C27B9B 35%,#CC7694 70%, #CF7491 100%)"
              : "linear-gradient(135deg,#B881A3 0%, #C27B9B 35%,#CC7694 70%, #CF7491 100%)",

            borderColor: isOpen ? "#c584ce" : "#af5ebc",
          }}
          transition={{
            duration: isOpen ? 0.1 : 0.3,
            ease,
          }}
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: "inherit",
          }}
/>

        {/* Círculo escuro que "sobe" de baixo da pílula ao abrir — cria a área escura
            onde os itens do menu ficam visíveis (efeito de "gota" subindo) */}
        <motion.div
          className="absolute left-1/2 bg-[#242424]"
          style={{
            width: "200%",
            height: "200%",
            borderRadius: "50%",
            x: "-50%",
          }}
          animate={{ bottom: isOpen ? "-20%" : "-200%" }}
          transition={{
            duration: 1,
            ease,
            delay: isOpen ? 0 : 0,
          }}
        />

        {/* Lista de itens do menu — só recebe cliques/fica visível quando aberto */}
        <div
          className="relative z-10 flex flex-col gap-3 items-center justify-center"
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            opacity: isOpen ? 1 : 0,
            flex: isOpen ? 1 : 0,
            overflow: "hidden",
          }}
        >
          {menuItems.map((item, idx) => (
            <MenuButton
              key={item.label}
              label={item.label}
              onClick={() => {
                item.onClick?.();
                // Fecha o menu automaticamente depois de clicar em um item
                setIsOpen(false);
              }}
              isOpen={isOpen}
              index={idx}
            />
          ))}
        </div>

        {/* Cabeçalho sempre visível: texto "Menu" + ícone que vira "X" quando aberto */}
        <motion.div
          className="relative z-10 flex items-center justify-between w-full shrink-0 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            paddingLeft: isOpen ? 24 : 20,
            paddingRight: isOpen ? 24 : 20,
            paddingBottom: isOpen ? 24 : 0,
            height: 48,
          }}
          transition={{ duration: 0.2, ease }}
          style={{ alignItems: "center" }}
        >
          <motion.span
            className="text-[14px] md:text-[20px] leading-none"
            animate={{ color: isOpen ? "#f7f1ed" : "#ffffff" }}
            transition={{ duration: 0.3, ease }}
          >
            Menu
          </motion.span>

          {/* Ícone "hambúrguer" que gira e vira um "X" quando o menu abre (2 barras que rotacionam) */}
          <div className="relative w-[24px] h-[24px] flex items-center justify-center">
            <motion.span
              className="absolute block w-[18px] h-[2px] rounded-full"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -3,
                backgroundColor: isOpen ? "#f7f1ed" : "#ffffff",
              }}
              transition={{ duration: 1, ease }}
            />
            <motion.span
              className="absolute block w-[18px] h-[2px] rounded-full"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 3,
                backgroundColor: isOpen ? "#f7f1ed" : "#ffffff",
              }}
              transition={{ duration: 1, ease }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
