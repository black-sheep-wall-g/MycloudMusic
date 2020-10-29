export default {
    //获取本地用户数据
    userInfo: (state) => {
        if (state.userInfo === null) {
            let sessionUser = sessionStorage.getItem('user')
            let localeUser = localStorage.getItem('user')
            if (sessionUser !== null) {
                state.userInfo = JSON.parse(sessionUser)
            } else if (localeUser !== null) {
                state.userInfo = JSON.parse(localeUser)
            }
        }
        return state.userInfo
    },
    //获取本地token
    token: (state) => {
        if (state.token === null) {
            let sessionToken = sessionStorage.getItem('token')
            let localeToken = localStorage.getItem('token')
            if (sessionToken !== null) {
                state.token = sessionToken
            } else if (localeToken !== null) {
                state.token = localeToken
            }
        }
        return state.token
    },
    //获取本地搜索数据
    searchData: (state) => {
        const localeSearchDataList = localStorage.getItem('setSearchData')
        state.searchDataList = state.searchDataList === [] ? localeSearchDataList : []
    }
}