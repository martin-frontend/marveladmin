<template>
    <el-dialog :title="tableColumns.receive_users.name" :visible.sync="myProxy.dialogPreviewValue.bShow">
        <el-scrollbar style="height: 400px">
            <div>
                {{ myProxy.dialogPreviewValue.value }}
            </div>
        </el-scrollbar>
    </el-dialog>
    <!-- data_belong,category,name ,des,type,key,value -->
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
//需要权限实再打开
//import { checkUnique, unique } from "@/core/global/Permission";
import { Component, Vue, Watch } from "vue-property-decorator";
import PlatEmailProxy from "../../proxy/PlatEmailProxy";

@Component
export default class DialogPreview extends AbstractView {
    // proxy
    myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
