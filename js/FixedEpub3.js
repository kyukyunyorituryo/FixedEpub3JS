//画像ファイル配列オブジェクト
//imgFO = [{file_id:"",file_name:'cover.jpg',data:'',type:'image/jpeg'}];
var imgFO= [];

//表紙画像オブジェクト
var coverFO= {file_id:"cover",file_name:'',data:'',type:''};
//xhtml出力用
var pages=[];
//UUID宣言
//uuid ver.4
var objV4 = UUID.genV4();
//イメージモーダル
function pop(self) {
          $('#imagepreview').attr('src', $(self).attr('src'));
          $('#imagepreview').attr('title', $(self).attr('title'));
          $('#imagemodal').modal('show');
      }
//表紙画像選択
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
                            '" title="', escape(theFile.name), '" onclick="pop(this) "/>'].join('');
        if (document.getElementById('coverthumb').hasChildNodes()) { 
        document.getElementById('coverthumb').replaceChild(span,document.getElementById('coverthumb').firstChild);}
         else { document.getElementById('coverthumb').insertBefore(span, null);}
          coverFO=({file_name:theFile.name,data:e.target.result,type:theFile.type});
          if(coverFO.type=="image/jpeg"){coverFO.ext="jpg"};
	if(coverFO.type=="image/png"){coverFO.ext="png"};
	//チェックコード
var image =new Image();
image.src = e.target.result;
image.onload = function() {
console.log(image.width);
console.log(image.height);
document.getElementById("imgwidth").value=image.width;
document.getElementById("imgheight").value=image.height;

};
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
                            '" title="', theFile.name, '" onclick="pop(this) "/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        imgFO.push({file_name:theFile.name,data:e.target.result,type:theFile.type});
        addselect();
//チェックコード
//        var image =new Image();
//          image.src = e.target.result;
//          image.onload = function() {
//          console.log(image.width);
//          console.log(image.height);
//};
//console.log(theFile.name);
//console.log(theFile.type);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  });
//sort　本文画像の整列
function mySort() {
var list = document.getElementById('list');
var Nlist=list.getElementsByTagName('span');
var myArray = Array.prototype.slice.call(Nlist);
   function compareText (a,b) {
        if (a.firstChild.title > b.firstChild.title)
            return 1;
        else if (a.firstChild.title < b.firstChild.title)
            return -1;
        return 0;
        }
    myArray.sort(compareText);
       for (var i=0; i<myArray.length; i++) {
        list.appendChild(list.removeChild(myArray[i]))
    }

//画像ファイル名で整列
//imgFO = [{file_id:"",file_name:'cover.jpg',data:'',type:'image/jpeg'}];
 imgFO.sort(function(a,b){
    if(a.file_name<b.file_name) return -1;
    if(a.file_name > b.file_name) return 1;
    return 0;
});
addselect();
}
//selectの追加
function addselect(){
var navtext= document.getElementsByName("selectNav")

$("*[name=selectNav]").children().remove();
for (j = 0; j < imgFO.length; j++){
$("*[name=selectNav]").append("<option>"+ imgFO[j].file_name +"</option>");
}
};

//document.addEventListener("DOMContentLoaded", function(){
//document.getElementById('InputSelect2').addEventListener('click', addselect, false);
//});
//.parentNode.removeChild()


