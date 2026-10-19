/* Initialize EmailJS */
(function () {
    emailjs.init({
        publicKey: "WL7C83U7AFqp0ds3I"
    });
})();

/* Attach event listener to the contact form */
window.addEventListener("load", function () {
    const form = document.querySelector("form");

    if (!form) {
        console.error("Contact form not found!");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const subjectField = document.getElementById("subject");
        const messageField = document.getElementById("message");

        if (!nameField || !emailField || !subjectField || !messageField) {
            console.error("One or more form fields are missing or have incorrect IDs.");
            alert("Please check the contact form field IDs.");
            return;
        }

        const templateParams = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            title: subjectField.value.trim(),
            message: messageField.value.trim()
        };

        const submitButton = form.querySelector('button[type="submit"]');

        try {
            if (submitButton) submitButton.disabled = true;

            const response = await emailjs.send(
                "service_99t3u3p",
                "template_is2xs6b",
                templateParams
            );

            console.log("SUCCESS!", response.status, response.text);
            alert("Email sent successfully!");
            form.reset();

        } catch (error) {
            console.error("FAILED TO SEND EMAIL:", error);
            console.error("Status:", error.status);
            console.error("Details:", error.text);

            alert("Email failed. Check the browser console and EmailJS settings.");

        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
});

