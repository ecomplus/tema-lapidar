<!--
  Card de produto — variante Lapidar (joias e semijoias).

  ── O CARD SEM MOLDURA ───────────────────────────────────────────────────
  Este é o ponto em que a Lapidar mais se afasta das outras treze variantes, e
  é deliberado. Todas as outras cercam o produto: borda, sombra, fundo branco
  contra fundo cinza, algum recurso gráfico que diz "este bloco é um item".

  Aqui não há nada disso. O que separa um produto do outro é o espaço entre
  eles. É o vocabulário de vitrine de joalheria — e é o que sustenta a
  percepção de preço num nicho em que o mesmo anel custa R$ 199 ou R$ 2.890
  dependendo de como está apresentado.

  Se alguém "corrigir" isto acrescentando borda ou sombra, terá desfeito o
  argumento inteiro do tema. Está escrito também no topo de `assets/style.css`.

  ── O QUE É ESPECÍFICO DO NICHO ──────────────────────────────────────────
  A linha de MATERIAL logo abaixo do nome. É a informação que separa joia de
  bijuteria e a primeira coisa que o comprador procura — ouro 18k, prata 925
  ou banhado. Deixá-la só na ficha técnica é o erro que o marketplace comete.

  ATENÇÃO: o material aqui é ESTÁTICO. Ligar de verdade depende de ele estar
  cadastrado como especificação de produto. Consta no README.

  A foto é 4:5 (retrato), não quadrada como nas demais: joia é objeto pequeno
  e vertical, e o quadrado desperdiça altura em volta da peça.
-->
<template>
  <article
    ref="card"
    :data-sku="product.sku"
    class="group relative mx-auto h-full max-w-[330px] py-4"
  >
    <ALink :href="link" class="flex h-full flex-col no-underline">
      <div class="relative overflow-hidden bg-base-100">
        <span v-if="images?.length">
          <AImg
            :picture="images[0]"
            :alt="title"
            class="block aspect-[4/5] w-full object-cover transition-transform
            duration-700 md:group-hover:scale-105"
          />
          <AImg
            v-if="!isMobile && images[1] && wasHoveredOnce"
            :picture="images[1]"
            :alt="title"
            class="absolute left-0 top-0 z-10 block size-full object-cover
            text-transparent opacity-0 transition-opacity
            group-hover:opacity-100 motion-safe:duration-500"
          />
        </span>
        <div v-else class="aspect-[4/5] w-full bg-base-100" />
        <span
          v-if="discountPercentage"
          class=":uno: absolute left-0 top-0 z-20 bg-base-900 px-2.5 py-1
          text-[0.625rem] font-medium uppercase tracking-[0.14em] text-base-50"
        >
          -{{ discountPercentage }}%
        </span>
      </div>

      <div class="flex grow flex-col px-1 pt-4">
        <component
          :is="headingTag"
          class="font-brand text-lg font-light leading-snug transition-colors"
          :class="isActive
            ? 'text-base-900 group-hover:text-secondary'
            : 'text-base-500'"
        >
          {{ title }}
        </component>

        <p class="mt-1.5 ui-material">Prata 925</p>

        <div class="mt-auto pt-3">
          <div v-if="isActive" class="[&_*]:font-normal">
            <Prices :product="product" />
          </div>
          <span v-else class="bg-base-200 text-base-700 ui-badge">
            {{ !isInStock ? $t.i19outOfStock : $t.i19inactive }}
          </span>
        </div>
      </div>
    </ALink>

    <!--
      "Adicionar" NÃO aparece no card, de propósito, e é a segunda diferença
      forte contra as outras variantes.

      Em joalheria o aro precisa ser escolhido (e a maioria destas peças tem
      grade), então um botão de compra direta na vitrine ou não funcionaria ou
      levaria à devolução por tamanho errado. O caminho é a ficha do produto.
      O que fica no card é um convite a abrir, não a comprar.
    -->
    <span
      v-if="isActive"
      class="mt-3 hidden text-[0.6875rem] font-medium uppercase tracking-[0.16em]
      text-base-500 opacity-0 transition-opacity group-hover:opacity-100 md:block"
    >
      Ver peça &rarr;
    </span>
  </article>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import {
  type Props as UseProductCardProps,
  useProductCard,
} from '@@sf/composables/use-product-card';
import { isMobile } from '@@sf/sf-lib';
import Prices from '~/components/Prices.vue';

export type Props = UseProductCardProps & {
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
const props = withDefaults(defineProps<Props>(), {
  headingTag: 'h3',
});
const {
  product,
  title,
  link,
  images,
  isInStock,
  isActive,
  discountPercentage,
} = useProductCard(props as UseProductCardProps);
const card = ref<HTMLElement | null>(null);
const isHovered = useElementHover(card);
const wasHoveredOnce = ref(false);
const unwatch = watch(isHovered, () => {
  wasHoveredOnce.value = true;
  unwatch();
});
</script>
