<template>
    <transition name=move>
        <div class="food-detail" v-if="showDetail" ref="detailWrapper">
            <div>
                <div class="food-content">
                    <div class="image-header">
                        <img :src="food.image">
                        <div class="back" @click="hideFood()">
                            <span class="icon-arrow_lift"></span>
                        </div>
                    </div>
                    <div class="content">
                        <h1 class="title">{{food.name}}</h1>
                        <div class="detail">
                            <span class="sell-count">月售{{food.sellCount}}份</span>
                            <span class="rating">好评率{{food.rating}}%</span>
                        </div>
                        <div class="price">
                            <span class="now">￥{{food.price}}</span>
                            <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                        <div class="buy" v-show="!food.count||food.count===0" @click="buy($event)">
                            加入购物车
                        </div>
                    </div>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @increment="changeRating" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings&&food.ratings.length">
                            <li class="rating-item bottom-boder-1px" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span class="icon" :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings||!food.ratings.length">
                            暂无评价
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {formatDate} from '../../util/date.js';

// const POS = 0;
// const NEG = 1;
const ALL = 2;

export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showDetail: false,
            selectType: ALL,
            onlyContent: false,
            desc: {
                all: '全部',
                pos: '推荐',
                neg: '吐槽'
            }
        };
    },
    methods: {
        showFood() {
            this.showDetail = true;
            this.selectType = ALL;
            this.onlyContent = false;
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.detailWrapper, {
                    click: true
                });
            });
        },
        hideFood() {
            this.showDetail = false;
        },
        buy(event) {
            if (!event._constructed) {
                return;
            }
            Vue.set(this.food, 'count', 1);
        },
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        },
        changeRating(prop, value) {
            this[prop] = value;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        }
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    components: {
        cartcontrol,
        split,
        ratingselect
    }
};
</script>

<style>
.food-detail {
    position: fixed;
    bottom: 48px;
    z-index: 30;
    height: 100%;
    width: 100%;
    background-color: #ffffff;
}
.move-enter-active, .move-leave-active {
  transition: all 0.2s linear;
  transform: translate3d(0,0,0);
}
.move-enter, .move-leave-to {
  transform: translate3d(100%,0,0);
}
    .food-content .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
    }
        .food-content .image-header img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .food-content .image-header .back {
            position: absolute;
            top: 60px;
            left: 10px;
            border-radius: 50%;
            background: rgba(7,17,27,0.4);
        }
        .food-content .image-header .icon-arrow_lift {
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #fff;
        }
    .food-content .content {
        position: relative;
        padding: 18px;
    }
        .food-content .content .title {
            line-height: 14px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7, 17, 27);
        }
        .food-content .content .detail {
            margin-bottom: 18px;
            line-height: 10px;
            height: 10px;
            font-size: 0;
        }
            .food-content .content .detail .sell-count,.food-content .content .detail .rating {
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
            .food-content .content .detail .sell-count {
                margin-right: 12px;
            }
        .food-content .content .price {
            font-weight: 700;
            line-height: 24px;
        }
        .food-content .content .price .now {
            margin-right: 8px;
            font-size: 16px;
            color: rgb(240, 20, 20);
        }
        .food-content .content .price .old {
            text-decoration: line-through;
            font-size: 12px;
            color: rgb(147, 153, 159);
        }
    .food-content .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
    .food-content .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        padding: 0 12px;
        height: 24px;
        line-height: 24px;
        box-sizing: border-box;
        font-size: 12px;
        border-radius: 12px;
        color: #fff;
        background-color: rgb(0,160,220);
    }
.food-detail .info {
    padding: 18px;
}
    .food-detail .info .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        font-weight: 500;
        color: rgb(7, 17, 27);
    }
    .food-detail .info .text {
        line-height: 24px;
        font-size: 12px;
        font-weight: 200;
        padding: 0 8px;
        color: rgb(77, 85, 93);
    }
.food-detail .rating {
    padding-top: 18px;
}
    .food-detail .rating .title {
        line-height: 14px;
        margin-bottom: 6px;
        margin-left: 18px;
        font-size: 14px;
        font-weight: 500;
        color: rgb(7, 17, 27);
    }
    .food-detail .rating .rating-wrapper {
        padding: 0 18px;
    }
        .food-detail .rating .rating-wrapper .rating-item {
            position: relative;
            padding: 16px 0;
        }
            .food-detail .rating-item .user {
                position: absolute;
                right: 0;
                top: 16px;
                line-height: 12px;
                font-size: 0;
            }
                .food-detail .rating-item .name {
                    display: inline-block;
                    margin-right: 6px;
                    vertical-align: top;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                    .food-detail .rating-item .avatar {
                        border-radius: 50%;
                        margin-top: 2px;
                    }
            .food-detail .rating-item .time {
                line-height: 12px;
                margin-bottom: 6px;
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
            .food-detail .rating-item .text {
                line-height: 16px;
                font-size: 12px;
                color: rgb(7, 17, 27);
            }
                .food-detail .rating-item .text .icon-thumb_up {
                    margin-right: 4px;
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                }
                .food-detail .rating-item .text .icon-thumb_down {
                    margin-right: 4px;
                    line-height: 24px;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                }
        .food-detail .rating-wrapper .no-rating {
            padding: 16px 0;
            font-size: 12px;
            color: rgb(147, 153, 159);
        }
</style>
