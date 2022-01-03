<template>
    <el-dialog :title="$t('common.setting')" :visible.sync="myProxy.dialogSettingData.bShow" width="800px">
        <div v-loading="net_status.loading">
            <div class="row">
                <el-button type="primary" size="mini" @click="checkedAll(true)">{{
                    $t("admin_role.selectAll")
                }}</el-button>
                <el-button type="primary" size="mini" @click="checkedAll(false)">{{
                    $t("admin_role.clearAll")
                }}</el-button>
                <el-button type="primary" size="mini" @click="setAllExpand(true)">{{
                    $t("admin_role.unfold")
                }}</el-button>
                <el-button type="primary" size="mini" @click="setAllExpand(false)">{{
                    $t("admin_role.putAway")
                }}</el-button>
                <el-input
                    v-model="dialogData.inputSearch"
                    clearable
                    style="margin-left: 10px; width: 200px"
                    :placeholder="$t('common.pleaseEnter')"
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
                    {{ $t("common.save") }}
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminRoleProxy from "@/views/admin_role/proxy/AdminRoleProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class AdminRoleSettingDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: AdminRoleProxy = this.getProxy(AdminRoleProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private dialogData = this.myProxy.dialogSettingData;

    private onSavePermission() {
        this.myProxy.onSavePermission(JSON.stringify((this.$refs.tree as any).getCheckedKeys()));
    }

    @Watch("dialogData.inputSearch")
    private watchSearchInput() {
        //@ts-ignore
        this.$refs.tree.filter(this.dialogData.inputSearch);
    }
    // tree筛选
    private filterNode(value: string, data: any) {
        if (!value) return true;
        return data.meta.title.indexOf(value) !== -1;
    }

    // 展开收起所有节点
    private setAllExpand(state: boolean) {
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
