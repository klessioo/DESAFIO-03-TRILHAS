// Seleção dos elementos
const form = document.getElementById("form");
const nome = document.getElementById("nome");
const data = document.getElementById("data");
const cpf = document.getElementById("cpf");
const cep = document.getElementById("cep");
const sexo = document.getElementById("sexo");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const rua = document.getElementById("rua");
const numeroCasa = document.getElementById("numCasa");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const trilhas = document.querySelectorAll("input[name='trilha']");
const comprovanteIdentidade = document.getElementById("identidade");
const comprovanteResidencia = document.getElementById("residencia");
const senhalogin = document.getElementById("senhalogin");

let trilhaSelecionada = null;

const campos = [
  nome, data, cpf, email, telefone, cep, 
  sexo, rua, numeroCasa, cidade, estado, senhalogin
];

// Adiciona eventos de input e click para os campos
campos.forEach(campo => {
  campo.addEventListener('input', function() {
    esconderErro(this.id);

    if (this.id === 'loginSenha') {
      const senha = this.value;
      document.getElementById('requisitosTamanho').style.color = senha.length >= 8 ? 'green' : 'red';
      document.getElementById('requisitosMaiusculo').style.color = /[A-Z]/.test(senha) ? 'green' : 'red';
      document.getElementById('requisitosMinusculo').style.color = /[a-z]/.test(senha) ? 'green' : 'red';
      document.getElementById('requisitosNumeral').style.color = /[0-9]/.test(senha) ? 'green' : 'red';
      document.getElementById('requisitosCaractere').style.color = /[!@#$%^&*]/.test(senha) ? 'green' : 'red';
    }
  });

  campo.addEventListener('click', function() {
    this.style.borderColor = '';
    const erroElement = document.getElementById(`erro-${this.id}`);
    if (erroElement) {
      erroElement.style.display = 'none';
    }
  });
});

// Verifica a seleção de trilhas
trilhas.forEach(trilha => {
  trilha.addEventListener('change', function() {
    if (this.checked) {
      trilhaSelecionada = this.value;
    }
  });
});

// Evento de submissão do formulário
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  if (!validarCampos()) {
    return;
  }

  try {
    await salvarArquivos();
    salvarDadosUsuario();
    localStorage.removeItem('rascunhoInscricao');
    alert('Inscrição realizada com sucesso!');
    setTimeout(() => {
      window.location.href = "pagLogin.html";
    }, 500);
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    alert("Ocorreu um erro ao salvar seus dados. Tente novamente.");
  }
});

// Função para validar os campos
function validarCampos() {
  if (nome.value === "") {
    mostrarErro("nome", "Preencha com o nome completo");
    return false;
  }

  if (data.value === "") {
    mostrarErro("data", "Informe sua data de nascimento");
    return false;
  }

  if (cpf.value === "" || !validarCPF(cpf.value)) {
    alert("Por favor, preencha o CPF corretamente.");
    mostrarErro("cpf", "Preencha corretamente o CPF (11 dígitos)");
    return false;
  }

  if (sexo.value !== "Masculino" && sexo.value !== "Feminino") {
    alert("Por favor, selecione o sexo.");
    mostrarErro("sexo", "Selecione o sexo");  
    return false;
  }

  if (email.value === "" || !validarEmail(email.value)) {
    mostrarErro("email", "Email inválido");
    return false;
  }

  if (telefone.value === "" || !validarTelefone(telefone.value)) {
    mostrarErro("telefone", "O telefone deve conter 11 dígitos, incluindo o DDD");
    return false;
  }

  if (!comprovanteIdentidade.files[0]) {
    alert("Por favor, anexe o documento de identidade.");
    return false;
  }

  if (cep.value === "" || !validarCEP(cep.value)) {
    mostrarErro("cep", "O CEP deve conter 8 dígitos.");
    return false;
  }

  if (rua.value === "") {
    mostrarErro("rua", "Preencha com o nome da sua rua.");
    return false;
  }

  if (numeroCasa.value === "") {
    mostrarErro("numCasa", "Número da casa não informado.");
    numeroCasa.focus();
    return false;
  }

  if (!comprovanteResidencia.files[0]) {
    alert("Por favor, anexe o comprovante de residência.");
    return false;
  }
 
  if (loginSenha.value === "" || !validarSenha(loginSenha.value)) {
    alert("A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.");
    return false;
  }

  if (!trilhaSelecionada) {
    alert("Por favor, selecione uma trilha.");
    return false;
  }

  return true;
}

