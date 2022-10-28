
Page({
  /**
   * 页面的初始数据
   */
  data: {
    exist:'',
    nicheng:'',
    password:'',
    school:'',
    describe:'',
    photo:'',
    fileID:[],

  },
  getphoto(photo) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res=> {
        this.uploadImg(res.tempFilePaths[0])
      }
    })
  },
  uploadImg(temFile){
   var teacherphoto=new Date().getTime()+".jpg"
   console.log("要上传的临时路径",temFile)
   wx.cloud.uploadFile({
     cloudPath:teacherphoto,
     filePath: temFile,
    success:res=>{
      this.setData({
        photo:res.fileID
      })
      console.log('上传成功',res)
    },
    fail(err){
      console.log('上传失败',err)
    }
     
   })
  },
  getName(event){
    console.log('获取姓名',event.detail.value)
    this.setData({
      nicheng: event.detail.value
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

  getDescribe(event){
    console.log('获取个人介绍',event.detail.value)
    this.setData({
      describe: event.detail.value
    })

  },

  getTeacher(){
    let teacher=wx.getStorageSync('teacher')
    console.log('用户信息',teacher)
    if(teacher&&teacher.nicheng){
      this.setData({
      exist:teacher,
      nicheng:teacher.nicheng,
      password:teacher.password,
      school:teacher.school,
      describe:teacher.describe,
      phone:teacher.phone,
      photo:teacher.photo
    })
    }else{
      this.setData({
        exist:false
      })
      console.log('未登录')
    }
  

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeacher()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  update(){
    // let filePath=this.data.photo
    let photo=this.data.photo
    let nicheng=this.data.nicheng
    let password=this.data.password
    let school=this.data.school
    let describe=this.data.describe
    console.log("修改点击")
    console.log('photo',photo)
    console.log('nicheng',nicheng)
    console.log("password",password)
    console.log("school",school)
    console.log("describe",describe)
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

    wx.cloud.database().collection("teacher")
    .where({
      phone:this.data.phone
     })
    .update({
      data:{
        photo:photo,
        nicheng: nicheng,
        password:password,
        school:school,
        describe:describe
      }
    })
    .then(res=>{
      console.log('修改成功',res)
     
      wx.showModal({
        title:'修改成功，请重新登录',
        cancelColor: 'cancelColor',
        showCancel:false,
        success:function(res){
          if(res.confirm){
        wx.navigateTo({
           url: '../teacherlogin/index',
         })
          }
        }
      })
  

    })
    .catch(res=>{
      console.log('修改失败',res)
    })

   
  }
 
})