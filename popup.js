let global = {}; 

global.idInterval = null;

function mostrarNotificacao(mensagem = ''){
    let progressBar = document.querySelector('#progress-bar');
    let progress = 0;
  
    document.querySelector("#textoToast").innerHTML = mensagem;
    if (global.idInterval) {
      clearInterval(global.idInterval);
    }

    global.idInterval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        progressBar.style.width = progress + '%';
      } else {
        clearTimeout(global.idInterval);
        document.querySelector('.toast').classList.remove('show');
        progressBar.style.width = '0%';
      }
    }, 500);
  
    document.querySelector('.toast').classList.add('show');
}
