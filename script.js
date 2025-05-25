// 获取 DOM 元素
const contact = document.getElementById("contact");
const up = document.getElementById("up");
const down = document.getElementById("down");
const send = document.getElementById("send");
const hbimg = document.getElementById("hbimg");
const inputText = document.getElementById("inputText");
const alertBox = document.querySelector('#custom-alert');
const messagecontainer = document.getElementById("messagecontainer");
const clear = document.getElementById("clear");
const clearall = document.getElementById("clearall");
const navLinks = document.querySelectorAll('nav a');

// 图片数组
let img = ["tra2.jpg", "tra9.jpg", "tra11.jpg", "tra19.jpg", "tra21.jpg", "T1.jpg", "YN.jpg"];
let index = 0;
let message = "";

// 初始化留言内容
if (localStorage.getItem("key")) {
    message = localStorage.getItem("key");
    messagecontainer.innerHTML = message;
}

// 联系作者按钮点击事件
contact.addEventListener('click', () => {
    alertBox.innerHTML = 'You can guess the contact information😁😁';
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000); // 显示时间为3秒
});

// 上一张图片按钮点击事件
up.addEventListener('click', () => {
    if (hbimg) {
        if (index % img.length !== 0) {
            index--;
            hbimg.src = img[index % img.length];
        }
    }
});

// 下一张图片按钮点击事件
down.addEventListener('click', () => {
    if (hbimg) {
        index++;
        hbimg.src = img[index % img.length];
    }
});

// 发送留言按钮点击事件
send.addEventListener('click', () => {
    if (inputText && inputText.value) {
        message += `<p>${inputText.value}</p>`;
        localStorage.setItem("key", message);
        inputText.value = "";
        messagecontainer.innerHTML = message;
    } else {
        alertBox.innerHTML = "You didn't even enter it! How do I record!";
        alertBox.classList.add('show');
        setTimeout(() => {
            alertBox.classList.remove('show');
        }, 3000); // 显示时间为3秒
    }
});

// 清除输入框内容按钮点击事件
clear.addEventListener('click', () => {
    if (inputText) {
        inputText.value = "";
    }
});

// 清除所有留言按钮点击事件
clearall.addEventListener('click', () => {
    localStorage.clear();
    if (messagecontainer) {
        messagecontainer.innerHTML = "";
        message = "";
    }
});

// 回车键发送留言
if (inputText) {
    inputText.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            send.click();
            event.preventDefault();
        }
    });
}

// 导航链接点击事件
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
