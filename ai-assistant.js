/**
 * AI ASSISTANT CHATBOT (DEEPSEEK & GOOGLE GEMINI) - NHÀ HÀNG CHAY AN NHIÊN
 * Tự động giải đáp 24/7 mọi thắc mắc của thực khách về mâm cỗ chay, buffet ngày rằm, thực đơn lẩu nấm dưỡng sinh, đặt bàn...
 */

(function () {
  'use strict';

  // Mã hóa Base64 an toàn cho key hệ thống mặc định
  const DEFAULT_DEEPSEEK_KEY = atob('c2stNmJjZDIxMDJhZTQ1NDIxYWE5NjlkNjE3MmM2MzA2NGY=');
  const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42SkRIa1E3WTJjcEhIUGt0Y3pEdHdpY2RJaHFLZjBDUEZCMFRCMnZtNEtzNnc=');

  // Cấu hình trợ lý Chay An Nhiên
  const AI_CONFIG = {
    provider: localStorage.getItem('can_ai_provider') || 'deepseek', // 'deepseek' | 'gemini'
    deepseekKey: localStorage.getItem('can_deepseek_key') || DEFAULT_DEEPSEEK_KEY,
    geminiKey: localStorage.getItem('can_gemini_key') || DEFAULT_GEMINI_KEY,
    geminiModel: 'gemini-3.8-flash',
    deepseekModel: 'deepseek-chat',
    maxHistory: 10
  };

  // Kho tri thức (Knowledge Base) về Nhà Hàng Chay An Nhiên - Việt Trì
  const SYSTEM_KNOWLEDGE = `
Bạn là "Trợ lý AI Nhà Hàng Chay An Nhiên" - người đồng hành phụng sự, từ bi, nho nhã và cực kỳ lễ phép của Nhà hàng Chay An Nhiên.
THÔNG TIN CHÍNH THỨC VỀ CHAY AN NHIÊN:
- Tên đầy đủ: Nhà Hàng Chay An Nhiên - Việt Trì.
- Khẩu hiệu: "Tâm An Vạn Sự An • Hương Vị Thuần Chay Dưỡng Thân Tâm".
- Địa chỉ: 135 Đường Nguyễn Tất Thành, Phường Thanh Miếu, TP. Việt Trì, Tỉnh Phú Thọ.
- Google Maps chỉ đường: https://maps.app.goo.gl/jiUzPeL6tQKrjULy9
- Hotline & Zalo tư vấn / đặt cỗ / giữ bàn: 0376 056 913 hoặc 0935 388 399.
- Website chính thức: https://chayannhien.life/
- Giờ phục vụ:
  + Buổi trưa: 11:00 – 13:30
  + Buổi tối: 18:00 – 20:30
  (Mở cửa đón khách tất cả các ngày trong tuần).

ĐẶC BIỆT & DỊCH VỤ TRỌNG TÂM:
1. BUFFET CHAY ĐẠC SẮC (Ngày 14, 15, 30 & Mùng 1 Âm Lịch):
   - Tổ chức định kỳ vào các ngày rằm và mùng một âm lịch hàng tháng.
   - Hơn 40 món chay thanh khiết phong phú: từ món khai vị, gỏi nấm, nem cuốn, các món xào, món kho, súp dưỡng sinh, bánh quê đến chè thanh nhiệt.
   - Không gian thiền vị ấm cúng, nhạc thiền an tịnh nuôi dưỡng thân tâm.

2. DỊCH VỤ MÂM CỖ CHAY TRỌN GÓI:
   - Nhận đặt cỗ chay gia tiên, lễ giỗ chạp, cúng rằm, lễ Vu Lan, tiệc cưới thuần chay, mừng thọ, tiệc tân gia...
   - Thực đơn mâm cỗ linh hoạt từ 6 món, 8 món, 10 món đến 12 món chuẩn vị cung đình và dân gian thuần khiết.
   - Đóng gói giữ nhiệt cẩn thận, giao cỗ tận nơi tại TP. Việt Trì và các khu vực lân cận tỉnh Phú Thọ.
   - Nhận chuẩn bị trước theo yêu cầu dinh dưỡng đặc biệt.

3. CÁC MÓN KÝ DANH ĐƯỢC YÊU THÍCH NHẤT:
   - Lẩu Nấm An Nhiên Thập Cẩm Quý (259.000đ): Nước dùng ninh rau củ quả 8 tiếng ngọt thanh, hơn 8 loại nấm quý tươi (nấm tùng nhung, nấm tiên, nấm linh chi, nấm đùi gà...).
   - Lẩu Thái Chay Chua Cay Bách Thảo (239.000đ).
   - Cơm Lá Sen Ngũ Sắc Dưỡng Tâm (89.000đ): Cơm gạo dẻo ủ hạt sen bùi béo, cà rốt, bắp ngọt, gói trọn hương thơm lá sen tươi.
   - Nấm Đùi Gà Nướng Giấy Bạc Sốt Tiêu Xanh (95.000đ).
   - Chả Giò Nấm Quý An Nhiên (69.000đ).
   - Đậu Hũ Non Sốt Nấm Đông Cô (75.000đ).
   - Canh Nấm Hạt Sen Dưỡng Nhan (79.000đ).
   - Gỏi Nấm Tuyết Hoa Chuối Thảo Mộc (75.000đ).

VĂN PHONG GIAO TIẾP & TÔN CHỈ PHỤNG SỰ:
- Lời chào: "Dạ Chay An Nhiên xin kính chào Quý Phật tử / Quý thực khách ạ!" hoặc "Nam Mô A Di Đà Phật, Chay An Nhiên rất hoan hỷ được đón tiếp Quý khách!".
- Luôn giữ thái độ nhã nhặn, từ bi, dịu dàng, kính trọng khách hàng.
- Giải đáp tận tình, rõ ràng về giá món, thành phần thuần chay hữu cơ tự nhiên không bột ngọt, không chất bảo quản.
- Khuyến khích khách gọi Hotline/Zalo: 0376.056.913 để được nhân viên giữ bàn thanh tịnh hoặc tư vấn thực đơn mâm cỗ chu đáo nhất.
`;

  let chatHistory = [
    {
      role: 'assistant',
      content: 'Dạ Chay An Nhiên xin kính chào Quý khách! Em là **Trợ lý AI của Nhà Hàng Chay An Nhiên (Việt Trì)**. Hoan hỷ được đồng hành cùng Quý khách giải đáp về thực đơn thuần chay thanh tịnh, buffet ngày rằm, mâm cỗ chay cúng gia tiên và đặt bàn an tịnh ạ!'
    }
  ];

  function formatMarkdown(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/(?:^|\n)[*-]\s+(.+)/g, '\n<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/(0[39]\d{2}[\s.]?\d{3}[\s.]?\d{3})/g, '<a href="tel:$1"><strong>$1</strong></a>');
    html = html.replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
    return html;
  }

  function getSmartFallbackReply(question) {
    const q = question.toLowerCase();

    if (q.includes('buffet') || q.includes('rằm') || q.includes('mùng 1') || q.includes('14') || q.includes('15') || q.includes('30')) {
      return `Dạ Nhà Hàng Chay An Nhiên tổ chức tiệc **Buffet Chay Thanh Tịnh** định kỳ vào các ngày:\n\n` +
        `🪷 **Ngày 14, 15, 30 & Mùng 1 Âm Lịch hàng tháng**\n` +
        `• Khung giờ: Trưa (11:00 - 13:30) & Tối (18:00 - 20:30)\n` +
        `• Hơn 40 món chay thuần khiết, tươi lành nuôi dưỡng sức khỏe và thân tâm an lạc.\n\n` +
        `Quý khách hoan hỷ đặt bàn trước qua Hotline **0376 056 913** hoặc **0935 388 399** để nhà hàng chuẩn bị vị trí ngồi an tịnh nhất nhé ạ!`;
    }

    if (q.includes('mâm cỗ') || q.includes('cỗ') || q.includes('đặt cỗ') || q.includes('giỗ') || q.includes('cúng') || q.includes('tiệc')) {
      return `Dạ Chay An Nhiên chuyên nhận **Mâm Cỗ Chay Trọn Gói** phục vụ cúng giỗ, cúng rằm, tiệc hỷ thuần chay, mừng thọ:\n\n` +
        `🍲 Các set mâm cỗ từ **6 món, 8 món, 10 món đến 12 món** được chế biến trang nghiêm, thanh khiết và đẹp mắt.\n` +
        `🛵 Nhà hàng hỗ trợ giao mâm cỗ nóng sốt tận nơi tại TP. Việt Trì và khu vực lân cận.\n\n` +
        `Quý khách liên hệ Hotline/Zalo: **0376.056.913** để nhận hình ảnh thực tế và tư vấn thực đơn chi tiết phù hợp với lễ cúng của gia đình ạ!`;
    }

    if (q.includes('địa chỉ') || q.includes('ở đâu') || q.includes('vị trí') || q.includes('bản đồ') || q.includes('chỉ đường')) {
      return `Dạ Nhà Hàng Chay An Nhiên kính mời Quý khách ghé thăm tại:\n\n📍 **135 Đường Nguyễn Tất Thành, Phường Thanh Miếu, TP. Việt Trì, Phú Thọ**\n\n🗺️ Quý khách có thể xem đường đi trên [Google Maps tại đây](https://maps.app.goo.gl/jiUzPeL6tQKrjULy9) hoặc gọi điện đến số **0376 056 913** để được hướng dẫn đường đi thuận tiện nhất ạ.`;
    }

    if (q.includes('giờ') || q.includes('mở cửa') || q.includes('thời gian') || q.includes('đóng cửa')) {
      return `Dạ Chay An Nhiên mở cửa phục vụ tất cả các ngày trong tuần theo 2 khung giờ:\n\n` +
        `☀️ **Buổi trưa:** 11:00 – 13:30\n` +
        `🌙 **Buổi tối:** 18:00 – 20:30\n\n` +
        `Quý khách có thể liên hệ trước qua số **0376 056 913** để quán giữ bàn chu đáo ạ!`;
    }

    if (q.includes('giá') || q.includes('menu') || q.includes('thực đơn') || q.includes('lẩu') || q.includes('món')) {
      return `Dạ Chay An Nhiên có thực đơn đa dạng bổ dưỡng với các món nổi bật:\n\n` +
        `• **Lẩu Nấm An Nhiên Thập Cẩm Quý:** 259.000đ\n` +
        `• **Lẩu Thái Chay Chua Cay:** 239.000đ\n` +
        `• **Cơm Lá Sen Ngũ Sắc Dưỡng Tâm:** 89.000đ\n` +
        `• **Nấm Đùi Gà Nướng Giấy Bạc:** 95.000đ\n` +
        `• **Chả Giò Nấm Quý Giòn Rụm:** 69.000đ\n` +
        `• **Canh Nấm Hạt Sen Dưỡng Nhan:** 79.000đ\n\n` +
        `100% nguyên liệu tươi sạch hữu cơ, vị ngọt tự nhiên từ rau củ. Kính mời Quý khách liên hệ **0376 056 913** để đặt món ạ!`;
    }

    return `Dạ Nhà Hàng Chay An Nhiên (135 Nguyễn Tất Thành, TP. Việt Trì) rất hoan hỷ được phục vụ Quý khách ẩm thực thuần chay thanh tịnh, buffet ngày rằm và mâm cỗ gia tiên. Quý khách vui lòng gọi Hotline/Zalo: **0376 056 913** để được tư vấn chu đáo nhất ạ!`;
  }

  async function callDeepSeekAPI(messages) {
    const formattedMessages = [
      { role: 'system', content: SYSTEM_KNOWLEDGE },
      ...messages.slice(-AI_CONFIG.maxHistory)
    ];

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.deepseekKey}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.deepseekModel,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 650
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`DeepSeek error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  async function callGeminiAPI(messages) {
    const contents = messages.slice(-AI_CONFIG.maxHistory).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.geminiModel}:generateContent?key=${AI_CONFIG.geminiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_KNOWLEDGE }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 650
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  async function requestAIResponse(userMessage) {
    chatHistory.push({ role: 'user', content: userMessage });

    const primaryProvider = AI_CONFIG.provider;
    const secondaryProvider = primaryProvider === 'deepseek' ? 'gemini' : 'deepseek';

    try {
      if (primaryProvider === 'deepseek') {
        const reply = await callDeepSeekAPI(chatHistory);
        if (reply) return { reply, provider: 'DeepSeek AI' };
      } else {
        const reply = await callGeminiAPI(chatHistory);
        if (reply) return { reply, provider: 'Gemini AI' };
      }
    } catch (err1) {
      console.warn(`[Chay An Nhien AI] ${primaryProvider} failed:`, err1.message);
      try {
        if (secondaryProvider === 'deepseek') {
          const reply = await callDeepSeekAPI(chatHistory);
          if (reply) return { reply, provider: 'DeepSeek AI (Backup)' };
        } else {
          const reply = await callGeminiAPI(chatHistory);
          if (reply) return { reply, provider: 'Gemini AI (Backup)' };
        }
      } catch (err2) {
        console.warn(`[Chay An Nhien AI] Fallback to local rule engine:`, err2.message);
      }
    }

    const fallback = getSmartFallbackReply(userMessage);
    return { reply: fallback, provider: 'Chay An Nhiên (Tự động)' };
  }

  function renderAIAssistant() {
    const fab = document.createElement('div');
    fab.className = 'ai-fab-launcher';
    fab.id = 'aiFabLauncher';
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', 'Mở trợ lý AI Chay An Nhiên');
    fab.innerHTML = `
      <div class="ai-fab-icon-box">
        <span class="ai-fab-pulse-ring"></span>
        <span>🪷</span>
      </div>
      <div class="ai-fab-text">
        <span class="ai-fab-title">Trợ Lý Chay An Nhiên</span>
        <span class="ai-fab-sub">Tư vấn mâm cỗ, buffet 24/7</span>
      </div>
      <span class="ai-fab-badge">Hoan Hỷ</span>
    `;

    const chatWin = document.createElement('div');
    chatWin.className = 'ai-chat-window';
    chatWin.id = 'aiChatWindow';
    chatWin.setAttribute('role', 'dialog');
    chatWin.setAttribute('aria-label', 'Cửa sổ trò chuyện Trợ lý AI Chay An Nhiên');
    chatWin.innerHTML = `
      <!-- Header -->
      <div class="ai-chat-header">
        <div class="ai-chat-profile">
          <div class="ai-avatar">
            <span>🪷</span>
            <span class="ai-online-dot"></span>
          </div>
          <div class="ai-profile-meta">
            <div class="ai-title">
              <span>Trợ Lý Chay An Nhiên</span>
              <span class="ai-provider-pill" id="aiProviderBadge">${AI_CONFIG.provider === 'deepseek' ? 'DeepSeek' : 'Gemini'}</span>
            </div>
            <span class="ai-status-text">Ẩm Thực Thuần Chay • Việt Trì</span>
          </div>
        </div>
        <div class="ai-header-actions">
          <button class="ai-icon-btn" id="btnAiSettings" title="Cài đặt mô hình AI" aria-label="Cài đặt">⚙️</button>
          <button class="ai-icon-btn" id="btnAiClear" title="Xóa lịch sử chat" aria-label="Xóa chat">🗑️</button>
          <button class="ai-icon-btn" id="btnAiClose" title="Thu nhỏ" aria-label="Đóng">&times;</button>
        </div>
      </div>

      <!-- Quick Suggestion Chips -->
      <div class="ai-chips-bar" id="aiChipsBar">
        <button class="ai-chip" data-q="Lịch tổ chức Buffet Chay ngày rằm và mùng 1 thế nào?">🪷 Buffet ngày rằm?</button>
        <button class="ai-chip" data-q="Nhà hàng có nhận đặt Mâm Cỗ Chay cúng gia tiên không?">🍲 Đặt Mâm Cỗ Chay?</button>
        <button class="ai-chip" data-q="Món Lẩu Nấm An Nhiên gồm những gì và giá bao nhiêu?">🍄 Lẩu nấm dưỡng sinh?</button>
        <button class="ai-chip" data-q="Địa chỉ nhà hàng và giờ phục vụ thế nào?">⏰ Giờ mở cửa & Địa chỉ?</button>
        <button class="ai-chip" data-q="Làm thế nào để liên hệ đặt bàn trước thanh tịnh?">📞 Đặt bàn trước?</button>
      </div>

      <!-- Chat Messages Body -->
      <div class="ai-chat-body" id="aiChatBody">
        <div class="ai-msg bot">
          <div class="ai-msg-avatar">🪷</div>
          <div class="ai-msg-bubble">
            ${formatMarkdown(chatHistory[0].content)}
          </div>
        </div>
      </div>

      <!-- Input Form Footer -->
      <div class="ai-chat-footer">
        <form class="ai-input-form" id="aiChatForm">
          <textarea 
            class="ai-input-field" 
            id="aiInputField" 
            rows="1" 
            placeholder="Hỏi về buffet, mâm cỗ chay, lẩu nấm, đặt bàn..."
            aria-label="Nhập câu hỏi"
          ></textarea>
          <button type="submit" class="ai-send-btn" id="aiSendBtn" aria-label="Gửi tin nhắn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </button>
        </form>
        <div class="ai-footer-note">Hỗ trợ bởi DeepSeek & Google Gemini AI • Phục vụ hoan hỷ 24/7</div>
      </div>

      <!-- Settings Overlay Modal -->
      <div class="ai-settings-overlay" id="aiSettingsOverlay">
        <div class="ai-settings-header">
          <h4>⚙️ Cài Đặt Trợ Lý AI Chay An Nhiên</h4>
          <button class="ai-icon-btn" id="btnCloseAiSettings">&times;</button>
        </div>
        <div class="ai-settings-body">
          <div class="ai-setting-group">
            <label for="selectAiProvider">Mô hình AI ưu tiên:</label>
            <select class="ai-setting-select" id="selectAiProvider">
              <option value="deepseek">DeepSeek AI (Khuyên dùng - Nhanh, chuẩn tiếng Việt)</option>
              <option value="gemini">Google Gemini AI (Mạnh mẽ & Đầy đủ)</option>
            </select>
            <span class="ai-setting-help">Tự động chuyển mô hình còn lại nếu dịch vụ chính phản hồi chậm.</span>
          </div>

          <div class="ai-setting-group">
            <label for="inputDeepseekKey">DeepSeek API Key (Tùy chọn):</label>
            <input type="password" class="ai-setting-input" id="inputDeepseekKey" placeholder="Để trống nếu dùng key mặc định">
          </div>

          <div class="ai-setting-group">
            <label for="inputGeminiKey">Google Gemini API Key (Tùy chọn):</label>
            <input type="password" class="ai-setting-input" id="inputGeminiKey" placeholder="Để trống nếu dùng key mặc định">
          </div>
        </div>
        <div class="ai-settings-footer">
          <button class="ai-btn-reset" id="btnResetAiDefault">Khôi phục mặc định</button>
          <button class="ai-btn-save" id="btnSaveAiSettings">Lưu Cài Đặt</button>
        </div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(chatWin);

    attachAIEvents(fab, chatWin);
  }

  function attachAIEvents(fab, chatWin) {
    const chatBody = document.getElementById('aiChatBody');
    const chatForm = document.getElementById('aiChatForm');
    const inputField = document.getElementById('aiInputField');
    const sendBtn = document.getElementById('aiSendBtn');
    const chipsBar = document.getElementById('aiChipsBar');
    const btnClose = document.getElementById('btnAiClose');
    const btnClear = document.getElementById('btnAiClear');
    const btnSettings = document.getElementById('btnAiSettings');
    const settingsOverlay = document.getElementById('aiSettingsOverlay');
    const btnCloseSettings = document.getElementById('btnCloseAiSettings');
    const btnSaveSettings = document.getElementById('btnSaveAiSettings');
    const btnResetDefault = document.getElementById('btnResetAiDefault');
    const providerBadge = document.getElementById('aiProviderBadge');
    const selectProvider = document.getElementById('selectAiProvider');
    const inputDeepseek = document.getElementById('inputDeepseekKey');
    const inputGemini = document.getElementById('inputGeminiKey');

    function toggleChat(open) {
      const isOpen = open !== undefined ? open : !chatWin.classList.contains('open');
      if (isOpen) {
        chatWin.classList.add('open');
        inputField.focus();
        scrollToBottom();
      } else {
        chatWin.classList.remove('open');
        settingsOverlay.classList.remove('open');
      }
    }

    fab.addEventListener('click', () => toggleChat());
    btnClose.addEventListener('click', () => toggleChat(false));

    function scrollToBottom() {
      setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 50);
    }

    function appendMessage(role, text, sourceLabel) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `ai-msg ${role === 'user' ? 'user' : 'bot'}`;

      if (role === 'assistant') {
        msgDiv.innerHTML = `
          <div class="ai-msg-avatar">🪷</div>
          <div class="ai-msg-bubble">
            ${formatMarkdown(text)}
            ${sourceLabel ? `<div style="font-size:0.64rem; opacity:0.6; margin-top:5px; text-align:right;">⚡ ${sourceLabel}</div>` : ''}
          </div>
        `;
      } else {
        msgDiv.innerHTML = `
          <div class="ai-msg-bubble">
            ${formatMarkdown(text)}
          </div>
        `;
      }

      chatBody.appendChild(msgDiv);
      scrollToBottom();
    }

    let typingElement = null;
    function showTyping() {
      if (typingElement) return;
      typingElement = document.createElement('div');
      typingElement.className = 'ai-typing-indicator';
      typingElement.innerHTML = `
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
      `;
      chatBody.appendChild(typingElement);
      scrollToBottom();
    }

    function hideTyping() {
      if (typingElement) {
        typingElement.remove();
        typingElement = null;
      }
    }

    async function handleUserSubmit(text) {
      const cleanText = text.trim();
      if (!cleanText) return;

      inputField.value = '';
      inputField.style.height = 'auto';
      sendBtn.disabled = true;

      appendMessage('user', cleanText);
      showTyping();

      try {
        const { reply, provider } = await requestAIResponse(cleanText);
        hideTyping();
        chatHistory.push({ role: 'assistant', content: reply });
        appendMessage('assistant', reply, provider);
      } catch (err) {
        hideTyping();
        appendMessage('assistant', getSmartFallbackReply(cleanText), 'Chay An Nhiên');
      } finally {
        sendBtn.disabled = false;
        inputField.focus();
      }
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit(inputField.value);
    });

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserSubmit(inputField.value);
      }
    });

    inputField.addEventListener('input', () => {
      inputField.style.height = 'auto';
      inputField.style.height = Math.min(inputField.scrollHeight, 80) + 'px';
    });

    chipsBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-chip');
      if (chip && chip.dataset.q) {
        handleUserSubmit(chip.dataset.q);
      }
    });

    btnClear.addEventListener('click', () => {
      if (confirm('Quý khách có muốn làm mới cuộc trò chuyện không?')) {
        chatHistory = [chatHistory[0]];
        chatBody.innerHTML = `
          <div class="ai-msg bot">
            <div class="ai-msg-avatar">🪷</div>
            <div class="ai-msg-bubble">
              ${formatMarkdown(chatHistory[0].content)}
            </div>
          </div>
        `;
      }
    });

    btnSettings.addEventListener('click', () => {
      selectProvider.value = AI_CONFIG.provider;
      inputDeepseek.value = localStorage.getItem('can_deepseek_key') || '';
      inputGemini.value = localStorage.getItem('can_gemini_key') || '';
      settingsOverlay.classList.add('open');
    });

    btnCloseSettings.addEventListener('click', () => {
      settingsOverlay.classList.remove('open');
    });

    btnSaveSettings.addEventListener('click', () => {
      AI_CONFIG.provider = selectProvider.value;
      localStorage.setItem('can_ai_provider', AI_CONFIG.provider);
      providerBadge.textContent = AI_CONFIG.provider === 'deepseek' ? 'DeepSeek' : 'Gemini';

      if (inputDeepseek.value.trim()) {
        AI_CONFIG.deepseekKey = inputDeepseek.value.trim();
        localStorage.setItem('can_deepseek_key', AI_CONFIG.deepseekKey);
      } else {
        localStorage.removeItem('can_deepseek_key');
        AI_CONFIG.deepseekKey = DEFAULT_DEEPSEEK_KEY;
      }

      if (inputGemini.value.trim()) {
        AI_CONFIG.geminiKey = inputGemini.value.trim();
        localStorage.setItem('can_gemini_key', AI_CONFIG.geminiKey);
      } else {
        localStorage.removeItem('can_gemini_key');
        AI_CONFIG.geminiKey = DEFAULT_GEMINI_KEY;
      }

      settingsOverlay.classList.remove('open');
      appendMessage('assistant', `✅ Đã lưu cấu hình AI! Hiện đang ưu tiên mô hình **${AI_CONFIG.provider === 'deepseek' ? 'DeepSeek AI' : 'Google Gemini AI'}**.`);
    });

    btnResetDefault.addEventListener('click', () => {
      localStorage.removeItem('can_ai_provider');
      localStorage.removeItem('can_deepseek_key');
      localStorage.removeItem('can_gemini_key');
      AI_CONFIG.provider = 'deepseek';
      AI_CONFIG.deepseekKey = DEFAULT_DEEPSEEK_KEY;
      AI_CONFIG.geminiKey = DEFAULT_GEMINI_KEY;
      selectProvider.value = 'deepseek';
      inputDeepseek.value = '';
      inputGemini.value = '';
      providerBadge.textContent = 'DeepSeek';
      settingsOverlay.classList.remove('open');
      appendMessage('assistant', '🔄 Đã khôi phục cài đặt mặc định của hệ thống.');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAIAssistant);
  } else {
    renderAIAssistant();
  }
})();
