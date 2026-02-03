import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  CheckSquare, 
  Hand, 
  Moon, 
  Sun, 
  ChevronRight, 
  RotateCcw, 
  History, 
  Star,
  Share2,
  Copy,
  LayoutGrid
} from 'lucide-react';

// --- DATA CONSTANTS ---
const MOTIVATIONS = [
  "Ramadhan adalah bulan di mana pintu-pintu surga dibuka.",
  "Setiap amalan kebaikan di bulan ini dilipatgandakan pahalanya.",
  "Puasa bukan sekadar menahan lapar, tapi menahan lisan dan hati.",
  "Sedekah yang paling utama adalah sedekah di bulan Ramadhan.",
  "Manfaatkan setiap detik, karena kita tidak tahu apakah bertemu Ramadhan tahun depan.",
  "Tidur orang yang berpuasa adalah ibadah, namun bangunnya jauh lebih utama.",
  "Malam Lailatul Qadr lebih baik dari seribu bulan."
];

const PRAYERS_DATA = [
  {
    id: 'kabul',
    title: 'Doa Agar Segala Keinginan Terkabul',
    source: 'HR. Abu Daud',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنِّي أَشْهَدُ أَنَّكَ أَنْتَ اللهُ لَا إِلَهَ إِلَّا أَنْتَ الْأَحَدُ الصَّمَدُ الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
    latin: 'ALLAAHUMMA INNII AS-ALUKA BI-ANNII ASYHADU ANNAKA ANTALLAAH LAA ILAAHA ILLAA ANTA AL-AHAD ASH-SHOMAD ALLADZII LAM YALID WALAM YUULAD WALAM YAKUL LAHUU KUFUWAN AHAD',
    translation: 'Ya Allah, aku memohon kepada-Mu atas dasar persaksianku bahwa Engkau adalah Allah, tidak ada Tuhan yang berhak disembah selain Engkau, Yang Maha Esa, Yang Bergantung kepada-Nya segala sesuatu, Yang tidak beranak dan tidak pula diperanakkan, dan tidak ada seorang pun yang setara dengan-Nya.'
  },
  {
    id: 'ain',
    title: 'Doa Terhindar Dari Ain',
    source: 'HR. Al-Bukhari & An-Nasa’i',
    arab: 'اَللّٰهُمَّ مُطْفِىءَالْكَبِيْرِ وَمُكَبِّرِالصَّغِيْرِ اَطْفِىَٔهَاعَنِّيْ',
    latin: 'Alloohumma muthfi’al kabiiri wa mukbirash shogiiri athfi’haa annii.',
    translation: 'Ya Allah, Zat yang memadamkan hal besar dan membesarkan hal kecil, padamkanlah hal itu (ain) dariku.'
  },
  {
    id: 'belajar',
    title: 'Doa Belajar',
    source: 'Umum',
    arab: 'اللهم اررقنا فهم النبين ، و حفظ المرسلين ، dan إلهام الملآئكة المقربين',
    latin: 'Allohummarzuqna fahmannabiyyin, wa hifdzol mursalin, wa ilhamal mala’ikatil muqorrobin',
    translation: 'Ya Allah, karuniakanlah kami pemahaman para Nabi, hafalan para Rasul, dan ilham para Malaikat yang dekat (dengan-Mu).'
  },
  {
    id: 'ilmu',
    title: 'Doa Untuk Ilmu Yang Bermanfaat',
    source: 'HR. Ibn Majah',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَ رِزْقًا طَيِّبًا وَ عَمَلاً مُتَقَبَّلاً',
    latin: 'Allahumma inni as’aluka ‘ilman naafi’an, wa rizqan tayyiban, wa ‘amalan mutaqabbala',
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.'
  }
];

