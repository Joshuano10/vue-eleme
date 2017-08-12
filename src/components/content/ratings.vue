<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect @increment="changeRating" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings" class="rating-item bottom-boder-1px" v-show="needShow(rating.rateType,rating.text)">
                        <div class="avatar">
                            <img :src="rating.avatar" width="28" height="28">
                        </div>
                        <div class="rating-content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">送达时间{{rating.deliveryTime}}分钟</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend&&rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="unrecommend" v-show="rating.rateType === 1">
                                <span class="icon-thumb_down"></span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '../star/star';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {formatDate} from '../../util/date.js';
import appData from '../../../static/data/ratings.json';

const ALL = 2;
// const ERR_OK = 0;

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            showDetail: false,
            selectType: ALL,
            onlyContent: false
        };
    },
    methods: {
        changeRating(prop, value) {
            this[prop] = value;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
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
        }
    },
    created() {
        this.ratings = appData;
        this.$nextTick(() => {
            if (!this.score) {
                this.scroll = new BScroll(this.$refs.ratings, {
                click: true});
            } else {
                this.score.refresh();
            }
        });
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    components: {
        star,
        split,
        ratingselect
    }
};
</script>

<style>
.ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
}
    .ratings .overview {
        display: flex;
        padding: 18px 0;
    }
        .overview .overview-left {
            flex: 0 0 137px;
            width: 137px;
            padding-bottom: 6px;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            text-align: center;
        }
            .overview-left .score {
                margin-top: 8px;
                line-height: 28px;
                font-size: 24px;
                color: rgb(255, 153, 0);
            }
            .overview-left .title {
                margin-bottom: 8px;
                line-height: 12px;
                font-size: 12px;
                color: rgb(7, 17, 27);
            }
            .overview-left .rank {
                line-height: 10px;
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
        .overview .overview-right {
            flex: 1;
            padding-left: 18px;
        }
            .overview-right .score-wrapper {
                line-height: 18px;

                font-size: 0;
            }
                .overview-right .score-wrapper .title {
                    display: inline-block;
                    vertical-align: top;
                    margin: 6px 2px 0 0;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .overview-right .score-wrapper .star{
                    display: inline-block;
                    vertical-align: top;
                }
                .overview-right .score-wrapper .score {
                    display: inline-block;
                    vertical-align: top;
                    margin: 5px 0 0 4px;
                    font-size: 12px;
                    color: rgb(255, 153, 0);
                }
            .overview-right .delivery-wrapper {
                margin-top: 6px;
                font-size: 0;
                line-height: 18px;
            }
                .overview-right .delivery-wrapper .title {
                    vertical-align: top;
                    margin: 6px 2px 0 0;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .overview-right .delivery-wrapper .delivery {
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                    margin-left: 8px;
                }
        @media only screen and (max-width: 320px) {
            .overview .overview-left {
                flex: 0 0 120px;
                width: 120px;
            }
            .overview-right .score-wrapper .title {
                margin: 6px 8px 0 -3px;
            }
            .overview-right .score-wrapper .star .star-item {
                margin-left: -3px;
            }
            .overview-right .delivery-wrapper .title {
                margin: 6px 0 0 -3px;
            }

        }
    .ratings .rating-wrapper {
        padding: 0 18px;
    }
        .ratings .rating-wrapper .rating-item {
            display: flex;
            padding: 18px 0;
        }
            .ratings .avatar {
                flex: 0 0 28px;
                width: 28px;
                margin-right: 12px;
            }
                .ratings .avatar img {
                    border-radius: 50%;
                }
            .ratings .rating-content {
                flex: 1;
                position: relative;
            }
                .ratings .rating-content .name {
                    margin-bottom: 4px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(7, 17, 27);
                }
                .ratings .rating-content .star-wrapper {
                    margin: 0 0 6px 0;
                    font-size: 0;
                    text-align: left;
                }
                    .ratings .rating-content .star {
                        display: inline-block;
                        margin-right: 6px;
                        vertical-align: top;
                    }
                    .ratings .rating-content .delivery {
                        display: inline-block;
                        margin-top: 3px;
                        vertical-align: top;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                .ratings .rating-content .text {
                    margin-bottom: 8px;
                    line-height: 18px;
                    color: rgb(7, 17, 27);
                    font-size: 12px;
                }
                .ratings .rating-content .recommend {
                    line-height: 16px;
                    font-size: 0;
                }
                    .ratings .rating-content .recommend .icon-thumb_up, .ratings .rating-content .recommend .item {
                        display: inline-block;
                        margin: 0 8px 4px 0;
                        font-size: 10px;
                    }
                    .ratings .rating-content .recommend .icon-thumb_up {
                        color: rgb(0, 160, 220);
                    }
                    .ratings .rating-content .unrecommend {
                        line-height: 16px;
                        font-size: 0;
                    }
                    .ratings .rating-content .unrecommend .icon-thumb_down {
                        display: inline-block;
                        margin: 0 8px 4px 0;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .ratings .rating-content .recommend .item {
                        padding: 0 6px;
                        border: 1px solid rgba(7, 17, 27, 0.1);
                        border-radius: 1px;
                        color: rgb(147, 153, 159);
                        background-color: #ffffff;
                    }
                    .ratings .rating-content .time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size: 10px;
                        line-height: 10px;
                        color: rgb(147, 153, 159);
                    }
</style>
