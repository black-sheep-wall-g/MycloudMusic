<template>
    <div>
        <Layout>
            <Header>
                <cloud-top></cloud-top>
            </Header>
            <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                <Layout>
                    <Sider hide-trigger :style="{background: '#fff'}">
                        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-navigate"></Icon>
                                    Item 1
                                </template>
                                <MenuItem name="1-1">Option 1</MenuItem>
                                <MenuItem name="1-2">Option 2</MenuItem>
                                <MenuItem name="1-3">Option 3</MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                    Item 2
                                </template>
                                <MenuItem name="2-1">Option 1</MenuItem>
                                <MenuItem name="2-2">Option 2</MenuItem>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-analytics"></Icon>
                                    Item 3
                                </template>
                                <MenuItem name="3-1">Option 1</MenuItem>
                                <MenuItem name="3-2">Option 2</MenuItem>
                            </Submenu>
                        </Menu>
                    </Sider>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
                    </Content>
                </Layout>
            </Content>
            <template>
                <cloud-footer></cloud-footer>
            </template>
        </Layout>
    </div>
</template>

<script>
    import cloudTop from "../../components/common/cloudTop";
    import CloudFooter from "../../components/common/cloudFooter";

    export default {
        name: "Home",
        components: {
            cloudTop,CloudFooter
        }
    }
</script>

<style scoped>
    .ivu-layout {
        background: #dcdee2;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        max-width: 1025px;
        margin: 0 auto;
    }
    .ivu-layout-header{
        padding: 0 25px;
    }

    .layout-footer-center {
        text-align: center;
    }
</style>