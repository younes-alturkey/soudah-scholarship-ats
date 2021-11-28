import { FC, useEffect } from 'react'
import {
  BsBriefcaseFill,
  BsCardChecklist,
  BsCardList,
  BsFillStarFill,
  BsPersonBoundingBox,
  BsStack,
  BsTabletFill,
} from 'react-icons/bs'
import { useAppSelector } from '../../../app/hooks'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'
const InfoConfirmation: FC = () => {
  const { currentLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  const { personal, contact, education } = useAppSelector(
    (state) => state.application.formData
  )

  useEffect(() => {
    document.title = currentLevel
    window.scroll(0, 0)
  })

  return (
    <div className="w-1200 px-16 py-16 rounded-40 overflow-hidden flex flex-col justify-center items-center gap-4 bg-glass text-rock animate-grow-light rtl">
      <h2 className="text-5xl text-rock font-black mb-16">{currentLevel}</h2>
      <div className="flex justify-center self-center items-center gap-6 bg-strip text-sky rounded w-full px-2 pt-2 pb-3">
        <p className="text-2xl leading-relaxed text-sky bg-rock p-2 pb-3 rounded font-bold flex justify-center items-center gap-6">
          <BsPersonBoundingBox className="text-3xl text-sky" />
          البيانات الشخصية
        </p>
      </div>
      <ul className="list-none text-xl w-11/12 px-2 space-y-5 mb-6 mt-3 rtl">
        <li>
          ● الأسم الكامل:{' '}
          {personal.firstName +
            ' ' +
            personal.fatherName +
            ' ' +
            personal.grandFatherName +
            ' ' +
            personal.familyName}
        </li>
        <li>● الأسم بالإنجليزية: {personal.englishFullName}</li>
        <li>● رقم الهوية الوطنية: {personal.nationalId}</li>
        <li>● تم رفع صورة الهوية الوطنية: نعم</li>
        <li>● الجنسية: {personal.nationality}</li>
        <li>● الجنس: {personal.gender}</li>
        <li>● تاريخ الميلاد بالميلادي: {personal.dob}</li>
        <li>● العمر: {personal.age}</li>
        <li>● الحالة الإجتماعية: {personal.martialStatus}</li>
        <li>● تم أخذ جرعتين كورونا: {'نعم'}</li>
        <li>● تم رفع صورة شخصية: لا</li>
        <li>● تم رفع جواز السفر: لا</li>
      </ul>

      <div className="flex justify-center self-center items-center gap-6 bg-strip text-sky rounded w-full px-2 pt-2 pb-3">
        <p className="text-2xl leading-relaxed text-sky bg-rock p-2 pb-3 rounded font-bold flex justify-center items-center gap-6">
          <BsTabletFill className="text-3xl text-sky" />
          بيانات الاتصال
        </p>
      </div>
      <ul className="list-none text-xl w-11/12 px-2 space-y-5 mb-6 mt-3 rtl">
        <li>● البريد الإلكتروني: {contact.email}</li>
        <li>● رقم الجوال: {contact.phoneNumber}</li>
        <li>● المحافظة: {contact.province}</li>
        <li>● المدينة: {contact.city}</li>
        <li>● الحي: {contact.area}</li>
        <li>● الشارع: {contact.street}</li>
        <li>● الرمز البريدي: {contact.postalCode}</li>
        <li>
          ● تم رفع إثبات العنوان الوطني: {contact.nationalIdAddressFilePath}
        </li>
        <li>● شخص الاتصال في حالة الطوارئ: {contact.emergencyContactName}</li>
        <li>● رقم جوال الطوارئ: {contact.emergencyContactPhoneNumber}</li>
        <li>● صلة القرابة: {contact.emergencyContactRelation}</li>
      </ul>

      <div className="flex justify-center self-center items-center gap-6 bg-strip text-sky rounded w-full px-2 pt-2 pb-3">
        <p className="text-2xl leading-relaxed text-sky bg-rock p-2 pb-3 rounded font-bold flex justify-center items-center gap-6">
          <BsStack className="text-3xl text-sky" />
          المؤهل العلمي
        </p>
      </div>
      <ul className="list-none text-xl w-11/12 px-2 space-y-5 mb-6 mt-3 rtl">
        <li>● المستوى التعليمي: {education.level}</li>
        <li>
          ● اسم الجهة التعليمية لآخر مستوى تعليمي:{' '}
          {education.lastInstitutionName}
        </li>
        <li>● دولة الدراسة: {education.countryOfLastStudy}</li>
        <li>● نوع المعدل: {education.gpaType}</li>
        <li>● المعدل: {education.gpa}</li>
        <li>● سنة التخرج: {education.graduationYear}</li>
        <li>● تم إرفاق وثيقة التخرج: نعم</li>
        <li>● مبتعث سابقاً: لا</li>
        <li>● أختبار القدرات: {education.gatScore}</li>
        <li>● أختبار التحصيلي: {education.aatScore}</li>
        <li>● مستوى اللغة الإنجليزية: {education.englishProficiency}</li>
        <li>● يوجد اختبار سابق: {'نعم'}</li>
        <li>● أسم الأختبار السابق: {education.officalEnglishTestName}</li>
        <li>● نتيجة الأختبار: {education.officalEnglishTestScore}</li>
        <li>● تم إرفاق نتيجة الإختبار:</li>
      </ul>

      <div className="flex justify-center self-center items-center gap-6 bg-strip text-sky rounded w-full px-2 pt-2 pb-3">
        <p className="text-2xl leading-relaxed text-sky bg-rock p-2 pb-3 rounded font-bold flex justify-center items-center gap-6">
          <BsBriefcaseFill className="text-3xl text-sky" />
          الخبرات العملية
        </p>
      </div>
      <ul className="list-none text-xl w-11/12 px-2 space-y-5 mb-6 mt-3 rtl">
        <li>● موظف حالي؟: {'لا'}</li>
      </ul>

      <div className="flex justify-center self-center items-center gap-6 bg-strip text-sky rounded w-full px-2 pt-2 pb-3">
        <p className="text-2xl leading-relaxed text-sky bg-rock p-2 pb-3 rounded font-bold flex justify-center items-center gap-6">
          <BsCardChecklist className="text-3xl text-sky" />
          بيانات طلب الترشيح لبرنامج الابتعاث
        </p>
      </div>
      <ul className="list-none text-xl w-11/12 px-2 space-y-5 mb-6 mt-3 rtl">
        <li>● الدرجة العلمية المرغوبة للابتعاث : درجة البكالوريوس</li>
        <li>● تقديم طلب دراسة دبلوم :{'نعم'}</li>
        <li>● مجال الدراسة : إدارة ضيافة و سياحة </li>
      </ul>

      <div className="flex justify-center self-center items-center gap-6 bg-strip text-sky rounded w-full px-2 pt-2 pb-3">
        <p className="text-2xl leading-relaxed text-sky bg-rock p-2 pb-3 rounded font-bold flex justify-center items-center gap-6">
          <BsCardList className="text-3xl text-sky" />
          استبيان الابتعاث
        </p>
      </div>
      <ul className="list-none text-xl w-11/12 px-2 space-y-5 mb-6 mt-3 rtl">
        <li>● من السودة :{'نعم'}</li>
        <li>● يسكن في السودة :{'نعم'}</li>
        <li>● عدد سنوات الإقامة في السودة :{'28'}</li>
        <li>● شارك في أنشطة تطوعية :{'نعم'}</li>
        <li>● إمكانية السفر والدراسة :{'نعم'}</li>
        <li>● الرغبة في تطوير اللغة الإنجليزية :{'نعم'}</li>
        <li>● الجدية في الإلتزام بالحضور في الفترة التحضيرية :{'نعم'}</li>
        <li>● الجدية في الإلتزام بمواعيد الدوام :{'نعم'}</li>
        <li>● الخلفية في قطاع السياحة والضيافة وفنون الطهي :{'لا يوجد'}</li>
        <li>● قابلية للعمل في بيئة مختلطة :{'نعم'}</li>
        <li>● مسؤولية عائلية تعيق الدراسة :{'لا'}</li>
        <li>● شخص طموح :{'نعم'}</li>
        <li>● مرشح مناسب :{'نعم'}</li>
      </ul>

      <div className="flex justify-center self-center items-center gap-6 bg-strip text-sky rounded w-full px-2 pt-2 pb-3">
        <p className="text-2xl leading-relaxed text-sky bg-rock p-2 pb-3 rounded font-bold flex justify-center items-center gap-6">
          <BsFillStarFill className="text-3xl text-sky" />
          استبيان الحالة الصحية
        </p>
      </div>
      <ul className="list-none text-xl w-11/12 px-2 space-y-5 mb-6 mt-3 rtl">
        <li>
          ● هل تواجه صعوبة في الرؤية، حتى عند استخدامك النظرات؟ :
          {'نعم، لدي الكثير من الصعوبة '}
        </li>
        <li>
          ● هل تواجه صعوبة في السمع، حتى عند استخدامك جهاز للسمع؟ :
          {'نعم، لدي الكثير من الصعوبة '}
        </li>
        <li>● هل تواجه صعوبة في المشي أو صعود الدرج؟ :{'28'}</li>
        <li>
          ● هل تواجه صعوبة في الذاكرة أو القدرة على التركيز؟ :
          {'نعم، لدي الكثير من الصعوبة '}
        </li>
        <li>
          ● هل تواجه صعوبة في ممارسة حياتك اليومية بسبب الاكتئاب أو القلق
          المفرط؟ :{'نعم، لدي بعض الصعوبة'}
        </li>
        <li>
          ● هل تواجه صعوبة في الاعتناء بنفسك، مثلاً عند الإستحمام أو عند تغير
          ملابسك؟ :{'نعم، لدي بعض الصعوبة'}
        </li>
        <li>
          ● عند استخدامك للغتك المعتادة؛ هل تواجه صعوبة في التواصل، مثلاً: في
          فهم ما يقوله الأخرون، أو فهم الأخرين لك؟ :{'نعم، لدي بعض الصعوبة'}
        </li>
        <li>
          ● هل تستخدم لغة الاشارة؟ :{'نعم، لا استطيع القيام بذلك إطلاقاً'}
        </li>
        <li>
          ● الخلفية في قطاع السياحة والضيافة وفنون الطهي :{'ا، ليست لدي صعوبة'}
        </li>
        <li>
          ● قابلية للعمل في بيئة مختلطة :{'نعم، لا استطيع القيام بذلك إطلاقاً'}
        </li>
        <li>
          ● هل تستخدم أيا من الأجهزة المساندة الأتية :
          {'نعم، لدي الكثير من الصعوبة '}
        </li>
        <li>● هل لديك إعاقة؟ :{'نعم، لا استطيع القيام بذلك إطلاقاً'}</li>
        <li>● ما نوع الاعاقة؟ :{'إعاقة ذهنية'}</li>
      </ul>

      <ApplicationLevelsNavigationButton />
    </div>
  )
}

export default InfoConfirmation
