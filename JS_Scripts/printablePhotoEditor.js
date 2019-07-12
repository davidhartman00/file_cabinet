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

function applyedit(cropzoom,url,btnClicked){
	$('#renderedimg').hide();
	$('#photoloading').show();
	var rotate = 0;
	if(btnClicked != 0) {
		rotate = (btnClicked * 90) % 360;
	}; 
	cropzoom.send('resize_and_crop.cfm','POST',{'imgheight':IMAGEHEIGHT,
		'imgwidth':IMAGEWIDTH,
		'showdebug':SHOWDEBUG,
		'editType':'printable',
		'imageTurn':rotate
	},function(rta){
		forward(url);
		if (rta.length){
			if (rta.substring(0,5) == 'error'){
				alert(rta);
				return false;
			}else{
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
		$('#crop').removeClass('btn-aa-red').attr('disabled','disabled');
		$('#continue').addClass('btn-aa-red');
	});
	return true;
};

function initialize_cropzoom(printable,imagewidth,imageheight,minzoom,maxzoom,startzoom){
	var d = new Date();
	var setWidth = imagewidth,
	setHeight = imageheight;
	var cropzoom = $('#crop_container').cropzoom({
		width:setWidth,
		height:setHeight,
		bgColor: '#CCC',
		enableRotation:true,
		enableZoom:false,
		zoomSteps:1,
		rotationSteps:90,
		expose:{
			slidersOrientation: 'horizontal',
			zoomElement: '#zoom',
			rotationElement: '#rot',
			elementMovement:'',
			movementSteps : 1
		},
		selector:{
			centered:true,
			borderColor:'blue',
			w:setWidth,
			h:setHeight,
			maxWidth:setWidth,
			maxHeight:setHeight,
			aspectRatio:true,
			showDimensionsOnDrag:false,
			showPositionsOnDrag:false,
			borderColorHover:'white',
			startWithOverlay: false,
			animated:false,
			hideOverlayOnDragAndResize: true,
			startWithOverlay: false
		},
		image:{
			source:printable +  '?nocache='+d.getTime(),
			width:imagewidth,
			height:imageheight,
			x: (setWidth-imagewidth)/2,
			y: (setHeight-imageheight)/2,
			minZoom:minzoom,
			maxZoom:maxzoom,
			startZoom:startzoom,
			useStartZoomAsMinZoom:false,
			snapToContainer:false,
			onRotate:function(object,degrees){
				jQuery('#divDegrees').html('<p>Rotation: '+degrees+'&deg;</p>');
			}
		}
	});
	return cropzoom;
}