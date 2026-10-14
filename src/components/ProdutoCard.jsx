import { Link } from 'react-router'
import { produtoDisponivel } from '../utils/carrinho'
import { formatarPreco, normalizarPreco } from '../utils/formatarPreco'

export default function ProdutoCard({ produto, onAdicionar }) {
  const preco = normalizarPreco(produto.price)
  const precoOriginal = normalizarPreco(produto.precoOriginal)
  const esgotado = Number(produto.estoque ?? 0) === 0
  const disponivel = produtoDisponivel(produto)

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {precoOriginal !== null && (
          <span className="preco-original">{formatarPreco(precoOriginal)}</span>
        )}
        <span className="preco">{formatarPreco(preco)}</span>
      </div>

      <div className="card-selos">
        {preco !== null && preco > 200 && <span className="selo selo-frete">Frete grátis</span>}
        {esgotado && <span className="selo selo-esgotado">Esgotado</span>}
      </div>

      <button className="botao" onClick={() => onAdicionar(produto)} disabled={!disponivel}>
        Adicionar ao carrinho
      </button>
    </article>
  )
}
