import { normalizarPreco } from './formatarPreco'

// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

export function produtoTemPrecoValido(produto) {
  return produto && normalizarPreco(produto.price) !== null
}

export function produtoDisponivel(produto) {
  if (!produto || !produtoTemPrecoValido(produto)) {
    return false
  }

  return Number(produto.estoque ?? 0) > 0
}

export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => {
    const preco = normalizarPreco(produto?.price)
    return total + (preco ?? 0)
  }, 0)
}

export function agruparItens(carrinho) {
  const itens = []

  carrinho
    .filter((produto) => produto && produtoTemPrecoValido(produto))
    .forEach((produto) => {
      const existente = itens.find((item) => item.produto.id === produto.id)
      if (existente) {
        existente.quantidade += 1
      } else {
        itens.push({ produto, quantidade: 1 })
      }
    })

  return itens
}
