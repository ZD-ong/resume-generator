var app = new Vue({
    el: '#app',
    data: {
        resume: {
            name: '姓名',
            gender: '女',
            birthday: '1993年10月',
            jobTitle: '前端工程师',
            phone: '152xxxxxxxx',
            email: 'example@example.com'
        }
    },
    methods: {
        onEdit(key,value){
            this.resume[key] = value
        },
        onClicksave(){
            let currentUser = AV.User.current()
            if(!currentUser) {
                this.showLogin()
            }else{
                    this.saveResume()
                }
            // 声明类型
            let User = AV.Object.extend('User')
            // 新建对象
            let user = new User()
            // 设置名称
            user.set('name','工作')
            // 设置优先级
            user.set('priority',1)
            user.save().then(function (todo) {
                console.log('objectId is ' + todo.id)
            }, function (error) {
                console.error(error)
            })
        }
    }
})