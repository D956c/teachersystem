// pages/order/index.js
let man=''
let ID=''
let Phone=''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    exist:'',
    list:'',
    tabs:[
      {
        id:0,
        name:"已预约",
        isActive:true
      },
      {
        id:1,
        name:"进行中",
        isActive:false
      },
      {
        id:2,
        name:"已完成",
        isActive:false
      }
    ]
  },
  handleItemChange(e){
    const {index}=e.detail;
    // console.log(index);
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })

  },
  getTeacher(){
    let teacher=wx.getStorageSync('teacher')
    console.log('取缓存',teacher)
    wx.stopPullDownRefresh()
    if(teacher&&teacher.nicheng){
      this.setData({
      exist:teacher,
      nicheng:teacher.nicheng,
      man:teacher.phone

    })
    console.log("shujuhuoquchengg")
    }else{
      this.setData({
        exist:false
      })
      console.log("meiyoushuju")
    }
  
  },
  getorder(){
    let man=this.data.man
    // let ID=this.data.num
    console.log('接单人',man)
    // console.log('订单id',ID)

    wx.cloud.database().collection('orders')
    .where({
      man:this.data.man,
      // condition:3
    })
    .get()
     .then(res=>{
       console.log('请求到的个人数据',res)
       this.setData({
         list: res.data,
        //  ID:res.data.id
       })
     })
    .catch(res=>{
      console.log('请求失败',res)

    })
    wx.stopPullDownRefresh()

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
   wx.startPullDownRefresh() 
   this.getTeacher()
   this.getorder()
   ID=options.id


  },
  quxiao(e){
    let ID=e.currentTarget.dataset.id
    console.log('id值',ID)
    console.log("取消点击")
    let Phone=this.data.man
    console.log('接单人',man)
    wx.cloud.callFunction({
      name:"quxiao",
      data:{
        id:ID,
        condition: 0,
        man:null

      }
    })
    .then(res=>{
      console.log('取消成功',res)
      wx.showToast({
        title: '订单已取消',
      })
      wx.startPullDownRefresh() 

    })
    .catch(res=>{
      console.log('取消失败',res)

    })
  },
  jieshou(e){
    let ID=e.currentTarget.dataset.id
    console.log('id值',ID)
    console.log("接受订单")
    wx.cloud.callFunction({
      name:"jieshou",
      data:{
        id:ID,
        condition: 2,
      }
    })
    .then(res=>{
      console.log('接受成功',res)
      wx.showToast({
        title: '订单已接受',
      })
      wx.startPullDownRefresh() 

    })
    .catch(res=>{
      console.log('接受失败',res)

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
  // 下拉刷新
  onPullDownRefresh: function () {
  this.getTeacher()
  this.getorder()
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