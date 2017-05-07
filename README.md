# FixedEpub3JS
固定レイアウトのEPUB３を作成するJavaScript

EPUBのベースに使っているのが、電書協とデジタルコミック協議会。デジタルコミック協議会 EPUB3 固定レイアウト 仕様に基づいて作っているので色んな所に入稿できるEPUBになる予定。
http://www.digital-comic.jp/press_release_DCA_EPUB3.pdf

## 動作デモページ
https://kyukyunyorituryo.github.io/FixedEpub3JS/

## 使い方
### 端末選択
キンドル用とkobo用ではメタデータが干渉する気がするので、キンドル用だけ別に分けて作った。
### 入力欄
* 表題、著者１、著者２
タイトルや著者名などを入力する。読み仮名や、出版社名を入れられるソフトもある。詳細設定モードを作るかもしれない。

* 表紙画像選択
表紙画像はローカルファイルから選択することになるが、続けて2枚選択できてしまうバグが。

* 画像ファイル解像度
画像ファイル解像度は画像から自動取得もできるが手動で入力するようにしている。

* 画像ファイルの選択
画像ファイルは複数を一括選択する。表示では順番が不定だが、出力されるときは名前順になっている。今後は自然ソートを使って並び替えたい。

* 保存
保存をクリックするとダウンロードするときのような画面が出る。実際はネットからダウンロードするわけではない。

## 使用したライブラリ
uuid.js https://github.com/LiosK/UUID.js
JSZIP https://stuk.github.io/jszip/ 
FileSaver.js https://github.com/eligrey/FileSaver.js/
bootstrap http://getbootstrap.com/
jquery https://jquery.com/
