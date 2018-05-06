var app = new Vue({
    el: '#app',
    data: {
        loginVisible: false,
        signUpVisible: false,
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
        onClickSave(){
            let currentUser = AV.User.current()
            if(!currentUser) {
                this.showLogin()
            }else{
                this.saveResume()
            }
        },
        saveResume(){

        }
    }
})
