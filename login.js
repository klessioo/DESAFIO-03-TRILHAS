// Função para processar o login
function entrar() {
      // Recupera os valores digitados pelo usuário
      const cpfInput = document.getElementById("cpf").value.trim();
      const senhaInput = document.getElementById("senha").value.trim();
      const mensagemErro = document.getElementById("mensagem-erro");
    
      // Limpa mensagem de erro anterior, se houver
      mensagemErro.textContent = "";
    
      // Validação simples para campos vazios
      if (!cpfInput || !senhaInput) {
        mensagemErro.textContent = "Preencha o CPF e a senha.";
        mensagemErro.style.color = "red";
        return;
      }
    
      // Recupera a lista de usuários cadastrados no localStorage
      const listaUserStr = localStorage.getItem("listaUser");
      if (!listaUserStr) {
        mensagemErro.textContent = "Nenhum usuário cadastrado. Por favor, realize sua inscrição.";
        mensagemErro.style.color = "red";
        return;
      }
    
      let listaUser;
      try {
        listaUser = JSON.parse(listaUserStr);
      } catch (error) {
        mensagemErro.textContent = "Erro ao ler os dados de usuário.";
        mensagemErro.style.color = "red";
        return;
      }
    
      // Normaliza o CPF: remove pontos, hífens e demais caracteres não numéricos
      const cpfNormalizado = cpfInput.replace(/\D/g, "");
    
      // Busca por um usuário com o CPF e senha informados
      const usuarioEncontrado = listaUser.find((usuario) => {
        // Normaliza o CPF salvo para comparação
        const cpfUsuario = usuario.CPF.replace(/\D/g, "");
        return cpfUsuario === cpfNormalizado && usuario.Senha === senhaInput;
      });
    
      // Se o usuário for encontrado, a autenticação é bem-sucedida
      if (usuarioEncontrado) {
        // Exemplo: redireciona para uma página (pode ser um dashboard ou a página principal do sistema)
        window.location.href = "home.html"; // altere para a página desejada após login
      } else {
        mensagemErro.textContent = "CPF ou senha inválidos. Tente novamente.";
        mensagemErro.style.color = "red";
      }
                  
    }
    
    // Função para alternar a exibição da senha
    document.querySelector(".mostrar-senha").addEventListener("click", function() {
      const senhaInput = document.getElementById("senha");
      // Se o input estiver do tipo "password", altera para "text" para exibir a senha e vice-versa
      if (senhaInput.type === "password") {
        senhaInput.type = "text";
        this.textContent = "🙈"; // Opcional: muda o ícone ou a legenda, se desejar
      } else {
        senhaInput.type = "password";
        this.textContent = "🫣"; // Restaura o ícone ou a legenda original
      }
    });
    