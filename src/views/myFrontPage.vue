<template>
  <div class="warp" style="margin-left: 30px;">
      <!-- 输入框 -->
      <div class="header">
        <el-row>
          <el-col :span="10">
            <el-input
                placeholder="请输入内容"
                v-model="searchValue"
                @blur="selectAllGoods"
                clearable >
                <el-button slot="append" @click="selectAllGoods">
                  <i class="el-icon-search" style="display: flex; align-items: center; justify-content: center;"></i>
                </el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="2">热门搜索:</el-col>
            <el-col :span="15">
                <el-link type="primary" v-for="(name, index) in hostList" :key="index" v-show="index < 3" @click="hotSearch(name)" >{{name}}</el-link>
            </el-col>
        </el-row>
      </div>
        <!-- 左边卡片 -->
      <div style="float: left">
        <el-row v-for="(good, index) in goods" :key="index">
          <el-col :span="24">
            <el-card @click="CommodityDetail(good.orderId)">
              <div style="display: flex;">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="url"
                  :fit="fit"></el-image>
                <div style="flex-grow: 1; padding-left: 6px;">
                  <span class="initiator">[{{ good.ownName }}]</span>
                  <p class="content">{{ good.content }}</p>
                  <span class="price" v-if="good.price">￥{{ good.price }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
        <!-- 右边信息栏 -->
      <div class="right-info">
        <button class="aa">免费发布信息</button>
        <h2>近期热门信息</h2>
        <div class="item-info" v-for="(good,index) in goods" :key="index" @click="handleDetail(good)">{{index+1}}、{{good.content}}</div> 
      </div>
        <!-- 分页功能 -->
      <div style="clear:both">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
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
              pageSize: 40, // 每页显示的 条数
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
<style scoped>
  .header {
    margin: 10px 0px;
  }
  .warp {
    margin: 0;
    padding: 5px;
    background-color: rgb(237, 237, 237);
  }
  .item-info{
    line-height: 25px;
    cursor: pointer;
    margin: 10px;
  }
  .item-info:hover {
    color: #035D1C;
    text-decoration: underline;
  }
  h2 {
    margin-left: 10px;
  }
  .aa {
    color: white;
    border: none;
    background-color: rgb(153,182,58);
    width: 160px;
    height: 35px;
    margin: 20px 100px;
    border-radius: 6px;
  }
  .right-info {
    float: right;
    margin-right: 20px;
    background-color:rgb(255, 255, 255);
    width: 375px;
    height: auto;
  }
  .input1 {
    margin-bottom: 20px;
  }
  .el-card {
    width: 730px;
    height: 135px;
  }
  .el-input{
      height: 35px;
      margin: 0px;
      padding: 0px;
  }
  .el-button{
      width: 30px;
  }
  .content {
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
  .price {
        font-size: 10px;
        font-weight: bold;
        display: block;
        color: red;
  }
  .el-link{
      display: inline-block;
      margin-bottom: 8px;
      margin-left: 5px;
      text-decoration: none;
  }
  .el-pagination{
      text-align: center;
  }
</style>