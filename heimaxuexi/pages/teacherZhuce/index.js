// pages/teacherZhuce/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nicheng:'',
    phone:'',
    password:'',
    school:'',
    describe:'',
    gender:'',
    photo:["https://pic.imgdb.cn/item/6220b7d45baa1a80abd58bf3.jpg"]
  },
  getName(event){
    console.log('获取姓名',event.detail.value)
    this.setData({
      nicheng: event.detail.value
    })
  },
  getPhone(event){
    console.log('获取手机号',event.detail.value)
    this.setData({
      phone: event.detail.value
    })
  },
  getPassword(event){
    console.log('获取密码',event.detail.value)
    this.setData({
      password: event.detail.value
    })
  },
  getSchool(event){
    console.log('获取学校',event.detail.value)
    this.setData({
      school: event.detail.value
    })
  },
  getGender(event){
    console.log('获取性别',event.detail.value)
    this.setData({
      gender: event.detail.value
    })

  },
  getDescribe(event){
    console.log('获取个人介绍',event.detail.value)
    this.setData({
      describe: event.detail.value
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
zhuce(){
  let nicheng=this.data.nicheng
  let phone=this.data.phone
  let password=this.data.password
  let school=this.data.school
  let describe=this.data.describe
  let gender=this.data.gender
  let photo=this.data.photo
  console.log("注册点击")
  console.log('nicheng',nicheng)
  console.log("phone",phone)
  console.log("password",password)
  console.log("school",school)
  console.log("describe",describe)
  console.log('gender',gender)
  console.log("photo",photo)
  if(nicheng.length==0) {
    wx.showToast({
      icon:'none',
      title: '请输入姓名',
    })
    return
  }
 
  if(school.length==0) {
    wx.showToast({
      icon:'none',
      title: '请输入学校',
    })
    return
  }
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
  // 查询此用户是否已存在
  wx.cloud.database().collection("teacher")
  .where({
   phone:this.data.phone
  })
  .get({
    success:function(res){
      if(res.data.length==0){
        var myDate=new Date();
        var y=myDate.getFullYear();
        var m=myDate.getMonth()+1;
        var d=myDate.getDate();
        var h=myDate.getHours();
        var ms=myDate.getMinutes();
        var s=myDate.getSeconds();
        var time=y+'-'+m+'-'+d+''+h+':'+ms+':'+s
        wx.cloud.database().collection("teacher").add({
          data:{
            nicheng: nicheng,
            phone: phone,
            password: password,
            school: school,
            describe: describe,
            gender: gender,
            time:time,
            photo:photo
            },
         success(res){
           console.log('注册成功',res)
            wx.showToast({
              title:'注册成功',
            })
            wx.navigateBack({
            delta:1
            })
             },
           // fail(res){
           //     console.log('注册失败',res)
           //   }
       })
      }
      else{
        wx.showToast({
          title: '该手机号已被注册',
          icon:'none'
        })
      }
    }
  })





},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})