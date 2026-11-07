# Navbar

Premium, minimalista, responsiva, com wordmark VERT DECOR.

Itens (todos visíveis): Home · Coleção · Materiais · Ambientes · Sobre a Vert · Contato.
Páginas internas **não** existem ainda → links são âncoras para as seções da Home (sem 404, sem comportamento quebrado). Arquitetura pronta para rotas futuras (`src/data/navigation.ts`).

Comportamento:
- Transparente/integrada ao Hero no topo; ao rolar, fundo sólido ou vidro discreto (se fizer sentido — `backdrop-filter` com cuidado no mobile).
- Hover com animação suave (ex.: sublinhado que cresce).
- Indicador visual do item ativo (scroll-spy por seção via IntersectionObserver).
- Menu mobile próprio, bem elaborado, com transição elegante de abertura/fechamento.
- Acessível: botão com `aria-expanded`/`aria-controls`, foco preso no menu aberto, `Esc` fecha, scroll do body travado.
- Na animação de entrada, a navegação se revela logo após a marca (ver `hero.md`).
