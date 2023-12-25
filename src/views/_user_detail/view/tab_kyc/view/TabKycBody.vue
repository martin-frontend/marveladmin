<template>
    <div class="content">
        <el-form ref="form" abel-position="right" label-width="200px" :model="userInfo">
            <el-form-item size="mini" :label="tableColumns.kyc_status.name" prop="first_name">
                {{ tableColumns.kyc_status.options[userInfo.kyc_status] }}
            </el-form-item>
        </el-form>
        <div class="layout" v-loading="net_status.loading">
            <el-form ref="form" label-position="right" label-width="200px" :model="userInfo">
                <el-form-item size="mini" :label="LangUtil('名')" prop="first_name">
                    {{ userInfo.kyc_data.first_name }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('姓')" prop="last_name">
                    {{ userInfo.kyc_data.last_name }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('全地址')" prop="full_address">
                    {{ userInfo.kyc_data.full_address }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('国家')" prop="country">
                    {{ userInfo.kyc_data.country }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('城市')" prop="city">
                    {{ userInfo.kyc_data.city }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('单位')" prop="unit">
                    {{ userInfo.kyc_data.unit }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('州')" prop="state">
                    {{ userInfo.kyc_data.state }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('街道')" prop="street">
                    {{ userInfo.kyc_data.street }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('邮编')" prop="postcode">
                    {{ userInfo.kyc_data.postcode }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('门牌号')" prop="house_number">
                    {{ userInfo.kyc_data.house_number }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('出生日期')" prop="date_of_birth">
                    {{ userInfo.kyc_data.date_of_birth }}
                </el-form-item>
            </el-form>
            <el-form ref="form" label-position="left" label-width="130px" :model="userInfo">
                <el-form-item size="mini" :label="LangUtil('出生地')" prop="place_of_birth">
                    {{ userInfo.kyc_data.place_of_birth }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('证件类型')" prop="doc_type">
                    {{ userInfo.kyc_data.doc_type }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('证件号')" prop="doc_number">
                    {{ userInfo.kyc_data.doc_number }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('证件国家')" prop="doc_country">
                    {{ userInfo.kyc_data.doc_country }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('证件有效期起始日')" prop="doc_valid_from">
                    {{ userInfo.kyc_data.doc_valid_from }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('证件有效期截止日')" prop="doc_valid_until">
                    {{ userInfo.kyc_data.doc_valid_until }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('颁发证件地址')" prop="doc_place_of_issue">
                    {{ userInfo.kyc_data.doc_place_of_issue }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('证件首次颁发时间')" prop="doc_first_issue">
                    {{ userInfo.kyc_data.doc_first_issue }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('证件首次颁发序号')" prop="doc_issue_number">
                    {{ userInfo.kyc_data.doc_issue_number }}
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('证件首次颁发机构')" prop="doc_issued_by">
                    {{ userInfo.kyc_data.doc_issued_by }}
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabUserInfoProxy from "../../tab_user_info/proxy/TabUserInfoProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class TabBetBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabUserInfoProxy = getProxy(TabUserInfoProxy);
    // proxy property
    tableColumns = this.myProxy.tableColumns;
    userInfo = this.myProxy.userInfo;
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.content {
    .layout {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        .el-form {
            width: 50%;
        }
    }
}
</style>
