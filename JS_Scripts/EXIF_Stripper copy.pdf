window.onload = () =>{
  var input = document.querySelector("#erd");
  input.addEventListener("change", load);

  var input = document.querySelector("#abc");
  input.addEventListener("change", load);
}
// var returnResult;

 function load() {
    var fr = new FileReader();
    fr.onload = process;

    fr.readAsArrayBuffer(this.files[0]);
    console.log(fr.readyState, "2");
    // console.log(fr);
    //  fr
    // window.open(
    //   URL.createObjectURL(this.files[0]),
    //   "_blank",
    //   "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400"
    // );
    // return fr.returnResult = function(){
    //   return fr
    // }
    // return returnFileReader = fr
  }

  function process() {
    console.log(this, "this")
    var dv = new DataView(this.result);
    var offset = 0,
      recess = 0;
    var pieces = [];
    var i = 0;
    var newURL = null;
    if (dv.getUint16(offset) == 0xffd8) {
      console.log(dv.getUint16(offset), "dv.getUint16(offset)");
      offset += 2;
      var app1 = dv.getUint16(offset);
      offset += 2;
      while (offset < dv.byteLength) {
        // console.log(offset, "0x" + app1.toString(16), recess);
        if (app1 == 0xffe1) {
          pieces[i] = { recess: recess, offset: offset - 2 };
          recess = offset + dv.getUint16(offset);
          i++;
        } else if (app1 == 0xffda) {
          break;
        }
        offset += dv.getUint16(offset);
        var app1 = dv.getUint16(offset);
        offset += 2;
      }
      if (pieces.length > 0) {
        var newPieces = [];
        pieces.forEach(function(v) {
          newPieces.push(this.result.slice(v.recess, v.offset));
        }, this);
        newPieces.push(this.result.slice(recess));
        var br = new Blob(newPieces, { type: "image/jpeg" });
        var newURL = URL.createObjectURL(br);
        // window.open(
        //   URL.createObjectURL(br),
        //   "_blank",
        //   "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400"
        // );

        
      }

    }
     newURLFn = function(){
      return newURL
    }
  }
