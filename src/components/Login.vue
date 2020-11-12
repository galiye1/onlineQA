<template>
  <div>
    <div class="login">
      <a-button type="primary" v-show="this.$store.state.showContentVisible" @click="login">
        登录
      </a-button>
      <a-button type="primary" v-show="this.$store.state.showContentVisible" @click="regis">
        注册
      </a-button>
      <a-dropdown v-show="!this.$store.state.showContentVisible">
        <p class="ant-dropdown-link" @click="e => e.preventDefault()">
          <router-link to="/">{{this.$store.state.username}}<a-icon type="down" /></router-link>
        </p>
        <a-menu slot="overlay">
          <a-menu-item>
            <router-link to="/myComments">我的评论</router-link>
          </a-menu-item>
          <a-menu-item  @click="exit">
            <router-link to="/">退出</router-link>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
<!--    登录界面-->
    <a-modal v-model="this.$store.state.loginVisible" title="登录界面" :footer="null" :destroyOnClose=true @cancel="cancel">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="用户名">
          <a-input v-model="form.username" placeholder="" />
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input v-model="form.password" placeholder="" />
        </a-form-model-item>
        <a-form-model-item label="身份" prop="region">
          <a-select v-model="regisForm.region" placeholder="请选择你的身份">
            <a-select-option value="questioner">
              提问者
            </a-select-option>
            <a-select-option value="answer">
              解答者
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary" @click="submit">
            提交
          </a-button>
        </a-form-model-item>
        <a-form-model-item style="color: red">
          {{err}}
        </a-form-model-item>
      </a-form-model>
    </a-modal>
<!--    注册界面-->
    <a-modal v-model="this.$store.state.regisVisible" title="注册界面" :footer="null" :destroyOnClose=true @cancel="cancel">
      <a-form-model
        ref="ruleForm"
        :model="regisForm"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="用户名" prop="name">
          <a-input
            v-model="regisForm.name"
            @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
          />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="pass">
          <a-input v-model="regisForm.pass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="确认密码" prop="checkPass">
          <a-input v-model="regisForm.checkPass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="身份" prop="region">
          <a-select v-model="regisForm.region" placeholder="请选择你的身份">
            <a-select-option value="questioner">
              提问者
            </a-select-option>
            <a-select-option value="answer">
              解答者
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="regisSubmit">
            提交
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.regisForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regisForm.pass) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      inp: '',
      form: {
        username: '',
        password: ''
      },
      err: '',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      regisForm: {
        name: '',
        region: undefined,
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入你的名字', trigger: 'blur' },
          { min: 3, max: 8, message: '长度为3-8个字', trigger: 'blur' }
        ],
        region: [{ required: true, message: '请选择你的身份', trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }]
      }
    }
  },
  methods: {
    login () { // 打开登录信息框
      this.$store.state.loginVisible = true
    },
    exit () {
      this.$store.state.showContentVisible = true
      this.$store.state.allComments.splice(0, this.$store.state.allComments.length)
      this.$store.state.currentComments.splice(0, this.$store.state.currentComments.length)
    },
    regis () { // 打开注册信息框
      this.$store.state.regisVisible = true
    },
    cancel () { // 关闭登录或注册信息框
      this.$store.state.loginVisible = false
      this.$store.state.regisVisible = false
    },
    submit () { // 提交登陆信息
      this.$store.state.region = this.regisForm.region
      this.$server.isLogin({ username: this.form.username, password: this.form.password, region: this.regisForm.region }).then(res => {
        if (res.data.err) {
          this.err = res.data.err
        } else {
          this.$router.push('/')
          this.$store.state.showContentVisible = false
          this.$store.state.username = res.data.username
          this.$store.state.allComments = res.data.allComments
          this.$store.state.currentComments = res.data.currentComments
          this.$store.state.userId = res.data.userId
          this.$store.state.loginVisible = false
        }
      })
    },
    regisSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const data = { username: this.regisForm.name, password: this.regisForm.pass, region: this.regisForm.region }
          if (data.region === 'questioner') {
            this.$server.registerQuestioner(data)
          } else if (data.region === 'answer') {
            this.$server.registerAnswer(data)
          } else {
            alert('身份错误')
          }
          this.$store.state.regisVisible = false
          this.$router.push('/')
          alert('注册成功!')
        } else {
          console.log('注册失败!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  },
  computed: {
    formItemLayout () {
      const { layout } = this.form
      return layout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
        : {}
    },
    buttonItemLayout () {
      const { layout } = this.form
      return layout === 'horizontal'
        ? {
          wrapperCol: { span: 14, offset: 4 }
        }
        : {}
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .ant-btn{
    margin: 5px;
  }
</style>
