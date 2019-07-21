
var PageTempDispatchShip = function(){
    return {
        defaultOption: {
            basePath:"",
            tempDispatchShipGrid : null,
            statusFly:[{id:1, name:"后台新增"},{id:2, name:"APP新增"}]

        },
        init :function ()
        {
            mini.parse();
            this.basePath = PageMain.basePath;
            this.tempDispatchShipGrid = mini.get("tempDispatchShipGrid");
            this.tempDispatchShipGrid.setUrl(PageMain.defaultOption.httpUrl + "/tempDispatchShip/getList");
            this.funSearch();

        },
        funSearch : function()
        {
        	var tempDispatchShipForm = new mini.Form("tempDispatchShipForm");
        	this.tempDispatchShipGrid.load(tempDispatchShipForm.getData());
        },
        funReset : function()
        {
        	var tempDispatchShipForm = new mini.Form("tempDispatchShipForm");
            tempDispatchShipForm.setData();
            mini.get("queryParamFlag").setValue("1");
            this.tempDispatchShipGrid.load(tempDispatchShipForm.getData());
        },
        funAdd : function()
        {
        	var paramData = {action: "add", row:{}, title:"新增数据"};
            this.funOpenInfo(paramData);
        },
        funModify : function()
        {
        	var row = this.tempDispatchShipGrid.getSelected();
            if(row)
            {
            	var paramData = {action: "modify", row: row, title:"编辑数据"};
                this.funOpenInfo(paramData);
            }
            else
            {
            	PageMain.funShowMessageBox("请选择一条记录");
            }
        },
        funRendererEmptyPhoto: function(e)
        {
            var token = $.cookie("token");
            return '<img style="width: 20px;height:20px;" class="thumbimg" src='+ e.value + "?token="+token +' onclick="PageTempDispatchShip.funEnlargeImage(this)">';
        },
        funEnlargeImage: function(obj)
        {
            var $this = $(obj);
            var src = $this.attr("src");
            var bigImages = [];
            var $imgs = $(".thumbimg");
            for(var i=0; i<$imgs.length; i++){
                var img = {};
                img.url = $imgs[i].src;
                img.index = i;
                $(".thumbimg").eq(i).attr("data-index",i);
                bigImages.push(img);
            }
            window.top.bigpic(src,obj,bigImages);
        },
        funRendererStatus: function (e)
        {
            for(var nItem = 0; nItem < PageTempDispatchShip.defaultOption.statusFly.length; nItem++)
            {
                if(e.value == PageTempDispatchShip.defaultOption.statusFly[nItem].id)
                {
                    return PageTempDispatchShip.defaultOption.statusFly[nItem].name;
                }
            }
            return e.value;
        },

        /*funRendererGoodsType : function (e)
        {
            if (e.value == 1)
            {
                return "孰料"
            }
            else if (e.value == 2)
            {
                return "电煤"
            }
            else if (e.value == 3)
            {
                return "集装箱"
            }
            else if (e.value == 4)
            {
                return "其他"
            }
            return e.value;
        },*/
        funOperRenderer : function(e)
        {
            return '<a class="mini-button-icon mini-iconfont icon-detail" style="display: inline-block;  height:16px;padding:0 10px;" title="详情查看" href="javascript:PageTempDispatchShip.funDetail()"></a>';
        },
        funDetail : function()
        {
            var row = this.tempDispatchShipGrid.getSelected();
            var paramData = {action: "oper", row:row, title:"查看详细"};
            this.funOpenInfo(paramData);
        },
        funOpenInfo : function(paramData)
        {
        	var me = this;
        	mini.open({
                url: PageMain.funGetRootPath() + "/pages/baseinfo/tempDispatchShip_add.html",
                title: paramData.title,
                width: 850,
                height: 30 *  11 + 65,
                onload:function(){
                    var iframe=this.getIFrameEl();
                    iframe.contentWindow.PageTempDispatchShipAdd.funSetData(paramData);
                },
                ondestroy:function(action){
                	me.tempDispatchShipGrid.reload();
                }
            })
        },
        funDelete : function()
        {
            var row = this.tempDispatchShipGrid.getSelected();
            var me = this;
            if(row)
            {
                mini.confirm("确定要删除这条记录?", "提醒", function (action) {
                    if (action == "ok") 
                    {
                        $.ajax({
                            url : PageMain.defaultOption.httpUrl + "/tempDispatchShip/del",
                            type: 'POST',
                            data: {"id": row.id},
                            dataType: 'json',
                            success: function (data)
                            {
                            	
                            	 if (data.success)
                                 {
                                     mini.alert("操作成功", "提醒", function(){
                                         if(data.success)
                                         {
                                        	 me.tempDispatchShipGrid.reload();
                                         }
                                     });
                                 }
                                 else
                                 {
                                     PageMain.funShowMessageBox(data.msg);
                                 }
                            },
                            error: function ()
                            {
                                PageMain.funShowMessageBox("删除记录失败");
                            }
                        });
                    }
                })
            }
            else
            {
                mini.alert("请先选择要删除的记录");
            }
        }
    }
}();

$(function(){
	PageTempDispatchShip.init();
});