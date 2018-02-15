# FixedEpub3JS
固定レイアウトのEPUB３を作成するJavaScript

EPUBのベースに使っているのが、電書協とデジタルコミック協議会。デジタルコミック協議会 EPUB3 固定レイアウト 仕様に基づいて作っているので色んな所に入稿できるEPUBになる予定。
http://www.digital-comic.jp/press_release_DCA_EPUB3.pdf

## 動作デモページ
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

英語
create  Fixed Layout EPUB3 with javascript on browser
 Action demo page
 https://kyukyunyorituryo.github.io/FixedEpub3JS/en/
 