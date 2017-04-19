//画像ファイル配列オブジェクト
var imgFO= [];
//imgFO = [{file_id:"",file_name:'cover.jpg',data:'',type:'image/jpeg'}];

//表紙画像入力
var coverFO= {file_id:"cover",file_name:'',data:'',type:''};

 function CoverFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('coverthumb').insertBefore(span, null);
          coverFO=({file_name:theFile.name,data:e.target.result,type:theFile.type});
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('coverfile').addEventListener('change', CoverFileSelect, false);});
//ここまで表紙画像

//ここからページ画像入力
//連続画像ファイル読み込み
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', theFile.name, '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
//チェックコード
//        var image =new Image();
//          image.src = e.target.result;
//          image.onload = function() {
//          console.log(image.width);
//          console.log(image.height);
//};
console.log(theFile.name);
console.log(theFile.type);
imgFO.push({file_name:theFile.name,data:e.target.result,type:theFile.type});
//画像ファイル名での整列
//通し番号ファイル名　 id="i-001"
//imgFO[imgFO.length - 1].id="i-"+ ('0000' + (imgFO.length) ).slice( -3 );
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('files').addEventListener('change', handleFileSelect, false);});

//EPUB３テンプレート
var containerXML ='<?xml version="1.0" encoding="UTF-8"?>\n<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">\n<rootfiles>\n<rootfile full-path="item/standard.opf" media-type="application/oebps-package+xml"/>\n</rootfiles>\n</container>';
var standardOPF = '<?xml version="1.0" encoding="utf-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="ja" unique-identifier="unique-id" prefix="rendition: http://www.idpf.org/vocab/rendition/# ebpaj: http://www.ebpaj.jp/" >\n<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n<!-- 作品名 -->\n<dc:title id="title">作品名１</dc:title>\n<meta refines="#title" property="file-as">セイレツヨウサクヒンメイカナ01</meta>\n<!-- 著者名 -->\n<dc:creator id="creator01">著作者名１</dc:creator>\n<meta refines="#creator01" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator01" property="file-as"> セイレツヨウチョサクシャメイカナ 01</meta>\n<meta refines="#creator01" property="display-seq">1</meta>\n<dc:creator id="creator02">著作者名２</dc:creator>\n<meta refines="#creator02" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator02" property="file-as"> セイレツヨウチョサクシャメイカナ 02</meta>\n<meta refines="#creator02" property="display-seq">2</meta>\n<!-- 出版社名 -->\n<dc:publisher id="publisher">出版社名</dc:publisher>\n<meta refines="#publisher" property="file-as"> セイレツヨウシュッパンシャメイカナ</meta>\n<!-- 言語 -->\n<dc:language>ja</dc:language>\n<!-- ファイルid -->\n<dc:identifier id="unique-id">urn:uuid:860ddf31-55a4-449a-8cc9-3c1837657a15</dc:identifier>\n<!-- 更新日 -->\n<meta property="dcterms:modified">2012-01-01T00:00:00Z</meta>\n<!-- Fixed-Layout Documents指定 -->\n<meta property="rendition:layout">pre-paginated</meta>\n<meta property="rendition:spread">landscape</meta>\n<!-- etc. -->\n<meta property="ebpaj:guide-version">1.1</meta>\n</metadata>\n<manifest>\n<!-- navigation -->\n<item media-type="application/xhtml+xml" id="toc" href="nav.xhtml" properties="nav"/>\n<item media-type="application/x-dtbncx+xml" id="ncxtoc" href="toc.ncx"/>\n<!-- style -->\n<item media-type="text/css" id="fixed-layout-jp" href="style/fixed-layout-jp.css"/>\n<!-- image -->\n<item media-type="image/jpeg" id="cover" href="image/cover.jpg" properties="cover-image"/>\n<!-- xhtml -->\n<item media-type="application/xhtml+xml" id="p-cover" href="xhtml/p-cover.xhtml" properties="svg" fallback="cover"/>\n</manifest>\n<spine toc="ncxtoc" page-progression-direction="rtl">\n<itemref linear="yes" idref="p-cover" properties="rendition:page-spread-center"/>\n<itemref linear="yes" idref="p-001" properties="page-spread-right"/>\n</spine>\n</package>';
var kindleOPF ='<?xml version="1.0" encoding="utf-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="ja" unique-identifier="unique-id" prefix="rendition: http://www.idpf.org/vocab/rendition/# ebpaj: http://www.ebpaj.jp/" >\n<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n<!-- 作品名 -->\n<dc:title id="title">作品名１</dc:title>\n<meta refines="#title" property="file-as">セイレツヨウサクヒンメイカナ01</meta>\n<!-- 著者名 -->\n<dc:creator id="creator01">著作者名１</dc:creator>\n<meta refines="#creator01" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator01" property="file-as"> セイレツヨウチョサクシャメイカナ 01</meta>\n<meta refines="#creator01" property="display-seq">1</meta>\n<dc:creator id="creator02">著作者名２</dc:creator>\n<meta refines="#creator02" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator02" property="file-as"> セイレツヨウチョサクシャメイカナ 02</meta>\n<meta refines="#creator02" property="display-seq">2</meta>\n<!-- 出版社名 -->\n<dc:publisher id="publisher">出版社名</dc:publisher>\n<meta refines="#publisher" property="file-as"> セイレツヨウシュッパンシャメイカナ</meta>\n<!-- 言語 -->\n<dc:language>ja</dc:language>\n<!-- ファイルid -->\n<dc:identifier id="unique-id">urn:uuid:860ddf31-55a4-449a-8cc9-3c1837657a15</dc:identifier>\n<!-- 更新日 -->\n<meta property="dcterms:modified">2012-01-01T00:00:00Z</meta>\n<!-- Fixed-Layout Documents指定 -->\n<meta name="original-resolution" content="600x837" />\n<meta name="primary-writing-mode" content="horizontal-rl" />\n<meta name="book-type" content="comic" />\n<meta content="true" name="zero-gutter" />\n<meta content="true" name="zero-margin" />\n<meta content="none" name="orientation-lock" />\n<meta content="true" name="fixed-layout" />\n<meta content="false" name="region-mag" />\n<!-- etc. -->\n<meta property="ebpaj:guide-version">1.1</meta>\n</metadata>\n<manifest>\n<!-- navigation -->\n<item media-type="application/xhtml+xml" id="toc" href="nav.xhtml" properties="nav"/>\n<item media-type="application/x-dtbncx+xml" id="ncxtoc" href="toc.ncx"/>\n\n<!-- style -->\n<item media-type="text/css" id="fixed-layout-jp" href="style/fixed-layout-jp.css"/>\n<!-- image -->\n<item media-type="image/jpeg" id="cover" href="image/cover.jpg" properties="cover-image"/>\n<!-- xhtml -->\n<item media-type="application/xhtml+xml" id="p-cover" href="xhtml/p-cover.xhtml" properties="svg" fallback="cover"/>\n<item media-type="application/xhtml+xml" id="p-001" href="xhtml/p-001.xhtml" properties="svg" fallback="i-001"/>\n</manifest>\n<spine toc="ncxtoc" page-progression-direction="rtl">\n<itemref linear="yes" idref="p-cover" properties="rendition:page-spread-center"/>\n<itemref linear="yes" idref="p-001" properties="page-spread-right"/>\n</spine>\n</package>';
//ナビゲーション
var navigation= '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja" >\n<head>\n<meta charset="UTF-8"/>\n<title>Navigation</title>\n</head>\n<body>\n<nav epub:type="toc" id="toc">\n<h1>Navigation</h1>\n<ol>\n<li><a href="xhtml/p-cover.xhtml">表紙</a></li>\n<li><a href="xhtml/p-001.xhtml">目次</a></li>\n</ol>\n</nav>\n</body>\n</html>';
//カバーHTML
var coverxhtml='<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja" >\n<head>\n<meta charset="UTF-8"/>\n<title>作品名</title>\n<link rel="stylesheet" type="text/css" href="../style/fixed-layout-jp.css"/>\n<meta name="viewport" content="width=848, height=1200"/>\n</head>\n<body epub:type="cover">\n<div class="main">\n<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 848 1200">\n<image width="848" height="1200" xlink:href="../image/cover.jpg"/>\n</svg>\n</div>\n</body>\n</html>';
//ページHTML
var pagexhtml='<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja" >\n<head>\n<meta charset="UTF-8"/>\n<title>作品名</title>\n<link rel="stylesheet" type="text/css" href="../style/fixed-layout-jp.css"/>\n<meta name="viewport" content="width=848, height=1200"/>\n</head>\n<body>\n<div class="main">\n<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 848 1200">\n<image width="848" height="1200" xlink:href="../image/i-002.jpg"/>\n</svg>\n</div>\n</body>\n</html>';
//NCX
var ncx='<?xml version="1.0" encoding="utf-8" standalone="no"?>\n<!-- For compatibility with ePub2 Player -->\n<ncx:ncx xmlns:ncx="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n  <ncx:head>\n    <ncx:meta name="dtb:uid" content="urn:uuid:A649F639-6C1F-1014-8CC3-F813564D7508"/>\n    <ncx:meta name="dtb:depth" content="-1"/>\n    <ncx:meta name="dtb:totalPageCount" content="0"/>\n    <ncx:meta name="dtb:maxPageNumber" content="0"/>\n  </ncx:head>\n  <ncx:docTitle>\n    <ncx:text>title</ncx:text>\n  </ncx:docTitle>\n  <ncx:docAuthor>\n    <ncx:text>author</ncx:text>\n  </ncx:docAuthor>\n  <ncx:navMap>\n    <ncx:navPoint id="p01" playOrder="1">\n      <ncx:navLabel>\n        <ncx:text>navigation</ncx:text>\n      </ncx:navLabel>\n      <ncx:content src="xhtml/p-cover.xhtml"/>\n    </ncx:navPoint>\n\n    <ncx:navPoint id="about" playOrder="2">\n      <ncx:navLabel>\n        <ncx:text>目次</ncx:text>\n      </ncx:navLabel>\n      <ncx:content src="xhtml/p-001.xhtml"/>\n    </ncx:navPoint>\n  </ncx:navMap>\n</ncx:ncx>';
var layout='@charset "UTF-8";\n\nhtml,\nbody {\n  margin:    0;\n  padding:   0;\n  font-size: 0;\n}\nsvg {\n  margin:    0;\n  padding:   0;\n}\n';
//EPUB3テンプレートの書換え　DOMParserを使って書き換える。
//OPFファイルの書換
function rewrite(){
//画像ファイル名で整列
//imgFO = [{file_id:"",file_name:'cover.jpg',data:'',type:'image/jpeg'}];
 imgFO.sort(function(a,b){
    if(a.file_name<b.file_name) return -1;
    if(a.file_name > b.file_name) return 1;
    return 0;
});
var standardOPFxml = (new DOMParser()).parseFromString(standardOPF, 'text/xml');
//タイトル
standardOPFxml.getElementById('title').textContent=$("#title").val();
var sttitle=standardOPFxml.querySelectorAll("meta[refines='#title']");
//if(sttitle.length>0){
//sttitle.parentNode.removeChild(sttitle);}
for  (i = 0; i < sttitle.length; i++){
sttitle[i].parentNode.removeChild(sttitle[i]);}
//著者１
standardOPFxml.getElementById('creator01').textContent=$("#author1").val();
var metaall = standardOPFxml.querySelectorAll("meta[refines='#creator01']");
for  (i = 0; i < metaall.length; i++){
metaall[i].parentNode.removeChild(metaall[i]);}
//著者２
standardOPFxml.getElementById('creator02').textContent=$("#author2").val();
var metaall = standardOPFxml.querySelectorAll("meta[refines='#creator02']");
for  (i = 0; i < metaall.length; i++){
metaall[i].parentNode.removeChild(metaall[i]);}
//出版社
var node = standardOPFxml.getElementById("publisher");
if(node != null){
	node.parentNode.removeChild(node);
	}
var pub = standardOPFxml.querySelectorAll("meta[refines='#publisher']");
for  (i = 0; i < pub.length; i++){
pub[i].parentNode.removeChild(pub[i]);}
//meta refines="#publisher" 


//ファイルID、uuid
var objV4 = UUID.genV4();
standardOPFxml.getElementById('unique-id').textContent=objV4.urn;
//日時
var today = new Date();
standardOPFxml.querySelector("meta[property='dcterms:modified']").textContent=today.toISOString().slice(0,19)+"Z";
//kindleの場合
/*
var image =new Image();
          image.src =imgFO[1].data;
          image.onload = function() {
          console.log(image.width);
          console.log(image.height);
};
*/
//manifest image
//media-type="image/jpeg" id="i-001" href="image/i-001.jpg"
var imgdf = standardOPFxml.createDocumentFragment();
/*var ele = standardOPFxml.createElement("item");
	ele.setAttribute("media-type", "image/jpeg");
	ele.setAttribute("id", "i-002");
	ele.setAttribute("href", "image/i-002.jpg");
*/
//繰り返し用
for (j = 0; j < imgFO.length; j++){
imgFO[j].id="i-"+ ('0000' + (j+1) ).slice( -3 );
if(imgFO[j].type=="image/jpeg"){imgFO[j].ext="jpg"};
if(imgFO[j].type=="image/png"){imgFO[j].ext="png"};
	var ele = standardOPFxml.createElement("item");
	ele.setAttribute("media-type", imgFO[j].type);
	ele.setAttribute("id", imgFO[j].id);
	ele.setAttribute("href", "image/"+imgFO[j].id+"."+imgFO[j].ext);
	 imgdf.appendChild(ele);
}

//ココまで繰り返す
var	parent =standardOPFxml.querySelector("manifest");
console.log(ele)
var	reference = standardOPFxml.getElementById('cover');
	parent.insertBefore(imgdf,reference.nextSibling);
//	parent.insertBefore(ele,reference.nextSibling);
	console.log(parent);

//manifest xhtml
//<item media-type="application/xhtml+xml" id="p-001" href="xhtml/p-001.xhtml" properties="svg" fallback="i-001"/>
var xhtdf = standardOPFxml.createDocumentFragment();
/*
var xele = standardOPFxml.createElement("item");
	xele.setAttribute("media-type", "application/xhtml+xml");
	xele.setAttribute("id", "p-002");
	xele.setAttribute("href", "xhtml/p-002.xhtml");
	xele.setAttribute("properties", "svg");
	xele.setAttribute("fallback", "i-002");
*/
//繰り返し用

for (j = 0; j < imgFO.length; j++){
imgFO[j].xhid="p-"+ ('0000' + (j+1) ).slice( -3 );
var xele = standardOPFxml.createElement("item");
	xele.setAttribute("media-type", "application/xhtml+xml");
	xele.setAttribute("id", imgFO[j].xhid);
	xele.setAttribute("href", "xhtml/"+imgFO[j].xhid+".xhtml");
	xele.setAttribute("properties", "svg");
	xele.setAttribute("fallback", imgFO[j].id);
	 xhtdf.appendChild(xele);
}

 //ココまで繰り返す
var	xparent =standardOPFxml.querySelector("manifest");
console.log(xele)
var	xreference = standardOPFxml.getElementById('p-cover');
//	parent.appendChild(ele);
//	xparent.insertBefore(xele,xreference.nextSibling);
	xparent.insertBefore(xhtdf,xreference.nextSibling);
	console.log(xparent);
//XMLシリアライズ
standardOPF = (new XMLSerializer()).serializeToString(standardOPFxml);
console.log(standardOPFxml);

//ナビゲーションファイル
var navigationXml = (new DOMParser()).parseFromString(navigation, 'text/xml');

console.log(navigationXml.querySelectorAll("li")[2]);
navigation = (new XMLSerializer()).serializeToString(navigationXml);


//表紙XHTML　coverxhtml
var coverxhtmlXml = (new DOMParser()).parseFromString(coverxhtml, 'text/xml');
coverxhtmlXml.querySelector('title').textContent=$("#title").val();
var viewport = coverxhtmlXml.querySelector("meta[content]");
var svg = coverxhtmlXml.querySelector("svg[viewBox]");
var imagesize = coverxhtmlXml.querySelector("image");
viewport.setAttribute("content", 'width='+$("#imgwidth").val() +' ,'+'height='+$("#imgheight").val());
svg.setAttribute("viewBox", '0 0 '+$("#imgwidth").val() +' '+$("#imgheight").val());
imagesize.setAttribute("width",$("#imgwidth").val());
imagesize.setAttribute("height",$("#imgheight").val());
//画像ファイル名の設定
//imagesize.setAttributeNS("http://www.w3.org/1999/xlink","href","../image/"+"test.jpg");

coverxhtml = (new XMLSerializer()).serializeToString(coverxhtmlXml);
console.log(viewport.content);
console.log(coverxhtmlXml);
console.log(imagesize.getAttributeNS("http://www.w3.org/1999/xlink","href"));

//ページXHTML　pagexhtml
var pagexhtmlXml = (new DOMParser()).parseFromString(pagexhtml, 'text/xml');

pagexhtml = (new XMLSerializer()).serializeToString(pagexhtmlXml);
}

