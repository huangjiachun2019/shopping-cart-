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
    // 点击全选的时候，也需要把数据重新更新
        calcTotal();
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
        // 每次点选需要计算总价和总件数
        calcTotal();
})

//-------------------------
//封装一个计算总价与总件数的函数，方便使用时调用
function calcTotal() {
 //计算时需要从本地拿 isChecked 为true的数据进行计算
  let totalCount = 0; // 总件数
  let totalMoney = 0; // 总价格
  arr.forEach(e => {
    if (e.isChecked) {
      totalCount += e.number;
      totalMoney += e.number * e.price;
    }
  })
  // 把总价和总件数更新到页面里面
  $('.selected').text(totalCount);
  $('.total-money').text(totalMoney);
}
// 需要一开始就计算一次
calcTotal();

//--------------------------------
 // 实现数量的加号
 //使用委托点击加减更改数量
 $('.item-list').on('click','.add',function(){
  // 让 输入框里面的 数量增加
  let prev=$(this).prev();
  let current=prev.val();
  //点击递增
  prev.val(++current);
  // 数量也要更新到本地数据（同点选、全选更改本地同理）
  let id=$(this).parents('.item').attr('data-id');
  let obj=arr.find(e=>{
    return e.pID == id;
  });
  obj.number=current;
  // 把数据更新会本地数据
  kits.saveData('cartListData',arr);
  // 调用上一个封装函数进行重新计算
  calcTotal();
  // 更新右边的总价
 // find这个方法用于查找某个元素的后代元素中，满足条件的部分
  $(this).parents('.item').find('.computed').text(obj.number * obj.price);
})

  // 实现数量的减号
  $('.item-list').on('click','.reduce',function(){
    // 让 输入框里面的 数量增加
    let next=$(this).next();
    let current=next.val();
    // 商品不可以小于1
    if(current<= 1){
      alert('商品的件数不能小于1');
      return;
    }
    //点击递减
    next.val(--current);
    // 数量也要更新到本地数据
    let id = $(this).parents('.item').attr('data-id');
    let obj = arr.find(e=>{
      return e.pID == id;
    });
    obj.number = current;
    // 把数据更新会本地数据
    kits.saveData('cartListData',arr);
    // 调用上一个封装函数进行重新计算
    calcTotal();
    // 更新右边的总价
    $(this).parents('.item').find('.computed').text(obj.number * obj.price);
  })

  //----------------------
  //手写输入时，以输入框失焦为数据更改完毕，下面就开始写手写输入后相关数据的改变
  //同理，使用委托获取失焦(blur)事件
  $('.item-list').on('blur','.number',function(){

let current=$(this).val();
//与加减一样，需验证用户输入内容
if (current.trim().length === 0 || isNaN(current) || parseInt(current) <= 0) {
  let old=$(this).attr('data-old');
  // 如果用户输入的不正确，恢复之前的正确的数字
  $(this).val(old);
  alert('输入有误，请从新正确数字');
  return;
}
//如果输入正确，将数据存入本地把相应数据更新
let id=$(this).parents('.item').attr('data-id');
let obj=arr.find(e=>{
  return e.pID==id;  
});
obj.number = parseInt(current);
// 把数据更新会本地数据
kits.saveData('cartListData',arr);
// 更新总件数和总价格
calcTotal();
// 更新右边的总价
$(this).parents('.item').find('.computed').text(obj.number * obj.price);
})

});
  