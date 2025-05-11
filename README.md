# .NET ve Next.js ile JWT Kimlik Doğrulama Örneği

Bu proje, .NET backend ve Next.js frontend kullanarak JWT kimlik doğrulaması içeren bir dashboard uygulaması örneğidir.

## Proje Yapısı

- `backend`: .NET Core Web API
- `frontend`: Next.js Uygulaması

## Kurulum ve Çalıştırma

### Backend (.NET Web API)

1. Backend klasörüne gidin:
```bash
cd backend/AuthAPI
```

2. Projeyi restore edin:
```bash
dotnet restore
```

3. Uygulamayı çalıştırın:
```bash
dotnet run
```

API http://localhost:5000 adresinde çalışacaktır.

### Frontend (Next.js)

1. Frontend klasörüne gidin:
```bash
cd frontend/auth-dashboard
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı çalıştırın:
```bash
npm run dev
```

Frontend http://localhost:3000 adresinde çalışacaktır.

## Kullanım

### Test Kullanıcıları

Aşağıdaki test kullanıcılarını kullanarak giriş yapabilirsiniz:

- **Admin Kullanıcısı**:
  - Kullanıcı Adı: `admin`
  - Şifre: `admin123`

- **Normal Kullanıcı**:
  - Kullanıcı Adı: `user`
  - Şifre: `user123`

### Özellikler

- JWT tabanlı kimlik doğrulama
- Kullanıcı kaydı ve girişi
- Dashboard sayfası (istatistikler ve grafikler)
- Kullanıcı profili yönetimi
- Rol tabanlı yetkilendirme

## Teknolojiler

### Backend
- .NET 9.0
- Entity Framework Core (InMemory)
- JWT Bearer Authentication
- ASP.NET Core Web API

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Axios
- React Context API (Durum Yönetimi)
- Cookies-next (Cookie Yönetimi)
- Recharts (Grafikler)
- React Hot Toast (Bildirimler)