//目次の追加
function addmenu(){
var menu = document.getElementsByTagName("form")[1];
var cmenu= menu.cloneNode(true);
cmenu.childNodes[1].childNodes[3].id=document.getElementsByTagName("form").length+1;

//par.insertBefore(cmenu,menu.nextSibling);
document.getElementById("menu-group").appendChild(cmenu);
}
//EPUB３テンプレート
var containerXML ='<?xml version="1.0" encoding="UTF-8"?>\n<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">\n<rootfiles>\n<rootfile full-path="item/standard.opf" media-type="application/oebps-package+xml"/>\n</rootfiles>\n</container>';
var standardOPF ='<?xml version="1.0" encoding="utf-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="ja" unique-identifier="unique-id" prefix="rendition: http://www.idpf.org/vocab/rendition/# ebpaj: http://www.ebpaj.jp/ ibooks: http://vocabulary.itunes.apple.com/rdf/ibooks/vocabulary-extensions-1.0/#">\n<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:ibooks="http://apple.com/ibooks/html-extensions">\n<!-- 作品名 -->\n<dc:title id="title">作品名１</dc:title>\n<meta refines="#title" property="file-as">セイレツヨウサクヒンメイカナ01</meta>\n<!-- 著者名 -->\n<dc:creator id="creator01">著作者名１</dc:creator>\n<meta refines="#creator01" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator01" property="file-as"> セイレツヨウチョサクシャメイカナ 01</meta>\n<meta refines="#creator01" property="display-seq">1</meta>\n<dc:creator id="creator02">著作者名２</dc:creator>\n<meta refines="#creator02" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator02" property="file-as"> セイレツヨウチョサクシャメイカナ 02</meta>\n<meta refines="#creator02" property="display-seq">2</meta>\n<!-- 出版社名 -->\n<dc:publisher id="publisher">出版社名</dc:publisher>\n<meta refines="#publisher" property="file-as"> セイレツヨウシュッパンシャメイカナ</meta>\n<!-- 言語 -->\n<dc:language>ja</dc:language>\n<!-- ファイルid -->\n<dc:identifier id="unique-id">urn:uuid:860ddf31-55a4-449a-8cc9-3c1837657a15</dc:identifier>\n<!-- 更新日 -->\n<meta property="dcterms:modified">2012-01-01T00:00:00Z</meta>\n<!-- Fixed-Layout Documents指定 -->\n<meta property="rendition:layout">pre-paginated</meta>\n<meta property="rendition:spread">landscape</meta>\n<!-- etc. -->\n<meta property="ebpaj:guide-version">1.1</meta>\n<!-- kindle -->\n<meta name="primary-writing-mode" content="horizontal-rl" />\n<!-- ibooks -->\n<meta property="ibooks:binding">false</meta>\n</metadata>\n<manifest>\n<!-- navigation -->\n<item media-type="application/xhtml+xml" id="toc" href="nav.xhtml" properties="nav"/>\n<item media-type="application/x-dtbncx+xml" id="ncxtoc" href="toc.ncx"/>\n<!-- style -->\n<item media-type="text/css" id="fixed-layout-jp" href="style/fixed-layout-jp.css"/>\n<!-- image -->\n<item media-type="image/jpeg" id="cover" href="image/cover.jpg" />\n<!-- xhtml -->\n<item media-type="application/xhtml+xml" id="p-cover" href="xhtml/p-cover.xhtml" properties="svg" fallback="cover"/>\n</manifest>\n<spine toc="ncxtoc" page-progression-direction="rtl">\n<itemref linear="yes" idref="p-cover" properties="rendition:page-spread-center"/>\n</spine>\n</package>';
//var kindleOPF ='<?xml version="1.0" encoding="utf-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="ja" unique-identifier="unique-id" prefix="rendition: http://www.idpf.org/vocab/rendition/# ebpaj: http://www.ebpaj.jp/" >\n<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n<!-- 作品名 -->\n<dc:title id="title">作品名１</dc:title>\n<meta refines="#title" property="file-as">セイレツヨウサクヒンメイカナ01</meta>\n<!-- 著者名 -->\n<dc:creator id="creator01">著作者名１</dc:creator>\n<meta refines="#creator01" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator01" property="file-as"> セイレツヨウチョサクシャメイカナ 01</meta>\n<meta refines="#creator01" property="display-seq">1</meta>\n<dc:creator id="creator02">著作者名２</dc:creator>\n<meta refines="#creator02" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator02" property="file-as"> セイレツヨウチョサクシャメイカナ 02</meta>\n<meta refines="#creator02" property="display-seq">2</meta>\n<!-- 出版社名 -->\n<dc:publisher id="publisher">出版社名</dc:publisher>\n<meta refines="#publisher" property="file-as"> セイレツヨウシュッパンシャメイカナ</meta>\n<!-- 言語 -->\n<dc:language>ja</dc:language>\n<!-- ファイルid -->\n<dc:identifier id="unique-id">urn:uuid:860ddf31-55a4-449a-8cc9-3c1837657a15</dc:identifier>\n<!-- 更新日 -->\n<meta property="dcterms:modified">2012-01-01T00:00:00Z</meta>\n<!-- Fixed-Layout Documents指定 -->\n<meta name="original-resolution" content="600x837" />\n<meta name="primary-writing-mode" content="horizontal-rl" />\n<meta name="book-type" content="comic" />\n<meta content="true" name="zero-gutter" />\n<meta content="true" name="zero-margin" />\n<meta content="none" name="orientation-lock" />\n<meta content="true" name="fixed-layout" />\n<meta content="false" name="region-mag" />\n<!-- etc. -->\n<meta property="ebpaj:guide-version">1.1</meta>\n</metadata>\n<manifest>\n<!-- navigation -->\n<item media-type="application/xhtml+xml" id="toc" href="nav.xhtml" properties="nav"/>\n<item media-type="application/x-dtbncx+xml" id="ncxtoc" href="toc.ncx"/>\n<!-- style -->\n<item media-type="text/css" id="fixed-layout-jp" href="style/fixed-layout-jp.css"/>\n<!-- image -->\n<item media-type="image/jpeg" id="cover" href="image/cover.jpg" properties="cover-image"/>\n<!-- xhtml -->\n<item media-type="application/xhtml+xml" id="p-cover" href="xhtml/p-cover.xhtml" properties="svg" fallback="cover"/>\n</manifest>\n<spine toc="ncxtoc" page-progression-direction="rtl">\n<itemref linear="yes" idref="p-cover" properties="rendition:page-spread-center"/>\n</spine>\n</package>';
//ナビゲーション
var navigation= '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja" >\n<head>\n<meta charset="UTF-8"/>\n<title>Navigation</title>\n</head>\n<body>\n<nav epub:type="toc" id="toc">\n<h1>Navigation</h1>\n<ol>\n<li><a href="xhtml/p-cover.xhtml">表紙</a></li>\n</ol>\n</nav>\n</body>\n</html>';
//カバーHTML
var coverxhtml='<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja" >\n<head>\n<meta charset="UTF-8"/>\n<title>作品名</title>\n<link rel="stylesheet" type="text/css" href="../style/fixed-layout-jp.css"/>\n<meta name="viewport" content="width=848, height=1200"/>\n</head>\n<body epub:type="cover">\n<div class="main">\n<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 848 1200">\n<image width="848" height="1200" xlink:href="../image/cover.jpg"/>\n</svg>\n</div>\n</body>\n</html>';
//ページHTML
var pagexhtml='<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja" >\n<head>\n<meta charset="UTF-8"/>\n<title>作品名</title>\n<link rel="stylesheet" type="text/css" href="../style/fixed-layout-jp.css"/>\n<meta name="viewport" content="width=848, height=1200"/>\n</head>\n<body>\n<div class="main">\n<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 848 1200">\n<image width="848" height="1200" xlink:href="../image/i-002.jpg"/>\n</svg>\n</div>\n</body>\n</html>';
//NCX
var ncx='<?xml version="1.0" encoding="utf-8" standalone="no"?>\n<!-- For compatibility with ePub2 Player -->\n<ncx:ncx xmlns:ncx="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n  <ncx:head>\n    <ncx:meta name="dtb:uid" content="urn:uuid:A649F639-6C1F-1014-8CC3-F813564D7508"/>\n    <ncx:meta name="dtb:depth" content="-1"/>\n    <ncx:meta name="dtb:totalPageCount" content="0"/>\n    <ncx:meta name="dtb:maxPageNumber" content="0"/>\n  </ncx:head>\n  <ncx:docTitle>\n    <ncx:text>title</ncx:text>\n  </ncx:docTitle>\n  <ncx:docAuthor>\n    <ncx:text>author</ncx:text>\n  </ncx:docAuthor>\n  <ncx:navMap>\n    <ncx:navPoint id="p01" playOrder="1">\n      <ncx:navLabel>\n        <ncx:text>navigation</ncx:text>\n      </ncx:navLabel>\n      <ncx:content src="xhtml/p-cover.xhtml"/>\n    </ncx:navPoint>\n  </ncx:navMap>\n</ncx:ncx>';
//CSS
var layout='@charset "UTF-8";\n\nhtml,\nbody {\n  margin:    0;\n  padding:   0;\n  font-size: 0;\n}\nsvg {\n  margin:    0;\n  padding:   0;\n}\n';

