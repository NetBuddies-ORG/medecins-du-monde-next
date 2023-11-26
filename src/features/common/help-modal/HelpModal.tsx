import {FaTimes} from "react-icons/fa";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
import { useState} from "react";
import {GetHelpQuery} from "@/services/GraphQL";

interface HelpModalProps {
    closeModal: () => void;
    help: GetHelpQuery["help"]
}

export function HelpModal({help, closeModal}: HelpModalProps){
    const [currentStep, setCurrentStep] = useState<number>(0);

    function handleClose() {
        closeModal();
    }

    function handlePreviousStep() {
        if(currentStep > 0){
            setCurrentStep(currentStep - 1)
        }
    }

    function handleNextStep() {
        if(currentStep < 2){
            setCurrentStep(currentStep + 1)
        }
    }

    return <>
        <div className="help-modal-bg"></div>
        <div className="help-modal-container">
            <button className="modal-close" onClick={handleClose}><FaTimes /></button>
            <div className="modal-stepper">
                {
                    help.data.attributes.Page.map((item, index) =>{
                        return <div key={index} className="modal-step">
                            {
                                currentStep === index &&
                                <div dangerouslySetInnerHTML={{__html: item.Contenu}}></div>
                            }
                        </div>
                    })
                }
            </div>
            <div className="bullets">
                {
                    help.data.attributes.Page.map((item, index) =>{
                        return <div key={index} className={`bullet ${currentStep === index ? 'active' : ''}`}
                                    onClick={() => setCurrentStep(index)}></div>
                    })
                }
            </div>
            <button className={"modal-control modal-previous" + (currentStep === 0 ? " disabled" : "")}
                    onClick={handlePreviousStep}><FaArrowLeftLong /></button>
            <button className={"modal-control modal-next" + (currentStep === help.data.attributes.Page.length - 1 ? " disabled" : "")}
                    onClick={handleNextStep}><FaArrowRightLong /></button>
        </div>
    </>
}
