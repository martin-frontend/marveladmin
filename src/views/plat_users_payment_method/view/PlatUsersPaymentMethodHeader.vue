<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
        />
        <div class="group">
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.username.name" v-model="listQuery.username" />
            <SearchInput :title="tableColumns.nick_name.name" v-model="listQuery.nick_name" />
            <SearchSelect
                :title="tableColumns.type.name"
                v-model="listQuery.type"
                :options="tableColumns.type.options"
                :width="300"
            />
            <SearchInput
                :title="$t('plat_users_payment_method.beneficiaryAccount')"
                :placeholder="$t('plat_users_payment_method.placeholder')"
                :width="width"
                v-model="listQuery.payment_method"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{$t('common.search')}}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{$t('common.reset')}}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUsersPaymentMethodProxy from "../proxy/PlatUsersPaymentMethodProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import Cookies from "js-cookie";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchRange,
        SearchDatePicker,
    },
})
export default class PlatUsersPaymentMethodHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatUsersPaymentMethodProxy = this.getProxy(PlatUsersPaymentMethodProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    get width() {
        let _w = 0;
        if (Cookies.get("language") === "zh") {
            _w = 440;
        } else if (Cookies.get("language") === "vi") {
            _w = 540;
        }
        return _w;
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
