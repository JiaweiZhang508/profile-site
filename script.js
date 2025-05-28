document.addEventListener('DOMContentLoaded', () => {
    // 获取 DOM 元素（确保元素存在再操作）
    const contact = document.getElementById("contact");
    const up = document.getElementById("up");
    const down = document.getElementById("down");
    const send = document.getElementById("send");
    const hbimg = document.getElementById("hbimg");
    const inputText = document.getElementById("inputText");
    const alertBox = document.getElementById("alertBox"); 
    const messagecontainer = document.getElementById("messagecontainer");
    const clear = document.getElementById("clear");
    const clearall = document.getElementById("clearall");
    const navLinks = document.querySelectorAll('nav a');

    // 图片数组（确保图片路径正确）
    let img = ["tra2.jpg", "tra9.jpg", "tra11.jpg", "tra19.jpg", "tra21.jpg", "T1.jpg", "YN.jpg"];
    let index = 0;
    let message = localStorage.getItem("key") || ""; 

    // 初始化留言内容
    if (messagecontainer) messagecontainer.innerHTML = message;

    // 联系作者按钮点击事件（添加安全判断）
    if (contact && alertBox) {
        contact.addEventListener('click', () => {
            alertBox.innerHTML = 'You can guess the contact information😁😁';
            alertBox.classList.add('show');
            setTimeout(() => {
                alertBox.classList.remove('show');
            }, 3000);
        });
    }

    // 图片切换功能（添加边界检查）
    if (up && down && hbimg) {
        up.addEventListener('click', () => {
            index = (index - 1 + img.length) % img.length; 
            hbimg.src = img[index];
        });

        down.addEventListener('click', () => {
            index = (index + 1) % img.length;
            hbimg.src = img[index];
        });
    }

    // 发送留言功能（优化逻辑）
    if (send && inputText && messagecontainer && alertBox) {
        send.addEventListener('click', () => {
            if (confirm('Are you sure you want to send this message?')) {
                const content = inputText.value.trim();
                if (content) {
                    message += `<p>${content}</p>`;
                    localStorage.setItem("key", message);
                    inputText.value = "";
                    messagecontainer.innerHTML = message;
                } else {
                    alertBox.innerHTML = "You didn't even enter it! How do I record!";
                    alertBox.classList.add('show');
                    setTimeout(() => {
                        alertBox.classList.remove('show');
                    }, 3000);
                }
            }
        });
    }

    // 清除输入框
    if (clear && inputText && alertBox) {
        clear.addEventListener('click', () => {
            if (inputText.value.trim() === "") {
                alertBox.innerHTML = "You didn't even enter it! How do I clear!";
                alertBox.classList.add('show');
                setTimeout(() => {
                    alertBox.classList.remove('show');
                }, 3000);
            } else {
                if (confirm('Are you sure you want to clear the input box?')) {
                    inputText.value = "";
                }
            }
        });
    }

    // 清空所有留言
    if (clearall && messagecontainer && alertBox) {
        clearall.addEventListener('click', () => {
            if (message === "") {
                alertBox.innerHTML = "It's completely empty. I can't get rid of it.";
                alertBox.classList.add('show');
                setTimeout(() => {
                    alertBox.classList.remove('show');
                }, 3000);
            } else {
                if (confirm('Are you sure you want to clear all messages?')) {
                    message = "";
                    localStorage.removeItem("key");
                    messagecontainer.innerHTML = "";
                }
            }
        });
    }

    // 回车发送留言
    if (inputText && send) {
        inputText.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); 
                send.click();
            }
        });
    }

    // 导航链接active状态（根据当前页面设置）
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
