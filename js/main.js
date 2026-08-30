/**
 * 나눔과더함 이비인후과 - 동작구 어지럼증·이석증 전문 클리닉
 * Interactive JavaScript for UI, Animations & SEO Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initHeader();
  initMobileMenu();
  initSymptomChecker();
  initFaqAccordion();
  initSmoothScroll();
});

/* -------------------------------------------------------------------------- */
/* 1. Scroll Reveal Animations (Intersection Observer)                        */
/* -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 2. Sticky Glass Header Elevation                                           */
/* -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-sm');
      header.style.borderBottomColor = 'rgba(226, 232, 240, 1)';
    } else {
      header.classList.remove('shadow-sm');
      header.style.borderBottomColor = 'rgba(226, 232, 240, 0.8)';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* -------------------------------------------------------------------------- */
/* 3. Mobile Navigation Drawer                                                */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Interactive Symptom Checker (자가진단 가이드)                              */
/* -------------------------------------------------------------------------- */
const symptomData = {
  bppv: {
    title: "이석증 (양성돌발성체위현훈) 의심",
    badge: "동작구 이석증 집중 치료",
    icon: "rotate-cw",
    highlight: "머리나 체위를 바꿀 때(눕거나 일어날 때) 1분 이내로 세상이 빙글빙글 도는 느낌",
    description: "내이의 반고리관에 이석(칼슘 결손 미세입자)이 떨어져 나와 신경을 자극하는 대표적인 말초성 어지럼증입니다. 청력 저하나 이명은 거의 동반되지 않으며, 특정 자세에서 심한 회전성 어지러움과 메스꺼움이 발생합니다.",
    solution: "대학병원급 비디오안진검사(VNG)로 이탈된 이석의 위치(후반고리관, 가쪽반고리관 등)를 10분 내 정확히 판별하고, 당일 즉시 <strong>에플리 이석정복술(Epley Maneuver)</strong>로 90% 이상 빠르게 회복할 수 있습니다.",
    targetLink: "#bppv-section",
    linkText: "이석증 원인 및 정복술 자세히 보기"
  },
  neuritis: {
    title: "전정신경염 (Vestibular Neuritis) 의심",
    badge: "동작구 전정신경염 정밀 진단",
    icon: "activity",
    highlight: "감기나 피로 후, 며칠 동안 쉬어도 멈추지 않는 극심한 회전성 어지럼증과 구토",
    description: "내이의 평형을 담당하는 전정신경에 바이러스 감염이나 혈액순환 장애로 염증이 발생하는 질환입니다. 머리를 움직이지 않고 가만히 누워 있어도 눈동자가 한쪽으로 튀며(안진) 세상이 도는 극심한 증상이 수일간 지속됩니다.",
    solution: "초기 2~3일간 급성기 진정 약물요법으로 어지럼증을 가라앉힌 뒤, 전정기능의 뇌 보상작용을 촉진하는 <strong>조기 맞춤 전정재활치료(VRT)</strong>를 시행하여 만성 어지럼증 후유증을 예방합니다.",
    targetLink: "#neuritis-section",
    linkText: "전정신경염 치료 & 재활 과정 보기"
  },
  meniere: {
    title: "메니에르병 (Meniere's Disease) 의심",
    badge: "동작구 메니에르병 관리 클리닉",
    icon: "waves",
    highlight: "귀가 꽉 찬 느낌(이충만감), 삐- 소리(이명), 청력 저하와 함께 반복되는 어지럼증 발작",
    description: "달팽이관과 전정기관 내부의 림프액 압력이 비정상적으로 높아지는 '내림프수종'으로 인해 발생합니다. 발작 시 20분~수 시간 동안 심한 어지럼증이 지속되며, 증상이 반복될수록 영구적인 난청을 유발할 수 있어 조기 관리가 필수적입니다.",
    solution: "순음청력검사와 전정기능 정밀 평가 후 이뇨제/혈액순환제 등 맞춤 약물치료와 함께 <strong>철저한 저염식 식이요법, 수분 섭취, 스트레스 관리 프로토콜</strong>을 병행하여 재발을 억제합니다.",
    targetLink: "#meniere-section",
    linkText: "메니에르병 식이·약물 치료법 보기"
  },
  central: {
    title: "중추성 어지럼증 (뇌혈관·신경계 질환) 감별 필요",
    badge: "응급 뇌혈관 감별 원칙",
    icon: "alert-triangle",
    highlight: "어지럼증과 함께 발음 어눌함, 시야 복시(물체가 겹쳐 보임), 한쪽 팔다리 힘 빠짐 동반",
    description: "소뇌 또는 뇌간 부위의 뇌경색, 뇌출혈, 종양 등 중추신경계 이상으로 발생하는 어지럼증입니다. 말초성(귀) 질환과 달리 어지럼의 강도는 덜할 수 있으나 보행 장애나 신경학적 마비 증상이 동반될 수 있어 신속한 감별이 생명과 직결됩니다.",
    solution: "나눔과더함 이비인후과에서는 비디오안진검사의 중추성 안진(수직 안진, 주시유발 안진 등) 패턴 분석과 신경학적 이학적 검사를 통해 뇌 질환 위험성을 신속 감별하며, 필요 시 상급 종합병원으로 즉각 연계합니다.",
    targetLink: "#central-section",
    linkText: "말초성 vs 중추성 어지럼증 구분법 보기"
  }
};

function initSymptomChecker() {
  const tabs = document.querySelectorAll('.symptom-tab');
  const titleEl = document.getElementById('symptom-result-title');
  const badgeEl = document.getElementById('symptom-result-badge');
  const highlightEl = document.getElementById('symptom-result-highlight');
  const descEl = document.getElementById('symptom-result-desc');
  const solutionEl = document.getElementById('symptom-result-solution');
  const linkEl = document.getElementById('symptom-result-link');

  if (!tabs.length || !titleEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        // Restore the inactive (white/light) look and re-enable its hover state
        t.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-50');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      // Strip the inactive-look utility classes so Tailwind's hover:bg-slate-50
      // (which mobile browsers can get "stuck" on after a tap) can never
      // override the active tab's dark background / white text.
      tab.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-50');

      const key = tab.getAttribute('data-symptom');
      const data = symptomData[key];

      if (data) {
        // Fade transition effect
        const resultContainer = document.getElementById('symptom-result-box');
        if (resultContainer) {
          resultContainer.style.opacity = '0.3';
          setTimeout(() => {
            titleEl.textContent = data.title;
            badgeEl.textContent = data.badge;
            highlightEl.textContent = data.highlight;
            descEl.innerHTML = data.description;
            solutionEl.innerHTML = data.solution;
            linkEl.setAttribute('href', data.targetLink);
            linkEl.textContent = data.linkText;
            resultContainer.style.opacity = '1';
          }, 150);
        }
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. FAQ Accordion with Accessibility Support                                */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Smooth Scroll with Header Offset                                        */
/* -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 7. Copy Address Clipboard Helper                                           */
/* -------------------------------------------------------------------------- */
window.copyAddress = function() {
  const address = "서울특별시 동작구 만양로 5-1 301호 (나눔과더함 이비인후과)";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(address).then(() => {
      showToast("병원 주소가 복사되었습니다.");
    }).catch(() => {
      showToast(address);
    });
  } else {
    showToast(address);
  }
};

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-xl z-50 transition-opacity duration-300 pointer-events-none';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}
