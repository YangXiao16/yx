
<template>
    <div class="warp">
        <div class="center">
            <div class="top">用户登录</div>
            <div class="cen">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="but">
                还未注册?
                <router-link to="/register">点我注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { userLogin, getUserInfo} from '@/api/user';
    export default {
        name:"myLogin",
        data(){
            return {
                ruleForm: { //用户对象的信息
                    username:"",
                    password:"",
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max:18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {// 表单验证成功的代码
                        userLogin(this.ruleForm)
                            .then(res => {
                            if(res.flag){
                                this.$message.success("登录成功~~~");
                                //需要将用户token保存起来
                                let tk = res.data;
                                //将token信息保存到 localStorage
                                //window.localStorage.setItem("token",tk);
                                this.$store.commit("setToken",tk);
                                getUserInfo(this.ruleForm.username)
                               .then(res => {
                                   console.log("用户信息获取： ",res);
                                   if(res.flag){
                                       // 获取用户信息
                                       this.$store.commit("setUser",res.data);
                                   }else{
                                       this.$message.error("获取用户信息失败");
                                   }
                               })
                                // location.href = "./#/login";
                                // 程序执行到该为止会自动跳转到指定路由地址
                                this.$router.push("/home/front")
                                    .catch(err => this.$message.error(`页面跳转时，发生了异常: ${err}`));
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                            .catch(err => {
                            this.$message.error("程序出错"+ err);
                        })
                    } else {// 验证失败
                        this.$message.error("表单验证失败请检查~~");
                        return false;
                    }
                });
            }
        },
    }


</script>


<style scoped>
    * {
        margin: 0px;
        padding: 0px;
    }
    .warp {
        width: 1185px;
        height: 596px;
        background-image: url(../assets/img/rice.png);
        background-repeat: no-repeat;
        background-size: cover;
        /* background-color: grey; */
    }
    .center {
        width: 470px;
        height: 300px;
        position: relative;
        left: 328px;
        top:120
        /* margin: 200px auto; */
        /* background-color: greenyellow; */
    }
    .top {
        padding-top: 40px;
        width: 470px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 30px;
        font-weight: 500;
        font-family: 宋体;
        color:aliceblue;
    }
    .cen {
        padding-top: 60px;
        height: 280px;
        width:503px;
        background:white;
        border-radius: 10px;
    }
    .el-input {
        width: 300px;
        margin-bottom: 50px;
    }
    .el-button {
        width: 300px;
        height: 40px;
    }
    .but {
        width: 503px;
        height: 40px;
        border: 1px solid white;
        border-radius: 5px;
        background-color:transparent;
        margin-top: 40px;
        line-height: 40px;
        text-align: center;
    }
    a {
        text-decoration: none;
        color:greenyellow;
    }
</style>