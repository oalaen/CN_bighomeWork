
// 模拟数据
//所有用户列表
let userList = [
    { id: 1, name: "张三" ,unread:23},
    { id: 2, name: "李四" ,unread:64},
    { id: 3, name: "王五" ,unread:43},
    { id: 4, name: "陈六" ,unread:82},
    { id: 5, name: "赵七" ,unread:100},
    { id: 6, name: "林八" ,unread:999},
    { id: 7, name: "魏九" ,unread:24},
    { id: 8, name: "吴十" ,unread:1},
    { id: 9, name: "杨十一" ,unread:9}
];

//在线用户id数组
let onlineUser = [1, 5, 9, 7, 2];

function $(id) {
    return document.getElementById(id);
}

//先将所有已存用户逐行显示在sidebar中
function sidebarDisplay() {
    let sidebarHtml = "";
    userList.forEach(e => {
        let situation = 'offline';//在线状态，默认不在
        if (onlineUser.includes(e.id)) {//若在线
            situation = 'online';
        }
        //未读消息显示
        let unreadHtml = e.unread > 0 ? `<span class="unread-msg">${e.unread > 99 ? "99+" : e.unread}</span>` : "";
        sidebarHtml += `<div data-id="${e.id}" data-name="${e.name}" class="chooseUser">
                        <div class="username">${e.name}
                            <span class="situationDisplay-${situation}"></span>
                        </div>
                        ${unreadHtml}
                    </div>`;
    });
    $('user-sidebar').innerHTML = sidebarHtml;


}

//11.8更新
//头像底色，随便选定的，后续可以换成图片头像，或者直接在此处修改
const avatarColaors = ["#00aeec", "#ff7f50", "#7a9e7e", "#8a7fe3", "#e3708a", "#c8a45c", "#5a9bd4", "#8f8f8f", "#d4756b"]
let activeId = null;//当前打开的会话用户id

function escaperHtml(str) {//转义html标签
    //把所有特殊字符转为纯文本
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
/*根据提示写的，暂不确定是否真的有用 */
function avatarColor(id) {//根据用户id返回头像颜色
    return avatarColaors[id % avatarColaors.length];
}
//生成时间文本 格式为 “2026年11月8日 17:20”
function fullTimeLabel() {
    const d = new Date();
    const p = n => (n < 10 ? "0" + n : "" + n);
    return `${d.getFullYear()}年
    ${d.getMonth() + 1}月
    ${d.getDate()}日 ${p(d.getHours())}:
    ${p(d.getMinutes())}`
}
function dateOf(label) {
    return label.split(" ")[0];
}
//根据id号取某用户的聊天记录，没有就新建一个空对话
function getRecord(id) {
    if (!chatRecords[id]) {
        chatRecords[id] = [];
    }
    return chatRecords[id];
}

//重点！点击用户头像打开对应会话！
function openChat(id) {
    activeId = id;
    let user = userList.find(e => e.id === id);
    user.unread = 0;//打开会话后，未读消息清零,打开即为已读
    sidebarDisplay();//刷新侧边栏，清除未读消息提示
    $('chat-title').textContent = user.name;//显示当前会话用户的名字

    let input = $('msg-input');
    input.disabled = false;
    input.placehold = "请输入消息内容";
    input.value = "";
    updateCounter();//后面会写到这个，负责字数统计和发送按钮的状态
    renderMessages();
    input.focus();
}
//渲染消息列表，还没开始做
function renderMessages() {
    let list = getRecord(activeId);
}
//发送消息
function sendMessage() {
    if (activeId === null) {
        return;
    }
    let input = $('msg-input');
    let content = input.value.trim();
    if (!text) {
        return;
    }
    let record = getRecord(activeId);
    let now = fullTimeLabel();
    //如果上一条时间分隔不是今天，补一行新的时间
    let lastTimeMsg = null;
    for (let i = record.length - 1; i >= 0; i--) {
        if (record[i].time) {
            lastTimeMsg = record[i];
            break;
        }
    }
    if (!lastTimeMsg || dateOf(lastTimeMsg.time) !== dateOf(now)) {
        record.push({ time: now });
    }

    record.push({ from: 'me', text: text });

    input.value = "";
    updateCounter();
    renderMessages();
    input.focus();
}
// ========== 事件绑定 ==========

//左侧列表用事件委托，点击哪一项就打开哪一项
$('user-sidebar').addEventListener('click', e => {
    let item = e.target.closest('.chooseUser')  ;
    if (!item) {
        return;
    }
    openChat(Number(item.dataset.id));
});

//初始化
sidebarDisplay();