import dayjs from "dayjs"

import "dayjs/locale/th"
import buddhistEra from "dayjs/plugin/buddhistEra"
import localeData from "dayjs/plugin/localeData"

dayjs.extend(localeData)
dayjs.extend(buddhistEra)
dayjs.locale("th")

type FormData = {
    fullName: string
    idCard: string
    gender: string
    dob: string | number | dayjs.Dayjs | Date | null | undefined
}

const DisplayData = ({ formData }: { formData: FormData }) => {
    const formatThaiDate = (
        dateString: string | number | dayjs.Dayjs | Date | null | undefined
    ) => {
        const givenDate = dayjs(dateString, "DD/MM/YYYY")
        return givenDate.format("D MMMM พ.ศ.BBBB")
    }

    const checkCondition = (
        dateToCheck: string | number | Date | dayjs.Dayjs | null | undefined
    ) => {
        const givenDate = dayjs(dateToCheck)
        const thresholdDate = dayjs().subtract(65, "year")
        const now = dayjs()
        const ageInYears = now.diff(givenDate, "year")
        const ageInMonths = now.diff(givenDate, "month")

        if (givenDate.isBefore(thresholdDate) || (ageInMonths >= 6 && ageInYears <= 2)) {
            return <div className='text-green-600'>สามารถเข้ารับบริการได้</div>
        } else if (ageInYears < 65 && ageInYears >= 2) {
            return (
                <div>
                    <span className='text-red-600'>ไม่สามารถเข้ารับบริการได้ </span>
                    <span>
                        เนื่องจากอายุจะครบ 65 ปี วันที่ {formatThaiDate(givenDate.add(65, "year"))}
                    </span>
                </div>
            )
        } else if (ageInMonths < 6) {
            return (
                <div>
                    <span className='text-red-600'>ไม่สามารถเข้ารับบริการได้ </span>
                    <span>
                        เนื่องจากอายุจะครบ 6 เดือน วันที่{" "}
                        {formatThaiDate(givenDate.add(6, "months"))}
                    </span>
                </div>
            )
        } else {
            return <div className='text-green-600'>สามารถเข้ารับบริการได้</div>
        }
    }

    return (
        <div className='p-6'>
            <div className='text-center mb-6'>
                <h3 className='text-2xl font-bold'>ฟอร์มการลงทะเบียน</h3>
            </div>
            <div className='grid grid-cols-12 gap-4 mb-4'>
                <div className='col-span-5'>
                    <p className='font-semibold'>ชื่อ-นามสกุล</p>
                </div>
                <div className='col-span-7'>
                    <p>{formData.fullName}</p>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-4 mb-4'>
                <div className='col-span-5'>
                    <p className='font-semibold'>เลขบัตรประชาชน</p>
                </div>
                <div className='col-span-7'>
                    <p>{formData.idCard}</p>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-4 mb-4'>
                <div className='col-span-5'>
                    <p className='font-semibold'>เพศ</p>
                </div>
                <div className='col-span-7'>
                    <p>{formData.gender}</p>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-4 mb-4'>
                <div className='col-span-5 outline-none'>
                    <p className='font-semibold'>วัน/เดือน/ปี เกิด</p>
                </div>
                <div className='col-span-7'>
                    <p>{formatThaiDate(dayjs(formData.dob))}</p>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-4 mb-4'>
                <div className='col-span-5'>
                    <p className='font-semibold'>สถานะการเข้ารับบริการ</p>
                </div>
                <div className='col-span-7'>{checkCondition(formData.dob)}</div>
            </div>
        </div>
    )
}

export default DisplayData
