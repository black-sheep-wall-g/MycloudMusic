<template>
    <div style="height: 400px;">
        <div class="search_history_card">
            <div class="search_history_title">
                <svg class="icon" aria-hidden="true" style="font-size: 12px;">
                    <use xlink:href="#icon-yinle"></use>
                </svg>
                <p>{{title}}</p>
            </div>
            <div class="search_history_body">
                <p v-for="(item,index) in content" :key="index">{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cloudCard",
        props:{
            title:String,
            content:Array
        }
    }
</script>

<style scoped lang="less">
    .search_history_card {
        color: whitesmoke;

        .search_history_title {
            background-color: salmon;
            display: flex;
            padding: 2px 0;

            svg {
                margin: auto 5px auto 10px;
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