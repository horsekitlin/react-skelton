const HTTP_ERROR_MESSAGES = {
  400: '請求格式錯誤，請確認輸入資料',
  401: '帳號或密碼錯誤',
  403: '沒有權限執行此操作',
  404: '找不到相關資料',
  422: '資料驗證失敗，請確認輸入內容',
  429: '請求過於頻繁，請稍後再試',
  500: '伺服器發生錯誤，請稍後再試',
  503: '服務暫時無法使用，請稍後再試',
};

export const getSagaErrorMessage = (error) => {
  if (!error.response) {
    return '網路連線失敗，請確認網路狀態後再試';
  }
  return HTTP_ERROR_MESSAGES[error.response.status] ?? '操作失敗，請稍後再試';
};
