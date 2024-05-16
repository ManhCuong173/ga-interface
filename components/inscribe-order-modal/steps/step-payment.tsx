import QRBox from "@/components/QRBox";

export default function StepPayment({setStep,setOpen,dataForm}:any) {
                      
  return (<QRBox setStep={setStep} setOpen={setOpen} dataForm={dataForm} />)
}
