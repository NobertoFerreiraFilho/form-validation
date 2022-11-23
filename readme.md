# NFDev | A complete form validation with JS/HTML/CSS

Project developed as part of the Alura course "JavaScript na Web: validação de Formulários e HTML5". IT consists of a Client and Product Register form with JS diferent validation strategy for each field of the form.

| :placard: Vitrine.Dev |                                              |
| --------------------- | -------------------------------------------- |
| :sparkles: Nome       | **NFDev - form validation with JS/HTML/CSS** |
| :label: Tecnologias   | JAVASCRIPT, HTML, CSS                        |

<p align="center">
<img src='https://img.shields.io/github/last-commit/NobertoFerreiraFilho/form-validation?style=plastic'>
<img src='https://img.shields.io/static/v1?label=Status&message=Done&color=brightgreen'>
<img src='https://img.shields.io/github/stars/NobertoFerreiraFilho/form-validation'>
<img src='https://img.shields.io/github/forks/NobertoFerreiraFilho/form-validation'>
<img src='https://img.shields.io/github/issues/NobertoFerreiraFilho/form-validation'>
</p>

<!-- ![gif of the project]() -->

## Project Details

<!-- Inserir imagem com a #vitrinedev ao final do link -->
<h3>"Devs Registers Form" Page</h3>
<img align='center' src='https://github.com/NobertoFerreiraFilho/form-validation/blob/main/img/project/cadastro-dark.png#vitrinedev' width=400/>
<img align='center' src='https://github.com/NobertoFerreiraFilho/form-validation/blob/main/img/project/cadastro-erros-dark.png' width=400/>
<h3>"Cadastro Concluído" Page</h3>
<img align='center' src='https://github.com/NobertoFerreiraFilho/form-validation/blob/main/img/project/cadastro-concluido-dark.png' width=400/>
<h3>"Product Register" Page</h3>
<img align='center' src='https://github.com/NobertoFerreiraFilho/form-validation/blob/main/img/project/cadastro-produto-erro-dark.png' width=400/>

### Detalhes do projeto

#### Validation Strategy:

##### Preparation

<ol>
<li>Hidden "span" tag after each "input" tag that will have its value changed according to the specific error or will be hidden when its all good. all of this using JS DOM manipulation.</li>
<li>Implement "data-tipo= nome/email/cpf/cep/... " attribute and "required" on each input</li>
<li>Create an object called "mensagensDeErro" with all kinds of "data-tipo". Also included for each of them the respective type of errors with their customized errors messages. </li>
<li>Create an object called "validadores" with the list of inputs that is going to have "customError" like: BirthDate, CPF and CEP. with a call to the specific validation function for each of them.</li>
<li>Used <strong>querySelectorAll</strong> to get all 'input' tags.</li> 
<li>Then, used <strong>add.eventListener('blur')</strong> using forEach on "inputs" array. </li>
<li>Inside the forEach also included a call for <strong>"Valida()"</strong> function with e.target parameter</li>
</ol>

##### Individual Validation Strategy (Client Register Form):

