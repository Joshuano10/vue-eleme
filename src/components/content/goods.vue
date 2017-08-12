<template>
    <div>
        <div class="good">
            <div class="menu" ref="menuWrapper">
                <ul>
                    <li v-for="(item, index) in goods" class="menu-item  bottom-boder-1px" :class="{current: currentIndex === index}" @click="selectMenu(index, $event)">
                        <span class="text"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="foods" ref="foodWrapper">
                <ul>
                    <li v-for="item in goods" class="food-list food-list-hook">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li v-for="food in item.foods" class="food-item bottom-boder-1px" @click="selectFood(food, $event)">
                                <div class="icon">
                                    <img :src="food.icon" width="57" height="57">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="description">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}</span>
                                        <span class="ratting">好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol :food="food"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
        </div>
        <food :food="selectedFood" ref="food"></food>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
import cartcontrol from '../cartcontrol/cartcontrol';
import food from '../food/food';

// const ERR_OK = 0;

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        };
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    created() {
        this.$http.get('./static/data/goods.json').then((response) => {
            this.goods = response.data;
            this.$nextTick(() => {
                this._initScroll();
                this._calcHeight();
            });
        });
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
        selectMenu(index, event) {
            if (!event._constructed) {
                return;
            }
            let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodScroll.scrollToElement(el, 300);
        },
        _initScroll() {
            this.foodScroll = new BScroll(this.$refs.foodWrapper, {
                click: true,
                probeType: 3
            });
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calcHeight() {
            let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectFood(food, event) {
            if (!event._constructed) {
                return;
            }
            this.selectedFood = food;
            this.$refs.food.showFood();
        }
    },
    components: {
        shopcart,
        cartcontrol,
        food
    }
};
</script>

<style>
.good {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
}
    .menu {
        flex: 0 0 80px;
        width: 80px;
        background-color: #f3f5f7;
    }
        .menu-item {
            display: table;
            padding: 0 12px;
            height: 54px;
            width: 56px;
            line-height: 14px;
        }
        .current {
            background: #ffffff;
            font-weight: 700;
        }
            .menu-item .icon {
                display: inline-block;
                vertical-align: top;
                width: 12px;
                height: 12px;
                margin-right: 2px;
                background-size: 12px 12px;
                background-repeat: no-repeat;
            }
            .menu-item .decrease {
                background-image: url('decrease_3@2x.png');
            }
            .menu-item .discount {
                background-image: url('discount_3@2x.png');
            }
            .menu-item .guarantee {
                background-image: url('guarantee_3@2x.png');
            }
            .menu-item .invoice {
                background-image: url('invoice_3@2x.png');
            }
            .menu-item .special {
                background-image: url('special_3@2x.png');
            }
            .menu-item .text {
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                font-size: 12px;
            }
    .foods {
        flex: 1;
    }
        .foods .title {
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147,153,159);
            background-color: #f3f5f7;
        }
        .foods .food-item {
            display: flex;
            margin: 18px 18px 0 18px;
            padding-bottom: 18px;
        }
            .foods .food-item .icon {
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .foods .food-item .content {
                flex: 1;
            }
                .foods .food-item .content .name {
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .foods .food-item .content .description, .foods .food-item .content .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .foods .food-item .content .description {
                    margin-bottom: 8px;
                }
                .foods .food-item .content .extra .count {
                    margin-right: 12px;
                    font-size: 10px;
                }
                .foods .food-item .content .price {
                    font-weight: 700;
                    line-height: 24px;
                }
                .foods .food-item .content .price .now {
                    margin-right: 8px;
                    font-size: 14px;
                    color: rgb(240, 20, 20);
                }
                .foods .food-item .content .price .old {
                    text-decoration: line-through;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                }
                .foods .food-item .content .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 12px;
                }
</style>