//EPUB3テンプレートの書換え　DOMParserを使って書き換える。

function rewriteOPF(){
//キンドルの場合kindleOPF、それ以外はstandardOPFに設定する。
//var flag = document.getElementById("radio1").checked;
//if(flag){standardOPF=kindleOPF};


//OPFファイルの書換
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
//
standardOPFxml.getElementById('creator02').textContent=$("#author2").val();
var metaall = standardOPFxml.querySelectorAll("meta[refines='#creator02']");
for  (i = 0; i < metaall.length; i++){
metaall[i].parentNode.removeChild(metaall[i]);}
if ($("#author2").val()==""){
var node = standardOPFxml.getElementById('creator02');
node.parentNode.removeChild(node);
}
//出版社
var node = standardOPFxml.getElementById("publisher");
if(node != null){node.parentNode.removeChild(node);}
var pub = standardOPFxml.querySelectorAll("meta[refines='#publisher']");
for  (i = 0; i < pub.length; i++){
pub[i].parentNode.removeChild(pub[i]);}
//meta refines="#publisher" 

//ファイルID、uuid
standardOPFxml.getElementById('unique-id').textContent=objV4.urn;
//日時
var today = new Date();
standardOPFxml.querySelector("meta[property='dcterms:modified']").textContent=today.toISOString().slice(0,19)+"Z";
//kindle向け
var node =standardOPFxml.querySelector("meta[name='original-resolution']")
if(node != null){
standardOPFxml.querySelector("meta[name='original-resolution']").setAttribute("content", $("#imgheight").val()+"x"+$("#imgwidth").val());}
//イメージをロードする場合
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
//svg: "image/svg+xml"
//var item='\n<item media-type="image/jpeg" id="i-001" href="image/i-001.jpg"/>'
//var itemxml = (new DOMParser()).parseFromString(item, 'text/xml');
//var ele= standardOPFxml .importNode(itemxml.getElementById('i-001') , true);
var	reference = standardOPFxml.getElementById('cover');
var ele = reference.cloneNode(true);
//	var ele = standardOPFxml.createElement("item");
	ele.setAttribute("media-type", imgFO[j].type);
	ele.setAttribute("id", imgFO[j].id);
	ele.setAttribute("href", "image/"+imgFO[j].id+"."+imgFO[j].ext);
	 imgdf.appendChild(ele);
}

