
function sendmail() {
const templateParams = {
name: document.querySelector("contact-name").value,
email: document.querySelector("contact-email").value,
subject: document.querySelector("contact-subject").value,
message: document.querySelector("contact-message").value,
};

emailjs
.send("service_x0den2y", "template_lu0osdk", templateParams).then(() => alert("Email sentll").catch(() => alert("Email not sentll")));
}