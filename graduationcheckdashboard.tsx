import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Monitor, 
  Languages,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

// --- Mock Data (อ้างอิงจาก JSON ที่ออกแบบไว้) ---
const mockData = {
  student: {
    student_id: "6714421020",
    name: "สรศักดิ์ สมโฉม"
  },
  graduation_check_summary: {
    credits: {
      minimum_required: 124,
      registered: 99,
      passed: 90,
      pending: 19,
      status: "FAIL"
    },
    study_duration: {
      max_years: 16,
      current_years: 4,
      year_level: 3,
      status: "PASS"
    },
    gpa_summary: {
      gpax_minimum: 2.00,
      gpax_current: 2.81,
      major_gpa: 0.00,
      status: "PASS"
    },
    skill_exams: {
      computer_skills: "FAIL",
      language_skills: "FAIL",
      overall_status: "FAIL"
    }
  },
  curriculum_structure: [
    {
      category_id: "1",
      category_name: "หมวดวิชาศึกษาทั่วไป",
      total_credits_required: 30,
      sub_categories: [
        {
          sub_category_name: "1.1 กลุ่มวิชาภาษาและการสื่อสาร",
          credits_required: 9,
          items: [
            { name: "1.1.1 กลุ่มวิชาภาษาอังกฤษ", credits: 6, CA: 6, CS: 6, CW: null, CG: 6, PT: 21.0, GPA: 3.50, status: "PASS" },
            { name: "1.1.2 กลุ่มวิชาภาษาไทยและภาษาอื่น", credits: 3, CA: 3, CS: 3, CW: null, CG: 3, PT: 4.5, GPA: 1.50, status: "PASS" }
          ]
        },
        {
          sub_category_name: "1.2 กลุ่มวิชามนุษยศาสตร์และสังคมศาสตร์",
          credits_required: 12,
          items: [
            { name: "1.2.1 กลุ่มวิชามนุษยศาสตร์", credits: 3, CA: 3, CS: 3, CW: null, CG: 3, PT: 12.0, GPA: 4.00, status: "PASS" },
            { name: "1.2.2 กลุ่มวิชามนุษยศาสตร์", credits: 3, CA: 3, CS: 3, CW: null, CG: 3, PT: 3.0, GPA: 1.00, status: "PASS" },
            { name: "1.2.3 กลุ่มวิชาสังคมศาสตร์", credits: 3, CA: 3, CS: 3, CW: null, CG: 3, PT: 9.0, GPA: 3.00, status: "PASS" },
            { name: "1.2.4 กลุ่มวิชาสังคมศาสตร์", credits: 3, CA: 3, CS: 3, CW: null, CG: 3, PT: 7.5, GPA: 2.50, status: "PASS" }
          ]
        },
        {
          sub_category_name: "1.3 กลุ่มวิชาวิทยาศาสตร์ คณิตศาสตร์ เทคโนโลยีและการกีฬา",
          credits_required: 9,
          items: [
            { name: "1.3.1 กลุ่มวิชาวิทยาศาสตร์", credits: 3, CA: 3, CS: 3, CW: null, CG: 3, PT: 9.0, GPA: 3.00, status: "PASS" },
            { name: "1.3.2 กลุ่มวิชาคณิตศาสตร์", credits: 3, CA: 3, CS: 3, CW: null, CG: 3, PT: 6.0, GPA: 2.00, status: "PASS" },
            { name: "1.3.3 กลุ่มวิชาเทคโนโลยีและการกีฬา", credits: 3, CA: 3, CS: 3, CW: null, CG: 3, PT: 7.5, GPA: 2.50, status: "PASS" }
          ]
        }
      ]
    },
    {
      category_id: "2",
      category_name: "หมวดวิชาเฉพาะ",
      total_credits_required: 88,
      sub_categories: [
        {
          sub_category_name: "2.1 กลุ่มวิชาแกน",
          credits_required: 9,
          items: [
            { name: "2.1 กลุ่มวิชาแกน", credits: 9, CA: 9, CS: 9, CW: null, CG: 9, PT: 28.5, GPA: 3.16, status: "PASS" }
          ]
        },
        {
          sub_category_name: "2.2 วิชาเฉพาะด้าน",
          credits_required: 53,
          items: [
            { name: "2.2.1 กลุ่มประเด็นด้านองค์การและระบบสารสนเทศ", credits: 9, CA: 6, CS: 6, CW: 3, CG: 6, PT: 22.5, GPA: 3.75, status: "FAIL" },
            { name: "2.2.2 กลุ่มเทคโนโลยีเพื่องานประยุกต์", credits: 23, CA: 12, CS: 12, CW: 11, CG: 12, PT: 27.0, GPA: 2.25, status: "FAIL" },
            { name: "2.2.3 กลุ่มเทคโนโลยีและวิธีการทางซอฟต์แวร์", credits: 12, CA: 12, CS: 12, CW: null, CG: 12, PT: 39.0, GPA: 3.25, status: "PASS" },
            { name: "2.2.4 กลุ่มโครงสร้างพื้นฐานของระบบ", credits: 9, CA: 6, CS: 6, CW: 3, CG: 6, PT: 15.0, GPA: 2.50, status: "FAIL" }
          ]
        },
        {
          sub_category_name: "2.3 วิชาเลือก",
          credits_required: 18,
          items: [
            { name: "2.3 วิชาเลือก", credits: 18, CA: 15, CS: 15, CW: 3, CG: 15, PT: 42.0, GPA: 2.80, status: "FAIL" }
          ]
        },
        {
          sub_category_name: "2.4 วิชาประสบการณ์ภาคสนามและสหกิจศึกษา",
          credits_required: 8,
          items: [
            { name: "2.4 วิชาประสบการณ์ภาคสนามและสหกิจศึกษา", credits: 8, CA: null, CS: null, CW: 8, CG: null, PT: null, GPA: null, status: "FAIL" }
          ]
        }
      ]
    },
    {
      category_id: "3",
      category_name: "หมวดวิชาเลือกเสรี",
      total_credits_required: 6,
      sub_categories: [
        {
          sub_category_name: "3 หมวดวิชาเลือกเสรี",
          credits_required: 6,
          items: [
            { name: "3 หมวดวิชาเลือกเสรี", credits: 6, CA: null, CS: null, CW: 6, CG: null, PT: null, GPA: null, status: "FAIL" }
          ]
        }
      ]
    }
  ]
};

