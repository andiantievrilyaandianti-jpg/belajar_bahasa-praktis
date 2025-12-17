import React, { useState, useEffect } from 'react';
import { Volume2, Lock, Crown, CheckCircle, BookOpen, Headphones, Star, TrendingUp } from 'lucide-react';

const LanguageLearningApp = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isPremium, setIsPremium] = useState(false);
  const [completedLessons, setCompletedLessons] = useState({});
  const [showSubscription, setShowSubscription] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(null);

  const languages = {
    english: {
      name: 'English',
      flag: '🇬🇧',
      color: '#e74c3c',
      lessons: [
        { id: 1, title: 'Greetings', content: 'Hello', translation: 'Halo', audio: 'hello', free: true },
        { id: 2, title: 'Basic Words', content: 'Thank you', translation: 'Terima kasih', audio: 'thankyou', free: true },
        { id: 3, title: 'Numbers', content: 'One, Two, Three', translation: 'Satu, Dua, Tiga', audio: 'numbers', free: false },
        { id: 4, title: 'Colors', content: 'Red, Blue, Green', translation: 'Merah, Biru, Hijau', audio: 'colors', free: false },
      ]
    },
    japanese: {
      name: 'Japanese',
      flag: '🇯🇵',
      color: '#e84393',
      lessons: [
        { id: 1, title: 'Greetings', content: 'こんにちは (Konnichiwa)', translation: 'Halo', audio: 'konnichiwa', free: true },
        { id: 2, title: 'Basic Words', content: 'ありがとう (Arigatou)', translation: 'Terima kasih', audio: 'arigatou', free: true },
        { id: 3, title: 'Numbers', content: '一 (ichi), 二 (ni), 三 (san)', translation: 'Satu, Dua, Tiga', audio: 'jpnumbers', free: false },
        { id: 4, title: 'Colors', content: '赤 (aka), 青 (ao), 緑 (midori)', translation: 'Merah, Biru, Hijau', audio: 'jpcolors', free: false },
      ]
    },
    russian: {
      name: 'Russian',
      flag: '🇷🇺',
      color: '#0984e3',
      lessons: [
        { id: 1, title: 'Greetings', content: 'Привет (Privet)', translation: 'Halo', audio: 'privet', free: true },
        { id: 2, title: 'Basic Words', content: 'Спасибо (Spasibo)', translation: 'Terima kasih', audio: 'spasibo', free: true },
        { id: 3, title: 'Numbers', content: 'Один, Два, Три', translation: 'Satu, Dua, Tiga', audio: 'runumbers', free: false },
        { id: 4, title: 'Colors', content: 'Красный, Синий, Зелёный', translation: 'Merah, Biru, Hijau', audio: 'rucolors', free: false },
      ]
    },
    arabic: {
      name: 'Arabic',
      flag: '🇸🇦',
      color: '#00b894',
      lessons: [
        { id: 1, title: 'Greetings', content: 'مرحبا (Marhaba)', translation: 'Halo', audio: 'marhaba', free: true },
        { id: 2, title: 'Basic Words', content: 'شكرا (Shukran)', translation: 'Terima kasih', audio: 'shukran', free: true },
        { id: 3, title: 'Numbers', content: 'واحد، اثنان، ثلاثة', translation: 'Satu, Dua, Tiga', audio: 'arnumbers', free: false },
        { id: 4, title: 'Colors', content: 'أحمر، أزرق، أخضر', translation: 'Merah, Biru, Hijau', audio: 'arcolors', free: false },
      ]
    },
    korean: {
      name: 'Korean',
      flag: '🇰🇷',
      color: '#6c5ce7',
      lessons: [
        { id: 1, title: 'Greetings', content: '안녕하세요 (Annyeonghaseyo)', translation: 'Halo', audio: 'annyeong', free: true },
        { id: 2, title: 'Basic Words', content: '감사합니다 (Gamsahamnida)', translation: 'Terima kasih', audio: 'gamsa', free: true },
        { id: 3, title: 'Numbers', content: '하나 (hana), 둘 (dul), 셋 (set)', translation: 'Satu, Dua, Tiga', audio: 'krnumbers', free: false },
        { id: 4, title: 'Colors', content: '빨강 (ppalgang), 파랑 (parang), 초록 (chorok)', translation: 'Merah, Biru, Hijau', audio: 'krcolors', free: false },
      ]
    }
  };

  const playAudio = (audioId) => {
    setAudioPlaying(audioId);
    
    // Simulasi audio dengan speech synthesis
    const utterance = new SpeechSynthesisUtterance();
    const lesson = languages[selectedLanguage].lessons.find(l => l.audio === audioId);
    
    if (lesson) {
      utterance.text = lesson.content;
      utterance.lang = getLanguageCode(selectedLanguage);
      utterance.rate = 0.8;
      
      utterance.onend = () => {
        setAudioPlaying(null);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const getLanguageCode = (lang) => {
    const codes = {
      english: 'en-US',
      japanese: 'ja-JP',
      russian: 'ru-RU',
      arabic: 'ar-SA',
      korean: 'ko-KR'
    };
    return codes[lang] || 'en-US';
  };

  const markAsCompleted = (lessonId) => {
    setCompletedLessons(prev => ({
      ...prev,
      [`${selectedLanguage}-${lessonId}`]: true
    }));
  };

  const currentLang = languages[selectedLanguage];
  const progress = Object.keys(completedLessons).filter(k => k.startsWith(selectedLanguage)).length;
  const totalLessons = currentLang.lessons.length;
  const progressPercent = (progress / totalLessons) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Outfit', 'Poppins', sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-100px',
        width: '400px',
        height: '400px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      {/* Main Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '900',
              color: 'white',
              margin: 0,
              textShadow: '2px 4px 8px rgba(0,0,0,0.2)',
              letterSpacing: '-1px'
            }}>
              LinguaFlow
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.1rem',
              margin: '5px 0 0 0',
              fontWeight: '300'
            }}>
              Belajar 5 Bahasa Dengan Mudah
            </p>
          </div>
          
          <button
            onClick={() => setShowSubscription(!showSubscription)}
            style={{
              background: isPremium 
                ? 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' 
                : 'white',
              color: isPremium ? 'white' : '#667eea',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              transform: showSubscription ? 'scale(0.95)' : 'scale(1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = showSubscription ? 'scale(0.95)' : 'scale(1)'}
          >
            <Crown size={20} />
            {isPremium ? 'Premium Active' : 'Upgrade to Premium'}
          </button>
        </div>

        {/* Subscription Modal */}
        {showSubscription && (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '30px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideDown 0.3s ease'
          }}>
            <style>{`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#2d3436',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              Pilih Paket Berlangganan
            </h2>
            <p style={{
              textAlign: 'center',
              color: '#636e72',
              marginBottom: '30px'
            }}>
              Akses penuh ke semua pelajaran dan fitur premium
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {[
                { name: 'Bulanan', price: 'Rp 49.000', duration: '/bulan', popular: false },
                { name: 'Tahunan', price: 'Rp 399.000', duration: '/tahun', popular: true, save: 'Hemat 32%' },
                { name: 'Seumur Hidup', price: 'Rp 999.000', duration: 'sekali bayar', popular: false }
              ].map((plan, idx) => (
                <div
                  key={idx}
                  style={{
                    background: plan.popular 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : '#f8f9fa',
                    borderRadius: '15px',
                    padding: '25px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    border: plan.popular ? '3px solid #ffd700' : '2px solid #e9ecef',
                    transform: 'scale(1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onClick={() => {
                    setIsPremium(true);
                    setShowSubscription(false);
                  }}
                >
                  {plan.save && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      background: '#ffd700',
                      color: '#2d3436',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}>
                      {plan.save}
                    </div>
                  )}
                  <h3 style={{
                    color: plan.popular ? 'white' : '#2d3436',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '10px'
                  }}>
                    {plan.name}
                  </h3>
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      color: plan.popular ? 'white' : '#667eea',
                      fontSize: '2rem',
                      fontWeight: '900'
                    }}>
                      {plan.price}
                    </span>
                    <span style={{
                      color: plan.popular ? 'rgba(255,255,255,0.8)' : '#636e72',
                      fontSize: '0.9rem',
                      marginLeft: '5px'
                    }}>
                      {plan.duration}
                    </span>
                  </div>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    color: plan.popular ? 'white' : '#636e72'
                  }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} /> Semua bahasa
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} /> Audio premium
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} /> Tanpa iklan
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowSubscription(false)}
              style={{
                background: 'transparent',
                color: '#636e72',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
                width: '100%',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              Tutup
            </button>
          </div>
        )}

        {/* Language Selection */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {Object.keys(languages).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              style={{
                background: selectedLanguage === lang 
                  ? 'white' 
                  : 'rgba(255, 255, 255, 0.2)',
                color: selectedLanguage === lang 
                  ? languages[lang].color 
                  : 'white',
                border: 'none',
                padding: '15px 25px',
                borderRadius: '15px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: selectedLanguage === lang 
                  ? '0 10px 25px rgba(0, 0, 0, 0.2)' 
                  : 'none',
                transform: selectedLanguage === lang ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (selectedLanguage !== lang) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (selectedLanguage !== lang) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{languages[lang].flag}</span>
              {languages[lang].name}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={24} color={currentLang.color} />
              <span style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#2d3436'
              }}>
                Progress Belajar
              </span>
            </div>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: currentLang.color
            }}>
              {progress}/{totalLessons}
            </span>
          </div>
          <div style={{
            background: '#e9ecef',
            height: '20px',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              background: `linear-gradient(90deg, ${currentLang.color}, ${currentLang.color}dd)`,
              height: '100%',
              width: `${progressPercent}%`,
              transition: 'width 0.5s ease',
              borderRadius: '10px',
              boxShadow: `0 0 15px ${currentLang.color}80`
            }} />
          </div>
        </div>

        {/* Lessons Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {currentLang.lessons.map((lesson) => {
            const isLocked = !lesson.free && !isPremium;
            const isCompleted = completedLessons[`${selectedLanguage}-${lesson.id}`];
            const isPlaying = audioPlaying === lesson.audio;

            return (
              <div
                key={lesson.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '25px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  opacity: isLocked ? 0.7 : 1,
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  transform: 'scale(1)'
                }}
                onMouseOver={(e) => {
                  if (!isLocked) {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.25)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                }}
              >
                {isLocked && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'rgba(255, 193, 7, 0.9)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                  }}>
                    <Lock size={20} color="white" />
                  </div>
                )}

                {isCompleted && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#00b894',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                  }}>
                    <CheckCircle size={20} color="white" />
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '15px'
                }}>
                  <div style={{
                    background: `${currentLang.color}15`,
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <BookOpen size={24} color={currentLang.color} />
                  </div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#2d3436',
                    margin: 0
                  }}>
                    {lesson.title}
                  </h3>
                </div>

                <div style={{
                  background: `${currentLang.color}08`,
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '15px',
                  borderLeft: `4px solid ${currentLang.color}`
                }}>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: currentLang.color,
                    margin: '0 0 10px 0',
                    textAlign: 'center'
                  }}>
                    {lesson.content}
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#636e72',
                    margin: 0,
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>
                    {lesson.translation}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <button
                    onClick={() => !isLocked && playAudio(lesson.audio)}
                    disabled={isLocked}
                    style={{
                      flex: 1,
                      background: isPlaying 
                        ? currentLang.color 
                        : `${currentLang.color}15`,
                      color: isPlaying ? 'white' : currentLang.color,
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Headphones size={18} />
                    {isPlaying ? 'Playing...' : 'Dengar Audio'}
                  </button>

                  {!isLocked && !isCompleted && (
                    <button
                      onClick={() => markAsCompleted(lesson.id)}
                      style={{
                        background: '#00b894',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                </div>

                {isLocked && (
                  <p style={{
                    marginTop: '12px',
                    fontSize: '0.85rem',
                    color: '#ff6b6b',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    🔒 Upgrade ke Premium untuk membuka
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          {[
            { icon: <Star size={24} />, label: 'Total Pelajaran', value: `${totalLessons * 5}` },
            { icon: <BookOpen size={24} />, label: 'Bahasa Tersedia', value: '5' },
            { icon: <TrendingUp size={24} />, label: 'Tingkat Sukses', value: '98%' }
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '15px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div style={{
                background: `${currentLang.color}15`,
                borderRadius: '12px',
                padding: '12px',
                color: currentLang.color
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: currentLang.color
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#636e72',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageLearningApp;