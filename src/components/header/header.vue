<template>
    <div class="header">
        <div class="content">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="text">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="supports" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="supports-text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="supports-count" v-if="seller.supports" @click="showDetail()">
                <span class="count">{{seller.supports.length}}个 ></span>
            </div>
        </div>
        <div class="bulletin" @click="showDetail()">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}} ></span>
            <span class="arrow">></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">
                                优惠内容
                            </div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item, index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">
                                商家公告
                            </div>
                            <div class="line"></div>
                        </div>
                        <div class="detail-bulletin">
                            <p class="text">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close">
                    <span class="cross" @click="closeDetail()">x</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '../star/star.vue';

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
        };
    },
    methods: {
        showDetail: function() {
            this.detailShow = true;
        },
        closeDetail: function() {
            this.detailShow = false;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
        'star': star
    }
};
</script>

<style>
.header {
    position: relative;
    color: #fff;
    background-color: rgba(7,17,27,0.5);
    overflow: hidden;
}
    .header .content {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
    }
        .avatar {
            display: inline-block;
            vertical-align: top;
        }
            .avatar img {
                border-radius: 2px;
            }
        .content .text {
            display: inline-block;
            margin-left: 16px;
        }
            .title {
                margin: 2px 0 8px 0;
            }
                .brand {
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    background-image: url('brand@2x.png');
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                    vertical-align: top;
                }
            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }
            .content .supports {
            }
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                }
                .decrease {
                    background-image: url('decrease_1@2x.png');
                }
                .discount {
                    background-image: url('discount_1@2x.png');
                }
                .guarantee {
                    background-image: url('guarantee_1@2x.png');
                }
                .invoice {
                    background-image: url('invoice_1@2x.png');
                }
                .special {
                    background-image: url('special_1@2x.png');
                }
                .supports-text {
                    line-height: 12px;
                    font-size: 12px;
                }
        .supports-count {
            position: absolute;
            right: 12px;
            bottom: 14px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background-color: rgba(0,0,0,0.2);
            text-align: center;
        }
            .count {
                font-size: 12px;
            }
        .header .bulletin {
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: rgba(7,17,27,0.2);
        }
            .bulletin-title {
                display: inline-block;
                vertical-align: top;
                margin-top: 9px;
                width: 22px;
                height: 12px;
                background-image: url('bulletin@2x.png');
                background-size: 22px 12px;
                background-repeat: no-repeat;
            }
            .bulletin-text {
                margin: 0 4px;
                font-size: 12px;
                font-weight: 200;
            }
            .arrow {
                position: absolute;
                font-size: 12px;
                right: 12px;
                top: 2px;
            }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .header .detail {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(7,17,27,0.8);
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
        .detail-wrapper {
            min-height: 100%;
            width: 100%;
        }
            .detail-main {
                margin-top: 64px;
                padding-bottom: 64px;
            }
                .detail-main .name {
                    line-height: 16px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
                .star-wrapper {
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }
                .detail-main .title {
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px auto;
                }
                    .detail-main .title .line {
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                    }
                    .detail-main .title .text {
                        padding: 0 12px;
                        font-weight: 700;
                        font-size: 14px;
                    }
                .detail-main .supports {
                    width: 80%;
                    margin: 0 auto 30px auto;
                    font-size: 0px;
                }
                    .detail-main .supports .support-item {
                        pading: 0 12px;
                        margin-bottom: 12px;
                    }
                    .detail-main .supports .support-item .icon {
                        margin-left: 16px;
                    }
                    .detail-main .supports .support-item .text {
                        margin-left: 10px;
                        font-size: 12px;
                        font-weight: 200;
                    }
                .detail-main .detail-bulletin {
                    width: 80%;
                    margin: 0 auto;
                }
                .detail-main .detail-bulletin .text{
                    margin: 30px 10px;
                    font-size: 12px;
                    line-height: 20px;
                    font-weight: 200;
                }
        .detail-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            font-size: 32px;
        }
</style>
