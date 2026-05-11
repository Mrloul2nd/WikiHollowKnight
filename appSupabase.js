//Importation de Supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


//  Récupère ces infos dans ton dashboard Supabase (URL + publishable/anon key)
const SUPABASE_URL = "Mettrel'URL copiée sur Supabase ici";
const SUPABASE_KEY = "Mettre la clé publique de votre projet Supabase ici";

//  Client Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Récupération des boutons Il est important de vérifier votre code HTML pour remplacer btnLogin et btnRegister en fonction de leur id
const BtnLogin = document.getElementById("btnLogin");
const BtnRegister = document.getElementById("btnRegister");

//  Récupération des conteneurs de formulaires
const LoginContainer = document.getElementById("loginFormContainer");
const RegisterContainer = document.getElementById("registerFormContainer");


//  Récupération des données
const LoginForm = document.getElementById("loginForm");
const RegisterForm = document.getElementById("registerForm");

//  Récupération des erreurs
const LoginError = document.getElementById("loginError");
const RegisterError = document.getElementById("registerError")


//Champs formulaire de connexion
const LoginEmail = document.getElementById("loginEmail");
const LoginPassword = document.getElementById("loginPassword");



//Champs du formulaire d'inscription
const RegisterEmail = document.getElementById("registerEmail");
const RegisterPassword = document.getElementById("registerPassword");
const RegisterPrenom = document.getElementById("registerPrenom");
const RegisterNom = document.getElementById("registerNom");


//  Quand on clique sur "Se connecter", on fait apparître le formulaire   Ceci permet juste de faire apparaître le formulaire
BtnLogin.addEventListener("click", () => {
    LoginContainer.classList.remove("hidden");
    RegisterContainer.classList.add("hidden");
    LoginError.textContent = "";
});


//  Quand on clique sur "S'inscrire", on fait apparaître le formulaire    Ceci permet juste de faire apparaître le formulaire
BtnRegister.addEventListener("click", () => {
    RegisterContainer.classList.remove("hidden");
    LoginContainer.classList.add("hidden");
    LoginError.textContent = "";
});



//  Fonction de validation de l'email
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
}





// Fonction de validation du mot de passe
function validatePassword (password) {
    const miniLength = /.{6,}/;
    const lowercase = /[a-z]/;
    const uppercase = /[A-Z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%?&*(),.?":{}|<>]/;


    return (
        miniLength.test(password) &&
        lowercase.test(password) &&
        uppercase.test(password) &&
        number.test(password) &&
        specialChar.test(password)
    );
}

console.log("Tentative inscription", Email, Prenom, Nom);


//Contrôle des données du formulaire d'inscription
RegisterForm.addEventListener("submit", async (event) => {
    event.preventDefault();     //Empêche l'envoi automatique du formulaire

//  Récupération des valeurs des formulaires
    const Email = RegisterEmail.value.trim();
    const Password = RegisterPassword.value;
    const Prenom = RegisterPrenom.value.trim();
    const Nom = RegisterNom.value.trim();



    //  Vérification de l'email
    if (!validateEmail(Email)) {
        RegisterError.textContent = "Adresse email invalide.";
        return;
    }

    //Vérification mot de passe
    if (!validatePassword(Password)) {
        RegisterError.textContent = "Le mot de passe doit contenir au moins 6 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.";
        return;
    }
    RegisterError.textContent ="";


//  Inscription Supabase
const { data, error } = await supabase.auth.signUp({
    email: Email,
    password: Password,
    options: {
        data: {
            prenom: Prenom,
            nom: Nom
        }
    }
});

    if (error) {
        RegisterError.textContent = error.message;
        return;
    }
console.log("Réponse Supabase", data, error);



//  Affichage de la page de connexion
    RegisterError.textContent = "";
    LoginContainer.classList.remove("hidden");
    RegisterContainer.classList.add("hidden");

}

)
