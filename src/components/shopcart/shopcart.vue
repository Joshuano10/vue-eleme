<template>
    <div>
        <div class="shopcart">
            <div class="content">
                <div class="content-left">
                    <div class="logo-wrapper" @click="toggleList()">
                        <div class="logo" :class="{highlight:totalCount>0}">
                            <span class="icon-shopping_cart" :class="{highlight:totalCount>0}"></span>
                        </div>
                        <div class="count" v-show="totalCount>0">
                            {{totalCount}}
                        </div>
                    </div>
                    <div class="price" :class="{highlight:totalCount>0}">
                        ￥{{totalPrice}}
                    </div>
                    <div class="desc">
                        另需配送费￥{{deliveryPrice}}元
                    </div>
                </div>
                <div class="content-right" @click="pay()">
                    <div class="pay" :class="{highlight:totalPrice>=minPrice}">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <transition name="fold">
                <div class="cart-list" v-show="listShow">
                    <div class="list-header bottom-boder-1px">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty()">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food bottom-boder-1px" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fold">
            <div class="list-bg" v-show="listShow"></div>
        </transition>
    </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol';
import BScroll from 'better-scroll';

export default {
    props: {
        selectFoods: {
            type: Array,
            default() {
                return [];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            fold: true
        };
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.count;
            });
            return total;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差￥${diff}起送`;
            } else {
                return '去结算';
            }
        },
        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }
            return show;
        }
    },
    methods: {
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        empty() {
            this.selectFoods.forEach((food) => {
                food.count = 0;
            });
        },
        pay() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            window.alert(`支付￥${this.totalPrice}元`);
        }
    },
    components: {
        cartcontrol
    }
};
</script>

<style>
.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
}
    .shopcart .content {
        display: flex;
        height: 100%;
        background-color: #141d27;
        font-size: 0;
    }
        .shopcart .content-left {
            flex: 1;
        }
            .shopcart .content-left .logo-wrapper {
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                vertical-align: top;
                border-radius: 50%;
                background-color: #141d27;
            }
                .shopcart .content-left .logo-wrapper .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-color: #2b343c;
                    text-align: center;
                }
                    .icon-shopping_cart {
                        font-size: 24px;
                        color: #80858a;
                        line-height: 44px;
                    }
                    .shopcart .content-left .logo-wrapper .highlight {
                        background-color: rgb(0,160,220);
                    }
                    .shopcart .content-left .logo-wrapper .logo .highlight {
                        color: #fff;
                    }
                .shopcart .content-left .logo-wrapper .count {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background-color: rgb(240,20,20);
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
                }
            .shopcart .content-left .price {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin-top: 12px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255,255,255,0.1);
                font-size: 16px;
                font-weight: 700;
                color: rgba(255,255,255,0.4);
            }
            .shopcart .content-left .highlight {
                color: #fff;
            }
            .shopcart .content-left .desc {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin: 12px 0 12px 12px;
                padding-right: 12px;
                font-size: 12px;
                color: rgba(255,255,255,0.4);
            }
        .shopcart .content-right {
            flex: 0 0 105px;
            width: 105px;
            background-color: #2b333b;
        }
        .shopcart .content-right .pay {
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 14px;
            color: rgba(255,255,255,0.4);
        }
        .shopcart .content-right .highlight {
            background-color: #00b43c;
            color: #fff;
        }
    .shopcart .cart-list {
        position: absolute;
        z-index: -1;
        bottom: 50px;
        left: 0;
        width: 100%;

    }
    .fold-enter-active, .fold-leave-active {
        transition: opacity 0.5s;

    }
    .fold-enter, .fold-leave-to {
        opacity: 0;
    }
        .shopcart .cart-list .list-header {
            height: 30px;
            line-height: 30px;
            padding: 10px;
            background-color: #f3f5f7;
        }
            .shopcart .cart-list .list-header .title {
                float: left;
                font-size: 14px;
                color: rgb(7,17,27);
            }
            .shopcart .cart-list .list-header .empty {
                float: right;
                font-size: 12px;
                color: rgb(0, 160, 220);
            }
        .shopcart .cart-list .list-content {
            padding: 0 18px;
            max-height: 217px;
            background-color: #ffffff;
            overflow: hidden;
        }
            .shopcart .cart-list .list-content .food {
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
            }
                .shopcart .cart-list .list-content .food .name {
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .shopcart .cart-list .list-content .food .price {
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .shopcart .cart-list .list-content .food .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 6px;
                }
.list-bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 40;
    background-color: rgba(7,17,27,0.6);
}
</style>
