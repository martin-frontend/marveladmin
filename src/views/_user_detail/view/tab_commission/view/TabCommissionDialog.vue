<template>
    <el-dialog
        :append-to-body="true"
        :title="$t('user_detail.returnDetail')"
        :visible.sync="myProxy.dialogData.bShow"
        width="1410px"
    >
        <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('user_detail.serformanceDetails')" name="tab1">
                <Detail v-if="activeName == `tab1`" />
            </el-tab-pane>
            <el-tab-pane :label="$t('user_detail.immediateDetails')" name="tab2">
                <DirectWater v-if="activeName == `tab2`" />
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabCommissionProxy from "../proxy/TabCommissionProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";
import Detail from "./components/Detail.vue";
import DirectWater from "./components/DirectWater.vue";

@Component({
    components: {
        Detail,
        DirectWater,
    },
})
export default class TabCommissionDialog extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabCommissionProxy = getProxy(TabCommissionProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;

    private activeName = "tab1";

    @Watch("activeName")
    onWatchActiveName() {
        if (this.activeName == "tab1") {
            this.myProxy.getDetail();
        } else {
            this.myProxy.getDirectWater();
        }
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
