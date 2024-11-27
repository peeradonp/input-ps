/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Popconfirm, Select } from "antd"
import classNames from "classnames"
import dayjs from "dayjs"
import { X } from "lucide-react"
import { ThaiDatePicker } from "thaidatepicker-react"

const { Option } = Select

type FormDataProps = {
    fullName: string
    idCard: string
    gender: string
    dob: string | number | dayjs.Dayjs | Date | null | undefined
}

type FormPageProps = {
    visible: boolean
    setVisible: (visible: boolean) => void
    setSubmitValue: (values: FormDataProps) => void
    setIsModalOpen: (visible: boolean) => void
}

const FormPage: React.FC<FormPageProps> = ({
    visible = false,
    setVisible,
    setSubmitValue,
    setIsModalOpen
}) => {
    const [form] = Form.useForm()

    const validateName = (rule: any, value: string) => {
        if (!value) {
            return Promise.reject("กรุณาระบุ ชื่อ-นามสกุล")
        }
        const regex = /^[A-Za-z\sก-์]+$/
        if (!regex.test(value)) {
            return Promise.reject("กรอกได้แค่ ภาษาไทย และ ภาษาอังกฤษ")
        }
        return Promise.resolve()
    }

    const validateIdCard = (rule: any, value: string) => {
        if (!value) {
            return Promise.reject("กรุณาระบุ เลขบัตรประชาชน")
        }
        const regex = /^\d{1}-\d{4}-\d{5}-\d{2}-\d{1}$/
        if (!regex.test(value)) {
            return Promise.reject("กรอกได้แค่ตัวเลข และต้องมีรูปแบบ x-xxxx-xxxxx-xx-x")
        }
        return Promise.resolve()
    }

    const validateDate = (rule: any, value: number) => {
        if (!value) {
            return Promise.reject("กรุณาระบุ วัน/เดือน/ปี")
        }
        return Promise.resolve()
    }

    const onFinish = (values: any) => {
        setIsModalOpen(true)
        setSubmitValue(values)
        setVisible(false)
        onReset()
    }

    const onReset = () => {
        form.resetFields()
    }

    return (
        <div className={classNames({ " hidden": !visible })}>
            <div className='bg-black bg-opacity-20 w-svw h-svh absolute top-0 left-0 overflow-auto z-30' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 max-w-[480px] w-full'>
                <div className='relative p-4 bg-white rounded-2xl m-2'>
                    <X
                        className='absolute right-2 top-2 cursor-pointer rounded-md hover:bg-black/10'
                        onClick={() => setVisible(false)}
                    />
                    <div className='flex justify-center mb-4'>
                        <p className='text-2xl font-bold'>ฟอร์มการลงทะเบียน</p>
                    </div>
                    <Form
                        form={form}
                        name='user-form'
                        onFinish={onFinish}
                        onReset={onReset}
                        layout='vertical'
                    >
                        <Form.Item
                            label='ชื่อ-นามสกุล'
                            name='fullName'
                            rules={[{ required: true, validator: validateName }]}
                        >
                            <Input placeholder='กรอกชื่อ-นามสกุล' />
                        </Form.Item>

                        <Form.Item
                            label='เลขบัตรประชาชน'
                            name='idCard'
                            rules={[{ required: true, validator: validateIdCard }]}
                        >
                            <Input placeholder='กรอกเลขบัตรประชาชน' />
                        </Form.Item>

                        <Form.Item
                            label='เพศ'
                            name='gender'
                            rules={[{ required: true, message: "กรุณาระบุ เพศ" }]}
                        >
                            <Select placeholder='เลือกเพศ'>
                                <Option value='ชาย'>ชาย</Option>
                                <Option value='หญิง'>หญิง</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label='วัน/เดือน/ปี เกิด'
                            name='dob'
                            rules={[{ required: true, validator: validateDate }]}
                        >
                            <ThaiDatePicker
                                placeholder='เลือกวันเกิด'
                                customInput={Input}
                                maxDate={new Date()}
                                inputProps={{
                                    displayFormat: "D MMMM พ.ศ.YYYY",
                                    readOnly: true
                                }}
                            />
                        </Form.Item>

                        <Form.Item className='flex justify-center'>
                            <Popconfirm
                                title='ยืนยันข้อมูล ?'
                                onConfirm={() => form.submit()}
                                okText='ยืนยัน'
                                cancelText='ตรวจสอบอีกครั้ง'
                            >
                                <Button type='primary' style={{ marginRight: 10 }}>
                                    ยืนยัน
                                </Button>
                            </Popconfirm>
                            <Button htmlType='button' onClick={onReset}>
                                ล้างค่า
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default FormPage
