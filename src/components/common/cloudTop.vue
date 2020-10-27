<template>
    <Row>
        <Col span="5" class="nav_left">
            <svg class="icon index_cloud_icon" aria-hidden="true">
                <use xlink:href="#icon-wangyiyun"></use>
            </svg>
            <i>网易云音乐</i>
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
                <Input style="width: 250px" search placeholder="搜索音乐，视频，歌词，电台"/>
            </div>
        </col>
        <Col span="8">
            <div class="nav_right">
                <div class="user_login" @click="toLogin" v-if="!userInfo">
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="22"/>
                    <i>未登录</i>
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

    import {getLogin, getUserInfo, refresh, userLogout} from "../../network/home";

    export default {
        name: "cloudTop",
        data() {
            return {
                phone: '',
                pwd: '',
                //用户信息
                userInfo: []
            }
        },
        computed:{
            initInfo(){
                return this.$store.getters.userInfo
            }
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
            logout(){
                userLogout().then(res => {
                    if (res.code === 200){
                        this.$store.commit('logout')
                        this.$router.go(0)
                        this.userInfo = []
                        this.refresh()
                    }
                    console.log(res);
                });
            },
            //用户登录
            indexLogin() {
                this.getLogin()
            },
            //获取用户信息
            getLogin() {
                getLogin(this.phone, this.pwd).then(res => {
                    if (res.code === 200){
                        this.userInfo = res
                        this.$store.commit('setUserInfo', res)
                        this.getUserInfo()
                    }
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            //通过用户id获取用户信息
            getUserInfo() {
                getUserInfo(this.userInfo.profile.userId).then(res => {
                    console.log(res);
                });
            },
            //刷新登录
            refresh(){
                refresh().then(res =>{
                    console.log(res)
                })
            }
        },
        created() {
            this.userInfo = this.initInfo
            console.log(this.userInfo)
        }
    }
</script>

<style scoped lang="less">
    .nav_left {
        display: flex;
        align-items: center;

        i {
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
        span{
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

        i {
            margin-left: 6px;
            font-size: 13px;
            color: whitesmoke;
        }
    }
</style>