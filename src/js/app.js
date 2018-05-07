var app = new Vue({
    el: '#app',
    data: {
        loginVisible: false,
        signUpVisible: false,
        currentUser: {
            objectId: '',
            email: ''
        },
        resume: {
            name: '姓名',
            gender: '女',
            birthday: '1993年10月',
            jobTitle: '前端工程师',
            phone: '152xxxxxxxx',
            email: 'example@example.com'
        },
        login: {
            email: '',
            password: ''
        },
        signUp: {
            email:'',
            password: ''
        }
    },
    methods: {
        onEdit(key,value){
            this.resume[key] = value
        },
        hasLogin(){
          return !!this.currentUser.objectId
        },
        onLogin(){
            AV.User.logIn(this.login.email, this.login.password).then((user) => {
                user = user.toJSON()
                this.currentUser = {
                    objectId: user.objectId,
                    email: user.email
                }
                this.loginVisible = false
            }, (error) => {
                if(error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210){
                    alert('邮箱和密码不匹配')
                }
            })
        },
        onLogout(){
            AV.User.logOut()
            alert('注销成功！')
            window.location.reload()
        },
        onSignUp(e){
            // 新建 AVUser 对象实例
            const user = new AV.User();
            // 设置用户名
            user.setUsername(this.signUp.email)
            // 设置密码
            user.setPassword(this.signUp.password)
            // 设置邮箱
            user.setEmail(this.signUp.email)
            // 注册成功直接登录
            user.signUp().then((user) => {
                alert('注册成功！')
                user = user.toJSON()
                this.currentUser = {
                    objectId: user.objectId,
                    email: user.email
                }
                // 关闭注册窗口
                this.signUpVisible = false
            }, (error) => {
                alert(error.rawMessage)
            });
        },
        onClickSave(){
            let currentUser = AV.User.current()
            if(!currentUser) {
                this.loginVisible = true
            }else{
                this.saveResume()
            }
        },
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            // 第一个参数是 className，第二个参数是 objectId
            let user = AV.Object.createWithoutData('User', objectId)
            // 修改属性
            user.set('resume', this.resume)
            // 保存到云端
            user.save().then(()=>{
                alert('保存成功！')
            },()=>{
                alert('保存失败。。。')
            })
        },
        getResume(){
            var query = new AV.Query('User');
            query.get(this.currentUser.objectId).then((user) => {
                // 成功获得实例

                let resume = user.toJSON().resume
                this.resume = resume
            }, (error) => {
                // 异常处理
            });
        }
    }
})

let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
    app.getResume()
}