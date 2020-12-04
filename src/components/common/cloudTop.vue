<template>
    <Row>
        <Col span="5" class="nav_left">
            <svg class="icon index_cloud_icon" aria-hidden="true">
                <use xlink:href="#icon-wangyiyun"></use>
            </svg>
            <p>网易云音乐</p>
        </Col>
        <Col span="10">
            <div class="nav_center">
                <div class="nav_go">
                    <span>
                         <svg class="icon index_cloud_icon" aria-hidden="true" @click="back()">
                            <use xlink:href="#icon-mjiantou-copy"></use>
                         </svg>
                    </span>
                    <span>
                        <svg class="icon index_cloud_icon" aria-hidden="true" @click="go_forward()">
                            <use xlink:href="#icon-arrow-l"></use>
                        </svg>
                    </span>
                </div>
                <Input style="width: 250px"
                       placeholder="搜索音乐，视频，歌词，电台"
                       icon="ios-search"
                       v-model="searchData"
                       @on-enter="search"
                       @on-change="getSearchSuggest(searchData)"
                       @on-focus="modal1 = modal2 = true"
                       @on-click="search"
                />
                <Modal
                        v-model="modal1"
                        :closable="false"
                        :scrollable="true"
                        :mask-closable="true"
                        width="355"
                        :footer-hide="true"
                        :transfer="false"
                        v-if="!searchData"
                >
                   <div style="padding: 16px">
                       <div class="search_modal">
                           <div class="search_history" v-if="searchHistoryList.length !== 0">
                               <div class="search_history_top">
                                   <div class="search_history_left">
                                       <p>搜索历史</p>
                                       <svg class="icon" aria-hidden="true" font-size="15px" @click="clearSearchList">
                                           <use xlink:href="#icon-lajitong"></use>
                                       </svg>
                                   </div>
                                   <div class="search_history_right" @click="lookAllSearchList">
                                       查看全部
                                   </div>
                               </div>
                               <ul class="search_history_btm" ref="search_history_btm">
                                   <li v-for="(item,index) in searchHistoryList" :key="index">
                                       {{item}}
                                       <svg class="icon" aria-hidden="true" font-size="16px" @click="delSearchItem(index)">
                                           <use xlink:href="#icon-del"></use>
                                       </svg>
                                   </li>
                               </ul>
                           </div>
                           <div class="hot_search">
                               <div class="hot_search_head">热搜榜</div>
                               <div class="hot_search_content">
                                   <ul class="hot_search_list">
                                       <li v-for="(item,index) in hotList" :key="index" @click="hotListSongs(item)">
                                           <div class="hot_search_list_order" :class="index + 1 <= 3 ? 'active_index' :''">{{index+1}}</div>
                                           <div class="hot_search_list_content">
                                               <div class="list_top">
                                                   <span class="list_title">{{item.searchWord}}</span>
                                                   <img :src="item.iconUrl" alt="" v-if="item.iconUrl">
                                                   <span class="list_score">{{item.score}}</span>
                                               </div>
                                               <div class="list_btm">
                                                   {{item.content}}
                                               </div>
                                           </div>
                                       </li>
                                   </ul>
                               </div>
                           </div>
                       </div>
                   </div>
                </Modal>
                <Modal
                        v-if="searchData"
                        v-model="modal2"
                        width="355"
                        :closable="false"
                        :footer-hide="true"
                        :styles="{'height':'400px'}"
                >
                    <p class="search_about" v-html="`搜索&quot;<a style='color:red;'>`+searchData+`</a>&quot;相关的结果 >`"></p>
                    <cloud-card v-for="(item,index) in suggestList" :key="index" :title="item[0].title" :content="item" :search-data="searchData"></cloud-card>
                </Modal>
            </div>
        </col>
        <Col span="8">
            <div class="nav_right">
                <div class="user_login" @click="toLogin" v-if="!userInfo">
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="22"/>
                    <p>未登录</p>
                    <Icon type="ios-arrow-down"></Icon>
                </div>
                <div v-else>
                    <Avatar :src="userInfo.profile.avatarUrl"/>
                    <Dropdown trigger="click" style="margin-left: 15px">
                        <a href="javascript:void(0)" @click="logout">
                            {{userInfo.profile.nickname}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>驴打滚</DropdownItem>
                            <DropdownItem>炸酱面</DropdownItem>
                            <DropdownItem>豆汁儿</DropdownItem>
                            <DropdownItem>冰糖葫芦</DropdownItem>
                            <DropdownItem>北京烤鸭</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </col>
    </Row>
</template>

<script>


    import {getHotList, getLogin, getSearch, refresh, suggest, userLogout} from "../../network/cloudTop";
    import CloudCard from "./cloudCard";


    export default {
        name: "cloudTop",
        components: {CloudCard},
        data() {
            return {
                phone: '',
                pwd: '',
                //用户信息
                userInfo: [],
                //搜索历史模态框
                modal1: false,
                //搜索模态框
                modal2:false,
                //热搜列表数据
                hotList: [],
                //搜索框数据
                searchData:'',
                //搜索历史记录
                searchHistoryList:[],
                //搜索建议
                suggestList: [],
                //网页更新次数
                address: 0,
                //是否点击后退按钮
                bcakFlag: false
            }
        },
        computed: {
            //用户登录信息
            initInfo() {
                return this.$store.getters.userInfo
            }
        },
        methods: {
            //搜索框历史信息
            searchHistory() {
                //获取本地搜索数据
                if (localStorage.getItem('searchData')){
                    return localStorage.getItem('searchData').split(",")
                }
            },
            // 用户登录操作
            toLogin() {
                const _this = this;
                this.$Modal.confirm({
                    render: (h) => {
                        return h('div', [
                            h('Input', {
                                props: {
                                    autofocus: true,
                                    placeholder: '请输入电话号码'
                                },
                                style: {
                                    margin: '0 0 15px 0'
                                },
                                on: {
                                    input: (val) => {
                                        this.phone = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: _this.pwd,
                                    autofocus: true,
                                    placeholder: '请输入密码',
                                    type: "password",
                                    password: true
                                },
                                on: {
                                    input: (val) => {
                                        this.pwd = val;
                                    },
                                    'on-keyup': function (enter) {
                                        if (enter.keyCode === 13) {
                                            _this.indexLogin()
                                            _this.$Modal.remove()
                                        }
                                    }
                                }
                            })
                        ])
                    },
                    okText: '登录',
                    onOk() {
                        _this.indexLogin()
                    }
                })
            },
            //退出登录
            logout() {
                userLogout().then(res => {
                    if (res.code === 200) {
                        this.$store.commit('logout')
                        this.$router.go(0)
                        this.userInfo = []
                        this.refresh()
                    }
                });
            },
            //用户登录
            indexLogin() {
                this.getLogin()
            },
            //获取用户信息
            getLogin() {
                getLogin(this.phone, this.pwd).then(res => {
                    if (res.code === 200) {
                        this.userInfo = res
                        this.$store.commit('setUserInfo', res)
                        this.getUserInfo()
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //刷新登录
            refresh() {
                refresh().then(res => {
                    console.log(res)
                })
            },
            //获取热搜列表详情
            getHotList() {
                getHotList().then(res => {
                    if (res.code === 200) {
                        this.hotList = res.data
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //搜索框搜索功能
            search(){
                //去空格
                this.searchData = this.searchData.trim();
                if (this.searchData !== ''){
                    this.$store.commit('setSearchData', this.searchData);
                    this.searchHistoryList = this.searchHistory();
                }
                // 关闭模态框
                this.$Modal.remove();
                //跳转到搜索结果页
                this.$router.push({path:'/SearchResult',query: {searchResult:this.searchData}})
                //获取搜索完成后列表并跳转页面
                getSearch(this.searchData).then(res => {
                    if (res.code === 200) {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //赋值本地历史数据
            assignLocalStorage(){
                if (this.searchHistory()){
                    this.searchHistoryList = this.searchHistory();
                    this.$store.state.searchDataList = this.searchHistory();
                }else {
                    this.$store.state.searchDataList = [];
                }
            },
            //点击删除搜索历史记录
            delSearchItem(index){
                this.searchHistoryList.splice(index,1);
                localStorage.setItem('searchData',this.searchHistoryList);
                this.assignLocalStorage();
            },
            //清空搜索历史记录
            clearSearchList(){
                this.searchHistoryList = [];
                localStorage.removeItem('searchData');
                this.assignLocalStorage();
            },
            //点击查看全部搜索历史记录
            lookAllSearchList(){
                this.$refs.search_history_btm.style.height = 'unset';
            },
            //搜索建议
            getSearchSuggest(keywords,type){
                if (keywords){
                    this.modal2 = true;
                    const _this = this;
                    suggest(keywords,type).then(res => {
                        if (res.code === 200) {
                            delete (res.result['order']);
                            let suggestList = [];
                            for (const item in res.result) {
                                let array = [];
                                for (const item1 of (res.result)[item]) {
                                    let obj = {
                                        title : item,
                                        id : item1.id,
                                        content:item1.name,
                                        artist:item !== 'albums' ? '' : item1.artist.name
                                    }
                                    array.push(obj);
                                }
                                suggestList.push(array);
                            }
                            _this.suggestList = suggestList;
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },
            //点击热搜歌曲
            hotListSongs(item){
                console.log(item)
            },
            //返回上一个页面
            back(){
                this.bcakFlag = true;
                this.address--;
                console.log(this.address)
                this.address < 0 ? this.$router.go(0) : this.$router.go(-1);
                console.log(this.$router)
            },
            //前进页面
            go_forward(){
                this.$router.go(1);
            }
        },
        watch:{
            // 监听路由跳转。
            $route(newRoute, oldRoute) {
                console.log('watch', newRoute, oldRoute)
                if (this.bcakFlag){
                    this.bcakFlag = false
                }else {
                    this.address++;
                }
            }
        },
        created() {
            this.userInfo = this.initInfo;
            this.assignLocalStorage();
            this.getHotList();
        }
    }
</script>
<style scoped lang="less">
    .active_index{
        color: #d83e3e;
    }
    //遮罩层
    /deep/ .ivu-modal-mask{
        background-color: rgba(55,55,55,0);
    }
    //弹出框
    /deep/ .ivu-modal {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        height: 450px;
        top: 50px;
        right: 70px;
        overflow-y: overlay;

        .ivu-modal-content {
            background-color: #363636;
            border-radius: 5px;
            overflow: hidden;
            .ivu-modal-body{
                padding: 0;
            }
        }

        &::-webkit-scrollbar {
            width: 5px;
            background-color: #363636;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.2);
        }
    }


    .ivu-modal-content-no-mask {

    }

    .nav_left {
        display: flex;
        align-items: center;

        p {
            margin-left: 5px;
            color: aquamarine;
            font-size: 20px;
        }
    }

    .nav_center {
        display: flex;
        align-items: center;
    }

    .search_about{
        color: #7b7b7b;
        padding:5px 10px;
        cursor:pointer;
        &:hover{
            color: #b8b8b8;
        }
    }

    .nav_go {
        display: flex;
        margin-right: 20px;
        height: 60px;

        span {
            margin-left: 10px;

            svg {
                border: 1px solid #324166;
                border-radius: 11px;
                color: white;
                background-color: #1f1f22;
                padding: 2px;
                font-size: 22px;
            }
        }
    }

    .index_cloud_icon {
        font-size: 40px;
    }

    .user_login {
        height: 60px;
        width: 90px;
        cursor: pointer;
        display: -webkit-inline-box;

        p {
            margin-left: 6px;
            font-size: 13px;
            color: whitesmoke;
        }

        i {
            margin-left: 6px;
            font-size: 13px;
            color: whitesmoke;
        }
    }

    .search_modal {
        .search_history {
            .search_history_top {
                display: flex;
                justify-content: space-between;
                margin-right: 5px;
                font-size: 14px;
                color: #7b7b7b;

                .search_history_left {
                    display: flex;

                    svg {
                        margin: 2px 0 0 5px;
                    }
                }

                .search_history_right {

                }
            }

            .search_history_btm {
                height: 72px;
                overflow: hidden;
                li {
                    display: inline-block;
                    position: relative;
                    font-size: 12px;
                    text-align: center;
                    padding: 3px 14px;
                    background-color: #363636;
                    color: whitesmoke;
                    border: 1px solid #4b4b4b;
                    border-radius: 12px;
                    margin: 5px;
                    min-width: 40px;
                    &:hover{
                        svg{
                            opacity: 1;
                        }
                    }
                    svg{
                        position: absolute;
                        top: 4px;
                        right: 1px;
                        opacity: 0;
                        transition: all 0.5s;
                    }
                }
            }
        }

        .hot_search {
            .hot_search_head {
                margin: 5px 0;
                font-size: 14px;
                color: #7b7b7b;
            }

            .hot_search_content {
                .hot_search_list {
                    li {
                        list-style: none;
                        display: flex;
                        margin: 15px 0;
                        cursor:pointer;

                        .hot_search_list_order {
                            padding: 10px 0;
                            font-size: 17px;
                            width: 30px;
                        }

                        .hot_search_list_content {
                            .list_top {
                                margin-bottom: 2px;
                                .list_title{
                                    color: whitesmoke;
                                    margin-right: 8px;
                                }
                                .list_score{
                                    margin-left: 5px;
                                }
                                img {
                                    height: 13px;
                                }
                            }

                            .list_btm {
                                font-size: 14px;
                                color: #7b7b7b;
                            }
                        }
                    }
                }
            }
        }
    }
</style>