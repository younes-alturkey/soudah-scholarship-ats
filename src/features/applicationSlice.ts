import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export enum ApplicationLevels {
  START_APPLICATION = 'التقدم بطلب الترشيح',
  TERMS_AND_CONDITIONS = 'إقرار',
  NOMINATION_CRITERIA = 'آلية الترشيح والمفاضلة',
  GUIDLINES = 'تنبيهات وتعليمات',
  PERSONAL_INFO = 'البيانات الشخصية',
  CONTACT_INFO = 'بيانات الاتصال',
  EDUCATION_INFO = 'المؤهل العلمي',
  PROFESSIONAL_EXP_INFO = 'الخبرات العملية',
  SCHOLARSHIP_APPLICATION_INFO = 'بيانات طلب الترشيح لبرنامج الابتعاث',
  SCHOLARSHIP_SURVEY = 'استبيان الابتعاث',
  HEALTH_STATUS = 'استبيان الحالة الصحية',
  INFO_CONFIRMATION = 'التحقق النهائي من البيانات',
  SUBMIT_APPLICATION = 'تسليم طلب الترشيح',
}

type ApplicationProgress = {
  previousLevel: ApplicationLevels | null
  currentLevel: ApplicationLevels
  nextLevel: ApplicationLevels | null
}

export type UserPersonalInfo = {
  firstName: string
  fatherName: string
  grandFatherName: string
  familyName: string
  englishFullName: string
  nationalId: string
  nationalIdFilePath: string
  nationalIdFileUploaded: boolean
  nationality: string
  gender: string
  dob: string
  age: string
  martialStatus: string
  fullyVaccinated: string
  personalPhotoFilePath: string
  personalPhotoFileUploaded: boolean
  passportFilePath: string
  passportFileUploaded: boolean
}

export type UserContactInfo = {
  email: string
  phoneNumber: string
  province: string
  city: string
  area: string
  street: string
  postalCode: string
  nationalIdAddressFilePath: string
  nationalIdAddressFileUploaded: boolean
  emergencyContactName: string
  emergencyContactPhoneNumber: string
  emergencyContactRelation: string
}

export type UserEducationInfo = {
  level: string
  lastInstitutionName: string
  countryOfLastStudy: string
  gpaType: string
  gpa: string
  graduationYear: string
  educationCertFilePath: string
  educationCertFileUploaded: boolean
  highschoolName: string
  receivedScholarshipBefore: string
  educationLevelForLastScholarship: string
  gatScore: string
  aatScore: string
  englishProficiency: string
  tookOfficalEnglishTest: string
  officalEnglishTestName: string
  officalEnglishTestScore: string
  officalEnglishTestResultFilePath: string
  officalEnglishTestResultFileUploaded: boolean
  supportDocumentFilePath: string
  supportDocumentFileUploaded: boolean
}

export type UserProExpInfo = {
  currentlyEmployed: string
  employerName: string
  jobTitle: string
  yearsOfExp: string
  cvDocumentPath: string
  cvDocumentUploaded: boolean
  supportingDocumentPath: string
  supportingDocumentsUploaded: boolean
}

export type UserScholarshipApplicationInfo = {
  desiredEducationLevel: string
  allowDowngradeToDiploma: string
  desiredStudySpeciality: string
}

export type UserScholarshipSurveyInfo = {
  residentOfSoudah: string
  livingInSoudah: string
  yearsOfLivingInSoudah: string
  haveVolunteeredBefore: string
  volunteeringExp: string
  willingToStudyAbroadFrom2To5Yrs: string
  willingToStudyEnglishFor6Mos: string
  willingToCommitInPrepartoryPhase: string
  willingToBePunctual: string
  backgroundInTourismAndHospitality: string
  willingToWorkInTourismAndHospitality: string
  willingToWorkInMixedEnv: string
  hinderableBySoicalCommitments: string
  hinderingSoicalCommitments: string
  doYouConsiderYourselfAmbitiousAndWhy: string
  whyDoThinkYoureQualified: string
}