<ol>
    <li>
        <h6>Name:</h6>
        <ul>
        <li>valueMissing: "valida()" Check "input.validity.valid" status: "true" for filled or "false" for empty by the time the input field loses focus (blur). If empty (false), it changes text content using innerHTML with a standard message for "valueMissing" type of error. </li>
        </ul>
    </li>
    <li>
        <h6>E-mail:</h6>
        <ul>
        <li>valueMissing: same as valueMissing name's error.</li>
        <li>typeMismatch: define "Type='email'" standard HTML validation.</li>
        </ul>
    </li>
    <li>
        <h6>Password:</h6>
        <ul>
        <li>valueMissing: same as valueMissing name's error.</li>
        <li>patternMismatch: used a HTML attribute with a REGEX to validate the password with this rules:
        <ul>
            <li>REGEX = ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[!@#$%^&*_=+-]).{6,12}$ </li>
            <li>6-12 characters</li>
            <li>At least 1 capital letter</li>
            <li>At least 1 lower case letter</li>
            <li>At least 1 number</li>
            <li>Can't have symbols</li>
        </ul>
        </li>
        </ul>
    </li>
    <li>
        <h6>Birth Date:</h6>
        <ul>
        <li>valueMissing: same as valueMissing name's error.</li>
        <li>customError: check if is older then 18yr old.
        <ul>
            <li>Calls "valida()" function that check if "tipoDeErro"="dataNascimento" is included on "validadores" object</li>
            <li>"validadores()" identifies "dataNascimento" and calls "validaDataNascimento()"</li>
            <li>"validaDataNascimento()" saves input.value and calls "MaiorQue18()" to check the client age.</li>
            <li>"MaiorQue18()" function gets the input.value+18 using getUTCFullyear + 18, getUTCMonth and getUTCDate, and compare with todays date "new Date()" and returns true if is younger. </li>
            <li>Then, "validaDataNascimento()" checks this return and loads the error messages by using "setCustomValidity()"</li>
            <li>If there's no problem, an empty string '' is loaded</li>
            <li>If its younger than 18, a specific message is loaded</li>
        </ul>
        </li>
        </ul>
    </li>
    <li>
        <h6>CPF:</h6>
        <ul>
        <li>valueMissing: same as valueMissing name's error.</li>
        <li>customError: check if the input follows CPF rules.
        <ul>
            <li>Calls "valida()" function that check if "tipoDeErro"="CPF" is included on "validadores" object</li>
            <li>"validadores()" identifies "CPF" and calls "validaCPF()"</li>
            <li>"validaCPF()" saves input.value and remove all symbols by using .replace(/\D/g, '')</li>
            <li>Then, it makes 2 checks by calling 2 different function:</li>
            <li>checaCPFRepetido() -> checks if the number typed were all the same, example: 1111111111</li>
            <li>checaEstruturaCPF() -> checks if it follows all the CPF rules</li>
        </ul>
        </li>
        </ul>
    </li>
    <li>
        <h6>CEP:</h6>
        <ul>
        <li>valueMissing: same as valueMissing name's error.</li>
        <li>patternMismatch: used a HTML attribute with a REGEX to validate the CEP with this rules:
        <ul>
            <li>REGEX = [\d]{5}-?[\d]{3} </li>
            <li>starts with 5 numbers</li>
            <li>1 optional "-"</li>
            <li>end with 3 numbers</li>
        </ul>
        </li>
        <li>customError: check if there is a valid response from the API. URL = <strong>https://viacep.com.br/ws/${cep}/json/</strong>
        <ul>
            <li>Calls "valida()" function that check if "tipoDeErro"="CEP" is included on "validadores" object</li>
            <li>"validadores()" identifies "CEP" and calls "recuperarCEP()"</li>
            <li>"recuperarCEP()" saves input.value and remove all symbols by using .replace(/\D/g, '')</li>
            <li>then, if there's no patternMismatch or valueMissing errors, is initialized a Fetch request</li>
            <li>Depending on the answer it can set an erro message or it can call preencherCampoComCEP() to fill the rest of the form fieds: logradouro, cidade and estado</li>
            <li>For these last 3 fields was also implemented valueMissing error</li>
        </ul>
        </li>
        </ul>
    </li>
</ol>

##### Individual Validation Strategy (Product Register Form):

<ol>
    <li>
        <h6>Name:</h6>
        <ul>
        <li>valueMissing: exactly the same strategy of the Client form. </li>
        </ul>
    </li>
    <li>
        <h6>Price:</h6>
        <ul>
        <li>valueMissing: exactly the same strategy of the Client form. </li>
        <li>It was also implemented a MASK imported from this link: <a href='https://github.com/codermarcos/simple-mask-money'>https://github.com/codermarcos/simple-mask-money</a>. This Mask works as a validation because it prevents wrong inputs like letter or symbols.</li>
        </ul>
    </li>
</ol>

## Lessons Learned

<ul>
  <li>HTML validation with required and type attribute</li>
  <li>HTML validation with pattern attribute + REGEX</li>
  <li>Create function to perform customized validation</li>
  <li>Create customized erro messages</li>
  <li>Using DATA attribute to work with HTML <-> JS</li>
  <li>DOM Manipulation with JS</li>
  <li>Different inputs validation: name, email, password, birthdate, CPF, CEP, complete address and price</li>
  <li>Creating reusable/recursive functions</li>
  <li>Restfull API </li>
</ul>
 
## Technics, Technologies and Dependences used:

<ul style='display:flex; flex-wrap: wrap; justify-content:center;'>
<il>
<img src='https://img.shields.io/badge/Javascript-black?logo=Javascript'/>
</il>
<il>
<img src='https://img.shields.io/badge/CSS3-black?logo=CSS3'/>
</il>
<il>
<img src='https://img.shields.io/badge/HTML5-black?logo=HTML5'/>
</il>
<il>
<img src='https://img.shields.io/badge/Git-black?logo=git'/>
</il>
<il>
<img src='https://img.shields.io/badge/VSCode-black?logo=visual-studio-code'/>
</il>
</ul>
