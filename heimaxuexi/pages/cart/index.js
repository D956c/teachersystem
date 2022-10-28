// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh()
   this.getorder()
  },
  getorder(){
    let len=this.data.list.length
    wx.cloud.database().collection('orders')
    .skip(len)
    .orderBy('_updateTime','desc') 
    .get()
     .then(res=>{
       wx.stopPullDownRefresh()
       console.log('请求到数据',res)
       this.setData({
         list: this.data.list.concat(res.data)
       })
     })
    .catch(res=>{
      console.log('请求失败',res)
    })
  },
  goxiangqin(e){
  console.log('请求到的详情',e.currentTarget.dataset.id)
  wx.navigateTo({
    url: '/pages/auth/index?id='+e.currentTarget.dataset.id,
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
    this.setData({
      list:[]
    })
    this.getorder()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getorder()

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})