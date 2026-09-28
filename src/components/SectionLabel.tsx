type SectionLabelProps = {
  children: React.ReactNode;
  active?: boolean;
};

// Rótulo pequeno usado no topo de cada seção (ex: "/SOBRE", "/SERVIÇOS").
// `active` opcionalmente acende uma bolinha com o degradê da marca antes do texto.
export function SectionLabel({ children, active = false }: SectionLabelProps) {
  return (
    <span className="text-label uppercase tracking-[0.14em] text-ink-muted inline-flex items-center gap-2">
      {active && (
        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-from to-accent-to" />
      )}
      /{children}
    </span>
  );
}
