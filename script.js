document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements with null checks
    const contactBtn = document.getElementById("contact");
    const prevImgBtn = document.getElementById("up");
    const nextImgBtn = document.getElementById("down");
    const sendBtn = document.getElementById("send");
    const hobbyImage = document.getElementById("hbimg");
    const messageInput = document.getElementById("inputText");
    const alertBox = document.getElementById("alertBox");
    const messageContainer = document.getElementById("messagecontainer");
    const clearInputBtn = document.getElementById("clear");
    const clearAllBtn = document.getElementById("clearall");
    const navLinks = document.querySelectorAll('nav a');

    // Image carousel configuration
    const imagePaths = [
        "tra2.jpg",
        "tra9.jpg", 
        "tra11.jpg",
        "tra19.jpg",
        "tra21.jpg",
        "T1.jpg",
        "YN.jpg"
    ];
    let currentImageIndex = 0;
    let storedMessages = localStorage.getItem("key") || "";

    // Initialize message board
    if (messageContainer) {
        messageContainer.innerHTML = storedMessages;
    }

    // Contact button handler
    if (contactBtn && alertBox) {
        contactBtn.addEventListener('click', () => {
            alertBox.innerHTML = 'You can guess the contact information 😉';
            alertBox.classList.add('show');
            setTimeout(() => {
                alertBox.classList.remove('show');
            }, 3000);
        });
    }

    // Image carousel controls
    if (prevImgBtn && nextImgBtn && hobbyImage) {
        const updateImage = () => {
            hobbyImage.src = imagePaths[currentImageIndex];
        };

        prevImgBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
            updateImage();
        });

        nextImgBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
            updateImage();
        });

        // Initialize first image
        updateImage();
    }

    // Message board functionality
    if (sendBtn && messageInput && messageContainer && alertBox) {
        const handleMessageSubmit = () => {
            const messageContent = messageInput.value.trim();
            
            if (messageContent) {
                storedMessages += `<p>${messageContent}</p>`;
                localStorage.setItem("key", storedMessages);
                messageContainer.innerHTML = storedMessages;
                messageInput.value = "";
            } else {
                alertBox.innerHTML = "Please enter a message before sending!";
                alertBox.classList.add('show');
                setTimeout(() => {
                    alertBox.classList.remove('show');
                }, 3000);
            }
        };

        sendBtn.addEventListener('click', handleMessageSubmit);

        // Enter key submission
        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleMessageSubmit();
            }
        });
    }

    // Clear input field
    if (clearInputBtn && messageInput) {
        clearInputBtn.addEventListener('click', () => {
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
