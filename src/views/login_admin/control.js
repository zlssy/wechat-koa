import { getLoginInfo } from '../../api/api'
export default {
  data() {
    var checkName = (rule, value, callback) => {
      let that = this;
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        username: "",
        pass: ""
      },
      rules: {
        username: [
          {
            validator: checkName,
            trigger: "blur"
          }
        ],
        pass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    Login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userInfo = {
            username: this.userInfo.username,
            password: this.userInfo.pass
          };
          requestLogin(userInfo).then(data => {
            let { msg, code, user } = data;
            if (code !== 200) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              console.log(user);
              sessionStorage.setItem("user", JSON.stringify(user));
              this.$router.push({
                path: "/dashboard"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async adminLogin() {
      let userInfo = {
        userEmail: this.userInfo.username,
        passWord: this.userInfo.pass
      };
      console.log('登录数据', userInfo)
      let res = await getLoginInfo(userInfo)
      if (res.code === 200) {
        this.$router.push({
          path: "/homepage"
        });
      } else {
        alert(`${res.message}`)
      }
    }
  }
};
