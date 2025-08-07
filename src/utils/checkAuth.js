export async function checkAdminSession() {
  try {
    const res = await fetch('http://localhost:4000/api/auth/me', {
      credentials: 'include',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.admin || null;
  } catch (err) {
    console.error('認証チェック失敗:', err);
    return null;
  }
}
