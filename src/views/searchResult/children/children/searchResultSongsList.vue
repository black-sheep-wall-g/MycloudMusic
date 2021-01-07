<template>
    <Table stripe :columns="columns" :data="dataList" width="820">
        <template slot-scope="{ row, index }" slot="name">
            <span class="ivu-table-cell-tooltip-content">
                <span>{{'0'+(index+1)}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xihuan"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-46"></use>
                </svg>
                <span>{{ row.name }}</span>
            </span>
        </template>
    </Table>
</template>

<script>
    export default {
        name: "searchResultSongsList",
        data() {
            return {
                songsList: [],
                columns: [
                    {
                        title: '音乐标题',
                        key: 'name',
                        slot: "name",
                        width: 350,
                        tooltip: true
                    },
                    {
                        title: '歌手',
                        key: 'singer',
                        width: 120,
                        tooltip: true
                    },
                    {
                        title: '专辑',
                        key: 'album',
                        width: 150,
                        tooltip: true
                    },
                    {
                        title: '时长',
                        key: 'times',
                        width: 80
                    },
                    {
                        title: '热度',
                        key: 'heat',
                        width: 120
                    }
                ],
                dataList: []
            }
        },
        props: {
            searchResult: {
                type: Object,
                default: {}
            }
        },
        watch: {
            searchResult() {
                this.init();
                this.getSongs();
            }
        },
        methods: {
            init() {
                this.songsList = this.searchResult;
                console.log(this.songsList);
            },
            getSongs() {
                this.dataList = this.songsList.songs.map(item => {
                    return {
                        name: item.name,
                        singer: item.ar[0].name,
                        album: item.al.name,
                        times: Math.floor((item.dt % 3600000) / 60000) + ':' + Math.floor((item.dt % 60000) / 1000),
                        heat: item.pop,
                        id: item.id
                    };
                })
            }
        }
    }
</script>

<style scoped type="less">

</style>