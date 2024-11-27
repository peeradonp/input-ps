import { useLayoutEffect, useState } from "react"
import { Gradient } from "./background/Gradient"
import FormPage from "./components/FormPage"
import { ItemPage } from "./components/ItemPage"
import { ChevronRight } from "lucide-react"
import { Button, Modal } from "antd"
import DisplayForm from "./components/DisplayPage"
import dayjs from "dayjs"
import DisplayInfoPage from "./components/DisplayInfoPage"

// Define type for the form data (submitValue)
type FormDataProps = {
    fullName: string
    idCard: string
    gender: string
    dob: string | number | dayjs.Dayjs | Date | null | undefined
}

function App() {
    const [isVisible, setVisible] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isModalInfoOpen, setIsModalInfoOpen] = useState<boolean>(false)
    const [submitValue, setSubmitValue] = useState<FormDataProps>({} as FormDataProps)

    useLayoutEffect(() => {
        const gradient = new Gradient()
        gradient.initGradient("#gradient-canvas")
    }, [])

    return (
        <div className='w-svw h-svh'>
            <canvas id='gradient-canvas' data-transition-in />
            <div className='bg-black bg-opacity-20 w-svw h-svh absolute top-0 left-0' />
            <div className='text-white font-bold absolute top-4 left-4 z-10 text-xl'>Covid 19</div>
            <div className='flex flex-col items-center justify-between lg:flex-row lg:h-svh lg:pt-0 pt-24 overflow-auto pb-16'>
                <div className='origin-center-left max-w-2xl sm:shrink-0 lg:order-1 order-2 lg:pl-36 z-10 animate-fade-right w-full text-gray-100'>
                    <div className='text-center lg:text-left text-[3rem] lg:text-7xl leading-[3.35rem] lg:leading-[5rem] tracking-tight'>
                        โควิด 19
                        <br />
                        ป้องกันได้
                    </div>

                    <p className='mb-8 mt-4 max-w-[30rem] text-center leading-7 lg:text-left text-base lg:text-[1.125rem] lg:leading-[1.5] font-normal text-white/80 justify-self-center lg:justify-self-start'>
                        ลงทะเบียนรับวัคซีนป้องกันโควิด เพื่อสุขภาพที่ดีและปลอดภัย
                    </p>

                    <div className='space-x-4 flex justify-self-center lg:justify-self-start'>
                        <button
                            onClick={() => {
                                setVisible(!isVisible)
                            }}
                            className='flex justify-center items-center bg-white text-black rounded-2xl px-4 py-2 hover:bg-white/80 transition-all duration-200 text-sm md:text-lg'
                        >
                            ลงทะเบียน
                            <ChevronRight size={14} className='ml-1 -mr-1.5 mt-1' />
                        </button>
                        <button
                            onClick={() => {
                                setIsModalInfoOpen(!isModalInfoOpen)
                            }}
                            className='text-white/80 flex justify-center items-center rounded-2xl px-4 py-2 hover:bg-white/20 transition-all duration-200'
                        >
                            เงื่อนไขการลงทะเบียน
                            <ChevronRight size={14} className='ml-1 -mr-1.5 mt-1' />
                        </button>
                    </div>
                </div>
                <div className='relative order-1 transform-gpu md:order-2 lg:w-[600px] mx-auto items-center justify-center lg:flex md:h-[600px] h-[250px] w-[250px] animate-fade-up animate-delay-[0.8s]'>
                    <ItemPage />
                </div>
            </div>
            <div className='absolute bottom-2 right-2 z-10'>
                <a
                    href='https://www.linkedin.com/in/peeradon-phraekjinda-565b40239/'
                    target='_blank'
                    rel='noreferrer'
                >
                    <div className='p-2 cursor-pointer'>
                        <IconLinkdin />
                    </div>
                </a>
            </div>

            <FormPage
                visible={isVisible}
                setVisible={setVisible}
                setSubmitValue={setSubmitValue}
                setIsModalOpen={setIsModalOpen}
            />

            <Modal
                open={isModalOpen}
                footer={[
                    <Button
                        key='back'
                        onClick={() => {
                            setIsModalOpen(false)
                            setVisible(true)
                        }}
                    >
                        ย้อนกลับ
                    </Button>
                ]}
                closeIcon={null}
                getContainer={false}
            >
                <DisplayForm formData={submitValue} />
            </Modal>

            <Modal
                open={isModalInfoOpen}
                footer={[
                    <Button
                        key='back'
                        onClick={() => {
                            setIsModalInfoOpen(false)
                        }}
                    >
                        ย้อนกลับ
                    </Button>
                ]}
                closeIcon={null}
                getContainer={false}
            >
                <DisplayInfoPage />
            </Modal>
        </div>
    )
}

export default App

const IconLinkdin = () => {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='24px' height='24px'>
            <path
                fill='#0288d1'
                d='M8.421 14h.052 0C11.263 14 13 12 13 9.5 12.948 6.945 11.263 5 8.526 5 5.789 5 4 6.945 4 9.5 4 12 5.736 14 8.421 14zM4 17H13V43H4zM44 26.5c0-5.247-4.253-9.5-9.5-9.5-3.053 0-5.762 1.446-7.5 3.684V17h-9v26h9V28h0c0-2.209 1.791-4 4-4s4 1.791 4 4v15h9C44 43 44 27.955 44 26.5z'
            />
        </svg>
    )
}
