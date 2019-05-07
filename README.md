# FixedEpub3JS
固定レイアウトのEPUB３を作成するJavaScript

EPUBは電書協とデジタルコミック協議会をベースにしている。デジタルコミック協議会 EPUB3 固定レイアウト 仕様に基づいて作っているので次の所に入稿できる。
kobo、Kindle、ibooks、BOOK WALKER、その他。
http://www.digital-comic.jp/press_release_DCA_EPUB3.pdf

## 動作ページ
https://kyukyunyorituryo.github.io/FixedEpub3JS/

## 使い方

### 入力欄
* 「表題、著者１、著者２」
タイトルや著者名などを入力する。読み仮名や、出版社名は省いている。詳細設定モードを作るかもしれない。

* 「表紙画像選択」
表紙画像はローカルファイルから選択することになる。

* 「画像ファイル解像度」
画像ファイル解像度は手動で入力するようにしている。

* 「本文ファイルの選択」
画像ファイルは複数を一括選択する。表示では順番が不定だが、出力されるときは名前順になっている。今後は自然ソートを使って並び替えたい。

* 「保存」
保存をクリックするとダウンロードするときのような画面が出る。実際はネットからダウンロードするわけではなくブラウザでEPUBを生成している。

## 使用したライブラリ
* uuid.js https://github.com/LiosK/UUID.js
* JSZIP https://stuk.github.io/jszip/ 
* FileSaver.js https://github.com/eligrey/FileSaver.js/
* bootstrap http://getbootstrap.com/
* jquery https://jquery.com/
* vkBeautify https://github.com/vkiryukhin/vkBeautify
* BiB/i http://bibi.epub.link/
* ejs https://github.com/mde/ejs
# English
Fixed Layout EPUB3 generator with javascript on browser.

## How to use
* "Title, Author 1, Author 2" Enter the title and author name. Reading kana and publisher name are omitted. It may make a detailed setting mode.

* "Cover image selection" The cover image will be selected from the local file.

* "Image File Resolution" Image file resolution is manually entered.

* "Select text file" Select multiple images at once. In the display, the order is indeterminate, but when it is output, it is sorted by name. From now on I would like to sort using natural sorting.

* "Save" When you click Save, a screen similar to the one for downloading appears. Actually it does not download from the net but generates EPUB in the browser.
###  demo page
 https://kyukyunyorituryo.github.io/FixedEpub3JS/en/
