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
            <input type="checkbox" class="item-ck" checked="">
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
//--------------------
   //当购物车没东西时显示空空如也的盒子
   //购物车有数据时显示全选表头和结算的盒子
    if (arr.length != 0) {
      // 处理一些该隐藏的效果和该显示的效果
      $('.empty-tip').hide(); // 隐藏空空如也的提示
      $('.cart-header').show(); // 显示表头
      $('.total-of').show(); // 显示用于结算的div
    }
  });