//ココまで繰り返す
var	parent =standardOPFxml.querySelector("manifest");
console.log(ele)
//var	reference = standardOPFxml.getElementById('cover');
//coverの書き換え properties="cover-image"
	reference.setAttribute("media-type", coverFO.type);
	reference.setAttribute("href", "image/"+"cover."+coverFO.ext);
	reference.setAttribute("properties", "cover-image");
//coverFO.file_id+"."+coverFO.ext
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
//var xele = standardOPFxml.createElement("item");
var	xreference = standardOPFxml.getElementById('p-cover');
var xele = xreference.cloneNode(true);
//コードを整形しようとしたが無理だった。
//var item='\n<item media-type="application/xhtml+xml" id="p-001" href="xhtml/p-001.xhtml" properties="svg" fallback="i-001"/>'
//var itemxml = (new DOMParser()).parseFromString(item, 'text/xml');
//var xele= standardOPFxml .importNode(itemxml.getElementById('p-001') , true);

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
//var	xreference = standardOPFxml.getElementById('p-cover');
//	parent.appendChild(ele);
//	xparent.insertBefore(xele,xreference.nextSibling);
	xparent.insertBefore(xhtdf,xreference.nextSibling);
	console.log(xparent);

//spine
//<itemref linear="yes" idref="p-001" properties="page-spread-right"/>
var spinedf = standardOPFxml.createDocumentFragment();
for (j = 0; j < imgFO.length; j++){
var	sreference = standardOPFxml.querySelector("itemref[idref='p-cover']");
var spele = sreference.cloneNode(true);
//var spele = standardOPFxml.createElement("itemref");
	spele.setAttribute("linear", "yes");
	spele.setAttribute("idref", imgFO[j].xhid);
	if(j% 2 == 0){spele.setAttribute("properties", "page-spread-right")};
	if(j% 2 == 1){spele.setAttribute("properties", "page-spread-left")};
	 spinedf.appendChild(spele);
}

