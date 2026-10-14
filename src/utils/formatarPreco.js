export function normalizarPreco(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return null
  }

  const texto = String(valor).trim().replace(/[^0-9,.-]/g, '')

  if (!texto || texto === '-' || texto === '.' || texto === ',') {
    return null
  }

  const numero = Number(
    texto.includes(',') && texto.includes('.')
      ? texto.replace(/\./g, '').replace(',', '.')
      : texto.includes(',')
        ? texto.replace(',', '.')
        : texto
  )

  if (!Number.isFinite(numero)) {
    return null
  }

  return numero
}

export function formatarPreco(valor) {
  const valorNormalizado = normalizarPreco(valor)

  if (valorNormalizado === null) {
    return 'Preço indisponível'
  }

  return valorNormalizado.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
