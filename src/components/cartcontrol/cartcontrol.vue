<template>
    <div class="cartcontrol">
        <div class="dec icon-remove_circle_outline" v-show="food.count>0" @click.stop="dec($event)"></div>
        <div class="count" v-show="food.count>0">
            {{food.count}}
        </div>
        <div class="add icon-add_circle" @click.stop="add($event)"></div>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        dec(event) {
            if (!event._constructed) {
                return;
            }
            if (this.food.count) {
                this.food.count--;
            }
        },
        add(event) {
            if (!event._constructed) {
                return;
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            }
        }
    }
};
</script>

<style>
.cartcontrol {
    font-size: 0;
}
.cartcontrol .dec,.cartcontrol .add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
}
.cartcontrol .count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    color: rgb(147, 153, 159);
}
.cartcontrol .add {

}
</style>
