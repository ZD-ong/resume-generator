var app = new Vue({
    el: '#app',
    data: {
        loginVisible: false,
        signUpVisible: false,
        shareVisible: false,
        previewUser: {objectId: undefined},
        previewResume: {

        },
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
            email: 'example@example.com',
            skills: [
                {name: '请填写技能名称', description: '请填写技能描述'},
                {name: '请填写技能名称', description: '请填写技能描述'},
                {name: '请填写技能名称', description: '请填写技能描述'},
                {name: '请填写技能名称', description: '请填写技能描述'}
            ],
            projects: [
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键字', description: '请填写项目描述'},
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键字', description: '请填写项目描述'},
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键字', description: '请填写项目描述'}
            ]
        },
        login: {
            email: '',
            password: ''
        },
        signUp: {
            email:'',
            password: ''
        },
        shareUrl: 'http://xxxxxxxx',
        mode: 'edit' //preview
    },
    computed: {
        displayResume(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
    watch: {
        'currentUser.objectId': function(newValue,oldValue){
            if(newValue){
                this.getResume(this.currentUser)
            }
        }
    },
    methods: {
        onEdit(key,value){
            let regex = /\[(\d+)\]/g
            key = key.replace(regex,(match, number)=> `.${number}`)
            //key = skills.0.name
            keys = key.split('.')
            let result = this.resume
            for(var i =0; i < keys.length; i++){
                if(i === keys.length - 1){
                    result[keys[i]] = value
                }else {
                    result = result[keys[i]]
                }
                // result = this.resume
                // keys = ['skills', '0', 'name']
                // i = 0 result === result['skills] === this.resume.skills
                // i = 1 result === result['0'] === this.resume.skills.0
                // i = 2 result === result['name'] === this.resume.skills.0.name
                // result = this.resume.['skills']['0']['name']
            }
            result = value // this.resume.['skills']['0']['name'] = value
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
        getResume(user){
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                // 成功获得实例

                let resume = user.toJSON().resume
                return resume
                // 逐个赋值
                // Object.assign(this.resume, resume)
            }, (error) => {
                // 异常处理
            });
        },
        addSkill(){
            this.resume.skills.push({name: '请填写技能名称', description: '请填写技能描述'})
        },
        removeSkill(index){
            // 删除 skills[index]
            this.resume.skills.splice(index, 1)
        },
        addProject(){
            this.resume.projects.push({name: '请填写项目名称', link: 'http://...', keywords: '请填写关键字', description: '请填写项目描述'})
        },
        removeProject(index){
            // 删除 projects[index]
            this.resume.projects.splice(index, 1)
        },
        print(){
            window.print()
        }
    }
})


// 获取当前用户
let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
    app.shareUrl = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    console.log('2:' + app.currentUser.objectId)
    app.getResume(app.currentUser).then(resume => {
        app.resume = resume
    })

}

// 获取预览用户的id
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if(matches){
    userId = matches[1]
    app.mode = 'preview'
    console.log('1:' + userId)
    app.getResume({objectId: userId}).then(resume => {
        app.previewResume = resume
    })
}