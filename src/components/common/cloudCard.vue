<template>
    <div class="search_history_card">
        <div class="search_history_title">
            <svg class="icon" aria-hidden="true" style="font-size: 12px;">
                <use :xlink:href="'#' + iconHref"></use>
            </svg>
            <p>{{titleData}}</p>
        </div>
        <div class="search_history_body">
            <p v-for="(item,index) in content" :key="index" v-html="item.content.replace(new RegExp(searchData, 'i'), `<span style=\'color:red\'>${(item.content.match(new RegExp(searchData, 'gi')))}</span>`)">{{}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cloudCard",
        data(){
            return{
                titleData : '',
                iconHref : ''
            }
        },
        props:{
            title:String,
            content:Array,
            searchData:String
        },
        methods:{
            updateTitle(){
                switch(this.title) {
                    case 'albums':
                        this.titleData = '专辑';
                        this.iconHref = 'icon-changpian';
                        break
                    case 'artists':
                        this.titleData = '歌手';
                        this.iconHref = 'icon-renwu';
                        break
                    case 'songs':
                        this.titleData = '单曲';
                        this.iconHref = 'icon-yinle';
                        break
                    case 'playlists':
                        this.titleData = '歌单';
                        this.iconHref = 'icon-gedan';
                        break
                }
                // searchData
            }
        },
        created() {
            console.log(this.title);
            this.updateTitle();
        },
        updated() {
            this.updateTitle();
        }
    }
</script>

<style scoped lang="less">
    .search_history_card {
        color: whitesmoke;

        .search_history_title {
            background-color: #515a6e;
            display: flex;
            padding: 2px 0;

            svg {
                margin: 4px 5px 0 10px;
            }

            p {
            }
        }

        .search_history_body {
            padding: 5px 27px;

            p {
                padding: 4px 0;
            }
        }
    }

</style>