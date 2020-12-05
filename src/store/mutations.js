export default{
    //储存用户token值
    setToken(state, token, flag = true) {
        if (flag) {
            localStorage.setItem('token', token)
        } else {
            sessionStorage.setItem('token', token)
        }
    },
    //储存用户信息数据
    setUserInfo(state, userInfo, flag = true) {
        state.userInfo = userInfo
        state.token = userInfo.token
        if (flag) {
            localStorage.setItem('user', JSON.stringify(userInfo))
        } else {
            sessionStorage.setItem('user', JSON.stringify(userInfo))
        }
        this.commit('setToken', userInfo.token, flag)
    },
    //清除本地用户储存数据
    logout(state) {
        state.userInfo = null
        state.token = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    },
    //储存搜索历史数据
    setSearchData(state,searchData){
        state.searchDataList.push(searchData)
        state.searchDataList = state.searchDataList.filter((item,index,arr) => {
            return arr.indexOf(item) === index
        })
        localStorage.setItem('searchData',state.searchDataList)
    },
    //存储搜索结果信息
    setSearchResult(state,searchResult){
        state.searchResult = searchResult;
    }
}