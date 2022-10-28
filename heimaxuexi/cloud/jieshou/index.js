// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.database().collection("orders")
  .doc(event.id)
  .update({
    data:{
     condition: event.condition,
    }
  })
  .then(res=>{
    console.log('取消成功',res)
    return res
  })
  .catch(res=>{
    console.log('取消失败',res)
    return res
  })
}