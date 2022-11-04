<template>
    <div>
        <div class="header-content">
            <div class="group">
                <div>
                    <SearchSelect
                        :title="$t('common.belongingPlat')"
                        :options="platTableColumns.plat_id.options"
                        v-model="listQuery.plat_id"
                        @change="changePlat()"
                        :clearable="false"
                    />
                </div>
            </div>
        </div>
        <div style="margin-left: 10px">{{ $t("vip_recharge.accountMoney") }}：{{ myProxy.bodyData.gold }}</div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-position="right"
            :label-width="_width"
            style="padding-top: 20px"
        >
            <el-form-item :label="$t('vip_recharge.rechargePlayer')" prop="user_id">
                <el-input
                    v-model="form.user_id"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'');"
                    style="width: 200px"
                ></el-input>
                <el-button type="primary" @click="onQueryUser" style="margin-left: 10px">{{
                    $t("vip_recharge.playerQuery")
                }}</el-button>
            </el-form-item>
            <SearchSelect
                class="mb-22"
                :title="$t('common.coin_name')"
                :options="platTableColumns.coin_name_unique_option"
                v-model="listQuery.coin_name_unique"
                :clearable="false"
            />
            <el-form-item :label="$t('common.rechargeAmount')" prop="amount">
                <el-input
                    v-model="form.amount"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'');"
                    style="width: 200px"
                ></el-input>
            </el-form-item>

            <el-form-item :label="$t('plat_agent_bind.note')" prop="remark">
                <el-input
                    v-model="form.remark"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value;"
                    style="width: 237px"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button
                    type="primary"
                    @click="onTopup"
                    style="margin-left: 10px"
                    v-if="checkUnique(unique.vip_recharge_recharge)"
                    >{{ $t("vip_recharge.submit") }}</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import VipRechargeProxy from "../proxy/VipRechargeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { IVipRecharge } from "../mediator/VipRechargeMediator";
import Cookies from "js-cookie";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        Pagination,
        SearchSelect,
    },
})
export default class VipRechargeBody extends AbstractView implements IVipRecharge {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: VipRechargeProxy = this.getProxy(VipRechargeProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private platTableColumns = this.myProxy.tableData.plat_columns;
    private form = this.myProxy.bodyData.form;
    private listQuery = this.myProxy.listQuery;

    private rules = {
        user_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        amount: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
    };

    @Watch("myProxy.bodyData.isRechargeSuccess")
    private onWatchRecharge() {
        this.$nextTick(() => {
            (this.$refs.form as any).clearValidate();
        });
    }

    get _width() {
        let _w: string = "";
        let lang: string = Cookies.get("language") || "zh";
        if (lang === "zh") {
            _w = "100px";
        } else if (lang === "vi") {
            _w = "260px";
        }
        return _w;
    }

    private onTopup() {
        (this.$refs["form"] as any & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                // this.$confirm(`您是否要给玩家${this.form.user_id}充值${this.form.amount}金币`, "提示", {
                let str: any = this.$t("vip_recharge.confirm", {
                    "0": this.form.user_id,
                    "1": this.form.amount,
                    "2": this.listQuery.coin_name_unique,
                });
                let obj: any = {
                    str1: this.$t("vip_recharge.confirm", {
                        "0": this.form.user_id,
                        "1": this.form.amount,
                        "2": this.listQuery.coin_name_unique,
                    }),
                    str2: this.$t("common.prompt"),
                    str3: this.$t("common.determine"),
                    str4: this.$t("common.cancel"),
                };
                this.$confirm(obj.str1, obj.str2, {
                    confirmButtonText: obj.str3,
                    cancelButtonText: obj.str4,
                    type: "warning",
                })
                    .then(() => {
                        this.myProxy.onTopup();
                    })
                    .catch(() => {});
            }
        });
    }

    private onQueryUser() {
        if (this.form.user_id == "") {
            let str: any = this.$t("vip_recharge.errorCode");
            this.$message({
                type: "warning",
                message: str,
            });
        } else {
            this.myProxy.onQueryUser();
        }
    }

    //更换平台切换对应渠道
    private changePlat() {
        //@ts-ignore
        this.platTableColumns.coin_name_unique_option = this.platTableColumns.coin_name_unique.options[
            this.listQuery.plat_id
        ];
        //设定选取币种第一个
        const coin_name_unique_options_keys = Object.keys(this.platTableColumns.coin_name_unique_option);
        this.listQuery.coin_name_unique = coin_name_unique_options_keys[0];
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.mb-22 {
    margin-bottom: 22px;
}
</style>
