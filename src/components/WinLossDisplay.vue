<template>
    <span :class="checkWin(amount)">{{ amount | hasPlus }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
    filters: {
        hasPlus(value: string) {
            let str = value.replace("$", "");
            let amount = Number(str);
            if (amount > 0) {
                return `+$${amount.toFixed(3)}`;
            } else if (amount < 0) {
                amount = Math.abs(amount);
                return `-$${amount.toFixed(3)}`;
            } else {
                return `$${amount.toFixed(3)}`;
            }
        },
    },
})
export default class WinLossDisplay extends Vue {
    @Prop({ type: String, default: "0" }) amount!: string;

    private checkWin(value: string) {
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