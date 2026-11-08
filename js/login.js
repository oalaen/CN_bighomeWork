function $(id) {
    return document.getElementById(id);
}

let verifyCode = new GVerify({
    id: "picyzm",
    type: "blend"
})

function checkPasswordStrength(pwd) {
    if (pwd.length < 6 || /^[0-9]+$/.test(pwd) || /^[a-z]+$/.test(pwd) || /^[A-Z]+$/.test(pwd)) {
        return 'wp';
    }
    else if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(pwd)) {
        return 'sp';
    }
    else {
        return 'mp';
    }
}

let pid = 'wp';
function register(event) {
    event.preventDefault();
    $(pid).className = ''
    let frm = $('registerFrm');
    let user = $('regUser').value.trim();
    let pwd1 = $('regPwd1').value;
    let pwd2 = $('regPwd2').value;
    let vcode = frm.vcode.value.trim();
    let msg = "";

    // if (!/^[a-zA-Z][a-zA-Z0-9]{5,}$/.test(user)) {
    //     msg += "账号必须字母打头的6位字符！\n";
    // }

    pid = checkPasswordStrength(pwd1);
    $(pid).className = 'mark';
    if (pid === 'wp') {
        msg += "密码太弱！\n";
    }

    if (pwd1 !== pwd2) {
        msg += "两次密码输入不一致！\n";
    }

    if (!verifyCode.validate(vcode)) {
        msg += "校验码不正确！\n";
    }

    if (msg === "") {
        alert("注册成功！");
        // 注册成功跳转到聊天页面
        sessionStorage.setItem("chatLogin", "true");
        window.location.href = "chat.html";
    } else {
        alert(msg);
    }
}

$('registerFrm').addEventListener('submit', register);

$('registerFrm').resetBtn.addEventListener("click", function () {
    $(pid).className = '';
    pid = 'wp';
    verifyCode.refresh();
}, true)

// ========== 新增：表单切换功能 ==========
$('toRegBtn').onclick = function () {
    $('loginFrm').style.display = "none";
    $('registerFrm').style.display = "block";
    verifyCode.refresh(); //切换注册页刷新验证码
}
$('toLoginBtn').onclick = function () {
    $('registerFrm').style.display = "none";
    $('loginFrm').style.display = "block";
}

// 登录暂时不校验账号和密码，点击后直接进入聊天页面。
$('loginFrm').addEventListener('submit', function (event) {
    event.preventDefault();
    sessionStorage.setItem("chatLogin", "true");
    window.location.href = "chat.html";
});
