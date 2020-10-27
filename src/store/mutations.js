export default{
    setToken(state, token, flag = true) {
        if (flag) {
            localStorage.setItem('token', token)
        } else {
            sessionStorage.setItem('token', token)
        }
    },
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
    logout(state) {
        state.userInfo = null
        state.token = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    },
}