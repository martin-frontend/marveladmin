<template>
    <el-dialog :title="LangUtil('投注详情')" :append-to-body="true" :visible.sync="data.bShow">
        <el-tabs v-model="activeName" style="margin-left: 20px; margin-right: 20px">
            <el-tab-pane :label="LangUtil('基本信息')" name="first">
                <el-form label-position="right" label-width="100px">
                    <el-form-item size="mini" :label="tableColumns['order_no'].name" prop="order_no">
                        {{ data.data["order_no"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['nick_name'].name" prop="nick_name">
                        {{ data.data["nick_name"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['user_id'].name" prop="user_id">
                        {{ data.data["user_id"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['is_credit_user'].name" prop="is_credit_user">
                        {{ tableColumns["is_credit_user"].options[data.data["is_credit_user"]] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['vendor_id'].name" prop="vendor_id">
                        {{ tableColumns["vendor_id"].options[data.data["vendor_id"]] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['vendor_type'].name" prop="vendor_type">
                        {{ tableColumns["vendor_type"].options[data.data["vendor_type"]] }}
                    </el-form-item>
                    <el-form-item
                        size="mini"
                        :label="tableColumns['vendor_product_name'].name"
                        prop="vendor_product_name"
                    >
                        {{ data.data["vendor_product_name"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['settlement_status'].name" prop="settlement_status">
                        {{ tableColumns["settlement_status"].options[data.data["settlement_status"]] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['bet_at'].name" prop="bet_at">
                        {{ data.data["bet_at"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['settlement_at'].name" prop="settlement_at">
                        {{ data.data["settlement_at"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['pull_at'].name" prop="pull_at">
                        {{ data.data["pull_at"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['bet_gold'].name" prop="bet_gold">
                        {{ data.data["bet_gold"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['valid_bet_gold'].name" prop="valid_bet_gold">
                        {{ data.data["valid_bet_gold"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['win_gold'].name" prop="win_gold">
                        <div v-if="data.data.win_gold == '-'">{{ data.data.win_gold }}</div>
                        <WinLossDisplay v-else :amount="data.data.win_gold" />
                    </el-form-item>

                    <el-form-item size="mini" :label="tableColumns['settlement_water'].name" prop="settlement_water">
                        {{ data.data["settlement_water"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['water_type'].name" prop="water_type">
                        {{ tableColumns["water_type"].options[data.data["water_type"]] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['water_rate'].name" prop="water_rate">
                        {{ data.data["water_rate"] }}
                    </el-form-item>

                    <el-form-item size="mini" :label="tableColumns['water'].name" prop="water">
                        {{ data.data["water"] }}
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane :label="LangUtil('厂商数据')" name="second">
                <div v-if="data.data" style="min-height: 200px">
                    <pre>{{ gameInfo }}</pre>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        WinLossDisplay,
    },
})
export default class PlatUserBetDetail extends Vue {
    LangUtil = LangUtil;
    @Prop()
    tableColumns: any;
    @Prop()
    data: any;

    activeName = "first";

    gameInfo: string = "";

    formatGameInfo() {
        let json: any;
        try {
            json = JSON.parse(this.data.data.game_info);
        } catch (e) {
            json = eval("(" + this.data.data.game_info + ")");
        }
        this.gameInfo = JSON.stringify(json, null, 2);
    }
    @Watch("data.data")
    onWatchData() {
        this.activeName = "first";
        this.formatGameInfo();
    }
}
</script>

<style lang="scss" scoped></style>
