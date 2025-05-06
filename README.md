# coco-board

**サッカーの練習・試合・戦術の記録を簡単に管理できる、ノートアプリ**です。  

## 主な機能

- 試合・練習の記録（タイトル・日時・内容・振り返り・写真）
- アニメーションによる戦術の記録（フォーメーション・戦術）
- LINEでの共有

## 技術構成

- **フロントエンド**: Next.js (App Router) / React
- **UI**: Material UI
- **バックエンド**: Firebase（データベース + 認証）
- **デプロイ**: Vercel

## ディレクトリ構成

```bash
src/
├─ app/            # Next.js App Router 用のルーティング
├─ features/       # ドメインごとの機能（note, auth など）
├─ components/     # 共通コンポーネント
├─ lib/            # Firebaseなどのクライアント
├─ types/          # 型定義
└─ styles/