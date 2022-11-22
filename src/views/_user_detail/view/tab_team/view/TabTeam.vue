<template>
    <div class="content">
        <div class="total" v-loading="net_status.loading">
            <span>{{ LangUtil("直属成员") }}：{{ directlyUsers }}</span>
            <span>{{ LangUtil("团队成员") }}：{{ groupUsers }}</span>
        </div>
        <el-tree
            :data="teamMemberList"
            :expand-on-click-node="false"
            node-key="user_id"
            ref="tree"
            highlight-current
            v-loading="net_status.loading"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
            :default-expanded-keys="expandedList"
        >
            <span class="custom_tree_node" slot-scope="{ data }">
                <template v-if="data.hasMore && !data.user_id"
                    ><span class="get_more" @click="getMore(data)"
                        >{{ data.level }}-{{ LangUtil("加载更多") }}</span
                    ></template
                >
                <template v-else
                    ><span>{{ data.level }}-{{ LangUtil("昵称") }}：{{ data.nick_name }}</span>
                    <span>ID：{{ data.user_id }}</span>
                    <span>({{ LangUtil("直属成员") }}:{{ data.directly_users }})</span>
                    <span v-if="isShowDetailBtn" class="detail" @click="getMemberDetail(data.user_id)">{{
                        LangUtil("详情")
                    }}</span>
                </template>
            </span>
        </el-tree>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabTeamMediator from "../mediator/TabTeamMediator";
import TabTeamProxy from "../proxy/TabTeamProxy";
import { getPageSetting, getProxy, page1 } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class TabTeam extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabTeamProxy = getProxy(TabTeamProxy);

    constructor() {
        super(TabTeamMediator);
    }

    destroyed() {
        super.destroyed();
    }

    get isShowDetailBtn() {
        return getPageSetting() == page1;
    }
    get teamMemberList() {
        return this.myProxy.memberTree.viewList;
    }
    get rootNode() {
        return this.myProxy.memberTree.rootNode;
    }
    get directlyUsers() {
        return this.rootNode.directly_users;
    }
    get groupUsers() {
        return this.rootNode.group_users;
    }

    // 展开节点
    expandedList: string[] = [];
    // 节点展开时
    nodeExpand(data: any) {
        this.expandedList.push(data.user_id); // 在节点展开是添加到默认展开数组
    }
    // 节点收起时
    nodeCollapse(data: any) {
        const idx = this.expandedList.indexOf(data.user_id);
        this.expandedList.splice(idx, 1); // 收起时删除数组里对应选项
        for (const item of data.children) {
            this.nodeCollapse(item);
        }
    }

    // 取得成员详情
    getMemberDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }
    // 取得更多成员
    getMore(data: any) {
        let moreData = {
            invite_user_id: data.invite_user_id,
            page_count: data.page_count + 1,
        };
        this.myProxy.getMoreMember(moreData);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.total {
    :last-child {
        margin-left: 16px;
    }
    padding-bottom: 32px;
}
.custom_tree_node {
    .get_more {
        color: #2dabff;
    }
    .detail {
        text-decoration: underline;
    }
    span {
        padding-right: 16px;
    }
}
</style>
