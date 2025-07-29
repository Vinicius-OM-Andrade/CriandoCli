import fetch from 'node-fetch';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('🔎 Digite o CEP (apenas números ou com traço): ', async (cep) => {
  const cepLimpo = cep.replace(/\D/g, '');

  if (!/^\d{8}$/.test(cepLimpo)) {
    console.log("❌ CEP inválido. Digite exatamente 8 números.");
    rl.close();
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data = await response.json();

    if (data.erro) {
      console.log("🚫 CEP não encontrado.");
    } else {
      console.log(`
📍 Endereço encontrado:

  🏠 Logradouro: ${data.logradouro}
  🏘️ Bairro: ${data.bairro}
  🏙️ Cidade: ${data.localidade} - ${data.uf}
  📮 CEP: ${data.cep}
      `);
    }
  } catch (error) {
    console.log("❌ Erro ao buscar o CEP:", error.message);
  }

  rl.close(); 
});







