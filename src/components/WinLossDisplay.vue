<template>
    <span :class="checkWin(amount)">{{ amount | hasPlus }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
    filters: {
        hasPlus(value: number) {
            if (value > 0) {
                return `+${value.toString()}`;
            }
            return value;
        },
    },
})
export default class WinLossDisplay extends Vue {
    @Prop({ type: String, default: "0" }) amount!: string;
    
    private checkWin(value: number) {
        if (value >= 0) return "green-color";
        else return "red-color";
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