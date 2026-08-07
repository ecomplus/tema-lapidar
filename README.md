# Lapidar — loja demo do nicho de joias e semijoias

Cópia do starter [`ecomplus/store`](https://github.com/ecomplus/store)
tematizada para **joalheria** — ouro 18k, prata 925 e banhados, com gravação
sob encomenda.

> **Este nicho ainda não existe no site institucional.** Não há marca em
> `src/config/brands.ts` nem página em `/segmentos/`. O posicionamento foi
> **proposto**, não portado. Nome, logo e domínio são placeholders.

## Por que este nicho: ele é o contraexemplo do conjunto

As outras treze variantes disputam **densidade** em algum grau — cabe mais
produto, mais filtro, mais especificação por tela. Isso é correto para
catálogo, e virou o sotaque da plataforma inteira nas demonstrações.

A Lapidar existe para provar o contrário: que a mesma plataforma comporta um
layout que **respira**. Em joalheria a tela cheia comunica bijuteria, e o vazio
é o que sustenta a percepção de preço — o mesmo anel custa R$ 199 ou R$ 2.890
dependendo de como está apresentado.

**Se a Lapidar ficar parecida com as demais, ela perdeu a razão de existir.**

## O que é diferente aqui

| Peça | O que muda |
|---|---|
| `assets/style.css` | Container **76rem** (contra 84rem) e margem vertical **dobrada**. |
| `assets/style.css` | `.ui-title` em **serifada de caixa normal** — todas as outras usam grotesca em CAIXA ALTA. |
| `components/ProductCard.vue` | **Sem borda, sem sombra, sem moldura.** O que separa um produto do outro é espaço. |
| `components/ProductCard.vue` | Foto **4:5 (retrato)**, não quadrada. Joia é objeto pequeno e vertical. |
| `components/ProductCard.vue` | **Não tem botão de comprar.** Ver abaixo. |
| `sections/GravacaoSection.astro` | Os três passos da personalização, em filete, sem card. |
| `tailwind.config.js` | Neutro **quente**, raio **zero**, fundo `#faf8f5`. |

### Por que não há "adicionar" no card

Em joalheria o aro precisa ser escolhido, e a maioria destas peças tem grade.
Um botão de compra direta na vitrine ou não funcionaria (produto com variação
não adiciona) ou levaria à devolução por tamanho errado. O caminho é a ficha.
O que fica no card é um convite a abrir, não a comprar.

### Por que branco puro está proibido

`--c-background` é `#faf8f5`, definido em `style.css` com seletor `html:root`.
Branco puro esfria o dourado e faz o metal ler como mostarda. O off-white
quente é o que faz ler como ouro. O `html:root` (e não `:root`) é porque
`style.css` é importado **antes** de `uno.css` em `layouts/Base.astro`, então o
`--c-background: #fff` do pacote viria depois e ganharia no desempate por
ordem — a especificidade a mais tira a dúvida.

## ⚠️ O que é estático

| O quê | Onde | Como ligar |
|---|---|---|
| "Prata 925" no card | `ProductCard.vue` | `specifications.material` no produto |
| Passos da gravação | `GravacaoSection.astro` | Conteúdo fixo, por escolha — ver abaixo |

**A seção de gravação não traz número de prazo de propósito.** Prazo de
gravação varia por peça e por época do ano, e um número chumbado num template
envelhece calado. A seção manda para `/p/gravacao`, que é quem carrega o
detalhe. Mesma política do conteúdo de legislação da Raia. **Manter assim.**

## Rodar

```bash
npm i
npm run dev                                   # http://localhost:3000
BUILD_OUTPUT=static npx cloudcommerce build --codebase ssr
```

## Armadilhas herdadas do conjunto

- `/s/<termo>` **não funciona no build estático** — usar `/s?q=<termo>`.
- Ícone que não casa **some em silêncio** no UnoCSS. Na dúvida, forma
  prefixada: `i-ph-<nome>`.
- `cloudcommerce build` **regenera o `firebase.json`** — buildar primeiro,
  escrever a config depois.
- `customCode.css` do CMS **não funciona** em nenhuma loja Cloud Commerce
  (`Base.astro` do pacote usa `<style>{customCode.css}</style>` e o Astro não
  interpola expressão dentro de `<style>`). Por isso todo CSS vive em
  `src/assets/style.css`.
