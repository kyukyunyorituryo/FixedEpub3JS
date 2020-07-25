var navtemplete = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html\n xmlns="http://www.w3.org/1999/xhtml"\n xmlns:epub="http://www.idpf.org/2007/ops"\n xml:lang="ja"\n>\n<head>\n<meta charset="UTF-8"/>\n<title><%= title %></title>\n</head>\n<body>\n<nav epub:type="toc" id="toc">\n<h1>Navigation</h1>\n<ol>\n<li><a href="xhtml/p-cover.xhtml"><%= cover %></a></li>\n<% for (let i=1; i < data.index.length ; i++) { -%>\n<li><a href="xhtml/p-<%= mokuji[i-1][1] %>.xhtml"><%= data.index[i][1] %></a></li>\n<% } -%>\n<% if(okuduke==true){ -%>\n<li><a href="xhtml/p-colophon.xhtml">奥付</a></li>\n<% } -%>\n</ol>\n</nav>\n</body>\n</html>'

var opftemplete = '<?xml version="1.0" encoding="UTF-8"?>\n<package\n xmlns="http://www.idpf.org/2007/opf"\n version="3.0"\n xml:lang="ja"\n unique-identifier="unique-id"\n prefix="rendition: http://www.idpf.org/vocab/rendition/#\n         ebpaj: http://www.ebpaj.jp/"\n>\n\n<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n\n<!-- 作品名 -->\n<dc:title id="title"><%= title %></dc:title>\n<% if (title_kana !== "" || title_kana === null){-%>\n<meta refines="#title" property="file-as"><%= title_kana %></meta>\n<% } -%>\n\n<!-- 著者名 -->\n<dc:creator id="creator01"><%= creator1 %></dc:creator>\n<% if (creator1_kana !== "" || creator1_kana === null) {-%>\n<meta refines="#creator01" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator01" property="file-as"><%= creator1_kana %></meta>\n<meta refines="#creator01" property="display-seq">1</meta>\n<% } -%>\n\n<% if(creator2 !== "" || creator2 === null){-%>\n<dc:creator id="creator02"><%= creator2 %></dc:creator>\n<% } -%>\n<% if (creator2_kana !== "" || creator2_kana === null) {-%>\n<meta refines="#creator02" property="role" scheme="marc:relators">aut</meta>\n<meta refines="#creator02" property="file-as"><%= creator2_kana %></meta>\n<meta refines="#creator02" property="display-seq">2</meta>\n<% } -%>\n\n<!-- 出版社名 -->\n<% if (publisher !== "" || publisher === null) {-%>\n<dc:publisher id="publisher"><%= publisher %></dc:publisher>\n<% } -%>\n<% if (publisher_kana !== "" || publisher_kana === null) {-%>\n<meta refines="#publisher" property="file-as"><%= publisher_kana %></meta>\n<% } -%>\n\n<!-- 言語 -->\n<dc:language><%= language %></dc:language>\n\n<!-- ファイルid -->\n<dc:identifier id="unique-id"><%= uuid4 %></dc:identifier>\n\n<!-- 更新日 -->\n<meta property="dcterms:modified"><%= date %></meta>\n\n<!-- Fixed-Layout Documents指定 -->\n<meta property="rendition:layout">pre-paginated</meta>\n<meta property="rendition:spread">landscape</meta>\n\n<!-- etc. -->\n<meta property="ebpaj:guide-version">1.1.3</meta>\n<meta name="primary-writing-mode" content="<%= panel_view %>"/>\n\n</metadata>\n\n<manifest>\n\n<!-- navigation -->\n<item media-type="application/xhtml+xml" id="toc" href="navigation-documents.xhtml" properties="nav"/>\n\n<!-- style -->\n<item media-type="text/css" id="fixed-layout-jp" href="style/fixed-layout-jp.css"/>\n\n<!-- image -->\n<item media-type="<%= cover.type %>" id="cover"      href="image/cover.<%= cover.ext %>" properties="cover-image"/>\n<% for (let i in data.files) { -%>\n<item media-type="<%= data.files[i].type %>" id="<%= data.files[i].file_id %>"      href="image/<%= data.files[i].file_id+"."+data.files[i].ext %>"/>\n<% } -%>\n<% if(okuduke==true){ -%>\n<item media-type="<%= okuduke.type %>" id="i-colophon" href="image/i-colophon.<%= okuduke.ext %>"/>\n<% } -%>\n\n<!-- xhtml -->\n<item media-type="application/xhtml+xml" id="p-cover"    href="xhtml/p-cover.xhtml"    properties="svg"/>\n<% for (let i in data.files) { \nvar pageid="p-"+ ("0000" + (parseInt(i)+1) ).slice( -3 )\n-%>\n\n<item media-type="application/xhtml+xml" id="<%= pageid %>"      href="xhtml/<%= pageid %>.xhtml"      properties="svg"/>\n<% } -%>\n<% if(okuduke==true){ -%>\n<item media-type="application/xhtml+xml" id="p-colophon" href="xhtml/p-colophon.xhtml" properties="svg"/>\n<% } -%>\n</manifest>\n\n<spine page-progression-direction="<%= page_direction %>">\n\n<itemref linear="yes" idref="p-cover"    properties="rendition:page-spread-center"/>\n<% for (let i in data.files) {\npageid="p-"+ ("0000" + (parseInt(i)+1) ).slice( -3 )\nif(page_direction == "rtl"){\nif (i%2 == 0 ){\n -%>\n<itemref linear="yes" idref="<%= pageid %>"      properties="page-spread-right"/>\n<% }else { -%>\n<itemref linear="yes" idref="<%= pageid %>"      properties="page-spread-left"/>\n<%} } -%>\n<% if(page_direction == "ltr"){\nif (i%2 == 0 ){\n -%>\n <itemref linear="yes" idref="<%= pageid %>"      properties="page-spread-left"/>\n <% }else { -%>\n<itemref linear="yes" idref="<%= pageid %>" properties="page-spread-right"/>\n<%} } -%>\n<% } -%>\n<% if(okuduke==true){ -%>\n<itemref linear="yes" idref="p-colophon" properties="rendition:page-spread-center"/>\n<% } -%>\n</spine>\n\n</package>\n'

