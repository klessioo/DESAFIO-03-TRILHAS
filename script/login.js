const mostrarSenha = document.querySelector('.mostrar-senha');

mostrarSenha.addEventListener('click', function() {
  let senhaInput = document.getElementById('senha');
  const tipoAtual = senhaInput.getAttribute('type');
  senhaInput.setAttribute('type', tipoAtual === 'password' ? 'text' : 'password');
  this.textContent = tipoAtual === 'password' ? '👀' : '🙈'; 
});

function entrar(){
  const cpf = document.getElementById('cpf');
  const cfLabe = document.getElementById('cpf-label')

  const senha = document.getElementById('senha');
  const senhaLabel = document.getElementById('senha-label')

  const mensagemErro = document.getElementById('mesagem-erro');
  let listaUser = [];

  let userValid = {
    nome: '',
    cpf: '',
    senha: '',
  }

  listaUser = JSON.parse(localStorage.getItem('listaUser'));

  listaUser.forEach((item) => {
    if(cpf.value == item.CPF && senha.value == item.Senha){
      userValid = {
        nome: item.nome,
        CPF: item.cpf,
        senha: item.senha,
      }
    }
  });

  if(cpf.value == userValid.cpf && senha.value == userValid.senha){
    window.location.href = 'home.html'

    let token = Math.random().toString(16).substr(2, 18) + Math.random().toString(16).substr(2, 10)
    localStorage.setItem('userLogado', JSON.stringiy(userValid));
  } else {
    cpfLabel.setAttribute('style', 'color: red');
        cpf.setAttribute('style', 'border-color: red');
        senhaLabel.setAttribute('style', 'color: red');
        senha.setAttribute('style', 'border-color: red');
        mensagemErro.setAttribute('style', 'display: block');
        mensagemErro.innerHTML = 'CPF e/ou senha incorretos';
        cpf.focus();
  }
}