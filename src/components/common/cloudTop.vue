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
                         <svg class="icon index_cloud_icon" aria-hidden="true">
                            <use xlink:href="#icon-mjiantou-copy"></use>
                         </svg>
                    </span>
                    <span>
                        <svg class="icon index_cloud_icon" aria-hidden="true">
                            <use xlink:href="#icon-arrow-l"></use>
                        </svg>
                    </span>
                </div>
                <Input style="width: 250px"
                       placeholder="搜索音乐，视频，歌词，电台"
                       suffix="ios-search"
                       v-model="searchData"
                       @on-enter="search"
                       @on-focus="modal1 = true"/>
                <Modal
                        v-model="modal1"
                        :closable="false"
                        :scrollable="true"
                        :mask-closable="true"
                        width="355"
                        :footer-hide="true"
                        :transfer="false"
                >
                    <div class="search_modal">
                        <div class="search_history">
                            <div class="search_history_top">
                                <div class="search_history_left">
                                    <p>搜索历史</p>
                                    <svg class="icon" aria-hidden="true" font-size="17px">
                                        <use xlink:href="#icon-lajitong"></use>
                                    </svg>
                                </div>
                                <div class="search_history_right">
                                    查看全部
                                </div>
                            </div>
                            <ul class="search_history_btm">
                                <li v-for="(item,index) in searchHistory" :key="index">{{item}}</li>
                            </ul>
                        </div>
                        <div class="hot_search">
                            <div class="hot_search_head">热搜榜</div>
                            <div class="hot_search_content">
                                <ul class="hot_search_list">
                                    <li v-for="(item,index) in hotList" :key="index">
                                        <div class="hot_search_list_order" :class="index+1 <= 3 ? 'active_index' :''">{{index+1}}</div>
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


    import {getHotList, getLogin, refresh, userLogout} from "../../network/cloudTop";

    export default {
        name: "cloudTop",
        data() {
            return {
                phone: '',
                pwd: '',
                //用户信息
                userInfo: [],
                //搜索模态框
                modal1: false,
                //热搜列表数据
                hotList: [],
                //搜索框数据
                searchData:'',
                //搜索历史记录
                searchHistoryList:[]
            }
        },
        computed: {
            //用户登录信息
            initInfo() {
                return this.$store.getters.userInfo
            },
            //搜索框历史信息
            searchHistory() {
                return this.$store.getters.searchData
            }
        },
        watch:{

        },
        methods: {
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
                this.searchData = this.searchData.trim()
                if (this.searchData !== ''){
                    this.$store.commit('setSearchData', this.searchData)
                    this.searchHistoryList = this.searchHistory
                }
            }
        },
        created() {
            this.userInfo = this.initInfo
            this.searchHistoryList = this.searchHistory
            this.getHotList()
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
                li {
                    display: inline-block;
                    padding: 5px 10px;
                    background-color: aquamarine;
                    border-radius: 15px;
                    margin: 5px;
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