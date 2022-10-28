Page({
data:{
list:[]
},

  onLoad(options){
   wx.startPullDownRefresh() 
   this.getList()
  },
  getList(){
  let len=this.data.list.length
   wx.cloud.database().collection('teacher')
   .skip(len)
   .orderBy('time','desc') 
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
  onPullDownRefresh: function () {
    this.setData({
      list:[]
    })
    this.getList()
    },
  onReachBottom:function (){
    this.getList()
  },


})