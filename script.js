document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const contactBtn = document.getElementById("contact");
    const sendBtn = document.getElementById("send");
    const messageInput = document.getElementById("inputText");
    const messageContainer = document.getElementById("messagecontainer");
    const clearBtn = document.getElementById("clear");
    const clearAllBtn = document.getElementById("clearall");
    const alertBox = document.getElementById("alertBox");
    const navLinks = document.querySelectorAll('nav a');

    // Initialize messages
    let storedMessages = localStorage.getItem("key") || "";
    if (messageContainer) messageContainer.innerHTML = storedMessages;

    // Contact button handler
    if (contactBtn && alertBox) {
        contactBtn.addEventListener('click', () => {
            alertBox.innerHTML = 'Contact information available on request';
            alertBox.classList.add('show');
            setTimeout(() => {
                alertBox.classList.remove('show');
            }, 3000);
        });
    }

    // Message submission
    const handleMessageSubmit = () => {
        const content = messageInput.value.trim();
        if (content) {
            storedMessages += `<p>${content}</p>`;
            localStorage.setItem("key", storedMessages);
            messageContainer.innerHTML = storedMessages;
            messageInput.value = "";
        } else {
            alertBox.innerHTML = "Please enter a message first!";
            alertBox.classList.add('show');
            setTimeout(() => {
                alertBox.classList.remove('show');
            }, 3000);
        }
    };

    // Send button event
    if (sendBtn) {
        sendBtn.addEventListener('click', handleMessageSubmit);
    }

    // Enter key event
    if (messageInput) {
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleMessageSubmit();
            }
        });
    }

    // Clear input
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            messageInput.value = "";
        });
    }

    // Clear all messages
    if (clearAllBtn && messageContainer) {
        clearAllBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete all messages?")) {
                storedMessages = "";
                localStorage.removeItem("key");
                messageContainer.innerHTML = "";
            }
        });
    }

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
