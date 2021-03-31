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
                <Input
                        name="search"
                        style="width: 250px"
                        placeholder="搜索音乐，视频，歌词，电台"
                        icon="ios-search"
                        v-model="searchData"
                        @on-enter="search"
                        @on-change="getSearchSuggest(searchData)"
                        @on-focus="[modal1 = modal2 = true,getSearchSuggest(searchData)]"
                        @on-click="search"
                        ref="aaa"
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
                        class-name="hotList"
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
                                   <li v-for="(item,index) in searchHistoryList" :key="index" @click="searHistory(item)">
                                       {{item}}
                                       <svg class="icon" aria-hidden="true" font-size="16px" @click.stop="delSearchItem(index)">
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
                        class-name="hotList"
                >
                    <p class="search_about" v-html="`搜索&quot;<a style='color:red;'>`+searchData+`</a>&quot;相关的结果 >`"></p>
                    <cloud-card v-for="(item,index) in suggestList" :key="index" :title="item[0].title" :content="item" :search-data="searchData"></cloud-card>
                </Modal>
                <Modal class-name="hotList" v-model="modalDelete" width="350">
                    <div style="text-align:center;height: 100px;line-height: 100px;font-size: 18px;color: orangered">
                        <Icon type="ios-information-circle"></Icon>
                        <span>是否删除全部搜索记录</span>
                    </div>
                    <div slot="footer">
                        <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>
                    </div>
                </Modal>
            </div>
        </col>
        <Col span="8">
            <div class="nav_right">
                <div class="user_login" @click="toLogin" v-if="this.getuserInfo.account === null">
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="22"/>
                    <p>未登录</p>
                    <Icon type="ios-arrow-down"></Icon>
                    <Modal :footer-hide="true" style="position:relative;" v-model="toLoginModel" width="350" class-name="login_modal">
                        <div v-if="qrFlag" style="text-align: center;margin-top: 76px">
                            <div style="font-size: 28px;">扫码登录</div>
                            <div v-if="qrScanFlag">
                                <img width="260" src="~assets/img/phoneLogin.png" alt="">
                                <div style="margin: 10px 0 30px 0;color: #999999;">扫描成功</div>
                                <div style="margin-bottom: 100px;">请在手机上确认登录</div>
                            </div>
                            <div v-else>
                                <img width="180" height="180" :src="qrimg" alt="">
                                <div class="qrFail" v-if="qrFailFlag">
                                    <div class="qrFailText">二维码已失效</div>
                                    <div class="qrFailBtn" @click="toLogin">点击刷新</div>
                                </div>
                                <div>使用<a>网易云音乐APP</a>扫码登录</div>
                                <div @click="qrFlag = false" style="color:#666666;cursor: pointer;">选择其他登录模式></div>
                            </div>
                        </div>
                        <div v-else>
                            <div style="position:relative;top: -11px;left: -11px;">
                                <img width="50" src="~assets/img/qrImg.png" alt="">
                                <div class="qrChange" @click="qrFlag = true"></div>
                                <div class="qrChangeMal">
                                    <div class="leftTop"></div>
                                    <div class="qrChangeTitle">扫码登录更安全</div>
                                </div>
                            </div>
                            <div style="text-align: center">
                                <img width="260" src="~assets/img/phoneLogin.png" alt="">
                                <Input v-model="phone" name="phone" type="tel" placeholder="请输入手机号" style="width: 260px;margin-bottom: 5px;">
                                    <svg slot="prefix" class="icon login_icon" aria-hidden="true">
                                        <use xlink:href="#icon-shouji"></use>
                                    </svg>
                                </Input>
                                <Input v-model="pwd" name="pwd" autocomplete="off" @on-focus="$event.target.type = 'password'" @on-enter="phoneLogin" placeholder="请输入密码" style="width: 260px">
                                    <svg slot="prefix" class="icon login_icon" aria-hidden="true">
                                        <use xlink:href="#icon-suo"></use>
                                    </svg>
                                </Input>
                                <div class="login" @click="phoneLogin">登录</div>
                                <div class="login register"><u>注册</u></div>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div v-else>
                    <Avatar :src="Object.keys(getuserInfo).length === 0 ? '' : getuserInfo.profile.avatarUrl"/>
                    <Dropdown trigger="click" style="margin-left: 15px">
                        <a href="javascript:void(0)">
                            {{Object.keys(getuserInfo).length === 0 ? '': getuserInfo.profile.nickname}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem><span @click="logout">登出</span></DropdownItem>
                            <DropdownItem><span @click="">北方的及</span></DropdownItem>
                            <DropdownItem><span @click="">北方的及</span></DropdownItem>
                            <DropdownItem><span @click="">北方的及</span></DropdownItem>
                            <DropdownItem><span @click="">北方的及</span></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </col>
    </Row>
</template>

<script>


    import {
        getHotList,
        getLogin,
        getQrKeyLogin,
        getQrLogin,
        getQrState,
        getSearch,
        getUserStatus,
        refresh,
        suggest,
        userLogout
    } from "../../network/cloudTop";
    import CloudCard from "./cloudCard";
    import {mapGetters} from "vuex";


    export default {
        name: "cloudTop",
        components: {CloudCard},
        data() {
            return {
                phone: '',
                pwd: '',
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
                bcakFlag: false,
                //删除全部历史记录模态框
                modalDelete:false,
                //记载状态模态框
                modal_loading: false,
                //登录模态框
                toLoginModel: false,
                //二维码key
                qrKey:'',
                //二维码图片base64编码
                qrimg:'',
                //二维码展示
                qrFlag:true,
                //二维码扫描是否成功
                qrScanFlag:false,
                //二维码是否过期
                qrFailFlag:false
            }
        },
        computed: {
            //用户登录信息
            ...mapGetters(['getuserInfo'])
        },
        watch:{
            // 监听路由跳转。
            $route() {
                if (this.bcakFlag){
                    this.bcakFlag = false
                }else {
                    this.address++;
                }
            },
            getuserInfo(valuer){
                console.log(valuer)
            }
        },
        methods: {
            //渲染数据
            init(){
                this.assignLocalStorage();
                this.getUserStatus();
                this.getHotList();
            },
            //搜索框历史信息
            searchHistory() {
                //获取本地搜索数据
                if (localStorage.getItem('searchData')){
                    return localStorage.getItem('searchData').split(",")
                }
            },
            // 用户登录操作,二维码登录
            toLogin() {
                this.toLoginModel = true;
                this.qrFlag = true;
                this.qrFailFlag = false;
                this.qrScanFlag = false;
                this.phone = '';
                this.pwd = '';
                const _this = this;
                let timer;
                this.getqrKey();
                timer = setInterval(async() => {
                    if(!this.toLoginModel){
                        clearInterval(timer);
                    }
                    let qrState = await _this.getQrState(_this.qrKey);
                    if (qrState.code === 800){
                        _this.qrFailFlag = true;
                        clearInterval(timer);
                    }
                    if (qrState.code === 802){
                        _this.qrScanFlag = true;
                    }
                    if (qrState.code === 803){
                        clearInterval(timer);
                        _this.getUserStatus();
                        _this.$Modal.remove();
                    }
                },3000);
            },
            //手机登录
            phoneLogin(){
                this.toLoginModel = false;
                this.getLogin();
            },
            //退出登录
            logout() {
                this.toLoginModel = false;
                userLogout().then(res => {
                    if (res.code === 200) {
                        this.getUserStatus();
                        this.$Modal.remove();
                    }
                });
            },
            //获取用户信息
            getLogin() {
                getLogin(this.phone, this.pwd).then(res => {
                    if (res.code === 200) {
                        this.$store.commit('setUserInfo', res);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //二维码key
            getqrKey(){
              getQrKeyLogin().then(res => {
                  if (res.code === 200){
                      this.qrKey = res.data.unikey;
                      this.getQrLogin(this.qrKey,true);
                  }
              })
            },
            //二维码生成接口
            getQrLogin(key,qrimg){
                getQrLogin(key,qrimg).then(res => {
                    this.qrimg = res.data.qrimg;
                })
            },
            //二维码状态检验
            getQrState(key){
               return getQrState(key).then(res => res)
            },
            //用户等登录状态
            getUserStatus(){
                getUserStatus().then(res => {
                    console.log(res.data)
                    this.$store.commit('setUserInfo', res.data);
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
                    // 关闭模态框
                    this.modal2 = false;
                    //跳转到搜索结果页
                    this.$router.push({name:'SearchResult',params:this.searchData})
                    //获取搜索完成后列表并跳转页面
                    getSearch(this.searchData).then(res => {
                        if (res.code === 200) {
                            this.$store.commit('setSearchResult', res);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
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
            //点击搜素历史进行搜索
            searHistory(item){
                this.searchData = item;
                this.search()
            },
            //点击删除搜索历史记录
            delSearchItem(index){
                this.searchHistoryList.splice(index,1);
                localStorage.setItem('searchData',this.searchHistoryList);
                this.assignLocalStorage();
            },
            //是否清空搜索历史记录
            clearSearchList(){
                this.modalDelete = true;

            },
            //清空搜索历史记录
            del () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.searchHistoryList = [];
                    localStorage.removeItem('searchData');
                    this.assignLocalStorage();
                    this.modal_loading = false;
                    this.modalDelete = false;
                    this.$Message.success('删除成功');
                }, 200);
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
                this.address < 0 ? (this.address = 0) : this.$router.go(-1);
            },
            //前进页面
            go_forward(){
                this.$router.go(1);
            }
        },
        created() {
            this.init();
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
    /deep/ .hotList{
        .ivu-modal {
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
    }
    //login弹出框
    /deep/ .login_modal{
        .ivu-modal{
            .ivu-modal-content{
                background-color: #fff;
            }
        }
    }

    //下拉框
    /deep/ .ivu-select-dropdown{
        z-index: 1111;
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

    .qrFail{
        position: absolute;
        width: 150px;
        height: 150px;
        background-color: #323232de;
        top: 150px;
        left: 100px;
        .qrFailText{
            color: whitesmoke;
            margin-top: 50px;
        }
        .qrFailBtn{
            display: inline-block;
            border-radius: 5px;
            margin-top: 10px;
            width: 80px;
            height: 30px;
            line-height: 30px;
            background-color: #0c73c2;
            color: whitesmoke;
            cursor: pointer;
        }
    }

    .qrChange{
        cursor:pointer;
        background-image: linear-gradient(-45deg, #fff 38px, #00000014 0);
        height: 55px;
        width: 55px;
        position: absolute;
        top: -5px;
        left: -5px;
    }
    .qrChangeMal{
        position: relative;
        top: -20px;
        left: 0;
        display: inline-block;
        .leftTop{
            background-image: linear-gradient(-145deg, #989898 5px, #ffc0cb00 0);
            height: 10px;
            width: 10px;
            position: absolute;
            top: 0;
            left: -7px;
        }
        .qrChangeTitle{
            display: inline-block;
            border-radius: 5px;
            padding: 5px 10px;
            font-size: 12px;
            background-color: #989898;
            color: #ffffff;
        }
    }
    .login_icon{
        font-size: 20px;
        color: #aaa;
        margin: 6px auto;
    }
    .login{
        cursor:pointer;
        background-color: #ea4848;
        color: whitesmoke;
        display: inline-block;
        margin-top: 15px;
        border-radius: 5px;
        width: 260px;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
    }
    .register{
        background-color: #ffffff;
        color: black;
        margin-top: 5px;
    }

</style>