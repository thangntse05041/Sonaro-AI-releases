[Tiếng Việt](#vi) · [English](#en) · [日本語](#ja)

<a id="vi"></a>

# Chính sách quyền riêng tư — Sonaro AI

Cập nhật: 21/10/2026

Sonaro AI là ứng dụng trò chuyện với AI trên máy tính (Windows, macOS) và điện thoại (Android). Trang này giải thích ứng dụng gửi và lưu những gì, ở đâu.

## Trên máy của bạn

- Cuộc trò chuyện, ảnh và tài liệu đính kèm được lưu trên máy của bạn.
- Cài đặt và API key bạn nhập (cả token đăng nhập của connector) chỉ nằm trên máy, được mã hoá bằng kho khoá của hệ điều hành, và **không bao giờ** được đồng bộ.
- Phiên Code (thư mục làm việc, thay đổi file, lệnh đã chạy) và lịch chạy chỉ lưu trên máy tính đó.

## Khi bạn dùng AI và tìm web

- **AI miễn phí (Sonaro AI):** câu hỏi đi qua máy chủ của dự án (Supabase) tới nhà cung cấp AI miễn phí (ví dụ Groq, Cohere). Máy chủ **không lưu** nội dung trò chuyện. Để giới hạn số lượt của người chưa đăng nhập, máy chủ đếm lượt theo mã cài đặt và địa chỉ IP, cả hai đều đã được băm.
- **AI bằng API key của bạn** (OpenAI, Anthropic, Google Gemini, OpenRouter, OpenCode Go, dịch vụ bạn tự thêm): câu hỏi được gửi thẳng tới dịch vụ đó, theo chính sách của dịch vụ.
- **Ollama:** chạy hoàn toàn trên máy của bạn.
- **Tìm web:** câu tìm kiếm được gửi tới dịch vụ tìm kiếm (Ollama Web Search, Tavily, Exa, You.com, hoặc tìm kiếm miễn phí qua máy chủ của dự án).
- **Nói để gửi:** đoạn ghi âm được gửi qua máy chủ của dự án tới Groq để chuyển thành chữ, không được lưu lại. Đọc to câu trả lời dùng giọng có sẵn của hệ điều hành.
- **Connectors (MCP):** khi AI dùng một connector, dữ liệu cần thiết được gửi tới dịch vụ bạn đã kết nối.

## Báo lỗi và thống kê

Để sửa lỗi và vận hành dịch vụ, ứng dụng luôn gửi:

- **Báo lỗi:** nội dung lỗi kỹ thuật, nền tảng và phiên bản ứng dụng. Email, key, token và đường dẫn thư mục cá nhân được che trước khi gửi. Không kèm nội dung trò chuyện.
- **Thống kê token:** số token theo ngày, nhà cung cấp, model, nền tảng và việc bạn có đăng nhập hay không. Không gắn với tài khoản hay thiết bị của bạn.

## Khi đăng nhập bằng Google

Để đồng bộ giữa các thiết bị, ứng dụng lưu trên máy chủ (Supabase):

- **Tài khoản Google:** email, tên, ảnh đại diện và tên hiển thị bạn đặt.
- **Dữ liệu trò chuyện:** cuộc trò chuyện, tin nhắn, nguồn trích dẫn, nhóm, hướng dẫn dự án, ảnh đính kèm (đã thu nhỏ) và phần chữ đọc được từ tài liệu đính kèm. Chat tạm thời và phiên Code không được đồng bộ.
- **Thiết bị và lịch sử đăng nhập:** tên máy, hệ điều hành, phiên bản ứng dụng, địa chỉ IP và vị trí gần đúng (thành phố, quốc gia) suy ra từ IP qua ipapi.co hoặc ipwho.is.
- **Điều khiển từ xa:** khi bạn điều khiển máy tính từ điện thoại, lệnh và câu trả lời đi qua kênh riêng của tài khoản bạn trên máy chủ và không được lưu lại.

Mỗi người dùng chỉ đọc được dữ liệu của chính mình. Dữ liệu không được bán hay chia sẻ cho bên thứ ba vì mục đích quảng cáo. Người quản trị dự án có quyền kỹ thuật truy cập cơ sở dữ liệu để vận hành và sửa lỗi; trang quản trị trong ứng dụng chỉ hiện số liệu tổng hợp.

## Xoá dữ liệu

- **Đăng xuất:** dữ liệu của tài khoản được xoá khỏi máy đó (vẫn còn trên máy chủ).
- **Xoá tài khoản:** Cài đặt → Tài khoản → Xoá tài khoản. Toàn bộ dữ liệu của bạn trên máy chủ (trò chuyện, ảnh, tài liệu, thiết bị, lịch sử đăng nhập) bị xoá vĩnh viễn.

## Liên hệ

Mở một issue tại https://github.com/thangntse05041/Sonaro-AI-releases/issues.

---

<a id="en"></a>

# Privacy Policy — Sonaro AI

Last updated: 21 October 2026

Sonaro AI is an AI chat app for computers (Windows, macOS) and phones (Android). This page explains what the app sends and stores, and where.

## On your device

- Conversations, images and attached documents are stored on your device.
- Settings and the API keys you enter (including connector sign-in tokens) stay on your device, encrypted with the operating system's key store, and are **never** synced.
- Code sessions (work folder, file changes, commands run) and scheduled tasks stay on that computer only.

## When you use AI and web search

- **Free AI (Sonaro AI):** your question goes through the project's server (Supabase) to free AI providers (for example Groq, Cohere). The server **does not store** conversation content. To limit use without sign-in, it counts requests by install ID and IP address, both hashed.
- **AI with your own API key** (OpenAI, Anthropic, Google Gemini, OpenRouter, OpenCode Go, services you add): your question is sent directly to that service, under its policy.
- **Ollama:** runs entirely on your computer.
- **Web search:** search queries are sent to a search service (Ollama Web Search, Tavily, Exa, You.com, or the free search through the project's server).
- **Voice input:** the recording is sent through the project's server to Groq to be turned into text, and is not kept. Read-aloud uses your operating system's voices.
- **Connectors (MCP):** when the AI uses a connector, the needed data is sent to the service you connected.

## Error reports and statistics

To fix problems and run the service, the app always sends:

- **Error reports:** the technical error, platform and app version. Emails, keys, tokens and personal folder paths are masked before sending. No conversation content.
- **Token statistics:** token counts by day, provider, model, platform and whether you are signed in. Not linked to your account or device.

## When you sign in with Google

To sync across devices, the app stores on its server (Supabase):

- **Google account:** email, name, profile picture and the display name you set.
- **Chat data:** conversations, messages, sources, groups, project instructions, resized images and the text extracted from attached documents. Temporary chats and Code sessions are not synced.
- **Devices and sign-in history:** device name, operating system, app version, IP address and approximate location (city, country) derived from the IP via ipapi.co or ipwho.is.
- **Remote control:** when you control your computer from your phone, commands and answers pass through a private channel of your account on the server and are not stored.

Each user can only read their own data. Data is not sold or shared for advertising. Project administrators have technical access to the database to operate and fix the service; the admin screen in the app shows totals only.

## Deleting your data

- **Sign out:** the account's data is removed from that device (it stays on the server).
- **Delete account:** Settings → Account → Delete account. All your data on the server (conversations, images, documents, devices, sign-in history) is deleted permanently.

## Contact

Open an issue at https://github.com/thangntse05041/Sonaro-AI-releases/issues.

---

<a id="ja"></a>

# プライバシーポリシー — Sonaro AI

最終更新: 2026年10月21日

Sonaro AI は、パソコン（Windows、macOS）とスマートフォン（Android）で使えるAIチャットアプリです。このページでは、アプリが何をどこに送信・保存するかを説明します。

## お使いの端末内

- 会話、画像、添付ドキュメントはお使いの端末に保存されます。
- 設定や入力したAPIキー（コネクタのサインイン用トークンを含む）は端末内に OS のキーストアで暗号化して保存され、同期されることは**ありません**。
- Code セッション（作業フォルダ、ファイルの変更、実行したコマンド）とスケジュール実行は、そのパソコン内にのみ保存されます。

## AIとWeb検索を使うとき

- **無料AI（Sonaro AI）:** 質問はプロジェクトのサーバー（Supabase）を経由して無料のAIプロバイダー（例: Groq、Cohere）に送られます。サーバーは会話の内容を**保存しません**。サインインしていない方の利用回数を制限するため、インストールIDとIPアドレスをハッシュ化して回数を数えます。
- **ご自身のAPIキーを使うAI**（OpenAI、Anthropic、Google Gemini、OpenRouter、OpenCode Go、追加したサービス）: 質問はそのサービスへ直接送られ、各サービスのポリシーが適用されます。
- **Ollama:** すべてお使いのパソコン上で動作します。
- **Web検索:** 検索語句は検索サービス（Ollama Web Search、Tavily、Exa、You.com、またはプロジェクトのサーバー経由の無料検索）に送られます。
- **音声入力:** 録音はプロジェクトのサーバーを経由して Groq に送られ、文字に変換されます。保存はされません。読み上げには OS の音声を使います。
- **コネクタ（MCP）:** AIがコネクタを使うとき、必要なデータが接続先のサービスに送られます。

## エラー報告と統計

不具合の修正とサービス運営のため、アプリは常に次の情報を送信します。

- **エラー報告:** 技術的なエラー内容、プラットフォーム、アプリのバージョン。メールアドレス、キー、トークン、個人のフォルダパスは送信前に伏せられます。会話の内容は含みません。
- **トークン統計:** 日付、プロバイダー、モデル、プラットフォーム、サインインの有無ごとのトークン数。アカウントや端末とは結び付けられません。

## Google でサインインしたとき

端末間の同期のため、アプリはサーバー（Supabase）に次の情報を保存します。

- **Google アカウント:** メールアドレス、名前、プロフィール画像、設定した表示名。
- **チャットのデータ:** 会話、メッセージ、出典、グループ、プロジェクトの指示、縮小した添付画像、添付ドキュメントから読み取った文字。一時チャットと Code セッションは同期されません。
- **端末とサインイン履歴:** 端末名、OS、アプリのバージョン、IPアドレス、IPから ipapi.co または ipwho.is で推定したおおよその位置（市区町村、国）。
- **リモート操作:** スマホからパソコンを操作するとき、指示と回答はサーバー上のあなたのアカウント専用チャネルを通り、保存されません。

各ユーザーは自分のデータだけを読めます。データを販売したり、広告目的で第三者と共有したりすることはありません。プロジェクトの管理者は運営と不具合修正のためにデータベースへ技術的にアクセスできます。アプリ内の管理画面には集計値のみが表示されます。

## データの削除

- **サインアウト:** アカウントのデータはその端末から削除されます（サーバーには残ります）。
- **アカウントの削除:** 設定 → アカウント → アカウントを削除。サーバー上のあなたのデータ（会話、画像、ドキュメント、端末、サインイン履歴）はすべて完全に削除されます。

## お問い合わせ

https://github.com/thangntse05041/Sonaro-AI-releases/issues で issue を作成してください。
