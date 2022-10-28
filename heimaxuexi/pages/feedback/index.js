//Page Object
Page({
  data: {
    list:[]
  },
  //options(Object)
  onLoad: function(options){
    wx.cloud.database().collection('our')
    .get()
     .then(res=>{
       
       console.log('请求到数据',res)

       this.setData({
        list: this.data.list.concat(res.data)
       })
     })
    .catch(res=>{
      console.log('请求失败',res)
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});