var toctemplete = '<?xml version="1.0" encoding="utf-8" standalone="no"?>\n<!-- For compatibility with ePub2 Player -->\n<ncx:ncx\n	xmlns:ncx="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n	<ncx:head>\n		<ncx:meta name="dtb:uid" content="urn:uuid:<%= uuid4 %>"/>\n		<ncx:meta name="dtb:depth" content="-1"/>\n		<ncx:meta name="dtb:totalPageCount" content="0"/>\n		<ncx:meta name="dtb:maxPageNumber" content="0"/>\n	</ncx:head>\n	<ncx:docTitle>\n		<ncx:text><%= title %></ncx:text>\n	</ncx:docTitle>\n	<ncx:docAuthor>\n		<ncx:text><%= creator1 %></ncx:text>\n	</ncx:docAuthor>\n	<ncx:navMap>\n		<ncx:navPoint id="p01" playOrder="1">\n			<ncx:navLabel>\n				<ncx:text><%= cover %></ncx:text>\n			</ncx:navLabel>\n			<ncx:content src="xhtml/p-cover.xhtml"/>\n		</ncx:navPoint>\n<% for (let i=1; i < data.index.length ; i++) { -%>\n		<ncx:navPoint id="nav<%= i %>" playOrder="<%= i+1 %>">\n			<ncx:navLabel>\n				<ncx:text><%= data.index[i][1] %></ncx:text>\n			</ncx:navLabel>\n			<ncx:content src="xhtml/p-<%= mokuji[i-1][1] %>.xhtml"/>\n		</ncx:navPoint>\n<% } -%>\n	</ncx:navMap>\n</ncx:ncx>'

var covertemplete = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja">\n<head>\n<meta charset="UTF-8" />\n<title><%= title %></title>\n<link rel="stylesheet" type="text/css" href="../style/fixed-layout-jp.css" />\n<meta name="viewport" content="width=<%= width %> ,height=<%= height %>" />\n</head>\n<body epub:type="cover">\n<div class="main">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 <%= width %> <%= height %>">\n<image width="<%= width %>" height="<%= height %>" xlink:href="../image/<%= covername %>"/>\n</svg>\n</div>\n</body>\n</html>'

var pagetemplete = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja">\n<head>\n<meta charset="UTF-8" />\n<title><%= title %></title>\n<link rel="stylesheet" type="text/css" href="../style/fixed-layout-jp.css" />\n<meta name="viewport" content="width=<%= width %> ,height=<%= height %>" />\n</head>\n<body>\n<div class="main">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 <%= width %> <%= height %>">\n<image width="<%= width %>" height="<%= height %>" xlink:href="../image/<%= image %>"/>\n</svg>\n</div>\n</body>\n</html>'

var containerXML = '<?xml version="1.0" encoding="UTF-8"?>\n<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">\n<rootfiles>\n<rootfile full-path="item/standard.opf" media-type="application/oebps-package+xml"/>\n</rootfiles>\n</container>';

var css_style = '@charset "UTF-8";\n\nhtml,\nbody {\n  margin:    0;\n  padding:   0;\n  font-size: 0;\n}\nsvg {\n  margin:    0;\n  padding:   0;\n}\n';

