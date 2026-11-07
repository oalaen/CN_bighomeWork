
// 模拟数据
//所有用户列表
let userList = [
    {id:1 , name:"张三" },
    {id:2 , name:"李四" },
    {id:3 , name:"王五" },
    {id:4 , name:"陈六" },
    {id:5 , name:"赵七" },
    {id:6 , name:"林八" },
    {id:7 , name:"魏九" },
    {id:8 , name:"吴十" },
    {id:9 , name:"杨十一" }
];

//在线用户id数组
let onlineUser = [1,5,9,7,2];

function $(id){
    return document.getElementById(id);
}

//先将所有已存用户逐行显示在sidebar中
function sidebarDisplay(){
    let sidebarHtml = "";
    userList.forEach(e => {
        let situation = 'offline';//在线状态，默认不在
        if(onlineUser.includes(e.id)){//若在线
            situation = 'online';
        }
        sidebarHtml += `<div class="chooseUser">
                        <div class="username">${e.name}
                            <span class="situationDisplay-${situation}"></span>
                        </div>
                        <span class="unread-msg"></span>
                    </div>`;
    });
    $('user-sidebar').innerHTML = sidebarHtml;


}

sidebarDisplay();