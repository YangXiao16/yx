<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
    <div class="warp">
        <el-container>
            <el-header>
                <el-row :gutter="10">
                    <el-col :span="6" :offset="1">
                        <el-input
                            placeholder="请输入内容"
                            v-model="searchValue"
                            @blur="selectAllGoods"
                            clearable >
                            <el-button slot="append" icon="el-icon-search" @click="selectAllGoods"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="2">热门搜索:</el-col>
                    <el-col :span="15">
                        <el-link type="primary" 
                                    v-for="(name, index) in hostList" 
                                    :key="index"
                                    v-show="index < 6"
                                    @click="hotSearch(name)" 
                        >{{name}}</el-link>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="6" v-for="(good, index) in goods" :key="index" >
                        <el-card :body-style="{ padding: '0px' }" 
                        @click="CommodityDetail(good.orderId)" >
                        <img  :src="`/order/${good.picture}`" class="image">
                        <div style="padding: 6px;">
                            <span>{{ good.ownName }}</span>
                            <div class="bottom clearfix">
                                {{good.content}}
                            </div>
                            <p class="price">￥{{good.price}}</p>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
                    </el-pagination>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import {selectAllGoods,searchHostGoods} from '@/api/home'
    export default {
        name: "HomeGoods",
        data(){
            return {
                searchValue: '', // 搜索条件
                hostList: [], // 热门产品列表
                goods:[],
                pageSize: 12, // 每页显示的 条数
                total: 0, // 总条数
                currentPage: 1, // 当前页码
            }
        },
        methods: {
			
            hotSearch(name){
                this.searchValue = name;
                this.selectAllGoods();
            },

            searchHostGoods(){
                // 获取最新商品
                searchHostGoods()
                .then(res => {
                    console.log(res);
                    this.hostList = res;
                })
                .catch(err => {
                    this.$message.error("程序出现异常"+ err)
                })
            },
            // 获取当前页的列表
            selectAllGoods(){
                let params = {
                    searchValue: this.searchValue,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage
                }

                selectAllGoods(params)
                .then(res => { // 单独分装对象作为分页返回参数VO, 包含 总条数。 一个是分页数据
                    console.log("goodPage ============",res);
                    this.total = res.total;
                    this.goods = res.list;
                })
                .catch(error => {
                    this.$message.error(`分页查询异常 ${error}`);
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.selectAllGoods();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.selectAllGoods();
            }
        },
        mounted() {
            // 当页面挂载完成去调用函数获取分页数据
            this.selectAllGoods();
            // 页面加载后去调用
            this.searchHostGoods();
        },
    }
</script>
<!-- scoped 作用是表示当前样式作用范围为当前组件， 否则为全局组件 -->
<style scoped>
    .price {
        font-size: 10px;
        font-weight: bold;
        display: block;
        color: red;
    }
    .el-header{
        line-height: 60px;
    }
    .el-input{
        height: 35px;
    }
    .el-button{
        width: 20px;
    }
    .el-icon-search{
        padding-right: 5px;
    }
    .el-link{
        display: inline-block;
        margin-bottom: 7px;
        margin-left: 5px;
        text-decoration: none;
    }
    .el-main{
        height: auto;
    }
    
    .bottom{
        height: 50px;
        /*超出的部分隐藏*/
        overflow: hidden;
        /*文字用省略号替代超出的部分*/
        text-overflow: ellipsis;
        /*弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*限制在一个块元素显示文本的行数*/
        -webkit-line-clamp: 7;
        /*设置或检索伸缩盒对象的子元素排列方式*/
        -webkit-box-orient: vertical;
        font-size: 10px;
    }
    .image{
        width: 280px;
        height: 160px;
    }
   
    .el-pagination{
        text-align: center;
    }
</style>