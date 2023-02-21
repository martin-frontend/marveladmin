<template>
    <span :class="checkWin(amount.toString())">
        {{ amount.toString() | hasPlus(isShowDollar, isShowPlus, isShowAllDecimal) }}
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
    filters: {
        hasPlus(value: string, isShowDollar: boolean, isShowPlus: boolean, isShowAllDecimal: boolean) {
            if (isShowAllDecimal) {
                let parts = value.toString().split(".");
                const numberPart = parts[0];
                const decimalPart = parts[1];
                let newValue =
                    numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (decimalPart ? "." + decimalPart : "");
                return isShowDollar ? `$${newValue}` : `${newValue}`;
            }
            let str = value.replace("$", "");
            let amount = Number(str);
            if (isNaN(amount)) return str;
            const valueStr = Math.abs(amount).toFixed(3);
            if (!isShowPlus) {
                let newValue = valueStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return isShowDollar ? `$${newValue}` : `${newValue}`;
            } else if (amount > 0) {
                let newValue = valueStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return isShowDollar ? `+$${newValue}` : `+${newValue}`;
            } else if (amount < 0) {
                let newValue = valueStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return isShowDollar ? `-$${newValue}` : `-${newValue}`;
            } else {
                return isShowDollar ? `$${valueStr}` : valueStr;
            }
        },
    },
})
export default class WinLossDisplay extends Vue {
    @Prop({ type: [String, Number], default: "0" }) amount!: string | number;
    @Prop({ type: Boolean, default: true }) isShowDollar!: boolean;
    @Prop({ type: Boolean, default: true }) isShowPlus!: boolean;
    @Prop({ type: Boolean, default: true }) isShowColor!: boolean;
    @Prop({ type: Boolean, default: false }) isShowAllDecimal!: boolean;

    private checkWin(value: string) {
        if (!this.isShowColor) {
            return;
        }
        let str = value.replace("$", "");
        let amount = Number(str);
        if (amount > 0) return "green-color";
        else if (amount < 0) return "red-color";
    }
}
</script>

<style scoped lang="scss">
.green-color {
    color: green;
}
.red-color {
    color: red;
}
</style>
