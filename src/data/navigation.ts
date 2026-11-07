import type { NavItem } from '../types';

export const navigation: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', futureRoute: '/' },
  { id: 'colecao', label: 'Coleção', href: '#colecao', futureRoute: '/colecao' },
  { id: 'materiais', label: 'Materiais', href: '#materiais', futureRoute: '/materiais' },
  { id: 'ambientes', label: 'Ambientes', href: '#ambientes', futureRoute: '/ambientes' },
  { id: 'sobre', label: 'Sobre a Vert', href: '#sobre', futureRoute: '/sobre' },
  { id: 'contato', label: 'Contato', href: '#contato', futureRoute: '/contato' },
];
