document.addEventListener('DOMContentLoaded', function() {
  const mensagensContainer = document.getElementById('mensagens-container');
  
  for (let i = 0; i < 10; i++) {
    adicionarCampoMensagem();
  }
  
  var inputs = document.querySelectorAll('input, textarea, button');
  inputs.forEach(function(input) {
    input.addEventListener('focus', function() {
      this.classList.add('focus-anim');
    });
    input.addEventListener('blur', function() {
      this.classList.remove('focus-anim');
    });
  });
});

function adicionarCampoMensagem() {
  const mensagensContainer = document.getElementById('mensagens-container');
  
  const mensagemDiv = document.createElement('div');
  mensagemDiv.className = 'mensagem-div';
  
  const mensagemLabel = document.createElement('label');
  mensagemLabel.textContent = 'Mensagem:';
  
  const mensagemTextarea = document.createElement('textarea');
  mensagemTextarea.className = 'mensagem-textarea';
  mensagemTextarea.placeholder = 'Digite sua mensagem';
  
  const dataLabel = document.createElement('label');
  dataLabel.textContent = 'Data para enviar:';
  
  const dataInput = document.createElement('input');
  dataInput.type = 'datetime-local';
  dataInput.className = 'data-input';
  
  mensagemDiv.appendChild(mensagemLabel);
  mensagemDiv.appendChild(mensagemTextarea);
  mensagemDiv.appendChild(dataLabel);
  mensagemDiv.appendChild(dataInput);
  
  mensagensContainer.appendChild(mensagemDiv);
}

function enviarMensagens() {
  const numeroEnvio = document.getElementById("numeroEnvio").value;
  const numeroRecebimento = document.getElementById("numeroRecebimento").value;
  const mensagens = document.querySelectorAll('.mensagem-textarea');
  const datas = document.querySelectorAll('.data-input');

  if (numeroEnvio === "" || numeroRecebimento === "") {
    alert("Por favor, preencha os números de telefone.");
    return;
  }

  for (let i = 0; i < mensagens.length; i++) {
    const mensagem = mensagens[i].value;
    const data = datas[i].value;

    if (mensagem === "" || data === "") {
      alert("Por favor, preencha todos os campos de mensagem e data.");
      return;
    }

    // Verificar se a data é válida (a partir de 2024)
    const dataAtual = new Date();
    const dataSelecionada = new Date(data);

    if (dataSelecionada < dataAtual) {
      alert("Por favor, selecione uma data futura a partir de 2024.");
      return;
    }

    const mensagemFormatada = encodeURIComponent(mensagem);
    const url = `https://api.whatsapp.com/send?phone=${numeroRecebimento}&text=${mensagemFormatada}`;

    // Programar o envio da mensagem para a data selecionada
    const diffEmMilissegundos = dataSelecionada.getTime() - dataAtual.getTime();
    setTimeout(function() {
      window.open(url, '_blank');
    }, diffEmMilissegundos);

    alert(`Mensagem programada para ser enviada em ${data}`);
  }
}

