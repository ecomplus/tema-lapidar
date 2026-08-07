import { fileURLToPath } from 'node:url';
// Phosphor: traço fino e de peso uniforme, o único dos conjuntos disponíveis
// que não engorda ao lado de uma serifada de alto contraste.
import { icons as iPhosphor } from '@iconify-json/ph';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
process.env.STOREFRONT_BASE_DIR = __dirname;

// eslint-disable-next-line import/first
import { genTailwindConfig } from '@cloudcommerce/storefront/config/storefront.tailwind.mjs';

/*
 * Tema da variante "Lapidar" (joias e semijoias).
 *
 * As cores de marca (primary/secondary) NÃO vêm daqui: são lidas de
 * `content/settings.json` pelo próprio `genTailwindConfig`, para continuarem
 * editáveis pelo CMS. Aqui fica só o que o CMS não expõe.
 *
 * Esta é a variante DELIBERADAMENTE ESPAÇOSA do conjunto. As outras treze
 * disputam densidade em algum grau — cabe mais produto, mais filtro, mais
 * especificação por tela. Aqui o argumento é o oposto: em joalheria a tela
 * cheia comunica bijuteria, e o vazio é o que sustenta o preço. Se um dia
 * alguém "otimizar" esta loja apertando o respiro, terá desfeito o tema.
 *
 * Neutro QUENTE (viés amarelo, não azul): é o que faz o dourado ler como ouro
 * em vez de mostarda. Foi escolhido contra a paleta fria da Cardan de
 * propósito — as duas provam que a mesma plataforma comporta os dois extremos.
 *
 * TODO: validar — este nicho ainda NÃO tem marca em
 * `www.e-com.plus/src/config/brands.ts` nem página de segmento. A paleta é
 * proposta, não veio de levantamento de temas campeões do nicho.
 */
const themeOptions = {
  generalIconSets: [iPhosphor],
  baseColor: {
    50: '#faf8f5',
    100: '#f2eee8',
    200: '#e6e0d6',
    300: '#d0c7b8',
    400: '#a89c89',
    500: '#84786a',
    600: '#6a5f53',
    700: '#554c43',
    800: '#3d3630',
    900: '#25201c',
    950: '#151210',
  },
};

const tailwindConfig = genTailwindConfig(themeOptions);

// Canto reto em tudo: moldura de vitrine de joalheria não tem raio.
tailwindConfig.theme.extend.borderRadius = {
  ...tailwindConfig.theme.extend.borderRadius,
  DEFAULT: '0',
};

export default {
  ...tailwindConfig,
  themeOptions,
};