const SUNNAH_DATA = [
  {
    id: 'dhuha',
    title: 'Sholat Dhuha',
    description: 'Sholat sunnah yang dilakukan saat matahari terbit hingga menjelang waktu Dzuhur.',
    arab: 'اَللّٰهُمَّ اِنَّ الضُّحَآءَ ضُحَاءُكَ وَالْبَهَاءَ بَهَاءُكَ وَالْجَمَالَ جَمَالُكَ وَالْقُوَّةَ قُوَّتُكَ وَالْقُدْرَةَ قُدْرَتُكَ وَالْعِصْمَةَ عِصْمَتُكَ اَللّٰهُمَّ اِنْ كَانَ رِزْقِى فِى السَّمَآءِ فَأَنْزِلْهُ وَاِنْ كَانَ فِى اْلاَرْضِ فَأَخْرِجْهُ وَاِنْ كَانَ مُعَسَّرًا فَيَسِّرْهُ وَاِنْ كَانَ حَرَامًا فَطَهِّرْهُ وَاِنْ كَانَ بَعِيْدًا فَقَرِّبْهُ بِحَقِّ ضُحَاءِكَ وَبَهَاءِكَ وَجَمَالِكَ وَقُوَّتِكَ وَقُدْرَتِكَ آتِنِىْ مَآاَتَيْتَ عِبَادَكَ الصَّالِحِيْنَ',
    latin: 'Allahumma innad-duhaa\'a duhaa\'uka wal bahaa\'a bahaa\'uka wal jamaala jamaaluka wal quwwata quwwatuka wal-qudrata qudratuka wal ‘ismata ‘ismatuka. Allaahumma in kaana rizqii fis-samaa’i fa anzilhu, wa in kaana fil ardi fa akhrijhu, wa in kaana mu’assiran fa yassirhu, wa in kaana haraaman fa tahhirhu, wa in kaana ba’iidan fa qarribhu bi haqqi duhaa’ika wa bahaa’ika wa jamaalika wa quwwatika wa qudratika, aatinii maa ataita ‘ibaadakash-shaalihiin.',
    translation: 'Ya Allah, sesungguhnya waktu dhuha adalah waktu dhuha-Mu, keagungan adalah keagungan-Mu, keindahan adalah keindahan-Mu, kekuatan adalah kekuatan-Mu, penjagaan adalah penjagaan-Mu. Ya Allah, apabila rezekiku berada di atas langit maka turunkanlah, apabila berada di dalam bumi maka keluarkanlah, apabila sukar mudahkanlah, apabila haram sucikanlah, apabila jauh dekatkanlah dengan kebenaran dhuha-Mu, keagungan-Mu, keindahan-Mu, kekuatan-Mu dan kekuasaan-Mu, berikanlah hamba-Mu ini apa yang telah Engkau berikan kepada hamba-hamba-Mu yang shalih.'
  },
  {
    id: 'tahajud',
    title: 'Sholat Tahajud',
    description: 'Sholat malam yang dilaksanakan setelah bangun tidur, sangat dianjurkan di sepertiga malam.',
    source: 'HR. Al-Bukhari dan Muslim',
    arab: 'اَللهم رَبَّنَا لَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَوَاتِ وَاْلأَرْضِ وَمَنْ فِيْهِنَّ. وَلَكَ الْحَمْدُ أَنْتَ مَلِكُ السَّمَوَاتِ واْلأَرْضِ وَمَنْ فِيْهِنَّ. وَلَكَ الْحَمْدُ أَنْتَ نُوْرُ السَّمَوَاتِ وَاْلأَرْضِ وَمَنْ فِيْهِنَّ. وَلَكَ الْحَمْدُ أَنْتَ الْحَقُّ، وَوَعْدُكَ الْحَقُّ، وَلِقَاءُكَ حَقٌّ، وَقَوْلُكَ حَقٌّ، وَالْجَنَّةُ حَقٌّ، وَالنَّارُ حَقٌّ، وَالنَّبِيُّوْنَ حَقٌّ، وَمُحَمَّدٌ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ حَقٌّ، وَالسَّاعَةُ حَقٌّ. اَللهم لَكَ أَسْلَمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَإِلَيْكَ أَنَبْتُ، وَبِكَ خَاصَمْتُ، وَإِلَيْكَ حَاكَمْتُ، فَاغْفِرْ لِيْ مَا قَدَّمْتُ وَمَا أَخَّرْتُ وَمَا أَسْرَرْتُ وَمَا أَعْلَنْتُ وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي. أَنْتَ الْمُقَدِّمُ وَأَنْتَ الْمُؤَخِّرُ لآ اِلَهَ إِلَّا أَنْتَ. وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ',
    latin: 'Allâhumma rabbanâ lakal hamdu. Anta qayyimus samâwâti wal ardhi wa man fî hinna. Wa lakal hamdu anta mâlikus samâwâti wal ardhi wa man fî hinna. Wa lakal hamdu anta nûrus samâwâti wal ardhi wa man fî hinna. Wa lakal hamdu antal haqq. Wa wa‘dukal haqq. Wa liqâ’uka haqq. Wa qauluka haqq. Wal jannatu haqq. Wan nâru haqq. Wan nabiyyûna haqq. Wa Muhammadun shallallâhu alaihi wasallama haqq. Was sâ‘atu haqq. Allâhumma laka aslamtu. Wa bika âmantu. Wa ‘alaika tawakkaltu. Wa ilaika anabtu. Wa bika khâshamtu. Wa ilaika hâkamtu. Fagfirlî mâ qaddamtu, wa mâ akhkhartu, wa mâ asrartu, wa mâ a‘lantu, wa mâ anta a‘lamu bihi minnî. Antal muqaddimu wa antal mu’akhkhiru. Lâ ilâha illâ anta. Wa lâ haula, wa lâ quwwata illâ billâh.',
    translation: 'Ya Allah, Tuhan kami, segala puji bagi-Mu, Engkau penegak langit dan bumi serta apa-apa yang ada di dalamnya. Segala puji bagi-Mu, Engkau Raja langit dan bumi serta apa-apa yang ada di dalamnya. Segala puji bagi-Mu, Engkau cahaya langit dan bumi serta apa-apa yang ada di dalamnya. Segala puji bagi-Mu, Engkau Al-Haq, janji-Mu adalah benar, pertemuan dengan-Mu adalah benar, firman-Mu adalah benar, surga adalah benar, neraka adalah benar, para nabi adalah benar, Muhammad SAW adalah benar, hari kiamat adalah benar. Ya Allah, kepada-Mu aku berserah diri, kepada-Mu aku beriman, kepada-Mu aku bertawakal, kepada-Mu aku kembali, dengan pertolongan-Mu aku berdebat, kepada-Mu aku memohon keputusan, maka ampunilah dosa-dosaku yang terdahulu dan yang kemudian, yang aku sembunyikan dan yang aku nyatakan, dan apa saja yang Engkau lebih mengetahuinya daripada aku. Engkau Yang Mendahulukan dan Engkau Yang Mengakhirkan, tiada Tuhan selain Engkau, dan tiada daya serta upaya kecuali dengan pertolongan Allah.'
  },
  {
    id: 'tarawih',
    title: 'Sholat Tarawih',
    description: 'Sholat sunnah khusus di malam bulan Ramadhan.',
    niatArab: 'اُصَلِّى سُنَّةَ التَّرَاوِيْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً مَأْمُوْمًا لِلهِ تَعَالَى',
    niatLatin: 'Ushalli sunnatat tarāwīhi rak‘ataini mustaqbilal qiblati adā’an ma’mūman lillāhi ta‘ālā.',
    niatTranslation: 'Aku niat shalat sunnah tarawih dua rakaat sebagai makmum karena Allah Ta‘ala.'
  }
];

