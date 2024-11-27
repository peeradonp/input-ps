import { Ban, CheckCircle2 } from "lucide-react"
import React from "react"

const DisplayInfoPage = () => {
    return (
        <div className='max-w-3xl mx-auto p-4'>
            <h2 className='text-2xl font-bold text-center mb-4'>เงื่อนไขการลงทะเบียน</h2>
            <ul className='space-y-4'>
                <li className='flex items-start space-x-3'>
                    <div className='flex-shrink-0'>
                        <CheckCircle2 className='text-green-500' />
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold'>ผู้สูงอายุ 65 ปีขึ้นไป</h3>
                        <p>รับสมัครผู้สูงอายุที่มีอายุ 65 ปีขึ้นไป (ทั้งชายและหญิง)</p>
                    </div>
                </li>
                <li className='flex items-start space-x-3'>
                    <div className='flex-shrink-0'>
                        <CheckCircle2 className='text-green-500' />
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold'>เด็กอายุระหว่าง 6 เดือน ถึง 2 ปี</h3>
                        <p>รับเด็กอายุระหว่าง 6 เดือนถึง 2 ปี (ทั้งชายและหญิง)</p>
                    </div>
                </li>
                <li className='flex items-start space-x-3'>
                    <div className='flex-shrink-0'>
                        <Ban className='text-red-500' />
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold text-red-500'>ข้อกำหนดสำคัญ</h3>
                        <p>
                            ผู้ที่มีอายุไม่ตรงตามเกณฑ์
                            หรือมาร่วมกิจกรรมเกินเวลาที่กำหนดจะไม่สามารถเข้าร่วมกิจกรรมได้
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default DisplayInfoPage
