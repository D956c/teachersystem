Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
    loginOk:''
  },
  getPhone(e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })

  },
  getPassword(e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })

  },
  goto_index() {
    let phone=this.data.phone
    let password=this.data.password
    console.log('ddddd')
    console.log('phone',phone)
    console.log('password',password)
    if(phone.length!=11) {
      wx.showToast({
        icon:'none',
        title: '号码输入错误',
      })
      return
    }
    if(password.length<6) {
      wx.showToast({
        icon:'none',
        title: '密码最少六位',
      })
      return
    }
    if(password.length>16) {
      wx.showToast({
        icon:'error',
        title: '密码最多十六位',
      })
      return
    }
    console.log(phone)
    console.log(password)
    // 数据库请求比较
    wx.cloud.database().collection("teacher")
    .where({
      phone: phone,
      password: password
    }).get().then(res => {
      console.log('返回数据',res)
      let teacher=res.data[0]
      console.log('teacher',teacher)
      if (res.data && res.data.length>0) {
        console.log("登录成功")
        wx.showToast({
          title:'登录成功'
        })
        // 返回上一级页面
       wx.navigateBack({
        //  complete: (res) => {},
        delta:1
       })
      //  保存登录信息
       wx.setStorageSync('teacher', teacher)
      }else{
        wx.showToast({
          icon:"error",
          title:'账号或密码错误'
        })
      }
    }).catch(res => {
      console.log('请求失败',res)
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let teacher=wx.getStorageSync('teacher')
    // if (teacher&&teacher.phone){
    //   this.setData({
    //     loginOk:true
    //   })
    // }else{
    //   this.setData({
    //     loginOk:false
    //   })
    // }
  },
  onShow(){
    let teacher=wx.getStorageSync('teacher')
    if (teacher&&teacher.phone){
      this.setData({
        loginOk:true,
        nicheng:teacher.nicheng

      })
      console.log('成功')
    }else{
      this.setData({
        loginOk:false
      })
      console.log('失败')
    }
  },
  tuichu(){
    this.setData({
      loginOk:""
     })
     wx.setStorageSync('teacher', null)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  goto_zhuce:function(res){
    wx.navigateTo({
      url: '../teacherZhuce/index',
    })
  }

})
