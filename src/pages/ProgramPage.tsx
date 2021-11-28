import { FC, useEffect, useRef, useState } from 'react'
import SDCLogo from '../assets/logos/sdc.png'
import HeroImage from '../assets/images/hero-img.png'
import MBSMessage from '../assets/images/mbs-royal-message.webp'
import StripImage from '../assets/images/strip.png'
import { BsEyeglasses } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import PIFLogo from '../assets/logos/pif.png'
import V2030Logo from '../assets/logos/v2030.png'
import { useAppSelector } from '../app/hooks'

const ProgramPage: FC = () => {
  const aboutProgramRef = useRef<null | HTMLDivElement>(null)
  const processRef = useRef<null | HTMLDivElement>(null)
  const aboutUsRef = useRef<null | HTMLDivElement>(null)
  const faqRef = useRef<null | HTMLDivElement>(null)

  const { applicationStarted, applicationSubmitted } = useAppSelector(
    (state) => state.application
  )

  const { isSignedIn } = useAppSelector((state) => state.user)

  const navigate = useNavigate()

  const [dropdown, setDropDown] = useState(false)

  useEffect(() => {
    window.scroll(0, 0)
  })

  return (
    <div className="z-10 bg-mist text-mist w-full">
      <header className="animate-grow-light">
        <nav className="navigation">
          <img src={SDCLogo} className="navigation--logo" alt="" />
          <ul className="navi-container">
            <li className="navi-links">
              <p
                className="hover:text-sky text-xl"
                onClick={() => {
                  aboutProgramRef.current!.scrollIntoView()
                }}
              >
                عن البرنامج
              </p>
            </li>
            <hr className="navi-hr" />
            <li className="navi-links">
              <p
                className="hover:text-sky text-xl"
                onClick={() => {
                  aboutProgramRef.current!.scrollIntoView()
                }}
              >
                التخصصات المتاحة
              </p>
            </li>
            <hr className="navi-hr" />
            <li className="navi-links">
              <p
                className="hover:text-sky text-xl"
                onClick={() => {
                  processRef.current!.scrollIntoView()
                }}
              >
                مراحل وآلية التقديم
              </p>
            </li>
            <hr className="navi-hr" />
            <li className="navi-links">
              <p
                className="hover:text-sky text-xl"
                onClick={() => {
                  aboutUsRef.current!.scrollIntoView()
                }}
              >
                عن السودة للتطوير
              </p>
            </li>
            <hr className="navi-hr" />
            <li className="navi-links">
              <p
                className="hover:text-sky text-xl"
                onClick={() => {
                  faqRef.current!.scrollIntoView()
                }}
              >
                الأسئلة الشائعة
              </p>
            </li>
            <hr className="navi-hr" />
            <li className="navi-links">
              <p
                className="hover:text-sky text-xl"
                onClick={() => navigate('/apply')}
              >
                {applicationSubmitted && isSignedIn
                  ? 'طلبك تحت الدراسة'
                  : applicationStarted && isSignedIn
                  ? 'أكمل الطلب'
                  : 'سجل الآن'}
              </p>
            </li>
          </ul>

          <div className="mobile-navi">
            <p
              className="noselect font-black text-lg text-mist cursor-pointer"
              onClick={() => {
                setDropDown(!dropdown)
              }}
            >
              المزيد
            </p>
            <div
              className={`absolute top-12 -left-12 w-48 bg-peak ${
                dropdown ? 'flex' : 'hidden'
              } text-center flex-col justify-center items-center text-lg text-mist rounded-xl`}
            >
              <p
                className="hover:text-sky cursor-pointer my-2"
                onClick={() => {
                  aboutProgramRef.current!.scrollIntoView()
                }}
              >
                عن البرنامج
              </p>
              <hr />
              <p
                className="hover:text-sky cursor-pointer my-2"
                onClick={() => {
                  aboutProgramRef.current!.scrollIntoView()
                }}
              >
                التخصصات المتاحة
              </p>
              <hr />
              <p
                className="hover:text-sky cursor-pointer my-2"
                onClick={() => {
                  processRef.current!.scrollIntoView()
                }}
              >
                مراحل وآلية التقديم
              </p>
              <hr />
              <p
                className="hover:text-sky cursor-pointer my-2"
                onClick={() => {
                  aboutUsRef.current!.scrollIntoView()
                }}
              >
                عن السودة للتطوير
              </p>
              <hr />
              <p
                className="hover:text-sky cursor-pointer my-2"
                onClick={() => {
                  faqRef.current!.scrollIntoView()
                }}
              >
                الأسئلة الشائعة
              </p>
              <hr />
              <p
                className="hover:text-sky cursor-pointer my-2"
                onClick={() => navigate('/apply')}
              >
                {applicationSubmitted
                  ? 'طلبك تحت الدراسة'
                  : applicationStarted
                  ? 'أكمل الطلب'
                  : 'سجل الآن'}
              </p>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section id="hero" className="hero">
          <div
            className="hero-image-container animate-grow-light cursor-pointer"
            onClick={() => navigate('/apply')}
          >
            <img src={HeroImage} className="hero-image" alt="" />
          </div>
        </section>

        <section id="royal" className="royal">
          <div className="royal-container animate-grow-light">
            <img src={MBSMessage} className="royal-image" alt="" />
          </div>
        </section>

        <section ref={aboutProgramRef} className="about-program">
          <div className="about-program--container animate-grow-light flex flex-col justify-center items-start text-mist text-xl">
            <h2 className="about-program--title mb-4 text-center w-full">
              عن البرنامج
            </h2>
            <p className="about-program--subtitle w-full font-bold text-3xl md:text-5xl">
              برنامج ابتعاث أبناء وبنات السودة ورجال ألمع
            </p>
            <p className="about-program--info text-xl leading-loose mb-8">
              نؤمن في السودة للتطوير بأن الإنسان هو محور التنمية وأساسها وهو
              الركيزة الأساسية في رحلة التنمية المستدامة، من هذا المنطلق نسعد
              بإعلان أحد أكبر مشاريعنا التنموية الموجهة لأبناء وبنات منطقة
              المشروع الذي يهدف إلى تطوير القدرات البشرية والنهوض بالكفاءات
              الوطنية لإعداد الجيل المقبل من الشباب والشابات في قطاعات السياحة
              والسفر والترفيه والضيافة.
            </p>
            <p className="about-program--info text-xl leading-loose mb-4">
              يوفر برنامج الابتعاث الذي أطلقته السودة للتطوير فرصاً نوعية لتأهيل
              أبناء وبنات المنطقة في قطاعات السياحة والسفر والضيافة حيث يستهدف
              البرنامج 4 من بين أفضل 10 مؤسسات تعليمية بقطاعي السياحة والضيافة
              في العالم.
            </p>
            <p className="about-program--terms-title text-2xl mb-8">
              الشروط العامة للقبول في البرنامج:
            </p>
            <ul className="about-program--terms-container text-xl leading-loose space-y-5">
              <li>- أن يكون المتقدم سعودي الجنسية</li>
              <li>- أن يكون المتقدم من أهل منطقة السودة أو رجال ألمع</li>
              <li>
                - أن يكون التخصص المراد دراسته ضمن التخصصات المحددة أو أحد
                تفرعاتها
              </li>
              <li>
                - للتقديم على درجة الدبلوم أو البكالوريوس، يجب أن لايتجاوز عمر
                المتقدم عن 30 سنة وأن يكون حاصلًا على شهادة الثانوية العامة
              </li>
              <li>
                - للتقديم على درجة الماجستير، يجب أن لايتجاوز عمر المتقدم عن 35
                سنة وأن يكون حاصلًا على شهادة البكالوريوس
              </li>
              <li>
                - الجدية والالتزام في الدراسة طوال فترة برنامج الابتعاث والتي
                تشمل مرحلة اللغة (إن وجد) ومرحلة الدراسة الأكاديمية
              </li>
              <li>- أن يتّصف المتقدم بحسن السيرة والسلوك</li>
            </ul>
            <p className="about-program--terms-title text-2xl mb-8">
              التخصصات المتاحة ضمن البرنامج:
            </p>
            <ul className="about-program--terms-container leading-loose">
              <li>- السياحة والضيافة</li>
              <li>- فنون الطهي</li>
            </ul>
            <div
              className="text-center self-center noselect cursor-pointer mb-8"
              onClick={() => navigate('/apply')}
            >
              <p className="text-base md:text-lg font-black bg-sky text-rock hover-rise p-4 pb-6 mt-6 rounded">
                آخر موعد للتقديم يوم الجمعة بتاريخ 26 نوفمبر 2021
              </p>
            </div>
          </div>
        </section>

        <section className="strip-section">
          <div className="strip-container mx-auto">
            <img src={StripImage} className="strip-image" alt="strip" />
          </div>
        </section>

        <section ref={processRef} className="process-section">
          <div className="process--container animate-grow-light">
            <h2 className="process--title">مراحل وآلية التقديم</h2>
            <div className="process--content-container">
              <p className="process--title">01</p>
              <p className="process--subtitle">الفرز الأولي</p>
              <p className="process--content">
                يتم الفرز الأولي للمتقدمين بشكل آلي من خلال النظام بحيث يتم
                ترشيح المتقدمين في حال استيفائهم الحد الأدنى من متطلبات الترشيح
                للبرنامج
              </p>
            </div>
            <hr className="process--line-break" />

            <div className="process--content-container">
              <p className="process--title">02</p>
              <p className="process--subtitle">التقييم حسب استبيان الابتعاث</p>
              <p className="process--content leading-loose">
                تتم مرحلة تقييم استبيان الابتعاث من خلال النظام تلقائيا والذي تم
                تصميمه بناءً على نقاط ومعايير القطاعات المستهدفة بحيث تشمل أسئلة
                مباشرة على سبيل المثال لا الحصر أسئلة صح وخطأ واختيار من متعدد
                بهدف تقييم مدى استعداد المتقدمين والتزامهم تجاه البرنامج
              </p>
            </div>
            <hr className="process--line-break" />

            <div className="process--content-container">
              <p className="process--title">03</p>
              <p className="process--subtitle">التقييم من قبل اللجنة المختصة</p>
              <p className="process--content leading-loose">
                تتم مرحلة تقييم اللجنة المختصة من خلال نموذج عمل محدد وآلية
                موحدة من قبل مختصين من الجهات ذات الصلة وذلك لفرز النتائج
                واختيار أبرز المرشحين بما يتناسب مع معايير البرنامج والتحقق من
                صحة المعلومات والمرفقات ومواءمتها مع المتطلبات التفصيلية
                للبرنامج
              </p>
            </div>
            <hr className="process--line-break" />

            <div className="process--content-container">
              <p className="process--title">04</p>
              <p className="process--subtitle">تحديد مستوى اللغة الإنجليزية</p>
              <p className="process--content leading-loose">
                يتم تحديد مستوى اللغة الإنجليزية للمتقدمين من خلال نظام تقييم
                اللغة العالمي والمقدم من المجلس الثقافي البريطاني (British
                Council) بهدف تحديد مستوى الكفاءة اللغوية للمرشحين وفقًا لأفضل
                الممارسات العالمية
              </p>
            </div>
            <hr className="process--line-break" />

            <div className="process--content-container">
              <p className="process--title">05</p>
              <p className="process--subtitle">تحديد مستوى القدرات</p>
              <p className="process--content leading-loose">
                يتم تحديد القدرات المعرفية والمهارات الشخصية والتفكير المنطقي
                للمتقدمين من خلال اختبار تحديد القدرات
              </p>
            </div>
            <hr className="process--line-break" />

            <div className="process--content-container">
              <p className="process--title">06</p>
              <p className="process--subtitle">المقابلات الشخصية</p>
              <p className="process--content leading-loose">
                يتم إجراء المقابلات الشخصية عن بعد وبصورة مرئية من قبل مختصين
                لتقييم المرشحين بناءً على الكفاءات والجدارات المطلوبة للبرنامج
                ووفقًا لمنهجية روبرك العالمية (Rubric) وذلك من خلال وضع نموذج
                موحد للأسئلة ومعايير التقييم وتشمل وصف لكل معيار ودرجة وتقدير
                محدد. كما سيتم استخدام خاصية التسجيل المرئي للمقابلات لدواعي
                المراجعة والتدقيق
              </p>
            </div>
          </div>
        </section>

        <section ref={aboutUsRef} className="vision">
          <div className="vision--content animate-grow-light">
            <h2 className="vision--title mb-6">رؤيتنا</h2>
            <p className="vision--subtitle mb-6">السودة للتطوير</p>

            <p className="vision--content-text leading-loose">
              تطوير السودة، وأجزاء من رجال ألمع في منطقة عسير، لتكون وجهة سياحية
              جبلية بمواصفات عالمية، وتوفير تجارب ثقافية غامرة والاحتفاء
              بالطبيعة الخلابة
            </p>

            <p className="vision--content-header">ثقافة أصيلة وتراث فريد</p>
            <p className="vision--content-text">
              تمتاز المنطقة بموروثها التراثي والثقافي الفريد والغني، والذي لا
              تزال معالمه جلية في القرى التاريخية المحيطة بها.
            </p>

            <p className="vision--content-header">طبيعة ساحرة</p>
            <p className="vision--content-text">
              تعد منطقة السودة موطناً  لأعلى قمة في المملكة العربية السعودية،
              بارتفاع يزيد على 3000 متر فوق سطح البحر، وتتميز بمناخها المنعش
              والمائل للبرودة على امتداد العام.
            </p>

            <p className="vision--content-header">تجارب غامرة</p>
            <p className="vision--content-text">
              تعد السودة موطن أعلى قمة في المملكة العربية السعودية بارتفاع يزيد
              عن 3000 متر فوق سطح البحر، وتتميز بمناخها المنعش والمائل للبرودة
              على امتداد العام، وتنوع تضاريسها ما بين الجبال الشاهقة والسهول
              المنبسطة والوديان العميقة، مما يتيح للزوار فرصة استكشاف الحياة
              البرية والاستمتاع بسحر الطبيعة والاطلالات الرائعة من القمم التي
              تعانق السحب الممطرة.
            </p>
            <p className="vision--content-text">
              وتشهد الوجهة انتعاشا في السياحة الداخلية في فصل الصيف.
            </p>
            <p className="vision--content-text">
              وستعمل السودة للتطوير على حماية مواردها الطبيعية للمنطقة، فضلا عن
              الاحتفاء بتراثها الحضاري الفريد وإيجاد وجهة جبلية سياحية جاذبة على
              المستويين المحلي والعالمي.
            </p>

            <p className="vision--content-header">التزامنا</p>
            <p className="vision--content-text-bold">
              المحافظة على الطبيعة والاحتفاء بالتراث
            </p>
            <p className="vision--content-text">
              تولي السودة للتطوير اهتماما كبيراً بالاستدامة فهي جوهر عملها،
              وستستثمر في تطوير البنية التحتية لمنطقة السودة وأجزاء من رجال ألمع
              بغرض تقديم قطاعات سكنية وترفيهية وتجارية متطورة، مع الحفاظ على
              ثقافتها الفريدة، وكنوزها الوطنية، ومواقعها التراثية.
            </p>
          </div>
          <a
            className="vision--cta border-0 px-12 flex justify-center items-center gap-3 noselect cursor-pointe rounded pt-3 pb-4 mt-1 hover-rise hover:bg-rock hover:text-sky bg-sky text-rock"
            href="https://soudah.sa/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <BsEyeglasses className="text-2xl mt-1" />
            <span className="font-bold text-xl noselect">اقرأ المزيد</span>
          </a>
        </section>

        <section ref={faqRef} className="faq animate-grow-light">
          <h2 className="faq-title">الأسئلة الشائعة</h2>

          <p className="faq-header">كيف يمكنني التقديم على برنامج الابتعاث؟</p>
          <p className="faq-text">
            يمكن التقديم على البرنامج من خلال تعبئة نموذج التقديم على صفحة
            برنامج الابتعاث والضغط على "سجل الآن"، إنشاء حساب و من ثم تعبئة
            نموذج التقديم واتباع الخطوات المطلوبة للتقديم
          </p>

          <p className="faq-header">
            ما هو آخر موعد للتقديم على برنامج الابتعاث؟
          </p>
          <p className="faq-text">
            آخر موعد للتقديم يوم الجمعة بتاريخ 26 نوفمبر 2021
          </p>

          <p className="faq-header">كيف يمكنني التواصل مع فريق عمل الابتعاث؟</p>
          <p className="faq-text">
            يمكن التواصل مع فريق عمل الابتعاث عن طريق البريد الإلكتروني التالي
            scholarship@soudah.sa وسيقوم فريق العمل بالرد في أقرب وقت ممكن
          </p>

          <p className="faq-header">
            كيف يمكنني متابعة الطلب الخاص بي ومعرفة المستجدات؟
          </p>
          <p className="faq-text">
            سيتم التواصل مع المتقدمين وإبلاغهم بالمستجدات والنتائج من خلال رسالة
            إلى البريد الإلكتروني المسجل في نموذج التقديم
          </p>

          <p className="faq-header">
            ما هو الوقت المتوقّع لصدور نتائج الترشيح؟
          </p>
          <p className="faq-text">
            المتوقع أن يكون موعد إعلان أسماء المرشحين نهاية عام 2021
          </p>

          <p className="faq-header">
            هل يوجد عدد مقاعد محدد لمن سيتم قبولهم في البرنامج؟
          </p>
          <p className="faq-text">
            نعم، في الدفعة الأولى من برنامج الابتعاث الخارجي سيتم ترشيح 70 طالب
            فقط لمرحلة اللغة ومن ثم سيتم ترشيح 50 طالب منهم لمرحلة الدراسة
            الجامعية
          </p>

          <p className="faq-header">
            ما هو مستوى اللغة الانجليزية المطلوب للدراسة في الخارج؟
          </p>
          <p className="faq-text">
            مرحلة الدبلوم والبكالوريوس 5.5 في اختبار الايلتس (IELTS)
          </p>
          <p className="faq-text">الماجستير 6.0 في اختبار الايلتس (IELTS)</p>

          <p className="faq-header">
            هل يمكنني التقديم على البرنامج إذا لم يكن لدي مستوى اللغة الانجليزية
            المطلوب من الجامعة؟
          </p>
          <p className="faq-text">
            نعم، حيث تعد مرحلة دراسة اللغة أحد مراحل برنامج الابتعاث
          </p>

          <p className="faq-header">ما هي مراحل وآلية الترشيح؟</p>
          <p className="faq-text">
            يمكنك الاطلاع على مراحل وآلية الترشيح بشكل مفصل في الخانة المخصصة
            ضمن تفاصيل البرنامج
          </p>

          <p className="faq-header">
            ما هي التخصصات التي يشملها برنامج الابتعاث؟
          </p>
          <p className="faq-text">تخصص إدارة الضيافة والسياحة</p>
          <p className="faq-text">تخصص فنون الطهي</p>

          <p className="faq-header">
            هل يمكنني تقديم أكثر من طلب لأكثر من اختصاص أو مرحلة دراسية؟
          </p>
          <p className="faq-text">لا، يحق لكل طالب التقديم مرة واحدة فقط</p>
          <p className="faq-text">
            في حال رغبت في تغيير التخصص أو المرحلة يمكنك التواصل مع فريق عمل
            برنامج الابتعاث عبر البريد الإلكتروني scholarship@soudah.sa
          </p>

          <p className="faq-header">
            هل يمكنني الحصول على قبول نهائي من أحد الجامعات الموصى بها ومن ثم
            التقديم على برنامج الابتعاث الخارجي؟
          </p>
          <p className="faq-text">
            إذا كنت ترغب في التقديم على برنامج الابتعاث، يجب عليك تعبئة نموذج
            التقديم من خلال الموقع أولًا، وفي حال استيفائك كافة الشروط
            والمتطلبات سيتم ترشيحك للبرنامج، وبالتالي سيعمل فريق العمل على توفير
            القبول النهائي من أحد الجامعات الموصى بها وفقًا للدرجة العلمية
            المحددة والتخصص المرغوب دراسته
          </p>

          <p className="faq-header">كم مدة الابتعاث؟</p>
          <p className="faq-text">
            تعتمد مدة الابتعاث على المرحلة الدراسية وهي تتراوح ما بين 2 - 4
            سنوات
          </p>

          <p className="faq-header">
            هل يلزم أن يكون لدي أي خبرة أو دراسة في نفس التخصص المرغوب للبعثة؟
          </p>
          <p className="faq-text">لا يلزم ذلك</p>

          <p className="faq-header">
            ما هي الدرجات العلمية المتاحة في برنامج الابتعاث؟
          </p>
          <p className="faq-text">درجة الدبلوم</p>
          <p className="faq-text">درجة البكالوريوس</p>
          <p className="faq-text">درجة الماجستير</p>

          <p className="faq-header">
            هل يقتصر الالتحاق بالبرنامج على جنس معين؟
          </p>
          <p className="faq-text">
            التقديم في البرنامج متاح للمؤهلين من الذكور والإناث على حد سواء
            ونسعى أن تكون فرص الترشيح عادلة ومتساوية في المقاعد المخصصة لكل درجة
            علمية
          </p>

          <p className="faq-header">
            أنا من الأشخاص ذوي الإعاقة، هل يمكنني الاستفادة والتسجيل في
            البرنامج؟
          </p>
          <p className="faq-text">
            نعم، يمكنك الاستفادة والتسجيل في البرنامج، وبإمكانك التواصل مع فريق
            البرنامج scholarship@soudah.sa
          </p>

          <p className="faq-header">على ماذا يشمل القبول في برنامج الابتعاث؟</p>
          <p className="faq-text">
            في حال قبولك في برنامج الابتعاث وترشيحك لمرحلة الدراسة الجامعية،
            سنقوم بتوفير ما يلي:
          </p>
          <p className="faq-text">
            تأكيد التسجيل والحصول على قبول في أحد الجامعات الموصى بها
          </p>
          <p className="faq-text">
            تغطية كامل تكاليف دراسة اللغة وتكاليف الدراسة الجامعية
          </p>
          <p className="faq-text">
            توجيه أكاديمي من قبل مرشدين أكاديميين متمرسين طوال فترة الدراسة
            الجامعية
          </p>
          <p className="faq-text">تأمين صحي</p>
          <p className="faq-text">سكن للطلاب والطالبات داخل الحرم الجامعي</p>
          <p className="faq-text">
            مكافأة شهرية طوال فترة الدراسة الجامعية، ويتم تحديد المبلغ حسب مدينة
            الابتعاث
          </p>
          <p className="faq-text">
            تذاكر سفر ذهاب وعودة من المملكة إلى مدينة الابتعاث
          </p>

          <p className="faq-header">هل البعثة تشمل مرافقين؟</p>
          <p className="faq-text">
            لا يشمل برنامج الابتعاث المرافقين ولا يتم صرف مكافأة لهم
          </p>

          <p className="faq-header">
            هل يمكنني التقديم على برنامج الابتعاث إذا كان مُتَوقع تخرجي خلال هذا
            العام الدراسي؟
          </p>
          <p className="faq-text">
            نعم، في حال كان لدى المتقدم درجة اللغة الإنجليزية المطلوبة. (المسار
            السريع)
          </p>

          <p className="faq-header">
            هل يمكنني التقديم على برنامج الابتعاث من خلال إرسال الطلب والمعلومات
            المطلوبة إلى البريد الإلكتروني الرسمي الخاص بالبرنامج؟
          </p>
          <p className="faq-text">
            لا يمكن ذلك، يجب تعبئة نموذج تقديم الطلب وإرفاق جميع المعلومات
            والوثائق المطلوبة وإرسال الطلب عبر الصفحة الإلكترونية الخاصة
            بالبرنامج
          </p>

          <p className="faq-header">
            لقد نسيتُ كلمة السر، كيف يمكنني إعادة تعيينها؟
          </p>
          <p className="faq-text">
            يمكن إعادة تعيين كلمة المرور من خلال الضغط على "تسجيل دخول" في أعلى
            الصفحة الرئيسية للموقع، ومن ثمّ الضغط على "Forgot Password" واتباع
            التعليمات
          </p>

          <p className="faq-header">
            هل يعد اختبار تحديد مستوى اللغة الإنجليزية قبولاً نهائيًا في
            البرنامج؟
          </p>
          <p className="faq-text">
            لا يعتبر اختبار تحديد اللغة قبولاً نهائيًا في البرنامج، بل يعد أحد
            مراحل الترشيح والتقييم
          </p>

          <p className="faq-header">
            هل يمكنني تعديل بيانات التسجيل الخاصة بي بعد الانتهاء من التقديم؟
          </p>
          <p className="faq-text">
            نعم، يمكن تعديل البيانات من خلال التواصل مع فريق عمل البرنامج عن
            طريق البريد الإلكتروني الرسمي للبرنامج scholarship@soudah.sa
          </p>
        </section>

        <section id="modal" className="modal">
          <div id="modal-content" className="modal-content">
            <span className="close">&times;</span>

            <h2 className="faq-title" id="modal--title">
              تسجيل الاشتراك
            </h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <p className="modal--subtitle" id="modal--subtitle">
                هل أنت عضو بالفعل؟
              </p>
              <p className="modal--subtitle-cta" id="modal--cta">
                تسجيل الدخول.
              </p>
            </div>
            <form className="modal--form">
              <div className="modal--form-input-container">
                <label htmlFor="modal--email" className="modal--form-label">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="modal--email"
                  className="modal--input"
                  required
                  placeholder="أدخل البريد الإلكتروني هنا"
                />
              </div>
              <div className="modal--form-input-container">
                <label htmlFor="modal--password" className="modal--form-label">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="modal--password"
                  className="modal--input"
                  required
                  placeholder="أدخل كلمة المرور هنا"
                />
              </div>

              <input
                type="submit"
                value="تسجيل الاشتراك"
                className="modal--form-submit"
                id="modal--submit"
              />
            </form>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-info-container">
          <h2 className="footer--more-info text-sm md:text-xl">
            لمزيد من الأسئلة والاستفسارات يسعدنا تواصلكم على البريد الإلكتروني
            التالي
          </h2>
          <a
            href="mailto:scholarship@soudah.sa"
            className="footer--link text-sm md:text-xl"
          >
            scholarship@soudah.sa
          </a>
        </div>
        <div className="footer--image-container">
          <img src={V2030Logo} className="footer--image" alt="" />
          <img src={PIFLogo} className="footer--image" alt="" />
        </div>
      </footer>
    </div>
  )
}

export default ProgramPage
