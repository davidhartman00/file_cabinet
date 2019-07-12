<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Photo Editor</title>
    <script src="/global/assets/libraries/jquery/jquery-1.10.0.min.js"></script>
    <link href="/assets/css/jquery-ui-1.10.3.custom.min.css?19%2E27%2E01" rel="Stylesheet" type="text/css" />
    <link href="/assets/css/colorbox-4.css?19%2E27%2E01" type="text/css" rel="stylesheet" media="screen" />
    <link href="/assets/css/photoeditor.css?19%2E27%2E01" type="text/css" rel="stylesheet" />
    <link href="/global/assets/css/common-styles.css?19%2E27%2E01" type="text/css" rel="stylesheet" />
    <link href="/assets/css/jquery.cropzoom.css?19%2E27%2E01" rel="Stylesheet" type="text/css" />
    <script type="text/javascript" src="/assets/js/jquery.cropzoom.js?19%2E27%2E01"></script>
    <script type="text/javascript" src="/assets/js/jquery-ui-1.10.3.custom.min.js?19%2E27%2E01"></script>
    <script type="text/javascript" src="/assets/js/printablephotoeditor.js?19%2E27%2E01"></script>
    <script type="text/javascript" src="/assets/js/photouploader.js?19%2E27%2E01"></script>
    <script type="text/javascript">
        var showdebug = false;
        var finishedfile = 1162221;
        var login_id = '1162221';
        var allowedextensions = 'jpg,jpeg,gif,png,pict,pct,tiff,tif';
        var progress = 0; //for progress bar
        var runtimes = 'html5,flash,silverlight,html4';
        var maxfilesize = 20000000;
        var largefilewarning = 20000000;
        var showQTcontroller = true;
        $(document).ready(function () {
            adddebug('DEBUG ON:');
            adddebug('finishedfile:' + finishedfile);
        });
        var SHOWDEBUG = 'false';
<!---  This is where you steal the IMG and remove the EXIF  --->var PRINTABLE = 'https://media.actorsaccess.com/temp/20197/1162221_print.jpg';
        var IMAGEWIDTH = '500';
        var IMAGEHEIGHT = '333';
        var MINZOOM = 68;
        var MAXZOOM = 400;
        var STARTZOOM = 100;
