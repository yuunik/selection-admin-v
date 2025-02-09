<script setup lang="ts">
import { ref } from 'vue'
import { ChatDotSquare, Iphone, Lock, User } from '@element-plus/icons-vue'

// 用户账户
const username = ref('')
// 用户密码
const password = ref('')
// 登录方式
const loginType = ref('password')
// 是否需要注册
const isRegister = ref(false)
// 是否发送验证码
const isSendSms = ref(false)
// 验证码倒计时
const count = ref(60)

// 登录
const login = () => {}

// 重置
const resetForm = () => {}

// 注册
const gotoRegister = () => {
  console.log('gotoRegister')
  loginType.value = 'captcha'
  isRegister.value = true
}

// 发送验证码
const sendSms = () => {
  // 打开发送验证码的标记
  isSendSms.value = true
  // 倒计时
  countDown()
}

// 倒计时
const countDown = () => {
  const timerId = setInterval(() => {
    if (count.value === 1) {
      count.value = 60
      // 重置定时器
      clearInterval(timerId)
      // 重置发送验证码标记
      isSendSms.value = false
    } else {
      count.value -= 1
    }
  }, 1000)
}
</script>

<template>
  <div class="bg">
    <div class="login-container">
      <!-- 欢迎图 -->
      <img
        src="../../assets//login_left2.png"
        alt="欢迎图"
        class="welcome-img"
      />
      <!-- 表单 -->
      <div class="form-container">
        <!-- 表单 -->
        <div class="form">
          <!-- 表单标题 -->
          <strong class="form-title">
            <!-- 网站logo -->
            <img src="../../assets/vue.svg" alt="logo" class="website-logo" />
            <span>Selection-Admin</span>
          </strong>
          <!-- 登录方式 -->
          <div class="login-method">
            <span class="bycaptcha" @click="loginType = 'captcha'">
              短信登录
            </span>
            <el-divider direction="vertical" />
            <span class="bypwd" @click="loginType = 'password'">密码登录</span>
          </div>
          <!-- 表单内容 -->
          <!-- 登录表单 -->
          <el-form
            label-width="80"
            class="login-form"
            v-if="loginType === 'password'"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="username"
                placeholder="请输入用户名"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>
            <el-form-item class="btn-grp">
              <el-button type="primary" @click="login" round>登录</el-button>
              <el-button
                type="default"
                @click="resetForm"
                round
                style="margin-left: 50px"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
          <!-- 短信登录表单 -->
          <el-form
            label-width="80"
            class="sms-form"
            v-if="loginType === 'captcha'"
          >
            <el-form-item label="手机号" prop="phone">
              <el-input placeholder="请输入手机号" :prefix-icon="Iphone" />
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-input placeholder="请输入验证码" :prefix-icon="ChatDotSquare">
                <template #suffix>
                  <el-button
                    type="primary"
                    @click="sendSms"
                    link
                    :disabled="isSendSms"
                  >
                    {{ isSendSms ? `${count}秒后重发` : '获取验证码' }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="btn-grp">
              <el-button type="primary" @click="login" round>
                {{ isRegister ? '注册' : '登录' }}
              </el-button>
              <el-button
                type="default"
                @click="resetForm"
                round
                style="margin-left: 50px"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
          <!-- 其他登录方式 -->
          <div class="third-login-method">
            <el-divider>第三方登录</el-divider>
            <div class="icon-grp">
              <!-- QQ登录图标 -->
              <SvgIcon
                iconName="QQ"
                class="qq-icon"
                width="25"
                height="25"
                color="#10aeff"
              />
              <el-divider direction="vertical" />
              <!-- 微信登录图标 -->
              <SvgIcon
                iconName="wechat"
                class="wechat-icon"
                width="25"
                height="25"
                color="#2cb733"
              />
            </div>
          </div>
          <!-- 立即注册 -->
          <el-button
            type="primary"
            class="register-btn"
            link
            @click="gotoRegister"
          >
            立即注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  background: #eee url('../../assets/login_bg.svg') no-repeat;
  background-size: cover;

  .login-container {
    width: 98%;
    height: 96%;
    background-color: #ffffff7e;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    // 欢迎图
    .welcome-img {
      width: 50%;
      height: 100%;
      object-fit: contain;
    }

    // 表单容器
    .form-container {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      // 表单
      .form {
        width: 420px;
        height: 420px;
        background-color: #fff;
        box-shadow: 0 0 10px #ccc;
        border-radius: 12px;
        padding: 20px;
        box-sizing: border-box;
        position: relative;

        // 表单标题
        .form-title {
          font-size: 35px;
          display: flex;
          justify-content: center;
          align-items: center;

          // 网站logo
          .website-logo {
            width: 75px;
            height: 75px;
          }
        }

        // 登录方式
        .login-method {
          font-size: 18px;
          margin: 20px 0;
          display: flex;
          justify-content: center;
          align-items: center;

          // 短信登录
          .bycaptcha {
            @include login-method-theme;
          }

          // 密码登录
          .bypwd {
            @include login-method-theme;
          }
        }

        // 登录表单
        .login-form {
          // 按键组
          .btn-grp {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }

        // 第三方登录方式
        .third-login-method {
          .icon-grp {
            @include center-theme;

            .qq-icon {
              cursor: pointer;
            }

            .wechat-icon {
              cursor: pointer;
            }
          }
        }
      }

      // 立即注册按钮
      .register-btn {
        position: absolute;
        bottom: 20px;
        right: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