// --- Components ---

const StatusIcon = ({ status, size = 20 }) => {
  return status === 'PASS' ? (
    <CheckCircle2 size={size} className="text-green-500" />
  ) : (
    <XCircle size={size} className="text-red-500" />
  );
};

const ValueOrDash = ({ value }) => {
  return value !== null && value !== undefined ? value : <span className="text-gray-300">-</span>;
};

export default function GraduationCheckDashboard() {
  const [expandedCategories, setExpandedCategories] = useState(["1", "2", "3"]);
  
  const summary = mockData.graduation_check_summary;
  const creditsPercent = Math.min((summary.credits.passed / summary.credits.minimum_required) * 100, 100).toFixed(1);

  const toggleCategory = (id) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <GraduationCap className="text-blue-700 h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">ระบบตรวจสอบจบการศึกษา</h1>
            <h1 className="text-xl font-bold text-slate-800 sm:hidden">ตรวจสอบจบ</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">{mockData.student.name}</p>
              <p className="text-xs text-slate-500">รหัสนักศึกษา: {mockData.student.student_id}</p>
            </div>
            <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center">
              <User className="text-slate-500 h-6 w-6" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Warning Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start space-x-3 shadow-sm">
          <AlertCircle className="text-yellow-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold">โปรดทราบ</p>
            <p className="mt-1">โปรแกรมตรวจสอบจบการศึกษายังไม่สามารถตรวจสอบความถูกต้องได้สมบูรณ์ และการจัดหมวดหมู่ยังไม่สมบูรณ์ ให้นักศึกษายึดตามเล่มหลักสูตรที่ได้รับจากคณะวิชาเป็นหลัก</p>
          </div>
        </div>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Credits Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0"></div>
            <div className="flex items-center space-x-2 z-10 mb-4">
              <BookOpen className="text-blue-600 h-5 w-5" />
              <h2 className="text-lg font-semibold text-slate-700">หน่วยกิตสะสม</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 z-10 mb-4">
              <div>
                <p className="text-xs text-slate-500">ขั้นต่ำ</p>
                <p className="text-xl font-bold text-slate-800">{summary.credits.minimum_required}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">ลงทะเบียน</p>
                <p className="text-xl font-bold text-slate-800">{summary.credits.registered}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">ผ่านแล้ว</p>
                <p className="text-xl font-bold text-green-600">{summary.credits.passed}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">รอผล (CW)</p>
                <p className="text-xl font-bold text-yellow-600">{summary.credits.pending}</p>
              </div>
            </div>
            <div className="mt-auto z-10">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-600">ความคืบหน้า</span>
                <span className="font-bold text-blue-600">{creditsPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${creditsPercent}%` }}></div>
              </div>
            </div>
          </div>

          {/* GPAX Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-0"></div>
            <div className="flex items-center justify-between z-10 mb-4">
              <div className="flex items-center space-x-2">
                <ActivityIcon className="text-indigo-600 h-5 w-5" />
                <h2 className="text-lg font-semibold text-slate-700">ผลการเรียน (GPAX)</h2>
              </div>
              <StatusIcon status={summary.gpa_summary.status} />
            </div>
            
            <div className="flex-grow flex flex-col justify-center items-center z-10 mb-4">
              <p className="text-sm text-slate-500 mb-1">เกรดเฉลี่ยสะสมปัจจุบัน</p>
              <p className="text-5xl font-black text-indigo-700 tracking-tight">{summary.gpa_summary.gpax_current.toFixed(2)}</p>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm z-10 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">GPAX ขั้นต่ำ:</span>
                <span className="font-semibold">{summary.gpa_summary.gpax_minimum.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">GPA เอก:</span>
                <span className="font-semibold">{summary.gpa_summary.major_gpa.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -z-0"></div>
            <div className="flex items-center space-x-2 z-10 mb-4">
              <GraduationCap className="text-red-600 h-5 w-5" />
              <h2 className="text-lg font-semibold text-slate-700">ผลการสอบทักษะ</h2>
            </div>
            
            <div className="space-y-4 z-10 flex-grow">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-md shadow-sm">
                    <Monitor className="text-slate-600 h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">ทักษะคอมพิวเตอร์</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold ${summary.skill_exams.computer_skills === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
                    {summary.skill_exams.computer_skills}
                  </span>
                  <StatusIcon status={summary.skill_exams.computer_skills} size={16} />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-md shadow-sm">
                    <Languages className="text-slate-600 h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">ทักษะด้านภาษา</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold ${summary.skill_exams.language_skills === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
                    {summary.skill_exams.language_skills}
                  </span>
                  <StatusIcon status={summary.skill_exams.language_skills} size={16} />
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center z-10">
              <span className="text-sm font-medium text-slate-600">สถานะโดยรวม</span>
              <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded-full">
                 <XCircle size={14} />
                 <span className="text-xs font-bold">ไม่ผ่านเงื่อนไข</span>
              </div>
            </div>
          </div>
          
        </section>

        {/* Curriculum Structure Section */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-4 sm:px-6">
            <h2 className="text-lg font-semibold text-white">โครงสร้างหลักสูตร (แสดงรายวิชาที่ลงทะเบียน)</h2>
          </div>
          
          <div className="p-0">
            {mockData.curriculum_structure.map((category) => {
              const isExpanded = expandedCategories.includes(category.category_id);
              
              return (
                <div key={category.category_id} className="border-b border-slate-200 last:border-b-0">
                  {/* Category Header (Accordion Toggle) */}
                  <button 
                    onClick={() => toggleCategory(category.category_id)}
                    className="w-full flex items-center justify-between p-4 sm:px-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-slate-800">{category.category_id}. {category.category_name}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {category.total_credits_required} หน่วยกิต
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
                  </button>
                  
                  {/* Category Content */}
                  {isExpanded && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-600 min-w-[800px]">
                        <thead className="text-xs text-slate-500 bg-white border-y border-slate-200 uppercase">
                          <tr>
                            <th className="px-6 py-3 font-medium">โครงสร้างหลักสูตร</th>
                            <th className="px-3 py-3 text-center font-medium w-16">นก.</th>
                            <th className="px-3 py-3 text-center font-medium w-12">CA</th>
                            <th className="px-3 py-3 text-center font-medium w-12">CS</th>
                            <th className="px-3 py-3 text-center font-medium w-12">CW</th>
                            <th className="px-3 py-3 text-center font-medium w-12">CG</th>
                            <th className="px-3 py-3 text-center font-medium w-16">PT</th>
                            <th className="px-3 py-3 text-center font-medium w-16">GPA</th>
                            <th className="px-6 py-3 text-center font-medium w-24">สถานะ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.sub_categories.map((sub, idx) => (
                            <React.Fragment key={idx}>
                              {/* Sub Category Row */}
                              <tr className="bg-slate-50/50">
                                <td className="px-6 py-2.5 font-medium text-slate-700" colSpan={9}>
                                  {sub.sub_category_name} 
                                  <span className="ml-2 text-xs font-normal text-slate-500">({sub.credits_required} นก.)</span>
                                </td>
                              </tr>
                              {/* Items Rows */}
                              {sub.items.map((item, iIdx) => (
                                <tr key={iIdx} className="bg-white border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                  <td className="px-6 py-3 pl-10 text-slate-600">{item.name}</td>
                                  <td className="px-3 py-3 text-center font-medium">{item.credits}</td>
                                  <td className="px-3 py-3 text-center"><ValueOrDash value={item.CA} /></td>
                                  <td className="px-3 py-3 text-center"><ValueOrDash value={item.CS} /></td>
                                  <td className="px-3 py-3 text-center font-medium text-orange-500"><ValueOrDash value={item.CW} /></td>
                                  <td className="px-3 py-3 text-center"><ValueOrDash value={item.CG} /></td>
                                  <td className="px-3 py-3 text-center"><ValueOrDash value={item.PT?.toFixed(2)} /></td>
                                  <td className="px-3 py-3 text-center"><ValueOrDash value={item.GPA?.toFixed(2)} /></td>
                                  <td className="px-6 py-3 text-center">
                                    <div className="flex justify-center">
                                      <StatusIcon status={item.status} />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Legend */}
        <section className="text-xs text-slate-500 pb-8 flex flex-wrap gap-4 justify-center bg-transparent">
          <div className="flex space-x-4 border border-slate-200 bg-white px-4 py-3 rounded-lg shadow-sm">
            <span><strong>CA:</strong> ลงทะเบียนสะสม</span>
            <span><strong>CS:</strong> สอบได้สะสม</span>
            <span><strong>CW:</strong> รอผลการสอบ</span>
            <span><strong>CG:</strong> แต้มระดับคะแนนสะสม</span>
            <span><strong>PT:</strong> ผลคูณแต้ม</span>
          </div>
        </section>

      </main>
    </div>
  );
}

// Custom simple Activity Icon replacement since 'Activity' isn't explicitly imported above to avoid clutter
function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}