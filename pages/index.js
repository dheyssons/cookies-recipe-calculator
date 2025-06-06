import { useState } from 'react';

const receita = {
  manteiga: 200,
  acucarMascavo: 150,
  acucarRefinado: 100,
  ovos: 2.5,
  baunilha: 10,
  farinha: 350,
  fermento: 5,
  sal: 5,
  gotasDeChocolate: 100,
};

const precos = {
  manteiga: 0.04,
  acucarMascavo: 0.011,
  acucarRefinado: 0.007,
  ovos: 0.7,
  baunilha: 0.233,
  farinha: 0.006,
  fermento: 0.07,
  sal: 0.004,
  gotasDeChocolate: 0.07,
};

export default function Home() {
  const [ingredientes, setIngredientes] = useState({
    manteiga: '500',
    acucarMascavo: '500',
    acucarRefinado: '1000',
    ovos: '30',
    baunilha: '60',
    farinha: '2000',
    fermento: '200',
    sal: '500',
    gotasDeChocolate: '300',
    margemDeLucro: '30'
  });

  const [resultado, setResultado] = useState(null);
  const [custoTotal, setCustoTotal] = useState(null);
  const [preco, setPreco] = useState(null);
  const [lucro, setLucro] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setIngredientes(prev => ({
      ...prev,
      [name]: value,
    }));
  }

    function calcularPrecoVenda(custo, margemLucroPercentual) {
        const margemDecimal = margemLucroPercentual / 100;
        const precoVenda = custo / (1 - margemDecimal);
        return precoVenda;
    }

  function calcular() {
    const kgPorIngrediente = [];
    let custo = 0;

    for (const key in receita) {
      const qtdIngrediente = parseFloat(ingredientes[key]);
      if (!qtdIngrediente || isNaN(qtdIngrediente)) {
        setResultado('Por favor, preencha todos os campos com números válidos.');
        return;
      }
      const proporcao = qtdIngrediente / receita[key];
      kgPorIngrediente.push(proporcao);

      // Calcular custo parcial
      custo += qtdIngrediente * precos[key];
    }

    const maxKg = Math.min(...kgPorIngrediente);
    const pacotes = Math.floor(maxKg * 5);

    setResultado(`Você pode fazer aproximadamente ${pacotes} pacotes de 200g de mini cookies.`);
    setCustoTotal(`Custo estimado dos ingredientes utilizados: R$ ${custo.toFixed(2)}`);
    setPreco(`O preço da venda de ${pacotes} pacotes baseado em ${ingredientes.margemDeLucro}% de margem de lucro deve ser: R$ ${(calcularPrecoVenda(custo, ingredientes.margemDeLucro).toFixed(2) / pacotes).toFixed(2)}`);
    setLucro(`Lucro total: R$ ${ (((pacotes * (calcularPrecoVenda(custo, ingredientes.margemDeLucro).toFixed(2) / pacotes).toFixed(2)).toFixed(2)) - custo).toFixed(2)}`)
  }

  

  return (
    <div className="min-h-screen bg-[#fdf6ec] text-[#5e4637] p-8 font-serif">
      <div className="max-w-xl mx-auto bg-[#fffaf3] border border-[#e7dbc9] rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Calculadora de Cookies</h1>
        <p className="text-center mb-6">Insira a quantidade dos ingredientes disponíveis:</p>

        {Object.keys(ingredientes).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="number"
              name={key}
              value={ingredientes[key]}
              onChange={handleChange}
              className="w-full p-2 border border-[#e7dbc9] rounded-md bg-[#fffdf8] focus:outline-none focus:ring-2 focus:ring-[#c1a98a]"
              step="0.1"
            />
          </div>
        ))}

        <button
          onClick={calcular}
          className="w-full mt-4 bg-[#a47148] hover:bg-[#8b5e3c] text-white font-semibold py-2 rounded-lg shadow-sm transition duration-200"
        >
          Calcular
        </button>

        {resultado && (
          <div className="flex flex-col justify-between items-center mt-6 text-center text-lg font-semibold text-[#6b4f3b]">
            <p className="">{resultado}</p>
            {custoTotal && <p className="mt-2">{custoTotal}</p>}
            {preco && <p className="mt-2">{preco}</p>}
            {lucro && <p className="mt-2">{lucro}</p>}
          </div>
        )}
      </div>
    </div>
  );
}