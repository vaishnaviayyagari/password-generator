const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
copyIcon =  document.querySelector(".input-box span"),
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase:"abcdefghijklmnopqrstuvwxyz",
    uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers:"0123456789",
    symbols:"!$%^&*()_+|~-=`{}[]:;.,*+-#@<>~"
}
const generatePassword =() => {
    let staticPassword = "";
    let excludeDuplicate = false;
    let randomPassword = "";
    let passLength = lengthSlider.value;
    options.forEach(option => { // looping through each option's checkbox
        if(option.checked){
            if(option.id != "exc-duplicates" && option.id != "spaces"){
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") {
            staticPassword += `  ${staticPassword}   `;
            }else  {
             excludeDuplicate = true;
            }
        }
    });
        for (let i = 0; i<passLength; i++) {
            let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
            if(excludeDuplicate) {
                !randomPassword.includes(randomChar) || randomChar == "" ? randomPassword += randomChar : i--;
            } else {
                randomPassword+=randomChar;
            }
            
        }

    passwordInput.value = randomPassword;
   
}
const updatePassIndicator =() => {
    passIndicator.id = lengthSlider.value<8 ? "weak" :lengthSlider.value <16 ? "medium":"strong";
}
const upadteSlider = () => {
    document.querySelector(".pass-length span").innerText = (lengthSlider.value);
    generatePassword();
    updatePassIndicator();
}
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText="check";
    setTimeout( ()=> {
       copyIcon.innerText="copy_all";
    },1500)
}
upadteSlider();
copyIcon.addEventListener("click",copyPassword)
lengthSlider.addEventListener("input",upadteSlider);
generateBtn.addEventListener("click",generatePassword);