export type UserHealthStatusSurveyInfo = {
  issuesWithVisionEvenWithGlasses: string
  issuesWithHearingEvenWithADevice: string
  issuesWithWalkingAndClimbing: string
  issuesWithMemoryAndFocus: string
  issuesWithDepressionAndAnxiety: string
  issuesWithShoweringAndChanging: string
  issuesWithVerbvalCommunication: string
  doYouUseSignLanguage: string
  doYouUseProsthetics: string
  doYouHaveDisabilityOfAnyKind: string
  typeOfDisability: string
  doesDisabilityHinderYourStudyOrWork: string
  doYouHaveAnyChronicIllness: string
  typeOfChronicIllness: string
  doesChronicIllnessHinderYourStudyOrWork: string
}

interface ApplicationState {
  applicationProgress: ApplicationProgress
  applicationStarted: boolean
  applicationSubmitted: boolean
  resubmittion: boolean
  submittionPending: boolean
  submittionError: boolean
  submittionErrorMessage: string
  submittedApplication: ApplicantDto | null
  uploadPending: string
  pending: boolean
  createdAt: string
  formData: {
    personal: UserPersonalInfo
    contact: UserContactInfo
    education: UserEducationInfo
    proExp: UserProExpInfo
    applicationInfo: UserScholarshipApplicationInfo
    scholarshipSurvey: UserScholarshipSurveyInfo
    healthStatusSurvey: UserHealthStatusSurveyInfo
  }
}

const initialState = {
  applicationProgress: {
    previousLevel: null,
    currentLevel: ApplicationLevels.TERMS_AND_CONDITIONS,
    nextLevel: ApplicationLevels.PERSONAL_INFO,
  },
  applicationStarted: false,
  applicationSubmitted: false,
  resubmittion: false,
  submittionPending: false,
  submittionError: false,
  submittionErrorMessage: '',
  submittedApplication: null,
  uploadPending: '',
  pending: false,
  createdAt: '',
  formData: {
    personal: {
      firstName: '',
      fatherName: '',
      grandFatherName: '',
      familyName: '',
      englishFullName: '',
      nationalId: '',
      nationality: '',
      nationalIdFilePath: '',
      nationalIdFileUploaded: false,
      gender: '',
      dob: '',
      age: '',
      martialStatus: '',
      fullyVaccinated: '',
      personalPhotoFilePath: '',
      personalPhotoFileUploaded: false,
      passportFilePath: '',
      passportFileUploaded: false,
    },
    contact: {
      email: '',
      phoneNumber: '',
      province: '',
      city: '',
      area: '',
      street: '',
      postalCode: '',
      nationalIdAddressFilePath: '',
      nationalIdAddressFileUploaded: false,
      emergencyContactName: '',
      emergencyContactPhoneNumber: '',
      emergencyContactRelation: '',
    },
    education: {
      level: '',
      lastInstitutionName: '',
      countryOfLastStudy: '',
      gpaType: '',
      gpa: '',
      graduationYear: '',
      educationCertFilePath: '',
      educationCertFileUploaded: false,
      highschoolName: '',
      receivedScholarshipBefore: '',
      educationLevelForLastScholarship: '',
      gatScore: '',
      aatScore: '',
      englishProficiency: '',
      tookOfficalEnglishTest: '',
      officalEnglishTestName: '',
      officalEnglishTestScore: '',
      officalEnglishTestResultFilePath: '',
      officalEnglishTestResultFileUploaded: false,
      supportDocumentFilePath: '',
      supportDocumentFileUploaded: false,
    },
    proExp: {
      currentlyEmployed: '',
      employerName: '',
      jobTitle: '',
      yearsOfExp: '',
      cvDocumentPath: '',
      cvDocumentUploaded: false,
      supportingDocumentPath: '',
      supportingDocumentsUploaded: false,
    },
    applicationInfo: {
      desiredEducationLevel: '',
      allowDowngradeToDiploma: '',
      desiredStudySpeciality: '',
    },
    scholarshipSurvey: {
      residentOfSoudah: '',
      livingInSoudah: '',
      yearsOfLivingInSoudah: '',
      haveVolunteeredBefore: '',
      volunteeringExp: '',
      willingToStudyAbroadFrom2To5Yrs: '',
      willingToStudyEnglishFor6Mos: '',
      willingToCommitInPrepartoryPhase: '',
      willingToBePunctual: '',
      backgroundInTourismAndHospitality: '',
      willingToWorkInTourismAndHospitality: '',
      willingToWorkInMixedEnv: '',
      hinderableBySoicalCommitments: '',
      hinderingSoicalCommitments: '',
      doYouConsiderYourselfAmbitiousAndWhy: '',
      whyDoThinkYoureQualified: '',
    },
    healthStatusSurvey: {
      issuesWithVisionEvenWithGlasses: '',
      issuesWithHearingEvenWithADevice: '',
      issuesWithWalkingAndClimbing: '',
      issuesWithMemoryAndFocus: '',
      issuesWithDepressionAndAnxiety: '',
      issuesWithShoweringAndChanging: '',
      issuesWithVerbvalCommunication: '',
      doYouUseSignLanguage: '',
      doYouUseProsthetics: '',
      doYouHaveDisabilityOfAnyKind: '',
      typeOfDisability: '',
      doesDisabilityHinderYourStudyOrWork: '',
      doYouHaveAnyChronicIllness: '',
      typeOfChronicIllness: '',
      doesChronicIllnessHinderYourStudyOrWork: '',
    },
  },
} as ApplicationState