var	sparent =standardOPFxml.querySelector("spine");
console.log(spele)
//var	sreference = standardOPFxml.querySelector("itemref[idref='p-cover']");
	sparent.insertBefore(spinedf,sreference.nextSibling);
	console.log(sparent);
	
//XMLシリアライズ
standardOPFS = (new XMLSerializer()).serializeToString(standardOPFxml);
console.log(standardOPFxml);
standardOPFS=vkbeautify.xml(standardOPFS);
//2重実行の防止
return standardOPFS;
}
function rewriteNAV(){
//ナビゲーションファイル
var navigationXml = (new DOMParser()).parseFromString(navigation, 'text/xml');
navigationXml.querySelector("title").textContent=$("#title").val();
navigationXml.querySelectorAll("li")[0].childNodes[0].textContent=$("#covertext").val();
/*単体のナビゲーション編集
navigationXml.querySelectorAll("li")[1].childNodes[0].textContent=$("#navtext1").val();
var select =document.getElementById("InputSelect2").selectedIndex
var pagenum = navigationXml.querySelectorAll("li")[1].childNodes[0]
pagenum.setAttribute("href", "xhtml/"+imgFO[select].xhid+".xhtml")
var	reference = navigationXml.querySelectorAll("li")[1];
var Nav = reference.cloneNode(true);
*/
var df = navigationXml.createDocumentFragment();
var menu=$("*[name=formNav]");
var navtext= document.getElementsByName("selectNav")
for (j = 0; j < menu.length; j++){ 
var	reference = navigationXml.querySelectorAll("li")[0];
var Nav = reference.cloneNode(true);
 var sele=navtext[j].selectedIndex;
	Nav.firstChild.setAttribute("href", "xhtml/"+ imgFO[sele].xhid +".xhtml");
	Nav.firstChild.text=$("*[name=editNav]")[j].value;
	 df.appendChild(Nav);
}
var	parent =navigationXml.querySelector("ol");
console.log(Nav)
	parent.insertBefore(df,reference.nextSibling);
	console.log(parent);

//XMLシリアライズ
navigationS = (new XMLSerializer()).serializeToString(navigationXml);
console.log(navigationXml);
navigationS =vkbeautify.xml(navigationS);
//2重実行の防止
return navigationS;
}
function rewriteNCX(){
//toc.ncx ncx:meta name="dtb:uid"
var ncxXml = (new DOMParser()).parseFromString(ncx, 'text/xml');
ncxXml.querySelector("meta[name='dtb:uid']").setAttribute("content", objV4.urn);
ncxXml.querySelector("docTitle").childNodes[1].textContent=$("#title").val();
ncxXml.querySelector("docAuthor").childNodes[1].textContent=$("#author1").val();
ncxXml.getElementById("p01").childNodes[1].childNodes[1].textContent=$("#covertext").val();
/*
ncxXml.getElementById("about").childNodes[1].childNodes[1].textContent=$("#navtext1").val();
var select =document.getElementById("InputSelect2").selectedIndex;
ncxXml.getElementById("about").childNodes[3].setAttribute("src", "xhtml/"+imgFO[select].xhid+".xhtml");
*/
//ncxXml.getElementById("about").getAttribute("playOrder")
//ncxXml.getElementById("about").getAttribute("id")
//ncxXml.getElementById("p01")

var df = ncxXml.createDocumentFragment();
var menu=$("*[name=formNav]");
var navtext= document.getElementsByName("selectNav")
for (j = 0; j < menu.length; j++){ 
var	reference = ncxXml.getElementById("p01");
var Nav = reference.cloneNode(true);
 var sele=navtext[j].selectedIndex;
 	Nav.setAttribute("playOrder",(j+2))
 	Nav.setAttribute("id","nav"+(j+1))
 	Nav.childNodes[1].childNodes[1].textContent=$("*[name=editNav]")[j].value;
	Nav.childNodes[3].setAttribute("src", "xhtml/"+ imgFO[sele].xhid +".xhtml");
	 df.appendChild(Nav);
}
var	parent =ncxXml.querySelector("navMap");
console.log(Nav)
	parent.insertBefore(df,reference.nextSibling);
	console.log(parent);

//navPointの取得
//ncxXml.querySelectorAll("navPoint")[1]
//
//XMLシリアライズ
ncxS = (new XMLSerializer()).serializeToString(ncxXml);
console.log(ncxXml);
ncxS=vkbeautify.xml(ncxS);
//2重実行の防止
return ncxS;
}
function rewrite(){
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
imagesize.setAttributeNS("http://www.w3.org/1999/xlink","href","../image/cover."+coverFO.ext);

coverxhtml = (new XMLSerializer()).serializeToString(coverxhtmlXml);
//console.log(viewport.content);
//console.log(coverxhtmlXml);
//console.log(imagesize.getAttributeNS("http://www.w3.org/1999/xlink","href"));

//ページXHTML　pagexhtml
//pagexhtmlの初期設定
//繰り返し page1~imgFO.lengthまで
var pagexhtmlXml = (new DOMParser()).parseFromString(pagexhtml, 'text/xml');
pagexhtmlXml.querySelector('title').textContent=$("#title").val();
var viewport = pagexhtmlXml.querySelector("meta[content]");
var svg = pagexhtmlXml.querySelector("svg[viewBox]");
var imagesize = pagexhtmlXml.querySelector("image");
viewport.setAttribute("content", 'width='+$("#imgwidth").val() +' ,'+'height='+$("#imgheight").val());
svg.setAttribute("viewBox", '0 0 '+$("#imgwidth").val() +' '+$("#imgheight").val());
imagesize.setAttribute("width",$("#imgwidth").val());
imagesize.setAttribute("height",$("#imgheight").val());

for (i = 0; i < imgFO.length; i++){
var imagesize = pagexhtmlXml.querySelector("image");
imagesize.setAttributeNS("http://www.w3.org/1999/xlink","href","../image/"+imgFO[i].id+"."+imgFO[i].ext);
pages[i] = (new XMLSerializer()).serializeToString(pagexhtmlXml);
	}
console.log(pages);

}

