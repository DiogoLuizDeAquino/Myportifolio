//Encontra os botões da barra de navegação
const homeBtn = document.querySelector('.navbar .link-group li:nth-child(1) a');
const aboutBtn = document.querySelector('.navbar .link-group li:nth-child(2) a');
const skillsBtn = document.querySelector('.navbar .link-group li:nth-child(3) a');
const contactBtn = document.querySelector('.navbar .link-group li:nth-child(4) a');

// Encontra as seções correspondentes
const homeSection = document.querySelector('.home-section');
const aboutSection = document.querySelector('.about-section');
const skillsSection = document.querySelector('.skills-section');
const contactSection = document.querySelector('.contact-section');

// Define os eventos de clique dos botões
homeBtn.addEventListener('click', () => {
  homeSection.scrollIntoView({ behavior: 'smooth' });
});
aboutBtn.addEventListener('click', () => {
  aboutSection.scrollIntoView({ behavior: 'smooth' });
});
skillsBtn.addEventListener('click', () => {
    skillsSection.scrollIntoView({behavior: 'smooth' });
});
contactBtn.addEventListener('click', () => {
  contactSection.scrollIntoView({behavior: 'smooth' });
});


//Form de contato
class FormSubmit{
  constructor(settings){
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);

//Se o form existir no html ele utiliza o atributo que esta no action do html, no caso meu end de e-mail.
    if(this.form){
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

//Se a mensagem for enviada, mostra uma menssagem de sucesso.
  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }
//Ou não
  displayError() {
    this.form.innerHTML = this.settings.error;
  }

//corpo do form
  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  } 

//desabilita o botão no html enquanto ele envia 
  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Sending...";
  }

  //Criando metodo de enviar form
  async sendForm(event) {
  //em caso de erros fiz um "try" "cath" que é um ("tente fazer isso, mas se não der, mostre isso").
    try {
      this.onSubmission(event);
      //metodo fetch espera uma promessa, o "async" e "await" fazem com que o fetch "espere esse promessa acontecer".
      await fetch(this.url, {
        method: "POST",
        headers: {
          //é aqui que acontece a requisição
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

//inicia a classe
  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }    
}

//instância da classe
const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Message Sent!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();