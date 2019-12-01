
$(()=>{
    //location.search是获取链接中？后面的一种方法
    //substring(4)就是将字符串从第4位后进行截取，此处目的主要是截取id
    let id=location.search.substring(4);

    //将id对应的数据获取出来，使用find（寻找）的方法
    let target=phoneData.find(e=>{
        //返回条件,使id等于数组所定义的pID
        return e.pID==id;
    });

//把该页面会改变的动态数据修改，此处模拟数据库所以修改较少（以下3个）
//修改动态名字
$('.sku-name').text(target.name);
//修改动态价格
$('.dd>em').text(`￥${target.price}`);
//修改动态图片
$('.preview-img>img').attr('src',target.imgSrc)

//------------------
//点击加入购物车
$('.addshopcar').on('click', function () {
//先获取输入框个个数
let number=$('.choose-number').val();
//保证输入框输入是正确的数字，且不能为空(trim是去除空格的函数)
if(number.trim().length===0||isNaN(number)||parseInt(number)<=0){
    alert('商品数量有误，请正确输入');
    return;
}
//把相关信息存入本地，因数据多，需建立数组进行存储
//定义一个键，用于读取本地数据
let arr=kits.loadData('cartListData')
//有了数组就可以存数据了
//数组里存的是对象，每个商品都是一个对象，需要自己构造数据对象
let obj ={
    pID : target.pID,
    imgSrc : target.imgSrc,
    name : target.name,
    price : target.price,
    // 件数要从输入框里面获取
    number : number
};
    // 把数据放到数组里面
    arr.push(obj);
    //存到本地数据
    kits.saveData('cartListData',arr)



})

})