//zip圧縮
jQuery(function($) {
  if(!JSZip.support.blob) {
      $("#demo-not-supported").removeClass("hidden");
      $("#demo").hide();
      return;
  }
  $("#demo").click(function () {
standardOPFS=rewriteOPF();
navigationS = rewriteNAV();
ncxS=rewriteNCX();
rewrite();
var zip = new JSZip();
zip.file("mimetype", "application/epub+zip");
var meta = zip.folder("META-INF");
meta.file("container.xml", containerXML);
var item = zip.folder("item");
item.file("standard.opf", standardOPFS);
item.file("nav.xhtml", navigationS);
item.file("toc.ncx", ncxS);
var img = zip.folder("item/image");
var style = zip.folder("item/style");
style.file("fixed-layout-jp.css",layout)
var xhtml = zip.folder("item/xhtml");
xhtml.file("p-cover.xhtml",coverxhtml);
for (j = 0; j < imgFO.length; j++){
xhtml.file("p-"+ ('0000' + (j+1) ).slice( -3 )+".xhtml", pages[j]);
}
img.file("cover."+coverFO.ext, coverFO.data.split('base64,')[1], {base64: true});
for (j = 0; j < imgFO.length; j++){
img.file("i-"+ ('0000' + (j+1) ).slice( -3 )+"."+imgFO[j].ext, imgFO[j].data.split('base64,')[1], {base64: true});
}
zip.generateAsync({type:"blob"})
.then(function(content) {
// see FileSaver.js
saveAs(content, $("#title").val()+".epub");
});
  });
});
