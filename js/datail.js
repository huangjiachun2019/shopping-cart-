
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
//修改价格
$('.sku-name').text(target.name);
$('.dd>em').text(`￥${target.price}`);
$('.preview-img>img').attr('src',target.imgSrc)

})