export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  console.log(input.validity)
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalido");
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
  } else {
    input.parentElement.classList.add("input-container--invalido");
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput,input);

  }
};


/* Arry com os tipos de erros utilizados que será utilizado para verificar qual deles está "true" no atributo "validity" */
const tiposDeErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
]

const mensagensDeErro = {
  nome: {
    valueMissing: `O campo nome não pode estar vazio`,
  },
  email: {
    valueMissing: `O campo de email não pode estar vazio`,
    typeMismatch: `O email digitado não é válido.`,
  },
  senha: {
    valueMissing: `O campo de senha não pode estar vazio`,
    patternMismatch: `A senha deve conter 6-12 caracteres, pelo menos 1 letra maiúscula, 1 menúscula e 1 número, e não deve conter símbolos.`,
  },
  dataNascimento: {
    valueMissing: `O campo de data de nascimento não pode estar vazio`,
    customError: `Você deve ter mais de 18 anos para se cadastrar.`,
  },
  cpf: {
    valueMissing: `O campo de CPF não pode estar vazio`,
    customError: `CPF digitado não é válido.`,
  },
  cep: {
    valueMissing: `O campo de CEP não pode estar vazio`,
    patternMismatch: `CPF digitado não é válido.`,
    customError: `não foi possível buscar o CEP.`,
  },
  logradouro: {
    valueMissing: `O campo de logradouro não pode estar vazio`,
  },
  cidade: {
    valueMissing: `O campo de cidade não pode estar vazio`,
  },
  estado: {
    valueMissing: `O campo de estado não pode estar vazio`,
  },
  preco: {
    valueMissing: `O campo de preço não pode estar vazio`,
  }
};


const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
  cpf: (input) => validaCPF(input),
  cep: (input) => recuperarCEP(input)
};



const mostraMensagemDeErro = (tipoDeInput, input) => {
  let mensagem =''
  tiposDeErro.forEach(erro => {
    if(input.validity[erro]){
      mensagem = mensagensDeErro[tipoDeInput][erro];
    }
  })
  return mensagem
}

/* Nascimento */

const validaDataNascimento = (input) => {
  const dataRecebida = new Date(input.value);

  let mensagem = "";

  if (!maiorQue18(dataRecebida)) {
    mensagem = "Você deve ter mais de 18 anos para se cadastrar.";
  }
  input.setCustomValidity(mensagem);
};


const maiorQue18 = (data) => {
  const dataAtual = new Date();
  const dataMais18 = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate()
  );

  return dataMais18 <= dataAtual;
};


/* Valida CPF */

const validaCPF = (input) => {
  const cpfFormatado = input.value.replace(/\D/g, '')
  let mensagem = '';

  if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)){
    mensagem = 'O CPF digitado não é válido';
  }

  input.setCustomValidity(mensagem);
}

const checaCPFRepetido = (cpf) => {
  const valoresRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ]
  let cpfValido = true;

  valoresRepetidos.forEach(valor => {
    if(valor == cpf) {
      cpfValido = false;
    }
  })
  return cpfValido;
}

const checaEstruturaCPF = (cpf) => {
  const multiplicador = 10;
  return checaDigitoVerificador(cpf, multiplicador)
}

const checaDigitoVerificador = (cpf, multiplicador) => {
  if(multiplicador >=12){
    return true;
  }

  let multiplicadorInicial = multiplicador;
  let soma = 0; 
  const cpfSemDigito = cpf.substr(0,multiplicador-1).split('')
  const digitoVerificador = cpf.charAt(multiplicador-1)

  for(let contador=0; multiplicadorInicial > 1; multiplicadorInicial--){
    soma = soma + cpfSemDigito[contador] * multiplicadorInicial;
    contador++;
  }

  if(digitoVerificador == confirmaDigito(soma)){
    return checaDigitoVerificador(cpf, multiplicador + 1)
  }

}

const confirmaDigito = (soma) => {
  return 11-(soma%11)
}

/* CEP */

const recuperarCEP =(input) => {
  const cep = input.value.replace(/\D/g, '');
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type':'aplication/json;charset=utf-8'
    }
  }

  if(!input.validity.patternMismatch && !input.validity.valueMissing){
    fetch(url,options).then(
      response => response.json()
    ).then(
      data => {
        if(data.erro){
          input.setCustomValidity('não foi possível buscar o CEP.')
        }
        input.setCustomValidity('')
        preencherCampoComCEP(data);
        return
      }
    )
  }
}

/* peenchendo os campos */

const preencherCampoComCEP = (data) => {
  const logradouro = document.querySelector('[data-tipo="logradouro"]');
  const cidade = document.querySelector('[data-tipo="cidade"]');
  const estado = document.querySelector('[data-tipo="estado"]');

    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}