// --- APP COMPONENT ---
export default function RamadhanJourney() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({
    fastingDays: Array(30).fill(false),
    dailyTodos: {
      tahajud: false,
      dhuha: false,
      tarawih: false,
      tilawah: false,
      sedekah: false
    },
    tasbih: {
      count: 0,
      target: 33,
      history: []
    }
  });

  // Persist to Local Storage
  useEffect(() => {
    const savedData = localStorage.getItem('ramadhan_journey_v1');
    if (savedData) setUserData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    localStorage.setItem('ramadhan_journey_v1', JSON.stringify(userData));
  }, [userData]);

  // Handlers
  const toggleFasting = (dayIndex) => {
    const newFasting = [...userData.fastingDays];
    newFasting[dayIndex] = !newFasting[dayIndex];
    setUserData({ ...userData, fastingDays: newFasting });
  };

  const toggleTodo = (key) => {
    setUserData({
      ...userData,
      dailyTodos: { ...userData.dailyTodos, [key]: !userData.dailyTodos[key] }
    });
  };

  const incrementTasbih = () => {
    setUserData(prev => ({
      ...prev,
      tasbih: { ...prev.tasbih, count: prev.tasbih.count + 1 }
    }));
  };

  const resetTasbih = () => {
    setUserData(prev => ({
      ...prev,
      tasbih: { ...prev.tasbih, count: 0 }
    }));
  };

  const progressFasting = useMemo(() => {
    const done = userData.fastingDays.filter(Boolean).length;
    return Math.round((done / 30) * 100);
  }, [userData.fastingDays]);

  // --- VIEWS ---

  const HomeView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to Ramadhan Journey</h1>
          <p className="text-emerald-50 text-lg opacity-90">"Teman Setia Ibadahmu Selama Bulan Suci"</p>
          <div className="mt-6 flex items-center gap-4">
             <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex-1">
                <span className="block text-xs uppercase tracking-wider opacity-70">Progress Puasa</span>
                <span className="text-2xl font-bold">{progressFasting}%</span>
             </div>
             <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex-1">
                <span className="block text-xs uppercase tracking-wider opacity-70">Hari Ke</span>
                <span className="text-2xl font-bold">{userData.fastingDays.filter(Boolean).length} / 30</span>
             </div>
          </div>
        </div>
        {/* Islamic Patterns (SVG) */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
           <div className="flex items-center gap-3 mb-4">
             <Star className="text-amber-500" />
             <h3 className="font-bold text-slate-800 dark:text-slate-100">Motivasi Hari Ini</h3>
           </div>
           <p className="italic text-slate-600 dark:text-slate-300 leading-relaxed">
             "{MOTIVATIONS[new Date().getDay() % MOTIVATIONS.length]}"
           </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
           <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Akses Cepat</h3>
           <div className="grid grid-cols-2 gap-3">
             <button onClick={() => setActiveTab('doa')} className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors">
               Baca Doa
             </button>
             <button onClick={() => setActiveTab('tasbih')} className="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-xl text-sm font-medium hover:bg-teal-100 transition-colors">
               Tasbih
             </button>
           </div>
        </div>
      </div>
    </div>
  );

  const CalendarView = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Kalender Ramadhan</h2>
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
          {progressFasting}% Selesai
        </span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
        {userData.fastingDays.map((isDone, idx) => (
          <button
            key={idx}
            onClick={() => toggleFasting(idx)}
            className={`
              aspect-square flex flex-col items-center justify-center rounded-2xl transition-all duration-300 border-2
              ${isDone 
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-none' 
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-emerald-300'}
            `}
          >
            <span className="text-xs opacity-70 mb-1">Hari</span>
            <span className="text-lg font-bold">{idx + 1}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl text-center">
        <h3 className="text-slate-500 dark:text-slate-400 text-sm mb-2">Total Puasa</h3>
        <p className="text-4xl font-black text-emerald-600">{userData.fastingDays.filter(Boolean).length} / 30 Hari</p>
        <button 
          onClick={() => {
            if(window.confirm('Reset kalender?')) 
              setUserData({...userData, fastingDays: Array(30).fill(false)})
          }}
          className="mt-4 text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 mx-auto"
        >
          <RotateCcw size={12} /> Reset Progres
        </button>
      </div>
    </div>
  );

  const DoaView = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Kumpulan Doa</h2>
      <div className="space-y-4">
        {PRAYERS_DATA.map((doa) => (
          <div key={doa.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex-1 pr-4">{doa.title}</h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-500 uppercase tracking-tighter">{doa.source}</span>
            </div>
            <p className="text-right text-3xl font-arabic leading-[3rem] text-slate-800 dark:text-slate-100 mb-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl" dir="rtl">
              {doa.arab}
            </p>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">Latin</span>
                <p className="text-slate-600 dark:text-slate-400 italic text-sm leading-relaxed">{doa.latin}</p>
              </div>
              <div className="pt-3 border-t border-slate-50 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Terjemahan</span>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{doa.translation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SunnahView = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Panduan Sholat Sunnah</h2>
      <div className="space-y-4">
        {SUNNAH_DATA.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="p-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-sm opacity-90 mt-1">{item.description}</p>
            </div>
            <div className="p-6 space-y-6">
              {item.niatArab && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Niat Makmum</h4>
                  <p className="text-right text-2xl font-arabic leading-[3rem] bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl" dir="rtl">{item.niatArab}</p>
                  <p className="text-xs text-slate-500 italic">{item.niatLatin}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">"{item.niatTranslation}"</p>
                </div>
              )}
              {item.arab && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Doa Khusus</h4>
                  <p className="text-right text-2xl font-arabic leading-[3rem] bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl" dir="rtl">{item.arab}</p>
                  <div className="space-y-2">
                    <p className="text-xs text-emerald-600 font-medium italic">{item.latin}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-700">{item.translation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TasbihView = () => (
    <div className="flex flex-col items-center space-y-8 animate-in zoom-in-95 duration-300 pt-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Tasbih Digital</h2>
        <p className="text-slate-500 text-sm">Ketuk di mana saja untuk menghitung</p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-2xl group-active:bg-emerald-500/40 transition-all"></div>
        <button 
          onClick={incrementTasbih}
          className="relative w-64 h-64 bg-white dark:bg-slate-800 rounded-full shadow-2xl border-8 border-emerald-500 flex flex-col items-center justify-center transition-transform active:scale-95"
        >
          <span className="text-6xl font-black text-slate-800 dark:text-slate-100 mb-2">{userData.tasbih.count}</span>
          <span className="text-slate-400 font-medium uppercase tracking-widest text-xs">Target: {userData.tasbih.target}</span>
        </button>
      </div>

      <div className="flex gap-4">
        {[33, 99, 1000].map(target => (
          <button 
            key={target}
            onClick={() => setUserData({...userData, tasbih: {...userData.tasbih, target}})}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${userData.tasbih.target === target ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}
          >
            {target === 1000 ? '∞' : target}
          </button>
        ))}
        <button 
          onClick={resetTasbih}
          className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 hover:text-red-500 transition-colors"
        >
          <RotateCcw size={18} />
        </button>
      </div>
      
      <div className="w-full max-w-xs bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <History className="text-slate-400" size={18} />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Terakhir: {userData.tasbih.count}</span>
        </div>
      </div>
    </div>
  );

  const TodoView = () => {
    const todos = [
      { id: 'tahajud', label: 'Sholat Tahajud', icon: <Moon size={18} /> },
      { id: 'dhuha', label: 'Sholat Dhuha', icon: <Sun size={18} /> },
      { id: 'tarawih', label: 'Sholat Tarawih', icon: <Star size={18} /> },
      { id: 'tilawah', label: 'Tilawah Qur’an', icon: <BookOpen size={18} /> },
      { id: 'sedekah', label: 'Sedekah Harian', icon: <Hand size={18} /> },
    ];

    const completedCount = Object.values(userData.dailyTodos).filter(Boolean).length;
    const progress = Math.round((completedCount / todos.length) * 100);

    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Ibadah Checklist</h2>
            <p className="text-slate-500 text-sm">Target harian untuk hari ini</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-emerald-500">{progress}%</span>
          </div>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="space-y-3">
          {todos.map(todo => (
            <button 
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className={`
                w-full flex items-center justify-between p-5 rounded-3xl transition-all border-2
                ${userData.dailyTodos[todo.id] 
                  ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800' 
                  : 'bg-white border-slate-50 dark:bg-slate-800 dark:border-slate-700 shadow-sm'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${userData.dailyTodos[todo.id] ? 'bg-emerald-500 text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-400'}`}>
                  {todo.icon}
                </div>
                <span className={`font-bold ${userData.dailyTodos[todo.id] ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'}`}>
                  {todo.label}
                </span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${userData.dailyTodos[todo.id] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200'}`}>
                {userData.dailyTodos[todo.id] && <CheckSquare size={14} />}
              </div>
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => setUserData({...userData, dailyTodos: {
            tahajud: false, dhuha: false, tarawih: false, tilawah: false, sedekah: false
          }})}
          className="w-full py-4 text-slate-400 text-xs flex items-center justify-center gap-2 hover:text-red-500 transition-colors"
        >
          <RotateCcw size={14} /> Reset Harian
        </button>
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
            <span className="font-bold text-lg tracking-tight">Ramadhan Journey</span>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all hover:scale-110 active:scale-95"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-32">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'doa' && <DoaView />}
        {activeTab === 'sunnah' && <SunnahView />}
        {activeTab === 'tasbih' && <TasbihView />}
        {activeTab === 'todo' && <TodoView />}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 pb-safe z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex justify-around items-center">
          {[
            { id: 'home', icon: <Home size={22} />, label: 'Home' },
            { id: 'calendar', icon: <Calendar size={22} />, label: 'Jadwal' },
            { id: 'doa', icon: <BookOpen size={22} />, label: 'Doa' },
            { id: 'sunnah', icon: <LayoutGrid size={22} />, label: 'Sholat' },
            { id: 'tasbih', icon: <RotateCcw size={22} />, label: 'Tasbih' },
            { id: 'todo', icon: <CheckSquare size={22} />, label: 'To-Do' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === tab.id ? 'text-emerald-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <div className={`p-1 rounded-lg ${activeTab === tab.id ? 'bg-emerald-50 dark:bg-emerald-900/30' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* FOOTER PADDING FOR MOBILE */}
      <div className="h-10"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        .font-arabic { font-family: 'Amiri', serif; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}} />
    </div>
  );
}