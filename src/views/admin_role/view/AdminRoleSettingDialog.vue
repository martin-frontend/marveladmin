<template>
    <el-dialog :title="LangUtil('设置')" :visible.sync="myProxy.dialogSettingData.bShow" width="800px">
        <div v-loading="net_status.loading">
            <div class="row">
                <el-button type="primary" size="mini" @click="checkedAll(true)">{{ LangUtil("全选") }}</el-button>
                <el-button type="primary" size="mini" @click="checkedAll(false)">{{ LangUtil("取消全选") }}</el-button>
                <el-button type="primary" size="mini" @click="setAllExpand(true)">{{
                    LangUtil("展开所有节点")
                }}</el-button>
                <el-button type="primary" size="mini" @click="setAllExpand(false)">{{
                    LangUtil("收起所有节点")
                }}</el-button>
                <el-input
                    v-model="dialogData.inputSearch"
                    clearable
                    style="margin-left: 10px; width: 200px"
                    :placeholder="LangUtil('请输入')"
                ></el-input>
            </div>
            <div class="tree-content" v-if="myProxy.dialogSettingData.bShow">
                <el-scrollbar style="height: 600px">
                    <el-tree
                        ref="tree"
                        :data="dialogData.permissionData"
                        node-key="permission_id"
                        default-expand-all
                        show-checkbox
                        :default-checked-keys="dialogData.detailPermission"
                        :expand-on-click-node="false"
                        :check-strictly="true"
                        :filter-node-method="filterNode"
                    >
                        <span
                            class="custom-tree-node"
                            :class="
                                dialogData.inputSearch != '' && data.meta.title.indexOf(dialogData.inputSearch) != -1
                                    ? 'tree-search'
                                    : ''
                            "
                            slot-scope="{ data }"
                        >
                            <span :class="data.meta.icon"
                                >{{ data.meta.title }}
                                <span v-if="data.path">{{ "（" + data.path + "）" }}</span>
                            </span>
                        </span>
                    </el-tree>
                </el-scrollbar>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    size="mini"
                    @click="onSavePermission"
                    v-if="checkUnique(unique.admin_role_setting_edit)"
                >
                    {{ LangUtil("确认保存") }}
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminRoleProxy from "@/views/admin_role/proxy/AdminRoleProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class AdminRoleSettingDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: AdminRoleProxy = this.getProxy(AdminRoleProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    dialogData = this.myProxy.dialogSettingData;

    onSavePermission() {
        this.myProxy.onSavePermission(JSON.stringify((this.$refs.tree as any).getCheckedKeys()));
    }

    @Watch("dialogData.inputSearch")
    watchSearchInput() {
        //@ts-ignore
        this.$refs.tree.filter(this.dialogData.inputSearch);
    }

    // tree筛选
    filterNode(value: string, data: any) {
        if (!value) return true;
        return data.meta.title.indexOf(value) !== -1;
    }

    // 展开收起所有节点
    setAllExpand(state: boolean) {
        function dis(nodes: any) {
            for (const node of nodes) {
                node.expanded = state;
                if (node.childNodes.length > 0) {
                    dis(node.childNodes);
                }
            }
        }
        const tree: any = this.$refs.tree;
        dis(tree.store.root.childNodes);
    }

    // 全选/取消全选
    checkedAll(selected: boolean) {
        const tree: any = this.$refs.tree;
        if (selected) {
            tree.setCheckedNodes(this.dialogData.permissionData);
        } else {
            tree.setCheckedKeys(this.dialogData.defaultPermission);
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el-tree {
    padding: 5px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
}
.tree-content {
    margin-top: 10px;
    padding: 1px;
    // background-color: #eeeeee;
    border: #eeeeee;
}
.tree-search {
    color: rgb(173, 32, 32);
}
</style>
