<template>
    <div class="content">
        <TabKycBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabUserInfoProxy from "../../tab_user_info/proxy/TabUserInfoProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import TabKycBody from "../view/TabKycBody.vue";

@Component({
    components: {
        TabKycBody,
    },
})
export default class TabBet extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabUserInfoProxy = getProxy(TabUserInfoProxy);

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
