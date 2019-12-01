$(function () {

    // 第一个功能： 先读取本地数据中的数据，然后动态的生成列表结构
    let arr = kits.loadData('cartListData');
    // 跟list.js一样，准备一个空字符串，然后进行累加即可
    let html = '';
      // 遍历数组，生成指定的结构
    arr.forEach(e => {
      // 需要有一个产品的id，用于后期的一些其他操作
      html += `<div class="item" data-id="${e.pID}">
      <div class="row">
        <div class="cell col-1 row">
          <div class="cell col-1">
          <input type="checkbox" class="item-ck" ${e.isChecked ? "checked" : ''}>
          </div>
          <div class="cell col-4">
            <img src="${e.imgSrc}" alt="">
          </div>
        </div>
        <div class="cell col-4 row">
          <div class="item-name">${e.name}</div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="price">${e.price}</em>
        </div>
        <div class="cell col-1 tc lh70">
          <div class="item-count">
            <a href="javascript:void(0);" class="reduce fl ">-</a>
            <input autocomplete="off" type="text" class="number fl" value="${e.number}">
            <a href="javascript:void(0);" class="add fl">+</a>
          </div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="computed">${e.number * e.price}</em>
        </div>
        <div class="cell col-1">
          <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
        </div>
      </div>
    </div>`;
    })
    //累加的商品从后面插入
    $('.item-list').append(html);
    //-------------------------
    //刷新后仍保持原来的勾选状态
    let noCkAll = arr.find(e=>{
      return e.isChecked === false;
    });
    if(noCkAll){
      // 有没有勾选的产品
      $('.pick-all').prop('checked',false);
    }
    
//--------------------
   //当购物车没东西时显示空空如也的盒子
   //购物车有数据时显示全选表头和结算的盒子
    if (arr.length != 0) {
      // 处理一些该隐藏的效果和该显示的效果
      $('.empty-tip').hide(); // 隐藏空空如也的提示
      $('.cart-header').show(); // 显示表头
      $('.total-of').show(); // 显示用于结算的div
    }

//-----------------------------
//实现全选与点选
//点击表头的全选时
$('.pick-all').on('click',function(){
//jq里的开关属性的两种方法: 1.获取开关属性：jq对象.prop（属性名）
//2.设置开关属性：jq对象.prop（属性名，属性值）
let status=$(this).prop('checked');
$('.item-ck').prop('checked',status);
$('.pick-all').prop('checked',status);
//将选状态存入本地，实现页面与本地一致
arr.forEach(e=>{
  e.isChecked = status;
})
// 重新存进本地数据
kits.saveData('cartListData',arr);

})
//由于购物车里的商品都是动态生成，使用要有委托
$('.item-list').on('click','.item-ck',function(){
    //如果勾选个数和总个数一致就是全选
    let ckall=$('.item-ck').length===$('.item-ck:checked').length;
    //设置全选等于ckall
    $('.pick-all').prop('checked',ckall);
    //将选状态存入本地，实现页面与本地一致
    //通过点选商品的id，到本地修改isChecked属性
    let pID = $(this).parents('.item').attr('data-id');
    // 获取当前这个单选是否是选中
    let isChecked = $(this).prop('checked');
    // console.log(pID);
    arr.forEach(e=>{
      if(e.pID == pID){
        // 就需要把当前这个产品的选中状态改成和勾选状态一致
        e.isChecked = isChecked;
      }
    });
    // 把数据更新会本地数据
    kits.saveData('cartListData',arr);
})

  });