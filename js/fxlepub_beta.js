var navtemplete ='<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html\n	xmlns="http://www.w3.org/1999/xhtml"\n	xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja">\n	<head>\n		<meta charset="UTF-8" />\n		<title><%= title %></title>\n	</head>\n	<body>\n		<nav epub:type="toc" id="toc">\n			<h1>Navigation</h1>\n			<ol>\n				<li>\n					<a href="xhtml/p-cover.xhtml"><%= cover %></a>\n				</li>\n<% for (let i=1; i < data.index.length ; i++) { -%>\n				<li>\n					<a href="xhtml/p-<%= mokuji[i-1][1] %>.xhtml"><%= data.index[i][1] %></a>\n				</li>\n<% } -%>\n			</ol>\n		</nav>\n	</body>\n</html>'

var opftemplete ='<?xml version="1.0" encoding="utf-8"?>\n<package\n	xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="ja" unique-identifier="unique-id" prefix="rendition: http://www.idpf.org/vocab/rendition/# ebpaj: http://www.ebpaj.jp/">\n	<metadata\n		xmlns:dc="http://purl.org/dc/elements/1.1/">\n		<!-- 作品名 -->\n		<dc:title id="title"><%= title %></dc:title>\n		<!-- 著者名 -->\n		<dc:creator id="creator01"><%= creator1 %></dc:creator>\n<% if (creator2 !== "" || creator2 === null) {-%>\n		<dc:creator id="creator02"><%= creator2 %></dc:creator>\n<% } -%>\n		<!-- 出版社名 -->\n		<!-- 言語 -->\n		<dc:language id="language">ja</dc:language>\n		<!-- ファイルid -->\n		<dc:identifier id="unique-id">urn:uuid:<%= uuid4 %></dc:identifier>\n		<!-- 更新日 -->\n		<meta property="dcterms:modified"><%= date %></meta>\n		<!-- Fixed-Layout Documents指定 -->\n		<meta property="rendition:layout">pre-paginated</meta>\n		<meta property="rendition:spread">landscape</meta>\n		<!-- etc. -->\n		<meta property="ebpaj:guide-version">1.1</meta>\n		<meta name="primary-writing-mode" content="<%= panel_view %>"/>\n	</metadata>\n	<manifest>\n		<!-- navigation -->\n		<item media-type="application/xhtml+xml" id="toc" href="nav.xhtml" properties="nav"/>\n		<item media-type="application/x-dtbncx+xml" id="ncxtoc" href="toc.ncx"/>\n		<!-- style -->\n		<item media-type="text/css" id="fixed-layout-jp" href="style/fixed-layout-jp.css"/>\n		<!-- image -->\n		<item media-type="<%= type %>" id="cover" href="image/cover.<%= cover_ext %>" properties="cover-image"/>\n<% for (let i in data.files) { -%>\n		<item media-type="<%= data.files[i].type %>" id="<%= data.files[i].file_id %>" href="image/<%= data.files[i].file_id+"."+data.files[i].ext %>"/>\n<% } -%>\n		<!-- xhtml -->\n		<item media-type="application/xhtml+xml" id="p-cover" href="xhtml/p-cover.xhtml" properties="svg" fallback="cover"/>\n<% for (let i in data.files) { \nvar pageid="p-"+ ("0000" + (parseInt(i)+1) ).slice( -3 )\n-%>\n		<item media-type="application/xhtml+xml" id="<%= pageid %>" href="xhtml/<%= pageid %>.xhtml" properties="svg" fallback="<%= data.files[i].file_id %>"/>\n<% } -%>\n	</manifest>\n	<spine toc="ncxtoc" page-progression-direction="<%= page_direction %>">\n		<itemref linear="yes" idref="p-cover" properties="rendition:page-spread-center"/>\n<% for (let i in data.files) {\npageid="p-"+ ("0000" + (parseInt(i)+1) ).slice( -3 )\nif(page_direction == "rtl"){\nif (i%2 == 0 ){\n -%>\n		<itemref linear="yes" idref="<%= pageid %>" properties="page-spread-right"/>\n<% }else { -%>\n		<itemref linear="yes" idref="<%= pageid %>" properties="page-spread-left"/>\n<%} } -%>\n<% if(page_direction == "ltr"){\nif (i%2 == 0 ){\n -%>\n		<itemref linear="yes" idref="<%= pageid %>" properties="page-spread-left"/>\n<% }else { -%>\n		<itemref linear="yes" idref="<%= pageid %>" properties="page-spread-right"/>\n<%} } -%>\n<% } -%>\n	</spine>\n</package>'