var data = {
    "language": "ja",
    "title": "タイトル",
    "creator1": "著者名1",
    "creator2": "著者名２",
    "index": [],
    "page_direction": "rtl",
    "panel_view": "horizontal-rl",
    "cover_file": {},
    "files": [],
    "mokuji": []
}
//入力内容の取り込み
function dataset() {
    //綴じ方向
    if (document.getElementById("binding-ltr").checked) { data.page_direction = "ltr"; }
    else { data.page_direction = "rtl"; }
    //パネルビュー
    var binding = document.getElementById("binding-ltr").checked
    var panel = document.getElementById("panel-v").checked

    //右綴じ漫画horizontal-rl binding=false, panel=false
    if (!binding && !panel) {
        data.panel_view = "horizontal-rl"
    }
    //左綴じ漫画horizontal-lr binding=true, panel=false
    else if (binding && !panel) {
        data.panel_view = "horizontal-lr"
    }
    //右綴じ四コマvertical-rl binding=false panel=true
    else if (!binding && panel) {
        data.panel_view = "vertical-rl"
    }
    //左綴じ四コマvertical-lr binding=true, panel=true
    else { data.panel_view = "vertical-lr" };

    //タイトル
    data.title = $("#title").val();
    //タイトルカナ
    data.title_kana = $("#title_kana").val();
    //著者１
    data.creator1 = $("#creator1").val();
    //著者１カナ
    data.creator1_kana = $("#creator1_kana").val();
    //著者２
    data.creator2 = $("#creator2").val();
    //著者２カナ
    data.creator2_kana = $("#creator2_kana").val();
    //出版社
    data.publisher = $("#publisher").val();
    //出版社カナ
    data.publisher_kana = $("#publisher_kana").val();
    //言語
    data.language = document.getElementById("LangSelect").value
    //目次
    data.index = []
    data.mokuji = []
    data.index.push([data.cover_file.file_name, $("#covertext").val()])
    //画像サイズ
    data.width= $("#imgwidth").val()
    data.height= $("#imgheight").val()

    //data.files[i].id=('0000' + (parseInt(i) +1)) .slice( -3 )
    //data.files[i].file_id= "i-"+ ('0000' + (parseInt(i) +1)) .slice( -3 )
    for (let i in data.files) {
        data.files[i].id = ('0000' + (parseInt(i) + 1)).slice(-3)
        data.files[i].file_id = "i-" + ('0000' + (parseInt(i) + 1)).slice(-3)
    }
    var menu = $("*[name=formNav]");
    var navtext = document.getElementsByName("selectNav")

    for (let j = 0; j < menu.length; j++) {
        sele = navtext[j].selectedIndex;
        data.index.push([data.files[sele].file_name, $("*[name=editNav]")[j].value])
        data.mokuji.push([data.files[sele].file_id, data.files[sele].id])
        $("*[name=editNav]")[j].value
    }
}

var objV4 = UUID.genV4();
uuid4 = objV4.urn;
var today = new Date();
var date = today.toISOString().slice(0, 19) + "Z";

