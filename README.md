# Sonaro AI

Trò chuyện với AI chạy ngay trên máy tính của bạn (qua [Ollama](https://ollama.com)), có tìm kiếm Internet kèm nguồn trích dẫn.
Chat with AI running on your own computer (via Ollama), with web search and cited sources.

Repo này chỉ chứa **file cài đặt**. Mã nguồn được lưu riêng.
This repository only hosts the **installers**.

## Tải về / Download

| Hệ điều hành | Link |
|---|---|
| Windows 10/11 (64-bit) | [Sonaro-AI-Setup.exe](https://github.com/thangntse05041/Sonaro-AI-releases/releases/latest/download/Sonaro-AI-Setup.exe) |
| macOS (Apple Silicon M1/M2/M3…) | [Sonaro-AI-arm64.dmg](https://github.com/thangntse05041/Sonaro-AI-releases/releases/latest/download/Sonaro-AI-arm64.dmg) |
| macOS (Intel) | [Sonaro-AI-x64.dmg](https://github.com/thangntse05041/Sonaro-AI-releases/releases/latest/download/Sonaro-AI-x64.dmg) |
| Android 7 trở lên | [Sonaro-AI.apk](https://github.com/thangntse05041/Sonaro-AI-releases/releases/latest/download/Sonaro-AI.apk) |

Tất cả phiên bản: [Releases](https://github.com/thangntse05041/Sonaro-AI-releases/releases).

## Trước khi cài

- Cài [Ollama](https://ollama.com/download) và tải ít nhất một model, ví dụ `ollama pull qwen3:8b` (hoặc tải model ngay trong app: Cài đặt → Model trên máy).
- App **chưa được ký số**:
  - Windows: nếu SmartScreen cảnh báo, bấm **More info → Run anyway**.
  - macOS: lần đầu mở, nhấp chuột phải vào app → **Open**, hoặc vào System Settings → Privacy & Security → **Open Anyway**.

## Android

- Tải `Sonaro-AI.apk` trên điện thoại rồi mở file để cài. Nếu Android hỏi, cho phép trình duyệt **cài ứng dụng không rõ nguồn gốc**.
- Điện thoại không chạy được Ollama. Dùng Ollama trên một máy tính **cùng mạng Wi-Fi**:
  1. Trên máy tính, đặt hai biến môi trường `OLLAMA_HOST=0.0.0.0` và `OLLAMA_ORIGINS=*`, rồi tắt và mở lại Ollama.
     - Windows: Settings → System → About → Advanced system settings → Environment Variables → New.
     - macOS: chạy `launchctl setenv OLLAMA_HOST 0.0.0.0` và `launchctl setenv OLLAMA_ORIGINS "*"`.
  2. Xem địa chỉ IP của máy tính (ví dụ `192.168.1.10`).
  3. Trong app trên điện thoại: Cài đặt → Ollama → nhập `http://192.168.1.10:11434` → Kiểm tra kết nối.
- Hoặc dùng AI cloud (OpenAI, Claude, Gemini, OpenRouter) bằng API key của bạn: Cài đặt → Nhà cung cấp AI.
- Đăng nhập Google để đồng bộ trò chuyện giữa máy tính và điện thoại.

## Cập nhật

- Windows: app tự kiểm tra, tự tải bản mới và báo "Khởi động lại để cập nhật".
- macOS: app báo khi có bản mới và mở trang tải về; tải file `.dmg` rồi cài đè.
- Android: app báo khi có bản mới; tải file `.apk` rồi cài đè (dữ liệu được giữ nguyên).
