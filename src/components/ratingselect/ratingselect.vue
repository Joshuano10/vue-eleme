<template>
    <div class="ratingselect">
        <div class="rating-type bottom-boder-1px">
            <span class="block pos" :class="{'active':type===2}" @click="select(2, $event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block pos" :class="{'active':type===0}" @click="select(0, $event)">{{desc.pos}}<span class="count">{{positives.length}}</span></span>
            <span class="block neg" :class="{'active':type===1}" @click="select(1, $event)">{{desc.neg}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" :class="{'on':onlyContent}" @click="toggleContent($event)">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
const POS = 0;
const NEG = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    pos: '满意',
                    neg: '不满意'
                };
            }
        }
    },
    data() {
        return {
            type: this.selectType,
            content: this.onlyContent
        };
    },
    computed: {
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === POS;
            });
        },
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEG;
            });
        }
    },
    methods: {
        select(type, event) {
            if (!event._constructed) {
                return;
            }
            this.type = type;
            this.$emit('increment', 'selectType', type);
        },
        toggleContent (event) {
            if (!event._constructed) {
              return;
            }
            this.content = !this.content;
            this.$emit('increment', 'onlyContent', this.content);
        }
    }
};
</script>

<style>
.ratingselect .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    font-size: 0;
}
    .rating-type .block {
        display: inline-block;
        padding: 8px 12px;
        margin: 8px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
    }
    .rating-type .block.active {
        color: #fff;
    }
    .rating-type .pos {
        background-color: rgba(0, 160, 220, 0.2);
    }
    .rating-type .pos.active {
        background-color: rgb(0, 160, 220);
    }
    .rating-type .neg {
        background-color: rgba(77, 85, 93, 0.2);
    }
    .rating-type .neg.active {
        background-color: rgb(77, 85, 93);
    }
        .rating-type .block .count {
            margin-left: 2px;
            font-size: 10px;
        }
    .switch {
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(147, 153, 159);
        font-size: 0;
    }
        .switch .icon-check_circle {
            display: inline-block;
            margin-right: 4px;
            font-size: 24px;
        }
        .switch.on .icon-check_circle {
            color: #00c850
        }
        .switch .text {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
        }
</style>
