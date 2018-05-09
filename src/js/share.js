Vue.component('share',{
    props: ['shareUrl'],
    template: `
    <div class="share" v-cloak>
        <p>分享链接：</p>
        <div>
            <textarea readonly>{{shareUrl}}</textarea>
        </div>
    </div>`,
    data(){
        return {

        }
    },
    methods: {

    }
})