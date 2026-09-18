import vela from "@/assets/p-vela.jpg";
import difusor from "@/assets/p-difusor.jpg";
import homespray from "@/assets/p-homespray.jpg";
import waxmelts from "@/assets/p-waxmelts.jpg";

export const LINKS = {
  whatsapp: "https://wa.me/5500000000000",
  instagram: "https://instagram.com/bscent.oficial",
  tiktok: "https://www.tiktok.com/@bscent.oficial",
  shopee: "https://shopee.com.br/",
  mercadoLivre: "https://www.mercadolivre.com.br/",
  email: "mailto:contatobscent@gmail.com",
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  isNew?: boolean;
};

export const CATEGORIES = [
  "Todos",
  "Velas",
  "Wax Melts",
  "Squishy Melts",
  "Home Sprays",
  "Águas de Lençol",
  "Difusores",
  "Aromatizadores para Carro",
  "Kits",
  "Personalizados",
] as const;

// Edite este array para adicionar ou remover produtos da vitrine.
export const PRODUCTS: Product[] = [
  {
    id: "vela-linho",
    name: "Vela Linho & Âmbar",
    category: "Velas",
    description: "Cera vegetal, queima limpa de 40 horas em copo de vidro fosco.",
    image: vela,
    isNew: true,
  },
  {
    id: "difusor-cedro",
    name: "Difusor Cedro & Chá Branco",
    category: "Difusores",
    description: "Varetas naturais e difusão constante por até 90 dias.",
    image: difusor,
    isNew: true,
  },
  {
    id: "spray-baunilha",
    name: "Home Spray Baunilha & Sândalo",
    category: "Home Sprays",
    description: "Borrifadas suaves para renovar o ambiente em segundos.",
    image: homespray,
    isNew: true,
  },
  {
    id: "melts-algodao",
    name: "Wax Melts Algodão Macio",
    category: "Wax Melts",
    description: "Cubos aromáticos para rechauds elétricos ou de vela.",
    image: waxmelts,
  },
  {
    id: "squishy-flor",
    name: "Squishy Melts Flor de Figo",
    category: "Squishy Melts",
    description: "Textura macia e perfume marcante, feitos à mão.",
    image: waxmelts,
  },
  {
    id: "agua-lencol",
    name: "Água de Lençol Lavanda",
    category: "Águas de Lençol",
    description: "Névoa delicada para roupas de cama e toalhas.",
    image: homespray,
  },
  {
    id: "carro-couro",
    name: "Aromatizador para Carro Couro & Madeira",
    category: "Aromatizadores para Carro",
    description: "Discreto, elegante e com fixação prolongada.",
    image: difusor,
  },
  {
    id: "kit-ritual",
    name: "Kit Ritual da Casa",
    category: "Kits",
    description: "Vela, home spray e wax melts em embalagem presenteável.",
    image: vela,
  },
  {
    id: "personalizado-evento",
    name: "Lembranças Personalizadas",
    category: "Personalizados",
    description: "Rótulos, aromas e embalagens sob medida para o seu evento.",
    image: waxmelts,
  },
];

export const SCENTS = [
  {
    name: "Linho & Âmbar",
    top: "Bergamota, pera",
    heart: "Linho, jasmim",
    base: "Âmbar, almíscar",
    story: "A sensação de lençol limpo secando ao sol da tarde.",
  },
  {
    name: "Cedro & Chá Branco",
    top: "Chá branco, limão siciliano",
    heart: "Folhas verdes, íris",
    base: "Cedro, vetiver",
    story: "Calma serena de uma sala arejada em manhã de inverno.",
  },
  {
    name: "Baunilha & Sândalo",
    top: "Cardamomo",
    heart: "Baunilha bourbon",
    base: "Sândalo, tonka",
    story: "Aconchego quente, como madeira aquecida pela luz.",
  },
  {
    name: "Flor de Figo",
    top: "Figo verde",
    heart: "Folha de figueira, coco",
    base: "Madeiras cremosas",
    story: "Um jardim mediterrâneo no fim do dia.",
  },
  {
    name: "Lavanda Serena",
    top: "Lavanda francesa",
    heart: "Camomila",
    base: "Musgo branco",
    story: "O ritual de desacelerar antes de dormir.",
  },
  {
    name: "Couro & Madeira",
    top: "Pimenta rosa",
    heart: "Couro suave",
    base: "Patchouli, carvalho",
    story: "Sofisticação discreta, presença que permanece.",
  },
];

export const FAQ = [
  {
    q: "Qual o prazo de produção e envio?",
    a: "Produzimos em pequenos lotes: o preparo leva de 2 a 5 dias úteis. O envio depende da plataforma escolhida e da sua região.",
  },
  {
    q: "Como cuidar da minha vela?",
    a: "Na primeira vez, deixe queimar até a cera derreter em toda a superfície. Apare o pavio para 5 mm antes de cada uso e não queime por mais de 4 horas seguidas.",
  },
  {
    q: "Onde posso comprar?",
    a: "Você compra pelo WhatsApp, Shopee, Mercado Livre ou TikTok Shop. Cada produto tem o botão “Onde comprar” com todos os links.",
  },
  {
    q: "Vocês fazem lembranças para eventos?",
    a: "Sim. Atendemos casamentos, aniversários e presentes corporativos com aroma, rótulo e embalagem personalizados.",
  },
  {
    q: "Os produtos são seguros para pets e crianças?",
    a: "Usamos essências de grau cosmético e cera vegetal. Ainda assim, mantenha velas acesas fora do alcance de crianças e animais.",
  },
];

export const TESTIMONIALS = [
  {
    text: "A casa inteira mudou de clima. O aroma dura muito mais do que eu esperava.",
    author: "Marina R.",
  },
  {
    text: "Comprei como presente e virou pedido recorrente da família toda.",
    author: "Júlia P.",
  },
  {
    text: "Acabamento impecável, parece de loja de departamento importada.",
    author: "Renata M.",
  },
];
