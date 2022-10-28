//Page Object
Page({
  data: {
    swiperList:[],
    list:[]
  },
  onLoad: function(options){
    wx.startPullDownRefresh() 

    wx.cloud.database().collection('lunbotu').get()
    .then(res=>{
      console.log('获取成功',res)
      this.setData({
        swiperList: res.data
      })
    })
    .catch(res=>{
      console.log('获取失败', res)
    })
    this.getorder()
  },
  gosearch(){
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },
  goteacherlogin(){
    wx.navigateTo({
      url: '/pages/teacherlogin/index',
    })
  },
  gocategory(){
    wx.switchTab({
      url: '/pages/category/index',
    })
  },
  gofeedback(){
    wx.navigateTo({
      url: '/pages/feedback/index',
    })
  },
  gomore(){
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  getorder(){
    let len=this.data.list.length
    wx.cloud.database().collection('orders')
    .limit(8)
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
    wx.stopPullDownRefresh()

  },
  goxiangqin(e){
    console.log('请求到的详情',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/auth/index?id='+e.currentTarget.dataset.id,
    })
    },
    onShareAppMessage: function () {

    },
    onPullDownRefresh: function () {
      this.getorder()
      this.setData({
        list:[]
      })
      },
    onShareTimeline:function(){

    }
});
