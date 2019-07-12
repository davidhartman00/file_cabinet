<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Photo Editor</title>
    <link
      href="/assets/css/jquery-ui-1.10.3.custom.min.css?19%2E27%2E01"
      rel="Stylesheet"
      type="text/css"
    />
    <link
      href="/assets/css/colorbox-4.css?19%2E27%2E01"
      type="text/css"
      rel="stylesheet"
      media="screen"
    />
    <link
      href="/global/assets/css/common-styles.css?19%2E27%2E01"
      type="text/css"
      rel="stylesheet"
    />
    <link
      href="/assets/css/photoeditor.css?19%2E27%2E01"
      type="text/css"
      rel="stylesheet"
    />
    <script src="/global/assets/libraries/jquery/jquery-1.10.0.min.js"></script>
    <link
      href="/assets/css/jquery.cropzoom.css?19%2E27%2E01"
      rel="Stylesheet"
      type="text/css"
    />
    <script
      type="text/javascript"
      src="/assets/js/jquery-ui-1.10.3.custom.min.js?19%2E27%2E01"
    ></script>
    <script
      type="text/javascript"
      src="/assets/js/jquery.cropzoom.js?19%2E27%2E01"
    ></script>
    <script
      type="text/javascript"
      src="/assets/js/photoeditor.js?19%2E27%2E01"
    ></script>
    <script type="text/javascript">
      var SHOWDEBUG = "false";
      var PRINTABLE =
        "https://media.actorsaccess.com/temp/20197/1162221_print.jpg";
      var IMAGEWIDTH = "500";
      var IMAGEHEIGHT = "333";
      var MINZOOM = 59;
      var MAXZOOM = 364;
      var STARTZOOM = 91;
      var RENDEREDURL =
        "https://media.actorsaccess.com/temp/20197/1162221_thumb.jpg";
      var PRINTABLEURL =
        "https://media.actorsaccess.com/temp/20197/1162221_print.jpg";
      $("#photoloading").hide();
      $(document).ready(function() {
        var editor = initialize_cropzoom(
          PRINTABLE,
          IMAGEWIDTH,
          IMAGEHEIGHT,
          MINZOOM,
          MAXZOOM,
          STARTZOOM
        );
        $("#restore").click(function() {
          editor.restore();
        });
        $("#crop").click(function() {
          applyedit(editor);
        });
        $(".ui-resizable-handle").hide();
        $("#continue").click(function() {
          location.href = "/photoUploader/index.cfm?action=representation";
        });
        $("#viewprintable").click(function() {
          parent.print_picture(PRINTABLEURL, "");
        });
        $("#cboxClose").click(function() {
          parent.$.colorbox.close();
        });
        $("#cboxCloseerror").click(function() {
          alert("");
          parent.$.colorbox.close();
        });
        $("#openPhotoUploader").click(function() {
          history.go(-2);
        });
      });
    </script>
  </head>
  <body>
    <div class="content">
      <h2>Thumbnail Editor</h2>
      <p class="nomargin">
        Here you will create a 160x180 THUMBNAIL version of your photo. <br />
        This will not affect the original (aka Printable) photo that Casting
        will see when they click on your thumbnail.
      </p>
      <div class="container">
        <div id="crop_container"></div>
        <div id="rendered" class="rendered">
          <div id="currentphoto">Current Thumbnail</div>
          <div id="photocontainer" class="photocontainer">
            <img
              id="renderedimg"
              class="renderedimg"
              src="https://media.actorsaccess.com/temp/20197/1162221_thumb.jpg?nocache=062836254"
            />
            <img
              id="photoloading"
              class="photoloading"
              src="/assets/images/loading.gif"
              style="display:none;"
            />
          </div>
        </div>
        <div
          id="result"
          class="result"
          title="Result Cropping"
          style="visibility:hidden"
        ></div>
      </div>
      <div style="clear:both"></div>
      <div class="controls">
        <div id="movement"></div>
        <div id="sliders">
          <div style="width:500px; height:30px;">
            <div
              style="float:left; width:60px; font-weight:bold; height:30px; padding-top:3px;"
            >
              Zoom:
            </div>
            <div id="zoom" style="float:left; height:30px;"></div>
          </div>
          <div style="clear:both"></div>
          <div style="width:500px; height:30px;">
            <div
              style="float:left; width:60px; font-weight:bold; height:30px; padding-top:3px;"
            >
              Rotate:
            </div>
            <div id="rot" style="float:left; height:30px;"></div>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="edit-buttons">
          <div>
            <button id="restore" class="btn btn-mini btn-minor">
              Reset Controls
            </button>
            <button id="viewprintable" class="btn btn-mini btn-minor">
              View Printable
            </button>
            <button id="openPhotoUploader" class="btn btn-mini btn-minor">
              New Upload
            </button>
          </div>
          <div class="margin-above-10">
            <button
              id="back"
              class="btn btn-mini btn-minor"
              onclick="location.href='/photoUploader/photoprintableeditor.cfm'"
            >
              Back
            </button>
            <button id="crop" class="btn btn-mini btn-major btn-aa-red">
              Apply Changes
            </button>
            <button id="continue" class="btn btn-mini btn-major">
              Continue
            </button>
          </div>
        </div>
        <div id="editor-instructions">
          <p class="nomargin">Use these tools to adjust your photo.</p>
          <ul>
            <li>Move the slider to zoom in, out and rotate.</li>
            <li>
              Click and drag or use the arrows to adjust the placement of your
              picture.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </body>
</html>
