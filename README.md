# livecamera

## 自動デプロイ
releaseブランチにgithub actionのymlがある

releaseブランチにpushされるとvueプロジェクトがbuildされて中のapp/docsだけがgh-pagesブランチに転送される

- gh-pagesに静的ファイルを置くとgithub pagesに自動的に連携される

- https://yasu-kun.github.io/ {repository} で公開することができる
　
（今回はhttps://yasu-kun.github.io/livecamera）

## 設定内容
- レポジトリの設定>Actions>Workflow permissions>✅Read and write permissions

- Github actionは動作させるブランチ上におく必要がある？んだっけか