type ApplicantDto = {
  firstName: string
  fatherName: string
  grandfatherName: string
  lastName: string
  fullNameInEnglish: string
  nationalId: string
  nationalIdFilePath: string
  gender: string
  dob: string
  age: string
  nationality: string
  isSaudi: string
  maritalStatus: string
  vaccinationStatus: string
  personalImageFilePath: string
  passportImageFilePath: string
  email: string
  phoneNumber: string
  area: string
  city: string
  district: string
  street: string
  zipcode: string
  nationalAdressFilePath: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelation: string
  eduLevel: string
  schoolName: string
  highSchoolName: string
  schoolCountry: string
  gpaType: string
  gpa: string
  gpaScore: string
  graduationYear: string
  graduationCertFilePath: string
  hadPerviousScholarship: string
  perviousScholarshipDgree: string
  quduratTestResult: string
  tahseleTestResult: string
  englishProficiency: string
  hadPerviousEnglishTest: string
  hadPerviousEnglishTestName: string
  perviousEnglishTestResult: string
  perviousEnglishTestCertFilePath: string
  currentlyEmployed: string
  companyName: string
  jobPosition: string
  experienceYears: string
  cvFilePath: string
  supportingDocumentPath: string
  scholarshipDgreeChoice: string
  noBsGoforDiplom: string
  scholarshipMajor: string
  fromSoudah: string
  liveInSoudah: string
  yearsLivingInSoudah: string
  isVolunteerWork: string
  volunteerWork: string
  q1: string
  q2: string
  q3: string
  q4: string
  q5: string
  q6: string
  q7: string
  q8: string
  q9: string
  q10: string
  q11: string
  score: string
  qM1: string
  qM2: string
  qM3: string
  qM4: string
  qM5: string
  qM6: string
  qM7: string
  qM8: string
  qM9: string
  qM10: string
  qM11: string
  qM12: string
  qM13: string
  qM14: string
  qM15: string
  consent: string
  englishTestScore: string
  aplitudeTestScore: string
  stringerviewScore: string
}