//zip圧縮
jQuery(function($) {
  if(!JSZip.support.blob) {
      $("#demo-not-supported").removeClass("hidden");
      $("#demo").hide();
      return;
  }
  $("#demo").click(function () {
rewrite();
var zip = new JSZip();
zip.file("mimetype", "application/epub+zip");
var meta = zip.folder("META-INF");
meta.file("container.xml", containerXML);
var item = zip.folder("item");
item.file("standard.opf", standardOPF);
item.file("nav.xhtml", navigation);
item.file("toc.ncx", ncx);
var img = zip.folder("item/image");
var style = zip.folder("item/style");
style.file("fixed-layout-jp.css",layout)
var xhtml = zip.folder("item/xhtml");
xhtml.file("p-cover.xhtml",coverxhtml);
for (j = 0; j < imgFO.length; j++){
xhtml.file("p-"+ ('0000' + (j+1) ).slice( -3 )+".xhtml", pagexhtml);
}
img.file("cover.jpg", coverFO.data.split('base64,')[1], {base64: true});
for (j = 0; j < imgFO.length; j++){
img.file("i-"+ ('0000' + (j+1) ).slice( -3 )+"."+imgFO[j].ext, imgFO[j].data.split('base64,')[1], {base64: true});
}
zip.generateAsync({type:"blob"})
.then(function(content) {
// see FileSaver.js
saveAs(content, "example.epub");
});
  });
});
