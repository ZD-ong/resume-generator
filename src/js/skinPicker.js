Vue.component('skinPicker',{
    template: `
        <div class="skinPicker" v-cloak>
            <button @click="setTheme('default')">默认</button>
            <button @click="setTheme('dark')">酷黑</button>
        </div>`,
    data(){
        return {

        }
    },
    methods: {
        setTheme(name){
            this.$emit('xxx', name)
        }
    }
})