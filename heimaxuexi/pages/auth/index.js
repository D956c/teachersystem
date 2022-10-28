
let ID=''
let Phone=''

Page({

  /**
   * 页面的初始数据
   */
  data: {
   exist:'', 
   order:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getTeacher()
    console.log('携带的值',options)   
    ID=options.id
    // Phone=teacher.phone

  wx.cloud.database().collection('orders')
    .doc(ID)
    .get()
     .then(res=>{
       console.log('请求到详情数据',res)
       this.setData({
        order:res.data,
       })
     })
    .catch(res=>{
      console.log('请求失败',res)
    }) 

  },
  getTeacher(){
    let teacher=wx.getStorageSync('teacher')
    console.log('取缓存',teacher)
    wx.stopPullDownRefresh()
    if(teacher&&teacher.nicheng){
      this.setData({
      exist:teacher,
      Phone:teacher.phone
    })
    console.log("教师登录")
    }else{
      this.setData({
        exist:false
      })
      console.log("教师未登录")
    }
  
  },
  yuyue(){
    console.log('id值',ID)
    console.log("预约点击")
   
    let Phone=this.data.Phone
    console.log('接单人',Phone)
    wx.cloud.callFunction({
      name:"yuyue",
      data:{
        id:ID,
        condition: 3,
        man:this.data.Phone

      }
    })
    .then(res=>{
      console.log('预约成功',res)
      wx.showModal({
        title:'预约成功，请联系家长确定试教时间',
        cancelColor: 'cancelColor',
        showCancel:false,
        success:function(res){
          if(res.confirm){
        wx.navigateTo({
           url: '../order/index',
         })
          }
        }
      })
    })
    .catch(res=>{
      console.log('预约失败')

    })

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

  }
})