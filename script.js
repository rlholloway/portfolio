// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const menuHidden = document.querySelector(".menu-hide");
const menuItems = document.querySelectorAll(".menu-item");

hamburger.addEventListener("click", hamMenu);

menuItems.forEach( (item) => {
    item.addEventListener("click", hamMenu);
})

function hamMenu() {
    hamburger.classList.toggle("active");
    menuHidden.classList.toggle("active");
}


// Form
const form = document.getElementById("contact-form");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const formStatus = document.getElementById("thank-you");
    const data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formStatus.innerHTML = "Thank you! I'll be in touch soon.";
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    formStatus.innerHTML = "There was an expected error. Please try again later."
                }
            })
        }
    }).catch(error => {
        formStatus.innerHTML = "There was an expected error. Please try again later."
    });
}