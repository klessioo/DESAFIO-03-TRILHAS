// home.js

// Exemplo simples: Verifica se existe um usuário no localStorage e exibe a mensagem no console
const listaUser = localStorage.getItem("listaUser");

if (listaUser) {
  console.log("Usuário(s) encontrados. Bem-vindo(a) à área restrita!");
} else {
  console.log("Nenhum usuário encontrado. Redirecionando para a página de login...");
  window.location.href = "login.html"; // Se não houver usuário, redireciona para a página de login
}
