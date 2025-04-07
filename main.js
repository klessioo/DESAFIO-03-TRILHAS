document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      let isValid = true;
      let messages = [];
  
      const nome = form.nome.value.trim();
      const data = new Date(form.data.value);
      const cpf = form.cpf.value.replace(/\D/g, "");
      const email = form.email.value.trim();
      const telefone = form.telefone.value.replace(/\D/g, "");
      const cep = form.cep.value.replace(/\D/g, "");
      const rua = form.rua.value.trim();
      const numero = form.numCasa.value.trim();
      const cidade = form.cidade.value.trim();
      const estado = form.estado.value.trim();
      const identidade = form.identidade.files.length;
      const residencia = form.residencia.files.length;
      const trilhaSelecionada = form.trilha.value;
      const termos = form.termos.checked;
  
      // Nome
      if (nome.length < 3) {
        isValid = false;
        messages.push("Nome deve ter pelo menos 3 caracteres.");
      }
  
      // Data de nascimento
      const hoje = new Date();
      const idade = hoje.getFullYear() - data.getFullYear();
      if (!form.data.value || idade < 16) {
        isValid = false;
        messages.push("Você deve ter pelo menos 16 anos.");
      }
  
      // CPF
      if (cpf.length !== 11) {
        isValid = false;
        messages.push("CPF deve ter 11 dígitos.");
      }
  
      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        isValid = false;
        messages.push("E-mail inválido.");
      }
  
      // Telefone
      if (telefone.length < 10) {
        isValid = false;
        messages.push("Telefone deve ter pelo menos 10 dígitos.");
      }
  
      // CEP
      if (cep.length !== 8) {
        isValid = false;
        messages.push("CEP deve ter 8 dígitos.");
      }
  
      // Endereço
      if (!rua || !numero || !cidade || !estado) {
        isValid = false;
        messages.push("Todos os campos de endereço devem ser preenchidos.");
      }
  
      // Arquivos
      if (!identidade) {
        isValid = false;
        messages.push("Você deve enviar o documento de identidade.");
      }
  
      if (!residencia) {
        isValid = false;
        messages.push("Você deve enviar o comprovante de residência.");
      }
  
      // Trilha
      const trilhaSelecionadaCheck = document.querySelector('input[name="trilha"]:checked');
      if (!trilhaSelecionadaCheck) {
        isValid = false;
        messages.push("Selecione uma trilha de aprendizagem.");
      }
  
      // Termos
      if (!termos) {
        isValid = false;
        messages.push("Você deve aceitar os termos e condições.");
      }
  
      if (!isValid) {
        event.preventDefault();
        alert("Erros no formulário:\n\n" + messages.join("\n"));
      }
    });
  });
  