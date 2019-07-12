function adddebug(text){
	debugdata = debugdata + text + '\n';
	if (showdebug == true){
		var  contents = '<textarea cols="48" rows="10" id="debugpanel">' + debugdata + '</textarea>'
		$('#debugdata').html(contents);
		var area = $('#debugpanel');
		area.scrollTop(area[0].scrollHeight - area.height());
	}
}

if(typeof(plupload) != 'undefined'){
	var ERROR = false;
	var timerid = 'video1'
	var debugdata = '';
	var carturl = '/ucart/index.cfm?view=showcart';
	function capitaliseFirstLetter(string){
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function progressmessage(message)	{
		$('#progressmsg').show();
		$('#progressmsg').html(capitaliseFirstLetter(message));
	}

	function addtocartbuttons()	{
		$('#addtocartbutton').show();
	}

	function progressbarhide(){
		progress = 0;
		$('#progressbarcontainer').hide();
		$('#progressbar').progressbar('value', 0);
		$('.upload-form .ui-progressbar, .upload-form .ui-progressbar-value')
		$('#progressbar .ui-progressbar-value').html('<span class="progressTooltip">' + 0 + '%</span>');
	}

	function progressbarshow(){
		$('#progressbarcontainer').show();
		$('#progressbar').progressbar('value', progress);
		$('#progressbar').css("display","block");
		$('#progressbar .ui-progressbar-value').html('<span class="progressTooltip">' + progress + '%</span>');
	}

	function disableuploader(){
		$('#controls').hide();
		$('#allowedextensions').hide();
	}

	function browsernotsupported(){
		$('#controls').hide();
		displayerror('This uploader does not support your current browser.  The following browsers are supported: Internet Explorer 10+, Firefox 18+, Safari 6+, IOS 6+ ');
	}

	function displayerror(error){
		ERROR = true;
		uploader.files =[];
		progressbarhide();
		$('#errormsg').show();
		$('#errormsg').html(error);
	}

	function reseterror(){
		ERROR = false;
		$('#errormsg').hide();
		$('#errormsg').html('');
	}

	function pausecomp(ms){
		ms += new Date().getTime();
		while (new Date() < ms){}
	}

	function uploadfinished(up,original_file_name,original_file_size,filePath,fileURL,fileName){
		progressbarhide();
		$('#errormsg').hide();
		var d = new Date();
		var imagesrc = fileURL + '/' + fileName + '?nocache='+d.getTime();
		var image = '<img src="'+imagesrc+'" width="200px" id="printable"><br><br>';
		var image = image + '<a class="btn btn-aa-red" id="starteditbutton" onclick="';
		var image = image + 'openprintablephotoeditor('+finishedfile+',\''+escape(filePath)+'\',\''+escape(fileURL)+'\',\''+escape(fileName)+'\')';
		var image = image + ';">Continue</a>';
		$('#progressmsg').html(image);
		$('#progressmsg').show();
		//bind the new button

		//openeditor(filePath,fileURL,fileName);
	}


	// Upload Form

	$(function() {
		var uploader = new plupload.Uploader({
			runtimes: runtimes,
			multiple_queues: false,
			browse_button : 'pickfiles', // The id on the select files button
			multi_selection: false, // Allow to select one file each time
			container : 'uploader', // The id of the upload form container
			url: '/photoUploader/photoUploaderService.cfm',
			max_file_size: maxfilesize, //in kb
			max_file_count: 1,
			urlstream_upload: false,
			multipart: true,
			unique_names : false,
			rename: true,
			flash_swf_url : '/assets/js/plupload-1.5.5/plupload.flash.swf', // The url to thye flash file
			silverlight_xap_url : '/assets/js/plupload-1.5.5/plupload.silverlight.xap', // The url to the silverlight file
			filters : [
		  		{title : "All Video Files", extensions : allowedextensions}
			],
			multipart_params: {
				'action': 'upload',
				'finishedfile': finishedfile
			},
		});

		// RUNTIME
		uploader.bind('Init', function(up, params) {
			$('#runtime').text(params.runtime);
			if (up.runtime == "html4")
			{
			browsernotsupported();
			}
		});

		// Start Upload ////////////////////////////////////////////
		// When the button with the id "#uploadfiles" is clicked the upload will start
		$('#uploadfiles').click(function(e) {
			progress = 0;
			if (uploader.files.length > 0 && ERROR == false)
				{
				progressbarshow();
				progressmessage('Uploading');
				uploader.start();
				}
			 else
				{
				//progressbarhide();
				//progressmessage('Click the "Browse" button to select a video for upload');
				}
			e.preventDefault();
		});


		// Selected Files //////////////////////////////////////////
		// When the user select a file it wiil append one div with the class "addedFile" and a unique id to the "#filelist" div.
		// This appended div will contain the file name and a remove button
		uploader.bind('FilesAdded', function(up, files) {
			ERROR = false;
			$('a[id=uploadfiles]').removeClass("disabled");
			uploader.splice();
			uploader.stop();
			uploader.refresh();
			$('#filelist').empty();
			progressbarhide();
			$('#errormsg').hide();
			var file = files[0];
			var illegal = file.name.indexOf('*');
			reseterror();

				if (file.size > largefilewarning){
					displayerror('You are attempting to upload a large file '+ parseFloat(file.size / 1000000).toFixed(0) + 'mb. \nPlease do not close or click on your browser window once the upload begins.')
				} else if (illegal != -1) {
							// make sure file does not have special characters
					displayerror('File name contains illegal characters (* / \\). Please edit your file name and reselect the file by clicking browse.');
					adddebug('[uploader.FilesAdded] File name:'+ file.name + ' contains illegal characters');
				} else {
					adddebug('[uploader.FilesAdded] File name:'+ file.name);
					adddebug('[uploader.FilesAdded] File size:'+ file.size);
					progressmessage('Click the Upload button to continue');
					$('#errormsg').hide();
					$('#filelist').append('<div class="addedFile" id="' + file.id + '">' + file.name + '<a href="#" id="' + file.id + '" class="removeFile"></a>' + '</div>');
				}

			if (ERROR == true) {
				uploader.removeFile(file.id);
				$('.addedFile').remove();
				uploader.stop();
				uploader.total.reset();
				$('#progressbar').hide();
				$('a[id=uploadfiles]').addClass("disabled");
				$('#progressmsg').hide();
			}
			uploader.refresh(); // Reposition Flash/Silverlight
		});

		// Error Alert /////////////////////////////////////////////
		uploader.bind('Error', function(up, err) {
			displayerror("Error: " + err.code + ", Message: " + err.message + (err.file ? ", File: " + err.file.name : "") + "");
			$('#progressmsg').hide();
			$('#progressbar').hide();
			up.total.reset();
			up.refresh(); // Reposition Flash/Silverlight
		});

		// add file extension to new file
		uploader.bind('BeforeUpload', function(up,file) {
				// Get the file extension
				var file_name = file.name;
				var extension = file_name.split(".").pop();
				//$.extend(up.settings.multipart_params, {key:key,Filename:key});
		});

		// Remove file button //////////////////////////////////////
		// On click remove the file from the queue
		$('a.removeFile').live('click', function(e) {
			uploader.removeFile(uploader.getFile(this.id));
			uploader.stop();
			uploader.refresh();
			error = false;
			$('#errormsg').hide();
			$('#'+this.id).remove();
			$('#errormsg').hide();
			$('#progressbar').hide();
			progressmessage('Please select a photo to upload');
			e.preventDefault();

		});

		// Progress bar ////////////////////////////////////////////
		// Add the progress bar when the upload starts
		// Append the tooltip with the current percentage
		uploader.bind('UploadProgress', function(up, file) {
			//adddebug('[Uplaoder UploadProgress ]' + up.total.percent);
			var progressBarValue = up.total.percent;
			$('#progressbar').fadeIn().progressbar({
				value: progressBarValue
			});
			$('#progressbar .ui-progressbar-value').html('<span class="progressTooltip">' + up.total.percent + '%</span>');

		});

		uploader.bind('UploadComplete', function(up,file) {
		});

		uploader.bind('FileUploaded', function(up, thisfile, info) {
		 	if (info.response.indexOf("error") == 0)
			    {
			        alert(info.response.split("|")[1]);
			        file.status = plupload.FAILED;
			    }

				var original_file_name = up.files[0].name;
				var original_file_size = up.files[0].size;
				var upload_method = up.runtime;
				var response = jQuery.parseJSON(info.response);
				var fileName = unescape(response.fileName);
				var filePath = unescape(response.filePath);
				var fileURL = unescape(response.fileURL);


				if (info.response == "" || response.success == 0)
					{
					displayerror(response.message);
					$('#progressmsg').hide();
					$('#progressbar').hide();
					uploader.total.reset();
					uploader.refresh();
					}
				else
					{
					adddebug('[uploader.FileUploaded] file path:'+ filePath);
					uploadfinished(up,original_file_name,original_file_size,filePath,fileURL,fileName);
					progress = 0;
					uploader.splice();
					uploader.total.reset();
					uploader.refresh();
					}
			     });

			uploader.init();
		 // Initializes the Uploader instance and adds internal event listeners.
	}); // end of the upload form configuration
	function openphotouploader()	{
		var uploaderurl = '/photoUploader/photouploader.cfm?runtime='+ runtime+'&showdebug='+showdebug+'&cachebuster='+Date.now();
		if (!(undefined != debug) && debug == 1){
			$.colorbox({
				width:"800px",
				height:"675px",
				iframe:true,
				href:uploaderurl,
				escKey: false,
				overlayClose: false
			  });
			} else {
			$.colorbox({
				width:"800px",
				height:"675px",
				iframe:true,
				href:uploaderurl,
				escKey: false,
				overlayClose: false
			});
		}
	}

	// Check Box Styling
	$(document).ready(function() {
		$("#help").colorbox({width:"600px", height:"500px", inline:true, href:"#help-content"});
		var checkbox = $('.upload-form span.checkbox');
		// Check if JavaScript is enabled
		$('body').addClass('js');
		// Make the checkbox checked on load
		checkbox.addClass('checked').children('input').attr('checked', true);
		// Click function
		checkbox.on('click', function() {
			if ($(this).children('input').attr('checked')) {
				$(this).children('input').attr('checked', false);
				$(this).removeClass('checked');
			} else {
				$(this).children('input').attr('checked', true);
				$(this).addClass('checked');
			}
		});
		$('a[id=uploadfiles]').addClass("disabled");
	});
}

function openprintableeditor(filePath,fileURL,fileName){
	adddebug('[openeditor] File name:'+ filePath);
	adddebug('[openeditor] File path:'+ fileURL);
	adddebug('[openeditor] File URL:'+ fileName);
	openprintablephotoeditor(finishedfile,filePath,fileURL,fileName);
}

function openprintablephotoeditor(file_name,filePath,fileURL,fileName){
	location.href = '/photoUploader/photoprintableeditor.cfm?finishedfile='+ finishedfile+'&showdebug='+showdebug;
	return false;
}

function openeditor(filePath,fileURL,fileName){
	adddebug('[openeditor] File name:'+ filePath);
	adddebug('[openeditor] File path:'+ fileURL);
	adddebug('[openeditor] File URL:'+ fileName);
	openphotoeditor(finishedfile,filePath,fileURL,fileName);
}

function openphotoeditor(file_name,filePath,fileURL,fileName){
	location.href = '/photoUploader/photoeditor.cfm?finishedfile='+ finishedfile+'&showdebug='+showdebug;
	return false;
}
