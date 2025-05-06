# コーディングルール・ガイドライン

## コーディングスタイル
- import順は外部→エイリアス→相対パス
- `use client` / `use server` の使い分けを守る
- UI部品は `components/` に、機能別は `features/` に整理
- ""（ダブルクォート）を使って、''（シングルクォート）は使わない

## MUIスタイルの書き方
- 単純なスタイルは sx={{ ... }} を使う
- 複雑なスタイルや再利用するスタイルは、変数（const boxSx = {}）または .styles.ts に切り出す
- テーマの色や余白は theme.palette, theme.spacing などテーマ変数を使って管理する
- ショートハンド（p, m, px, py など）を活用して簡潔に書く
- styled はネストや複雑な場合のみ使う。基本は sx を優先

## 命名ルール
- コンポーネント：PascalCase (`MyButton.tsx`)
- hooks：camelCase + `use` プレフィックス (`useWords.ts`)
- 型：`Word`, `User`, `Note` など単数形