epub = function (data) {

    //ejsテンプレートエンジン　ページファイル
//後で追加する機能を変数としておいておく
    var okuduke=false
    var nav = ejs.render(navtemplete, {
        okuduke : okuduke,
        title: data.title,
        cover: data.index[0][1],
        data: data,
        mokuji: data.mokuji
    })
    console.log(nav)

//後で追加する機能を変数としておいておく
/*
var title_kana=''
var creator1_kana=''
var creator2_kana=''
var publisher=''
var publisher_kana=''
*/
    var opf = ejs.render(opftemplete, {
        uuid4: uuid4,
        title: data.title,
        title_kana:data.title_kana,
        creator1: data.creator1,
        creator1_kana:data.creator1_kana,
        creator2: data.creator2,
        creator2_kana:data.creator2_kana,
        publisher:data.publisher,
        publisher_kana:data.publisher_kana,
        okuduke:okuduke,
        date: date,
        panel_view: data.panel_view,
        page_direction: data.page_direction,
        cover: data.cover_file,
        data: data,
        language: data.language
    })
    console.log(opf)
    var tocncx = ejs.render(toctemplete, {
        uuid4: uuid4,
        creator1: data.creator1,
        title: data.title,
        cover: data.index[0][1],
        toc1: "目次",
        data: data,
        mokuji: data.mokuji
    })
    console.log(tocncx)
    var coverxhtml = ejs.render(covertemplete, {
        title: data.title,
        width: data.width,
        height: data.height,
        covername: "cover." + data.cover_file.ext
    })
    console.log(coverxhtml)
    var pages = [];
    for (let i in data.files) {
        pages[i] = ejs.render(pagetemplete, {
            title: data.title,
            width: data.width,
            height: data.height,
            image: data.files[i].file_id + "." + data.files[i].ext,
        })
        //        console.log(pages[i])
    };
    var zip = new JSZip();
    zip.file("mimetype", "application/epub+zip");
    var meta = zip.folder("META-INF");
    meta.file("container.xml", containerXML);
    var item = zip.folder("item");
    item.file("standard.opf", opf);
    item.file("navigation-documents.xhtml", nav);
//    item.file("toc.ncx", tocncx);
    //画像ファイル生成
    var img = zip.folder("item/image");
    img.file("cover." + data.cover_file.ext, data.cover_file.data.split('base64,')[1], { base64: true })
    for (let i in data.files) {
        img.file(data.files[i].file_id + "." + data.files[i].ext, data.files[i].data.split('base64,')[1], { base64: true })
    }
    var style = zip.folder("item/style");
    style.file("fixed-layout-jp.css", css_style)
    var xhtml = zip.folder("item/xhtml");
    xhtml.file("p-cover.xhtml", coverxhtml);
    for (let i in data.files) {
        xhtml.file("p-" + ('0000' + (parseInt(i) + 1)).slice(-3) + ".xhtml", pages[i]);
    }

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // see FileSaver.js
            saveAs(content, $("#title").val() + ".epub");
        });
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
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '" onclick="pop(this) "/>'].join('');
                if (document.getElementById('coverthumb').hasChildNodes()) {
                    document.getElementById('coverthumb').replaceChild(span, document.getElementById('coverthumb').firstChild);
                }
                else { document.getElementById('coverthumb').insertBefore(span, null); }
                if (theFile.type == "image/jpeg") { cover_ext = "jpg" };
                if (theFile.type == "image/png") { cover_ext = "png" };
                //チェックコード
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    console.log(image.width);
                    console.log(image.height);
                    document.getElementById("imgwidth").value = image.width;
                    document.getElementById("imgheight").value = image.height;
                    //
                    data.cover_file = {
                        "id": 'cover',
                        "file_id": 'cover',
                        "file_name": theFile.name,
                        "data": e.target.result,
                        "type": theFile.type,
                        "ext": cover_ext
                    }
                    data.width = image.width
                    data.height = image.height
                };
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('coverfile').addEventListener('change', CoverFileSelect, false);
});
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
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                    '" title="', theFile.name, '" onclick="pop(this) "/>'].join('');
                document.getElementById('list').insertBefore(span, null);
                //                imgFO.push({ file_name: theFile.name, data: e.target.result, type: theFile.type });
                addselect();
                if (theFile.type == "image/jpeg") { image_ext = "jpg" };
                if (theFile.type == "image/png") { image_ext = "png" };
                data.files.push({
                    //"id" :('0000' + (parseInt(i) +1)) .slice( -3 ),
                    //"file_id": "i-"+ ('0000' + (parseInt(i) +1)) .slice( -3 ),
                    "file_name": theFile.name,
                    "data": e.target.result,
                    "type": theFile.type,
                    "ext": image_ext
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
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
});
//sort　本文画像の整列
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sort").addEventListener("click", mySort);
});
function mySort() {
    var list = document.getElementById('list');
    var Nlist = list.getElementsByTagName('span');
    var myArray = Array.prototype.slice.call(Nlist);
var sorter = natsort();
myArray.sort(function(a, b) {
  return sorter(a.firstChild.title, b.firstChild.title);
});
for (var i = 0; i < myArray.length; i++) {
        list.appendChild(list.removeChild(myArray[i]))
    }

 data.files.sort(function(a, b) {
  return sorter(a.file_name, b.file_name);
});
addselect();
}

//selectの追加
function addselect() {
    var navtext = document.getElementsByName("selectNav")

    $("*[name=selectNav]").children().remove();
    for (j = 0; j < data.files.length; j++) {
        $("*[name=selectNav]").append("<option>" + data.files[j].file_name + "</option>");
    }
};
//selectの削減
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("removeselect").addEventListener("click", removeselect);
});
function removeselect() {
    if ($("*[name=formNav]").length > 1) {
        $("*[name=formNav]:last").remove()
    }
};


//目次の追加
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addmenu").addEventListener("click", addmenu);
});
function addmenu() {
    var menu = document.getElementsByTagName("form")[1];
    var cmenu = menu.cloneNode(true);
    cmenu.childNodes[1].childNodes[3].id = document.getElementsByTagName("form").length + 1;

    //par.insertBefore(cmenu,menu.nextSibling);
    document.getElementById("menu-group").appendChild(cmenu);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("demo").addEventListener("click", function () {
        dataset()
        epub(data)
    });
});