<!---  This is Somethign to look into as EXIF stripping  --->var RENDEREDURL = 'https://media.actorsaccess.com/temp/20197/1162221_thumb.jpg';
<!--- *** Is this the same as the PRINTABLE variable ???  **** --->var PRINTABLEURL = 'https://media.actorsaccess.com/temp/20197/1162221_print.jpg';
        var btnClicked = 0;
        var btnHistory = 0;
        var btnDisplay = 0;
        $('#photoloading').hide();
        fnDisplay = function (printable) {
            $('div#crop_container').hide();
            $('div#crop_container_selector').hide();
            $('div#imgDisp').remove();
            var aratio = IMAGEHEIGHT / IMAGEWIDTH;
            var nTop = 0;
            if (aratio < 1) { nTop = Math.ceil((1 - aratio) * 150); }
            $('div#divDegrees').after('<div id="imgDisp" class="fullcolumn margin-below-15"><img id="imgDisplay" src="' + printable + '" style="margin-top:' + nTop + 'px;" /></div>');
        }
        fnRotateDeg = function (btnClicked) {
            var degrot = 0
            if (btnClicked != 0) {
                degrot = (btnClicked * 90) % 360;
            }
            return degrot;
        }
        fnRestoreDeg = function (nnum) {
            var degrot = 0
            if (nnum != 0) {
                degrot = (-1 * nnum * 90) % 360;
            }
            return degrot;
        }
        $(document).ready(function () {
            var editor = initialize_cropzoom(PRINTABLE, IMAGEWIDTH, IMAGEHEIGHT, MINZOOM, MAXZOOM, STARTZOOM);
            var degreesRot = 0;
            var oSlider = jQuery('#rotationSlider');
            fnDisplay(PRINTABLE);
            $('#restore').click(function () {
                applyedit(editor, '', btnHistory * -1)
                degreesRot = 0;
                oSlider = jQuery('#rotationSlider');
                oSlider.slider('value', degreesRot);
                oSlider.slider('option', 'slide').call(oSlider, null, { value: degreesRot });
                $('#crop').addClass('btn-aa-red').removeAttr('disabled');
                $('#continue').removeClass('btn-aa-red');
                btnClicked = 0;
                $('#imgDisplay').css('transform', 'rotate(0deg)');
                btnHistory = 0;
            });
            $('#crop').click(function () {
                applyedit(editor, '', btnClicked);
                $('#imgDisplay').css('transform', 'rotate(' + fnRotateDeg(btnDisplay) + 'deg)');
                btnClicked = 0;
            });
            $('.ui-resizable-handle').hide();
            $('#infoSelector').hide();
            $("#continue").click(function (finishedfile, filePath, fileURL, fileName) {
                openphotoeditor(finishedfile, filePath, fileURL, fileName);
            });
            $("#viewprintable").click(function () {
                parent.print_picture(PRINTABLEURL, '');
            });
            $("#cboxClose").click(function () {
                parent.$.colorbox.close();
            });
            $("#cboxCloseerror").click(function () {
                alert('');
                parent.$.colorbox.close();
            });
            $("#openPhotoUploader").click(function () {
                history.go(-1);
            });
            $('#rotateImgLeft').click(function () {
                if (degreesRot == 0) { degreesRot = 360 }
                degreesRot = degreesRot - 90;
                oSlider = jQuery('#rotationSlider');
                oSlider.slider('value', degreesRot);
                oSlider.slider('option', 'slide').call(oSlider, null, { value: degreesRot });
                $('#crop').addClass('btn-aa-red').removeAttr('disabled');
                $('#continue').removeClass('btn-aa-red');
                btnClicked--;
                btnHistory--;
                btnDisplay--;
                $('#imgDisplay').css('transform', 'rotate(' + fnRotateDeg(btnDisplay) + 'deg)');
            });
            $('#rotateImgRight').click(function () {
                degreesRot = degreesRot + 90;
                if (degreesRot == 360) { degreesRot = 0 }
                oSlider = jQuery('#rotationSlider');
                oSlider.slider('value', degreesRot);
                oSlider.slider('option', 'slide').call(oSlider, null, { value: degreesRot });
                $('#crop').addClass('btn-aa-red').removeAttr('disabled');
                $('#continue').removeClass('btn-aa-red');
                btnClicked++;
                btnHistory++;
                btnDisplay++;
                $('#imgDisplay').css('transform', 'rotate(' + fnRotateDeg(btnDisplay) + 'deg)');
            });
        });
    </script>
    <style type="text/css">
        #crop_container_selector {
            cursor: default !important;
            border: none !important;
        }
    </style>
</head>

<body>
    <div class="content">
        <h2>Printable Editor</h2>
        <p class="nomargin">Here you will have the option to rotate a 500x700 printable version of your photo. <br />
            This will affect the original (aka Printable) photo that Casting will see when they click on your thumbnail.
        </p>
        <div id="divDegrees">
            <p>Rotation: 0&deg;</p>
        </div>
        <div class="container printable">
            <div id="crop_container" class="margin-auto"></div>
        </div>
        <div class="clearfix"></div>
        <div class="controls">
            <div id="movement"></div>
            <div id="rotation_buttons">
                <button id="rotateImgLeft" class="btn padding-05 margin-right-10"
                    title="Rotate 90&deg; counterclockwise"><img
                        src="/global/assets/images/icons/icon-rotate-left-16.png"
                        alt="Rotate 90&deg; counterclockwise"></button>
                <button id="rotateImgRight" class="btn padding-05" title="Rotate 90&deg; clockwise"><img
                        src="/global/assets/images/icons/icon-rotate-right-16.png"
                        alt="Rotate 90&deg; clockwise"></button>
            </div>
            <div id="sliders" class="margin-auto">
                <div id="printable_slider_container">
                    <div id="printable_slider">Rotate:</div>
                    <div id="rot" class="pull-left"></div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="edit-buttons">
                <div>
                    <button id="restore" class="btn btn-mini btn-minor">Reset Controls</button>
                    <button id="viewprintable" class="btn btn-mini btn-minor">View Printable</button>
                    <button id="openPhotoUploader" class="btn btn-mini btn-minor margin-right-0">New Upload</button>
                </div>
                <div class="margin-above-20">
                    <button id="crop" class="btn btn-mini btn-major btn-aa-red">Apply Changes</button>
                    <button id="continue" class="btn btn-mini btn-major margin-right-0">Continue</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</body>

</html>