export const createApplicant = createAsyncThunk(
  'user/createApplicant',
  async (application: ApplicantDto, thunkAPI) => {
    const jwt = JSON.parse(localStorage.getItem('token'))

    if (!jwt)
      return thunkAPI.rejectWithValue(
        'فشل تسليم الطلب الرجاء إعادة تسجيل الدخول'
      ) as any

    return await axios
      .post(
        '/api/Applicant/newApplicants',
        {
          ...application,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

export const hasApplicantSubmitted = createAsyncThunk(
  'user/hasApplicantSubmitted',
  async (email: string, thunkAPI) => {
    const jwt = JSON.parse(localStorage.getItem('token'))

    if (!jwt)
      return thunkAPI.rejectWithValue(
        'فشل تسليم الطلب الرجاء إعادة تسجيل الدخول'
      ) as any

    return await axios(`/api/Applicant/${email}/Submitted`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

export const getApplicantData = createAsyncThunk(
  'user/getApplicantData',
  async (email: string, thunkAPI) => {
    const jwt = JSON.parse(localStorage.getItem('token'))

    if (!jwt)
      return thunkAPI.rejectWithValue(
        'فشل تسليم الطلب الرجاء إعادة تسجيل الدخول'
      ) as any

    return await axios(`/api/Applicant/${email}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

export const updateApplicantData = createAsyncThunk(
  'user/updateApplicantData',
  async (applicant: ApplicantDto, thunkAPI) => {
    const jwt = JSON.parse(localStorage.getItem('token'))

    if (!jwt)
      return thunkAPI.rejectWithValue(
        'فشل تسليم الطلب الرجاء إعادة تسجيل الدخول'
      ) as any

    return await axios
      .put(
        `/api/Applicant/${applicant.email}`,
        { ...applicant },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setApplicationProgress: (state, action) => {
      state.applicationStarted = true
      const nextLevel = action.payload as ApplicationLevels
      switch (nextLevel) {
        case ApplicationLevels.TERMS_AND_CONDITIONS:
          state.applicationProgress.previousLevel = null
          state.applicationProgress.currentLevel = nextLevel
          state.applicationProgress.nextLevel = ApplicationLevels.PERSONAL_INFO
          break
        case ApplicationLevels.PERSONAL_INFO:
          state.applicationProgress.previousLevel =
            ApplicationLevels.TERMS_AND_CONDITIONS
          state.applicationProgress.currentLevel = nextLevel
          state.applicationProgress.nextLevel = ApplicationLevels.CONTACT_INFO
          break
        case ApplicationLevels.CONTACT_INFO:
          state.applicationProgress.previousLevel =
            ApplicationLevels.PERSONAL_INFO
          state.applicationProgress.currentLevel = nextLevel
          state.applicationProgress.nextLevel = ApplicationLevels.EDUCATION_INFO
          break
        case ApplicationLevels.EDUCATION_INFO:
          state.applicationProgress.previousLevel =
            ApplicationLevels.CONTACT_INFO
          state.applicationProgress.currentLevel = nextLevel
          state.applicationProgress.nextLevel =
            ApplicationLevels.PROFESSIONAL_EXP_INFO
          break
        case ApplicationLevels.PROFESSIONAL_EXP_INFO:
          state.applicationProgress.previousLevel =
            ApplicationLevels.EDUCATION_INFO
          state.applicationProgress.currentLevel = nextLevel
          state.applicationProgress.nextLevel =
            ApplicationLevels.SCHOLARSHIP_APPLICATION_INFO
          break
        case ApplicationLevels.SCHOLARSHIP_APPLICATION_INFO:
          state.applicationProgress.previousLevel =
            ApplicationLevels.PROFESSIONAL_EXP_INFO
          state.applicationProgress.currentLevel = nextLevel
          state.applicationProgress.nextLevel =
            ApplicationLevels.SCHOLARSHIP_SURVEY
          break
        case ApplicationLevels.SCHOLARSHIP_SURVEY:
          state.applicationProgress.previousLevel =
            ApplicationLevels.SCHOLARSHIP_APPLICATION_INFO
          state.applicationProgress.currentLevel = nextLevel
          state.applicationProgress.nextLevel = ApplicationLevels.HEALTH_STATUS
          break
        case ApplicationLevels.HEALTH_STATUS:
          state.applicationProgress.previousLevel =
            ApplicationLevels.SCHOLARSHIP_SURVEY
          state.applicationProgress.currentLevel = nextLevel
          state.applicationProgress.nextLevel =
            ApplicationLevels.SUBMIT_APPLICATION
          break
        case ApplicationLevels.SUBMIT_APPLICATION:
          state.applicationProgress.previousLevel =
            ApplicationLevels.HEALTH_STATUS
          state.applicationProgress.currentLevel = nextLevel
          state.applicationProgress.nextLevel = null
          break
        default:
          state.applicationProgress.previousLevel = null
          state.applicationProgress.currentLevel =
            ApplicationLevels.TERMS_AND_CONDITIONS
          state.applicationProgress.nextLevel = ApplicationLevels.PERSONAL_INFO
      }

      localStorage.setItem(
        'progress',
        JSON.stringify({
          ...state.applicationProgress,
        })
      )
    },
    getProgressFromStorage: (state) => {
      const progressFromStorage = JSON.parse(localStorage.getItem('progress')!)
      if (progressFromStorage) state.applicationProgress = progressFromStorage
    },
    setApplicationStarted: (state) => {
      state.applicationStarted = true
      state.applicationSubmitted = false
    },
    getApplicationStatusFromStorage: (state) => {
      const statusFromStorage = localStorage.getItem('submitted')
      if (JSON.parse(statusFromStorage!)) state.applicationSubmitted = true
    },
    setUserPersonalInfo: (state, action) => {
      state.formData.personal = {
        ...state.formData.personal,
        ...action.payload,
      }

      const formDataFromStorage = JSON.parse(localStorage.getItem('formData')!)

      if (formDataFromStorage) {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            ...formDataFromStorage,
            applicationStarted: true,
            personal: {
              ...state.formData.personal,
            },
          })
        )
      } else {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            personal: {
              ...state.formData.personal,
            },
          })
        )
      }
    },
    setUserContactInfo: (state, action) => {
      state.formData.contact = {
        ...state.formData.contact,
        ...action.payload,
      }

      const formDataFromStorage = JSON.parse(localStorage.getItem('formData')!)
      if (formDataFromStorage) {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            ...formDataFromStorage,
            contact: {
              ...state.formData.contact,
            },
          })
        )
      } else {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            contact: {
              ...state.formData.contact,
            },
          })
        )
      }
    },
    setUserEducationInfo: (state, action) => {
      state.formData.education = {
        ...state.formData.education,
        ...action.payload,
      }

      const formDataFromStorage = JSON.parse(localStorage.getItem('formData')!)

      if (formDataFromStorage) {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            ...formDataFromStorage,
            education: {
              ...state.formData.education,
            },
          })
        )
      } else {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            education: {
              ...state.formData.education,
            },
          })
        )
      }
    },
    setUploadedNationalDocument: (state, action) => {
      state.formData.personal.nationalIdFilePath = action.payload.path
      state.formData.personal.nationalIdFileUploaded = action.payload.status
    },
    setUploadedPhotoDocument: (state, action) => {
      state.formData.personal.personalPhotoFilePath = action.payload.path
      state.formData.personal.personalPhotoFileUploaded = action.payload.status
    },
    setUploadedPassportDocument: (state, action) => {
      state.formData.personal.passportFilePath = action.payload.path
      state.formData.personal.passportFileUploaded = action.payload.status
    },
    setNationalAddressDocument: (state, action) => {
      state.formData.contact.nationalIdAddressFilePath = action.payload.path
      state.formData.contact.nationalIdAddressFileUploaded =
        action.payload.status
    },
    setUploadedCvDocument: (state, action) => {
      state.formData.proExp.cvDocumentPath = action.payload.path
      state.formData.proExp.cvDocumentUploaded = action.payload.status
    },
    setUploadedSupportDocument: (state, action) => {
      state.formData.proExp.supportingDocumentPath = action.payload.path
      state.formData.proExp.supportingDocumentsUploaded = action.payload.status
    },
    setUploadedOfficalEnglishTest: (state, action) => {
      state.formData.education.officalEnglishTestResultFilePath =
        action.payload.path
      state.formData.education.officalEnglishTestResultFileUploaded =
        action.payload.status
    },
    setUploadedEducationSupportDocx: (state, action) => {
      state.formData.education.supportDocumentFilePath = action.payload.path
      state.formData.education.supportDocumentFileUploaded =
        action.payload.status
    },
    setUploadedEducationCert: (state, action) => {
      state.formData.education.educationCertFilePath = action.payload.path
      state.formData.education.educationCertFileUploaded = action.payload.status
    },
    setUserProExpInfo: (state, action) => {
      state.formData.proExp = {
        ...state.formData.proExp,
        ...action.payload,
      }

      const formDataFromStorage = JSON.parse(localStorage.getItem('formData')!)

      if (formDataFromStorage) {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            ...formDataFromStorage,
            proExp: {
              ...state.formData.proExp,
            },
          })
        )
      } else {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            proExp: {
              ...state.formData.proExp,
            },
          })
        )
      }
    },
    setUserApplicationInfo: (state, action) => {
      state.formData.applicationInfo = {
        ...state.formData.applicationInfo,
        ...action.payload,
      }

      const formDataFromStorage = JSON.parse(localStorage.getItem('formData')!)

      if (formDataFromStorage) {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            ...formDataFromStorage,
            applicationInfo: {
              ...state.formData.applicationInfo,
            },
          })
        )
      } else {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            applicationInfo: {
              ...state.formData.applicationInfo,
            },
          })
        )
      }
    },
    setScholarShipSurvey: (state, action) => {
      state.formData.scholarshipSurvey = {
        ...state.formData.scholarshipSurvey,
        ...action.payload,
      }

      const formDataFromStorage = JSON.parse(localStorage.getItem('formData')!)

      if (formDataFromStorage) {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            ...formDataFromStorage,
            scholarshipSurvey: {
              ...state.formData.scholarshipSurvey,
            },
          })
        )
      } else {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            scholarshipSurvey: {
              ...state.formData.scholarshipSurvey,
            },
          })
        )
      }
    },
    setHealthStatusSurvey: (state, action) => {
      state.formData.healthStatusSurvey = {
        ...state.formData.healthStatusSurvey,
        ...action.payload,
      }

      const formDataFromStorage = JSON.parse(localStorage.getItem('formData')!)

      if (formDataFromStorage) {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            ...formDataFromStorage,
            healthStatusSurvey: {
              ...state.formData.healthStatusSurvey,
            },
          })
        )
      } else {
        localStorage.setItem(
          'formData',
          JSON.stringify({
            healthStatusSurvey: {
              ...state.formData.healthStatusSurvey,
            },
          })
        )
      }
    },
    setSubmissionError: (state, action) => {
      state.submittionError = action.payload.status
      state.submittionErrorMessage = action.payload.msg
    },
    setEmailandPassword: (state, action) => {
      state.formData.contact.email = action.payload.email
      state.formData.contact.phoneNumber = action.payload.phoneNumber
    },
    getFormDataFromStorage: (state) => {
      const formDataFromStorage = JSON.parse(localStorage.getItem('formData')!)
      if (formDataFromStorage) {
        state.formData = { ...state.formData, ...formDataFromStorage }
      }
    },
    getEmailAndPhoneNumberFromStorage: (state) => {
      const userFromStorage = JSON.parse(localStorage.getItem('user')!)
      if (userFromStorage) {
        state.formData.contact = {
          ...state.formData.contact,
          email: userFromStorage.email,
          phoneNumber: userFromStorage.phoneNumber,
        }
      }
    },
    setUploadPending: (state, action) => {
      state.uploadPending = action.payload
    },
    setSubmitted: (state) => {
      state.applicationSubmitted = true
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createApplicant.fulfilled, (state, action) => {
      state.submittionPending = false
      state.submittedApplication = action.payload
      state.applicationSubmitted = true
      localStorage.setItem('formData', JSON.stringify(null))
      localStorage.setItem('progress', JSON.stringify(null))
      localStorage.setItem('submitted', JSON.stringify(true))
    })
    builder.addCase(createApplicant.pending, (state) => {
      state.submittionPending = true
    })
    builder.addCase(createApplicant.rejected, (state, action) => {
      // state.submittionPending = false
      // state.submittionError = true
      // state.submittionErrorMessage = action.payload as string
      state.applicationSubmitted = true
      localStorage.setItem('submitted', JSON.stringify(true))
    })

    builder.addCase(hasApplicantSubmitted.fulfilled, (state, action) => {
      state.pending = false
      state.applicationSubmitted =
        action.payload.submitted === '1' ? true : false
      state.createdAt = action.payload && action.payload.createdAt
      localStorage.setItem(
        'submitted',
        JSON.stringify(state.applicationSubmitted)
      )
    })
    builder.addCase(hasApplicantSubmitted.pending, (state) => {
      state.pending = true
    })
    builder.addCase(hasApplicantSubmitted.rejected, (state, action) => {
      state.pending = false
      state.submittionError = true
      state.submittionErrorMessage = action.payload as string
      state.applicationSubmitted = false
      localStorage.setItem('submitted', JSON.stringify(false))
    })

    builder.addCase(getApplicantData.fulfilled, (state, action) => {
      state.pending = false
      const {
        firstName,
        fatherName,
        grandfatherName,
        lastName,
        fullNameInEnglish,
        nationalId,
        nationalIdFilePath,
        nationality,
        gender,
        dob,
        age,
        maritalStatus,
        vaccinationStatus,
        personalImageFilePath,
        passportImageFilePath,
        email,
        phoneNumber,
        area,
        city,
        district,
        street,
        zipcode,
        nationalAdressFilePath,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelation,
        eduLevel,
        schoolName,
        highSchoolName,
        schoolCountry,
        gpaType,
        gpa,
        graduationYear,
        graduationCertFilePath,
        hadPerviousScholarship,
        perviousScholarshipDgree,
        quduratTestResult,
        tahseleTestResult,
        hadPerviousEnglishTest,
        hadPerviousEnglishTestName,
        perviousEnglishTestResult,
        perviousEnglishTestCertFilePath,
        currentlyEmployed,
        companyName,
        jobPosition,
        experienceYears,
        cvFilePath,
        supportingDocumentPath,
        scholarshipDgreeChoice,
        noBsGoforDiplom,
        scholarshipMajor,
        fromSoudah,
        liveInSoudah,
        yearsLivingInSoudah,
        isVolunteerWork,
        volunteerWork,
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        q9,
        q10,
        q11,
        qM1,
        qM2,
        qM3,
        qM4,
        qM5,
        qM6,
        qM7,
        qM8,
        qM9,
        qM10,
        qM11,
        qM12,
        qM13,
        qM14,
        qM15,
        englishProficiency,
        updatedAt,
      } = action.payload
      state.formData = {
        personal: {
          firstName: firstName,
          fatherName: fatherName,
          grandFatherName: grandfatherName,
          familyName: lastName,
          englishFullName: fullNameInEnglish,
          nationalId: nationalId,
          nationality: nationality,
          nationalIdFilePath: nationalIdFilePath,
          nationalIdFileUploaded: nationalIdFilePath ? true : false,
          gender: gender,
          dob: dob,
          age: age,
          martialStatus: maritalStatus,
          fullyVaccinated: vaccinationStatus,
          personalPhotoFilePath: personalImageFilePath,
          personalPhotoFileUploaded: personalImageFilePath ? true : false,
          passportFilePath: passportImageFilePath,
          passportFileUploaded: passportImageFilePath ? true : false,
        },
        contact: {
          email: email,
          phoneNumber: phoneNumber,
          province: area,
          city: city,
          area: district,
          street: street,
          postalCode: zipcode,
          nationalIdAddressFilePath: nationalAdressFilePath,
          nationalIdAddressFileUploaded: nationalAdressFilePath ? true : false,
          emergencyContactName: emergencyContactName,
          emergencyContactPhoneNumber: emergencyContactPhone,
          emergencyContactRelation: emergencyContactRelation,
        },
        education: {
          level: eduLevel,
          lastInstitutionName: schoolName,
          countryOfLastStudy: schoolCountry,
          gpaType: gpaType,
          gpa: gpa,
          graduationYear: graduationYear,
          educationCertFilePath: graduationCertFilePath
            ? graduationCertFilePath
            : `${nationalId}_EDUCATION_CERT`,
          educationCertFileUploaded: true,
          highschoolName: highSchoolName ? highSchoolName : '',
          receivedScholarshipBefore: hadPerviousScholarship,
          educationLevelForLastScholarship: perviousScholarshipDgree,
          gatScore: quduratTestResult,
          aatScore: tahseleTestResult,
          englishProficiency: englishProficiency ? englishProficiency : '',
          tookOfficalEnglishTest: hadPerviousEnglishTest,
          officalEnglishTestName: hadPerviousEnglishTestName,
          officalEnglishTestScore: perviousEnglishTestResult,
          officalEnglishTestResultFilePath: perviousEnglishTestCertFilePath,
          officalEnglishTestResultFileUploaded: perviousEnglishTestCertFilePath
            ? true
            : false,
          supportDocumentFilePath: '',
          supportDocumentFileUploaded: false,
        },
        proExp: {
          currentlyEmployed: currentlyEmployed,
          employerName: companyName,
          jobTitle: jobPosition,
          yearsOfExp: experienceYears,
          cvDocumentPath: cvFilePath,
          cvDocumentUploaded: cvFilePath ? true : false,
          supportingDocumentPath: supportingDocumentPath,
          supportingDocumentsUploaded: supportingDocumentPath ? true : false,
        },
        applicationInfo: {
          desiredEducationLevel: scholarshipDgreeChoice,
          allowDowngradeToDiploma: noBsGoforDiplom,
          desiredStudySpeciality: scholarshipMajor,
        },
        scholarshipSurvey: {
          residentOfSoudah: fromSoudah,
          livingInSoudah: liveInSoudah,
          yearsOfLivingInSoudah: yearsLivingInSoudah,
          haveVolunteeredBefore: isVolunteerWork,
          volunteeringExp: volunteerWork,
          willingToStudyAbroadFrom2To5Yrs: q1,
          willingToStudyEnglishFor6Mos: q2,
          willingToCommitInPrepartoryPhase: q3,
          willingToBePunctual: q4,
          backgroundInTourismAndHospitality: q5,
          willingToWorkInTourismAndHospitality: q6,
          willingToWorkInMixedEnv: q7,
          hinderableBySoicalCommitments: q8,
          hinderingSoicalCommitments: q9,
          doYouConsiderYourselfAmbitiousAndWhy: q10,
          whyDoThinkYoureQualified: q11,
        },
        healthStatusSurvey: {
          issuesWithVisionEvenWithGlasses: qM1,
          issuesWithHearingEvenWithADevice: qM2,
          issuesWithWalkingAndClimbing: qM3,
          issuesWithMemoryAndFocus: qM4,
          issuesWithDepressionAndAnxiety: qM5,
          issuesWithShoweringAndChanging: qM6,
          issuesWithVerbvalCommunication: qM7,
          doYouUseSignLanguage: qM8,
          doYouUseProsthetics: qM9,
          doYouHaveDisabilityOfAnyKind: qM10,
          typeOfDisability: qM11,
          doesDisabilityHinderYourStudyOrWork: qM12,
          doYouHaveAnyChronicIllness: qM13,
          typeOfChronicIllness: qM14,
          doesChronicIllnessHinderYourStudyOrWork: qM15,
        },
      }
      state.applicationProgress.previousLevel =
        ApplicationLevels.TERMS_AND_CONDITIONS
      state.applicationProgress.currentLevel = ApplicationLevels.PERSONAL_INFO
      state.applicationProgress.nextLevel = ApplicationLevels.CONTACT_INFO
      state.applicationStarted = true
      state.resubmittion = true
      state.createdAt = updatedAt
    })
    builder.addCase(getApplicantData.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getApplicantData.rejected, (state, action) => {
      state.pending = false
      state.submittionError = true
      state.submittionErrorMessage = action.payload as string
    })

    builder.addCase(updateApplicantData.fulfilled, (state, action) => {
      state.pending = false
      state.applicationSubmitted = true
      state.resubmittion = false
      localStorage.setItem('formData', JSON.stringify(null))
      localStorage.setItem('progress', JSON.stringify(null))
      localStorage.setItem(
        'submitted',
        JSON.stringify(state.applicationSubmitted)
      )
    })
    builder.addCase(updateApplicantData.pending, (state) => {
      state.pending = true
    })
    builder.addCase(updateApplicantData.rejected, (state, action) => {
      state.pending = false
      state.submittionError = true
      state.submittionErrorMessage = action.payload as string
      state.applicationSubmitted = false
    })
  },
})

export const {
  setApplicationProgress,
  setApplicationStarted,
  setUserPersonalInfo,
  setUserContactInfo,
  setUserEducationInfo,
  setUserProExpInfo,
  setSubmissionError,
  setUserApplicationInfo,
  setScholarShipSurvey,
  setHealthStatusSurvey,
  getApplicationStatusFromStorage,
  getFormDataFromStorage,
  getProgressFromStorage,
  setUploadedNationalDocument,
  setUploadedPhotoDocument,
  setUploadedPassportDocument,
  setNationalAddressDocument,
  setEmailandPassword,
  setUploadedCvDocument,
  setUploadedSupportDocument,
  setUploadedOfficalEnglishTest,
  setUploadedEducationSupportDocx,
  getEmailAndPhoneNumberFromStorage,
  setUploadedEducationCert,
  setUploadPending,
  setSubmitted,
} = applicationSlice.actions
export default applicationSlice.reducer