var toctemplete ='<?xml version="1.0" encoding="utf-8" standalone="no"?>\n<!-- For compatibility with ePub2 Player -->\n<ncx:ncx\n	xmlns:ncx="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n	<ncx:head>\n		<ncx:meta name="dtb:uid" content="urn:uuid:<%= uuid4 %>"/>\n		<ncx:meta name="dtb:depth" content="-1"/>\n		<ncx:meta name="dtb:totalPageCount" content="0"/>\n		<ncx:meta name="dtb:maxPageNumber" content="0"/>\n	</ncx:head>\n	<ncx:docTitle>\n		<ncx:text><%= title %></ncx:text>\n	</ncx:docTitle>\n	<ncx:docAuthor>\n		<ncx:text><%= creator1 %></ncx:text>\n	</ncx:docAuthor>\n	<ncx:navMap>\n		<ncx:navPoint id="p01" playOrder="1">\n			<ncx:navLabel>\n				<ncx:text><%= cover %></ncx:text>\n			</ncx:navLabel>\n			<ncx:content src="xhtml/p-cover.xhtml"/>\n		</ncx:navPoint>\n<% for (let i=1; i < data.index.length ; i++) { -%>\n		<ncx:navPoint id="nav<%= i %>" playOrder="<%= i+1 %>">\n			<ncx:navLabel>\n				<ncx:text><%= data.index[i][1] %></ncx:text>\n			</ncx:navLabel>\n			<ncx:content src="xhtml/p-<%= mokuji[i-1][1] %>.xhtml"/>\n		</ncx:navPoint>\n<% } -%>\n	</ncx:navMap>\n</ncx:ncx>'

var covertemplete ='<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja">\n<head>\n<meta charset="UTF-8" />\n<title><%= title %></title>\n<link rel="stylesheet" type="text/css" href="../style/fixed-layout-jp.css" />\n<meta name="viewport" content="width=<%= width %> ,height=<%= height %>" />\n</head>\n<body epub:type="cover">\n<div class="main">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 <%= width %> <%= height %>">\n<image width="<%= width %>" height="<%= height %>" xlink:href="../image/<%= covername %>"/>\n</svg>\n</div>\n</body>\n</html>'

var pagetemplete='<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja">\n<head>\n<meta charset="UTF-8" />\n<title><%= title %></title>\n<link rel="stylesheet" type="text/css" href="../style/fixed-layout-jp.css" />\n<meta name="viewport" content="width=<%= width %> ,height=<%= height %>" />\n</head>\n<body>\n<div class="main">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 <%= width %> <%= height %>">\n<image width="<%= width %>" height="<%= height %>" xlink:href="../image/<%= image %>"/>\n</svg>\n</div>\n</body>\n</html>'

var containerXML ='<?xml version="1.0" encoding="UTF-8"?>\n<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">\n<rootfiles>\n<rootfile full-path="item/standard.opf" media-type="application/oebps-package+xml"/>\n</rootfiles>\n</container>';

var layout='@charset "UTF-8";\n\nhtml,\nbody {\n  margin:    0;\n  padding:   0;\n  font-size: 0;\n}\nsvg {\n  margin:    0;\n  padding:   0;\n}\n';

var data={
"title": "タイトル",
"author1": "著者名1",
"author2": "著者名２",
"index": [
    ["cover.jpg", "表紙"],
    ["00001.jpg", "目次"],
    ["00005.jpg", "最終ページ"]
    ],
"page_direction": "rtl",
"panel_view": "horizontal-rl",
"cover_file": {},
"files": []
}
var objV4 = UUID.genV4();
uuid4=objV4.hexString;
var today = new Date();
var date = today.toISOString().slice(0,19)+"Z";

