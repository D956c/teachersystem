//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options){
    wx.cloud.init({
      env:'cloud1-3gv59zvp6dcbfbcc'
    })
    
  }
  
});