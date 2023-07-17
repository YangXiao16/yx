
<template>
    <div class="warp">
        <div class="center">
            <div class="top">用户注册</div>
            <div class="cen">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickName">
                        <el-input v-model="ruleForm.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="but">
                已有账号?
                <router-link to="/login">点我登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { userRegister } from '@/api/user';
    export default {
        name:"myRegister",
        data(){
            return {
                ruleForm: { //用户对象的信息
                    userName:"",
                    password:"",
                    nickName:"",
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    nickName: [
                        { required: true, message: '请输入用户昵称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
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
                        let params = {avatar: "rongxiaotong.gif",...this.ruleForm}
                        userRegister(params)
                        // axios.post("http://localhost:9090/user/add",this.ruleForm)
                            .then(res => {
                            if(res.flag){
                                this.$message.success(res.message);
                                // location.href = "./#/login";
                                // 程序执行到该为止会自动跳转到指定路由地址
                                this.$router.push("/login")
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
        height: 330px;
        width:503px;
        background:white;
        border-radius: 10px;
    }
    .el-input {
        width: 300px;
        margin-bottom: 20px;
    }
    .el-button {
        width: 300px;
        height: 45px;
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