epub = function (data) {
mokuji=[]
//data.files[i].id=('0000' + (parseInt(i) +1)) .slice( -3 )
//data.files[i].file_id= "i-"+ ('0000' + (parseInt(i) +1)) .slice( -3 )
for (let i in data.files) {
data.files[i].id=('0000' + (parseInt(i) +1)) .slice( -3 )
data.files[i].file_id= "i-"+ ('0000' + (parseInt(i) +1)) .slice( -3 )
mokuji.push([data.files[i].file_id,data.files[i].id])
}
//ejsテンプレートエンジン　ページファイル
var nav = ejs.render(navtemplete, {
    title: data.title,
    cover:data.index[0][1],
    data: data,
    mokuji:mokuji
})
console.log(nav)
var opf = ejs.render(opftemplete, {
    uuid4:uuid4,
    title: data.title,
    creator1: data.author1 ,
    creator2: data.author2 ,
    date:date,
    panel_view:data.panel_view,
    page_direction:data.page_direction,
    cover_ext:data.cover_file.ext,
    type:data.cover_file.type,
    data:data
})
console.log(opf)
var tocncx = ejs.render(toctemplete, {
    uuid4:uuid4,
    creator1: data.author1 ,
    title: data.title,
    cover:data.index[0][1],
    toc1:"目次",
    data: data,
    mokuji:mokuji
})
console.log(tocncx)
var coverxhtml = ejs.render(covertemplete, {
    title: data.title,
    width: data.width,
    height: data.height,
    covername: data.cover_file.file_name
})

var pages = [];
for(let i in data.files) {
pages[i] = ejs.render(pagetemplete, {
    title: data.title,
    width: data.width,
    height: data.height,
    image:data.files[i].file_id +"."+data.files[i].ext,
})
console.log(pages[i])
};

}

//UI用コード
//
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
	          if(theFile.type=="image/jpeg"){cover_ext="jpg"};
	if(theFile.type=="image/png"){cover_ext="png"};
	//チェックコード
var image =new Image();
image.src = e.target.result;
image.onload = function() {
console.log(image.width);
console.log(image.height);
document.getElementById("imgwidth").value=image.width;
document.getElementById("imgheight").value=image.height;
//
data.cover_file= {
"id" :'cover',
"file_id": 'cover',
"file_name": theFile.name,
"data": e.target.result,
"type": theFile.type,
"ext":cover_ext
}
data.width=image.width
data.height=image.height
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
        if(theFile.type=="image/jpeg"){image_ext="jpg"};
	if(theFile.type=="image/png"){image_ext="png"};
data.files.push({
//"id" :('0000' + (parseInt(i) +1)) .slice( -3 ),
//"file_id": "i-"+ ('0000' + (parseInt(i) +1)) .slice( -3 ),
"file_name": theFile.name,
"data": e.target.result,
"type": theFile.type,
"ext":image_ext
});
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
document.addEventListener("DOMContentLoaded", function(){
document.getElementById("sort").addEventListener("click",mySort);
  });
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
//selectの削減
document.addEventListener("DOMContentLoaded", function(){
document.getElementById("removeselect").addEventListener("click",removeselect);
  });
function removeselect(){
if ($("*[name=formNav]").length>1){
$("*[name=formNav]:last").remove()
}
};
//document.addEventListener("DOMContentLoaded", function(){
//document.getElementById('InputSelect2').addEventListener('click', addselect, false);
//});
//.parentNode.removeChild()


//目次の追加
document.addEventListener("DOMContentLoaded", function(){
document.getElementById("addmenu").addEventListener("click",addmenu);
  });
function addmenu(){
var menu = document.getElementsByTagName("form")[1];
var cmenu= menu.cloneNode(true);
cmenu.childNodes[1].childNodes[3].id=document.getElementsByTagName("form").length+1;

//par.insertBefore(cmenu,menu.nextSibling);
document.getElementById("menu-group").appendChild(cmenu);
}

//zip圧縮
jQuery(function($) {
  if(!JSZip.support.blob) {
      $("#demo-not-supported").removeClass("hidden");
      $("#demo").hide();
      return;
  }
  $("#demo").click(function () {
  
var zip = new JSZip();
zip.file("mimetype", "application/epub+zip");
var meta = zip.folder("META-INF");
meta.file("container.xml", containerXML);
var item = zip.folder("item");
item.file("standard.opf", opf);
item.file("nav.xhtml", nav);
item.file("toc.ncx", tocncx);
//画像ファイル生成
var img = zip.folder("item/image");
img.file("cover." + data.cover_file.ext,data.cover_file.data)
for (let i in data.files) {
img.file(data.files[i].file_id+"."+data.files[i].ext,data.files[i].data)
}
var style = zip.folder("item/style");
style.file("fixed-layout-jp.css",css_style)
var xhtml = zip.folder("item/xhtml");
xhtml.file("p-cover.xhtml",coverxhtml);
for (let i in data.files) {
xhtml.file("p-"+ ('0000' + (parseInt(i)+1) ).slice( -3 )+".xhtml", pages[i]);
}

zip.generateAsync({type:"blob"})
.then(function(content) {
// see FileSaver.js
saveAs(content, $("#title").val()+".epub");
  });
  });
});