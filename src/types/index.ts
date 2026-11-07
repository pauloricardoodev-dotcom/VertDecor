// Tipos espelham os futuros modelos Prisma (backend Nest.js + PostgreSQL).

export type SectionId = 'home' | 'colecao' | 'materiais' | 'ambientes' | 'sobre' | 'contato';

export interface NavItem {
  id: SectionId;
  label: string;
  /** Âncora usada enquanto as páginas internas não existem. */
  href: `#${string}`;
  /** Rota da futura página interna (não ativa ainda). */
  futureRoute?: string;
}

export interface StoneFinish {
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
}

export interface Material {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  /** Descrição estética — nunca informações técnicas não fornecidas pela marca. */
  description: string;
  textures: {
    /** Textura de cor (WebP). PROVISÓRIA — substituir por scans reais em /public/textures/<id>/ */
    color1k: string;
    color2k: string;
    swatch: string;
  };
  finish: StoneFinish;
  /** Prefixo do poster estático do Hero (render da mesa com esta pedra). */
  poster: string;
}

export interface ContactInfo {
  /** Somente dígitos com DDI, ex.: 5511999999999. Vazio = ainda não fornecido. */
  whatsapp: string;
  whatsappMessage: string;
  instagram: string;
  email: string;
}

export type ProductCategoryId = 'mesas-laterais' | 'mesas-de-centro' | 'mesas-de-apoio' | 'carrinhos-e-bares';

export interface ProductCategory {
  id: ProductCategoryId;
  label: string;
}

/** Silhueta usada pela ilustração provisória (ProductArt) até existirem fotografias oficiais. */
export type ProductArtKind = 'aurora' | 'orbe' | 'pilar' | 'alameda' | 'duna' | 'mare';

/** Espelha o futuro modelo Prisma `Product` (relação N:N com Material via materialIds). */
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategoryId;
  description: string;
  /** Pedra(s) do tampo. */
  materialIds: string[];
  /** Material da estrutura. */
  frame: string;
  art: ProductArtKind;
}