// Função para salvar arquivos no localStorage
function salvarArquivos() {
  return new Promise((resolve, reject) => {
    const file1 = comprovanteIdentidade.files[0];
    const file2 = comprovanteResidencia.files[0];

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function(e) {
      localStorage.setItem('pdf1_identidade', file1.name);
      localStorage.setItem('pdf1_data', e.target.result);

      reader2.onload = function(e) {
        localStorage.setItem('pdf2_residencia', file2.name);
        localStorage.setItem('pdf2_data', e.target.result);
        resolve();
      };

      reader2.onerror = () => reject("Falha ao ler comprovante de residência");
      reader2.readAsDataURL(file2);
    };

    reader1.onerror = () => reject("Falha ao ler comprovante de identidade");
    reader1.readAsDataURL(file1);
  });
}

// Função para salvar os dados do usuário
function salvarDadosUsuario() {
  let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

  listaUser.push({
    Nome: nome.value,
    DataDeNascimento: data.value,
    CPF: cpf.value,
    Sexo: sexo.value,
    Email: email.value,
    Telefone: telefone.value,
    CEP: cep.value,
    Rua: rua.value,
    Numero: numeroCasa.value,
    Cidade: cidade.value,
    Estado: estado.value,
    Trilha: trilhaSelecionada,
    Senha: loginSenha.value,
    Identidade: localStorage.getItem('pdf1_identidade'),
    Residencia: localStorage.getItem('pdf2_residencia')
  });

  localStorage.setItem("listaUser", JSON.stringify(listaUser));
}

// Funções de validação para os campos
function validarEmail(email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function validarCPF(cpf) {
  return cpf.replace(/\D/g, '').length === 11;
}

function validarTelefone(telefone) {
  return telefone.replace(/\D/g, '').length === 11;
}

function validarCEP(cep) {
  return cep.replace(/\D/g, '').length === 8;
}

function validarSenha(senha) {
  return senha.length >= 8 &&
         /[A-Z]/.test(senha) &&
         /[a-z]/.test(senha) &&
         /[0-9]/.test(senha) &&
         /[!@#$%^&*]/.test(senha);
}

// Função para buscar dados do CEP via API
function buscarCep(cep) {
  const cepNumerico = cep.replace(/\D/g, '');
    
  if (cepNumerico.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`)
    .then(response => response.json())
    .then(data => {
      if (!data.erro) {
        rua.value = data.logradouro || '';
        cidade.value = data.localidade || '';
        estado.value = data.uf || '';
      } else {
        alert('CEP não encontrado');
      }
    })
    .catch(error => {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP. Verifique o número e tente novamente.');
    });
}

// Função para salvar o rascunho dos dados
function salvarRascunho() {
  const formData = {
    nome: document.getElementById('nome').value,
    data: document.getElementById('data').value,
    cpf: document.getElementById('cpf').value,
    sexo: document.getElementById('sexo').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    cep: document.getElementById('cep').value,
    rua: document.getElementById('rua').value,
    numeroCasa: document.getElementById('numCasa').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value,
  };
    
  localStorage.setItem('rascunhoInscricao', JSON.stringify(formData));
  alert('Progresso salvo com sucesso! Você pode continuar depois.');
}

// Função para carregar os dados salvos do rascunho
function carregarRascunho() {
  const dadosSalvos = localStorage.getItem('rascunhoInscricao');
  if (dadosSalvos) {
    if (confirm('Encontramos um rascunho salvo. Deseja continuar de onde parou?')) {
      const formData = JSON.parse(dadosSalvos);
            
      document.getElementById('nome').value = formData.nome || '';
      document.getElementById('data').value = formData.data || '';
      document.getElementById('cpf').value = formData.cpf || '';
      document.getElementById('sexo').value = formData.sexo || '';
      document.getElementById('email').value = formData.email || '';
      document.getElementById('telefone').value = formData.telefone || '';
      document.getElementById('cep').value = formData.cep || '';
      document.getElementById('rua').value = formData.rua || '';
      document.getElementById('numCasa').value = formData.numeroCasa || '';
      document.getElementById('cidade').value = formData.cidade || '';
      document.getElementById('estado').value = formData.estado || '';
    }
  }
}

// Vincula as funções de rascunho aos eventos apropriados
document.querySelector('.fazer-inscricao').addEventListener('click', salvarRascunho);
document.addEventListener('DOMContentLoaded', carregarRascunho);

// Funções para mostrar e esconder erros de validação
function mostrarErro(campo, mensagem) {
  const erroElement = document.getElementById(`erro-${campo}`);
  const inputElement = document.getElementById(campo);
    
  if (erroElement && inputElement) {
    erroElement.textContent = mensagem;
    erroElement.style.display = 'block';
    inputElement.style.borderColor = 'var(--cor-quaternaria)';
    inputElement.focus();
  }
}

function esconderErro(campo) {
  const erroElement = document.getElementById(`erro-${campo}`);
  const inputElement = document.getElementById(campo);
    
  if (erroElement && inputElement) {
    erroElement.style.display = 'none';
    inputElement.style.borderColor = '';
  }
}
