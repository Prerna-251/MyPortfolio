const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

function updateClock() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

setInterval(updateClock, 1000);
updateClock();

function showNotification(type, message) {
    const notification = document.getElementById('notification');
    const icon = type === 'success' ? '✔️' : '❌';

    notification.innerHTML = `
        <span>${icon}</span>
        <span>${message}</span>
    `;

    notification.className = `notification ${type}`;
    notification.style.display = 'flex';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function sendEmail() {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const subject = document.querySelector("#subject").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !subject || !message) {
        showNotification('error', 'Please fill in all fields.');
        return;
    }

    const templateParams = { name, email, subject, message };

    emailjs
        .send("service_aq60xxr", "template_4h4u10o", templateParams)
        .then(() => {
            showNotification('success', 'Email sent successfully!');
            document.getElementById('contact-form').reset();
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            showNotification('error', '❌ Failed to send email. Please try again.');
        });
}
