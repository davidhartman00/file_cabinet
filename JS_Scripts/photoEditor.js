function forward(goto){
	if (goto && goto.length > 0){
		setTimeout(function() {
			top.location.href = goto;
		}, 1000);
	}
}

function disablebuttons(){
	$('#crop').attr("disabled", "disabled");
	$('#restore').attr("disabled", "disabled");
	$('#viewprintable').attr("disabled", "disabled");
	$('#openPhotoUploader').attr("disabled", "disabled");
	$('#continue').attr("disabled", "disabled");
}

function enablebuttons(){
	$('#crop').removeAttr("disabled");
	$('#restore').removeAttr("disabled");
	$('#viewprintable').removeAttr("disabled");
	$('#openPhotoUploader').removeAttr("disabled");
	$('#continue').removeAttr("disabled");
}
function applyedit(cropzoom,url){
	$('#renderedimg').hide();
	$('#photoloading').show();
	cropzoom.send('resize_and_crop.cfm','POST',{
		'imgheight':IMAGEHEIGHT,
		'imgwidth':IMAGEWIDTH,
		'showdebug':SHOWDEBUG,
		'editType':'thumb'
	},function(rta){
		forward(url);
		if (rta.length){
			if (rta.substring(0,5) == 'error'){
				alert(rta);
				return false;
			} else {
				$('#result').html(rta);
				$('#result').show();
			}
		}
		$('#renderedimg').hide();
		//refresh rendered image
		var d = new Date();
		var imgurl = RENDEREDURL + '?nocache='+d.getTime();
		var newimg = '<img id="renderedimg" class="renderedimg" src="'+imgurl+'" style="display: inline;">';
		$('#renderedimg').replaceWith(newimg);
		//update the parent image
		$('#photoloading').hide();
		$('#renderedimg').show();
		$('#crop').removeClass('btn-aa-red');
		$('#continue').addClass('btn-aa-red');
	});
	return true;
};

function initialize_cropzoom(printable,imagewidth,imageheight,minzoom,maxzoom,startzoom){
	var d = new Date();
	var cropzoom = $('#crop_container').cropzoom({
        width:300,
        height:300,
        bgColor: '#CCC',
        enableRotation:true,
        enableZoom:true,
        zoomSteps:1,
        rotationSteps:1,
        expose:{
            slidersOrientation: 'horizontal',
            zoomElement: '#zoom',
            rotationElement: '#rot',
            elementMovement:'#movement'
        },
        selector:{
          centered:true,
          borderColor:'blue',
          w:160,
          h:180,
          maxWidth:160,
          maxHeight:180,
          showDimetionsOnDrag:false,
          showPositionsOnDrag:false,
          borderColorHover:'yellow',
          startWithOverlay: true,
          animated:false,
          hideOverlayOnDragAndResize: true,
          startWithOverlay: false
        },
        image:{
            source:printable +  '?nocache='+d.getTime(),
			width:imagewidth,
            height:imageheight,
            minZoom:minzoom,
            maxZoom:maxzoom,
            startZoom:startzoom,
			useStartZoomAsMinZoom:false,
            snapToContainer:false
        }
     });
	return cropzoom;
}